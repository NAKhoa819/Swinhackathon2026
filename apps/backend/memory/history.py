from typing import Optional

# In-memory session store: { session_id -> list[dict] }
# In a real app, replace with DynamoDB / Redis / Postgres
_sessions: dict[str, list] = {}


class ConversationHistory:
    """
    Manages conversation history per session_id.
    Each message: { "role": "user"|"assistant", "content": str, "actions": list|None }
    """

    def __init__(self, session_id: str):
        self.session_id = session_id
        if session_id not in _sessions:
            _sessions[session_id] = []

    # ------------------------------------------------------------------
    # Static helpers
    # ------------------------------------------------------------------
    @staticmethod
    def session_exists(session_id: str) -> bool:
        """Returns True if session has been previously created."""
        return session_id in _sessions

    @staticmethod
    def ensure_session(session_id: str, seed_welcome: bool = False) -> None:
        """Creates a session if it does not exist."""
        if session_id not in _sessions:
            _sessions[session_id] = []
        if seed_welcome and not _sessions[session_id]:
            _sessions[session_id].append({
                "message_id": "m_welcome",
                "role": "assistant",
                "content": "How can I help with your financial goals today?",
            })

    # ------------------------------------------------------------------
    # Instance methods
    # ------------------------------------------------------------------
    def add_message(
        self,
        role: str,
        content: str,
        actions: Optional[list] = None,
        message_id: Optional[str] = None,
    ) -> None:
        """Appends a message to this session's history."""
        entry: dict = {"role": role, "content": content}
        if actions is not None:
            entry["actions"] = actions
        if message_id is not None:
            entry["message_id"] = message_id
        _sessions[self.session_id].append(entry)

    def get_last_n_messages(self, n: int) -> list:
        """Returns last N messages (for LLM context window)."""
        return _sessions[self.session_id][-n:]

    def get_all_messages(self) -> list:
        """Returns all messages in this session (for GET /api/chat/session)."""
        return list(_sessions[self.session_id])
