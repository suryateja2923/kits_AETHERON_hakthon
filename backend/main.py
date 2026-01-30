from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests

# =========================
# 🔐 SAMBANOVA API KEY
# =========================
SAMBANOVA_API_KEY = "e3743f8e-613a-4d0c-8bd7-a12165f34f24"

# =========================
# FastAPI App
# =========================
app = FastAPI()

# =========================
# CORS (React)
# =========================
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =========================
# Request Model
# =========================
class ChatRequest(BaseModel):
    message: str

# =========================
# SambaNova Endpoint
# =========================
SAMBANOVA_URL = "https://api.sambanova.ai/v1/chat/completions"

# =========================
# Chat Endpoint
# =========================
@app.post("/chat")
async def chat(request: ChatRequest):
    try:
        headers = {
            "Authorization": f"Bearer {SAMBANOVA_API_KEY}",
            "Content-Type": "application/json"
        }

        payload = {
            "model": "Meta-Llama-3.1-8B-Instruct",
            "messages": [
                {
                    "role": "system",
                    "content": (
                        "You are a friendly, proactive AI avatar. "
                        "Respond naturally and briefly."
                    )
                },
                {
                    "role": "user",
                    "content": request.message
                }
            ],
            "temperature": 0.7
        }

        response = requests.post(
            SAMBANOVA_URL,
            headers=headers,
            json=payload,
            timeout=30
        )

        response.raise_for_status()
        data = response.json()

        ai_reply = data["choices"][0]["message"]["content"]

        return {"reply": ai_reply}

    except Exception as e:
        print("SAMBANOVA ERROR:", e)
        return {
            "reply": "I can hear you. Please continue."
        }
