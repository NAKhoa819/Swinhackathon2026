# GoalPilot Intelligence Engine: Technical Reference & Data Integration Schema

## 1. Function Documentation

### `core/intelligence.py`

**`calculate_metrics(profile: dict) -> dict`**
- **Input Types**: `profile` (Dict containing 'mu_hist', 'sigma_hist', 'beta_prop', 'last_update_timestamp', 'data_completeness', and 'market_volatility')
- **Output Type**: `dict` containing `s_i` (float) and `c_s` (float)
- **Logic Summary**: Calculates the Sustainability Index ($S_i$) applying a Gaussian Penalty math model. Also calculates a Confidence Score ($C_s$) using a weighted time-decay function.
- **Error Handling**: Missing dictionary keys default to robust fallback values (e.g., `sigma_hist=0` defaults $S_i$ safely based on relationship between `beta_prop` and `mu_hist`).

**`determine_strategy(s_i: float) -> str`**
- **Input Types**: `s_i` (float)
- **Output Type**: `str` ("A", "B", or "None")
- **Logic Summary**: Evaluates the Sustainability Threshold.
  - **$S_i < 0.5$**: Triggers **Strategy B** (Goal Re-alignment).
  - **$0.5 \le S_i < 0.8$**: Triggers **Strategy A** (Cost Optimization).
  - **$S_i \ge 0.8$**: Triggers **None** (Finances are considered sustainable).

### `core/llm_gateway.py`

**`get_model(provider: str = None) -> Any`**
- **Input Types**: `provider` (str, defaults to env var `ACTIVE_LLM_PROVIDER`)
- **Output Type**: LangChain BaseChatModel instance (e.g., `ChatBedrock`, `ChatGoogleGenerativeAI`, `ChatGroq`, or `"mock"`)
- **Logic Summary**: Instantiates the selected LLM provider dynamically based on strings passed or environment variables. Supports fallback to secondary providers like Groq or Gemini via the `BACKUP_PROVIDER` config.

**`get_completion(messages: list, response_format=None, provider=None) -> Any`**
- **Input Types**: `messages` (List[Dict]), `response_format` (Pydantic Model class), `provider` (str)
- **Output Type**: Pydantic Model (e.g., `StrategyResponse`) or string message content.
- **Logic Summary**: Routes prompt messages to the chosen LLM via LangChain. 
- **Error Handling (Invalid JSON)**: When `response_format` is provided, LangChain's `.with_structured_output()` is utilized. If a model returns malformed output or invalid JSON, standard try-catch blocks upstream capture these execution faults—preventing hard crashes and logging errors appropriately (e.g., yielding default responses or retrying upstream).

**`get_chat_advice(user_query: str, s_i: float) -> str`**
- **Input Types**: `user_query` (str), `s_i` (float)
- **Output Type**: `str`
- **Logic Summary**: Gets chat advice from the LLM, setting the personality based on the $S_i$ value ("Strict and direct" vs "Encouraging and supportive"). Does not run any mathematical calculations internally.

### `models/schemas.py`

**`StrategyResponse` (Pydantic Model)**
- **Fields**:
  - `strategy`: `Literal["A", "B", "None"]`
  - `reasoning`: `str`
  - `remediation_steps`: `List[str]`
- **Logic Summary**: Defines the strict structured schema ensuring the designated LLM responds uniformly across models.

---

## 2. Database Mapping Layer (DynamoDB)

GoalPilot's user profiles are stored in Amazon DynamoDB. Before making context-heavy LLM calls, we construct the user profile mathematically to save tokens rather than passing massive transaction lists.

### Mapping to the $S_i$ Gaussian Penalty Formula
To calculate a robust $S_i$, the following mathematical context markers are fetched from DynamoDB:
- `monthly_avg_spend` $\rightarrow$ Maps to $\mu_{hist}$ (Historical Mean)
- `spend_std_dev` $\rightarrow$ Maps to $\sigma_{hist}$ (Historical Volatility)

By structuring the DynamoDB items to pre-compute these analytics, `core/intelligence.py` can immediately apply the Gaussian penalty directly from the numerical context without prompting the LLM to process thousands of raw transactions.

### Using `memory/retriever.py` to Save Tokens
The `ContextRetriever.fetch_user_financial_context(user_id)` method aggregates this summary state. By calling this retriever **before** routing data to `llm_gateway.py` and the target model, we construct a condensed `user_context` dictionary containing only these mathematical summaries, drastically lowering the contextual token consumption.

### Sample `db_client.py` Utility

```python
import boto3
from typing import Dict, Any

class DynamoDBClient:
    def __init__(self, table_name: str = "UserProfileData"):
        # Initialize boto3 DynamoDB resource
        self.dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
        self.table = self.dynamodb.Table(table_name)

    def fetch_user_profile(self, user_id: str) -> Dict[str, Any]:
        """
        Retrieves mathematical context variables to map to μ_hist and σ_hist.
        """
        try:
            response = self.table.get_item(Key={'user_id': user_id})
            item = response.get('Item', {})
            
            # Formats DynamoDB item into user_context dictionary
            return {
                "monthly_avg_spend": float(item.get("monthly_avg_spend", 0.0)), # mapped to μ_hist
                "spend_std_dev": float(item.get("spend_std_dev", 0.0)),         # mapped to σ_hist
                "balance": float(item.get("balance", 0.0)),
                "goals": item.get("goals", [])
            }
        except Exception as e:
            print(f"DynamoDB Fetch Error: {e}")
            return {}
```

---

## 3. Multi-Model Testing Guide

The Intelligence Engine uses LangChain for provider-agnostic testing, allowing robust comparative validation across models.

### Switching Between Models
To switch models during verification processes (`gemini` vs `groq` vs `bedrock`):
1. Provide the provider string explicitly when fetching the model via `get_model(provider="...")` or inside `get_completion(..., provider="...")`, bypassing the active default if needed.
2. Alternatively, establish defaults utilizing the `ACTIVE_LLM_PROVIDER` and `BACKUP_PROVIDER` keys within your `.env` execution file.

### Running Tests from the `tests/` Directory
When evaluating pipelines using test runners isolated inside the `tests/` repository folder, importing locally from `core/` can frequently return a `ModuleNotFoundError`. 

To anchor the imports globally without formally bootstrapping the engine as an installed package, utilize a robust `sys.path` anchor at the very top of testing scripts:

```python
import sys
import os

# Sys.path anchor ensures absolute module resolution
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

# Core engine modules are now validly resolvable
from core.llm_gateway import get_completion
from core.intelligence import determine_strategy
```

This enforces Python to forcefully recognize the root codebase tree (e.g., `GoalPilot-Intelligence-Engine/`) as the origin structure—guaranteeing that tests dynamically link cross-level logic cleanly.
