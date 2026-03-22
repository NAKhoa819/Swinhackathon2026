import os
import httpx
from dotenv import load_dotenv

load_dotenv('apps/backend/intelligence/src/.env')
api_key = os.environ.get('GOOGLE_API_KEY')

url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={api_key}"
payload = {
    "contents": [{"parts": [{"text": "Hello"}]}]
}
resp = httpx.post(url, json=payload)
print("Status:", resp.status_code)
print("Response:", resp.json())
