
Run the following commands in the project root:
```bash
# Install dependencies
npm install

# Start Expo server
npx expo start

# Clear cache if needed
npx expo start -c
```
---
Project Structure
Built with React Native (Expo) and TypeScript.
```plaintext
src/
├── components/
│   ├── ActionButtons/      # Neon action buttons (Plan A, Plan B, Accept...)
│   ├── ChatBubble/         # Chat UI for user (gradient) and AI (dark/glass)
│   └── FinancialChart/     # Cash flow chart with liquid glass effect
├── screens/
│   ├── AgentScreen/        # Chat screen (input + message list)
│   └── DashboardScreen/    # Overview (charts and goal cards)
├── coordinator/
│   ├── types.ts            # API contracts and TypeScript interfaces
│   ├── mockData.ts         # Mock data (chat, replan, cash flow)
│   └── chatCoordinator.ts  # Logic and API integration layer
└── theme.ts                # Colors, gradients, UI styles
```
---
Data Flow
A. Chat History Loading
File: `chatCoordinator.ts`  
Function: `getChatSession(sessionId)`
Current:
Returns static data from `mockData.ts`
Backend:
```ts
fetch('/api/chat/session', {
  method: 'GET'
});
```
---
B. Sending Text Messages
File: `chatCoordinator.ts`  
Function: `postChatMessage(payload)`
Current:
Simulates response with ~600ms delay
Backend:
```ts
fetch('/api/chat/message', {
  method: 'POST',
  body: JSON.stringify(payload),
  headers: {
    'Content-Type': 'application/json'
  }
});
```
---
C. Action Button Flow
File: `chatCoordinator.ts`  
Function: `handleActionSelection(action: ChatAction)`
Mechanism:
UI sends full action object:
type
payload
Current:
```ts
console.log('[API BINDING] Send to BE:', action.type, action.payload);
```
Backend:
Use `action.payload` directly in request body
Example:
```json
{
  "strategy": "increase_savings",
  "amount": 3000000
}
```
Send this payload to the goal adjustment API.