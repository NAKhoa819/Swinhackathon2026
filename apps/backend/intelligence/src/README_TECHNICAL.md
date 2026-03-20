# GoalPilot Intelligence Engine: Technical Reference & Data Integration Schema

## 1. Function Documentation

### `core/intelligence.py`

**`calculate_sustainability_index(user_context: dict, market_context: dict) -> float`**
- **Input Types**: `user_context` (Dict), `market_context` (Dict)
- **Output Type**: `float` (range 0.0 to 1.0)
- **Logic Summary**: Calculates the Sustainability Index ($S_i$) applying a Gaussian Penalty math model. The formula relies on historical data where $\mu_{hist}$ represents the historical average spend and $\sigma_{hist}$ represents the spend standard deviation. The basic sustainability index calculates the ratio between financial balance and spending, normalized by inflation and a goal priority factor. Data volatility drives the Gaussian Penalty threshold, dynamically lowering $S_i$. 
- **Error Handling**: Uses a `try-except` block to catch calculation errors (e.g., missing dictionary keys or malformed data types) and defaults to a middle-ground $S_i$ of `0.5` upon error to prevent pipeline failure.

**`determine_strategy(s_i: float) -> str`**
- **Input Types**: `s_i` (float)
- **Output Type**: `str` ("A", "B", or "None")
- **Logic Summary**: Evaluates the Sustainability Threshold.
  - **$S_i < 0.5$**: Triggers **Strategy B** (Goal Re-alignment).
  - **$0.5 \le S_i < 0.8$**: Triggers **Strategy A** (Cost Optimization).
  - **$S_i \ge 0.8$**: Triggers **None** (Finances are considered sustainable).

### `core/llm_gateway.py`

**`get_model(provider: str = None) -> Any`**
- **Input Types**: `provider` (str, defaults to env var)
- **Output Type**: LangChain BaseChatModel instance (e.g., `ChatGoogleGenerativeAI`, `ChatGroq`, `ChatBedrock` or `"mock"`)
- **Logic Summary**: Instantiates the selected LLM provider dynamically based on strings passed or environment variables.

**`get_completion(messages: list, response_format=None, provider=None, user_context=None, market_context=None) -> Any`**
- **Input Types**: `messages` (List[Dict]), `response_format` (Pydantic Model class), `provider` (str), `user_context` (Dict), `market_context` (Dict)
- **Output Type**: Pydantic Model (e.g., `StrategyResponse`) or string message content.
- **Logic Summary**: Routes prompt messages to the chosen LLM via LangChain. Optionally calculates $S_i$ internally when contexts are provided using the previously identified logic pattern.
- **Error Handling (Invalid JSON)**: When `response_format` is provided, LangChain's `.with_structured_output()` is utilized. If a model like Llama 3 or Gemini returns malformed output or invalid JSON, LangChain’s internal mechanism throws an `OutputParserException`. The application relies on standard try-catch blocks to capture these execution faults—preventing hard crashes and logging errors appropriately (e.g., yielding default responses or retrying upstream).

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
To switch models during verification processes (`gemini-1.5-pro` vs `llama3-70b`):
1. Provide the model string explicitly in the `get_completion` function call:
   - For Gemini 1.5 Pro: `get_completion(..., provider="gemini")`
   - For Llama 3 70B: `get_completion(..., provider="llama3")`
2. Alternatively, establish defaults utilizing the `LLM_PROVIDER` key within your `.env` execution file (i.e. `LLM_PROVIDER=gemini` or `LLM_PROVIDER=llama3`).

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

This enforces Python to forcefully recognize the root codebase tree (e.g., `GP-Engine/`) as the origin structure—guaranteeing that tests dynamically link cross-level logic cleanly.
