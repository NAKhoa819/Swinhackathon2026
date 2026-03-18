import os
from dotenv import load_dotenv

# Load environment variables from .env file if it exists
load_dotenv()

# LLM Configuration
# Supports 'gemini' or 'bedrock'
LLM_PROVIDER = os.getenv("LLM_PROVIDER", "llama4")

# Optional: Configuration for specific providers
# e.g., model names, regions, etc.
GEMINI_MODEL = os.getenv("GEMINI_MODEL", "gemini/gemini-1.5-pro")
BEDROCK_MODEL = os.getenv("BEDROCK_MODEL", "bedrock/anthropic.claude-3-5-sonnet-20240620-v1:0")
