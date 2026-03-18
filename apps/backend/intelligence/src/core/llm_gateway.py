import json
from config import settings
from core.intelligence import calculate_sustainability_index
from models.schemas import StrategyResponse

def get_model(provider: str = None):
    """
    Returns the correct LangChain chat model based on the LLM_PROVIDER environment variable.
    """
    selected_provider = provider or settings.LLM_PROVIDER
    
    if selected_provider.lower() == "mock":
        return "mock"
        
    if selected_provider.lower() == "gemini":
        from langchain_google_genai import ChatGoogleGenerativeAI
        return ChatGoogleGenerativeAI(model=settings.GEMINI_MODEL, temperature=0.0)
    elif selected_provider.lower() == "bedrock":
        try:
            from langchain_aws import ChatBedrock
            return ChatBedrock(model_id=settings.BEDROCK_MODEL, region_name="us-east-1", model_kwargs={"temperature": 0.0})
        except ImportError:
            from langchain_community.chat_models import BedrockChat
            return BedrockChat(model_id=settings.BEDROCK_MODEL, region_name="us-east-1", model_kwargs={"temperature": 0.0})
    elif selected_provider.lower() == "llama3": #llama3-70b-8192 (Decomissioned)
        from langchain_groq import ChatGroq
        return ChatGroq(model="llama3-70b-8192", temperature=0.0)
    elif selected_provider.lower() == "llama4": #llama4-scout-17b-16e-instruct
        from langchain_groq import ChatGroq
        return ChatGroq(model="llama-4-scout-17b-16e-instruct", temperature=0.0)
    else:
        raise ValueError(f"Unsupported provider: {selected_provider}")

def get_completion(messages: list, response_format=None, provider=None, user_context=None, market_context=None):
    """
    Unified LLM completion function using LangChain.
    """
    selected_provider = provider or settings.LLM_PROVIDER
    model = get_model(selected_provider)
    
    # Logic Preservation: Calculate S_i if context is provided
    # The Sustainability Index ($S_i$) math remains in core/intelligence.py but is "called" here.
    if user_context is not None and market_context is not None:
        s_i = calculate_sustainability_index(user_context, market_context)
        print(f"[Gateway Inner] Calculated S_i internally: {s_i:.2f}")

    if model == "mock":
        # Simulate API response for testing the Sustainability Index ($S_i$) without API calls
        if response_format:
            # LangChain structured output binds and returns the Pydantic model directly
            return response_format(
                strategy="A",
                reasoning="S_i is below 0.8. Client spends excessively on dining out.",
                remediation_steps=[
                    "Reduce dining budget by 20%",
                    "Allocate savings to emergency fund"
                ]
            )
        else:
            return "Mock logic tested successfully"
            
    # LLM execution using LangChain
    if response_format:
        # Bind the Pydantic schema using .with_structured_output()
        structured_llm = model.with_structured_output(response_format)
        response = structured_llm.invoke(messages)
        return response
    else:
        response = model.invoke(messages)
        return response.content
