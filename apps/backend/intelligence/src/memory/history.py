class ConversationHistory:
    def __init__(self):
        # In a real app, this would connect to a DB (Postgres, DynamoDB, etc.)
        self.history = []
        
    def add_message(self, role: str, content: str):
        """Stores a message in the conversation history."""
        self.history.append({"role": role, "content": content})
        
    def get_last_n_messages(self, n: int) -> list:
        """Fetches the last N messages."""
        return self.history[-n:]
