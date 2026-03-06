# GoalPilot

A 4-layer agentic finance application:
1. **Presentation Layer (UI)**: `apps/frontend/`
2. **API & Logic Layer (API Gateway + Lambda)**: `apps/backend-api-logic/`
3. **Intelligence Layer (Agentic Reasoning)**: `apps/backend-intelligence/`
4. **Data Layer (External Context/Forecasts)**: `apps/backend-data/`

## Components
- **apps/frontend**: The presentation layer providing the user interface.
- **apps/backend-api-logic** (BE#1): Data ingestion and user context persistence.
- **apps/backend-intelligence** (BE#2): Agentic reasoning boundary with Bedrock Claude, prompt management, RAG glue, and decision tree mapping.
- **apps/backend-data** (BE#3): Market data collection and forecasting service boundary.

## Development Workflow (Contract-First)
We use a contract-first approach. The frontend can be built concurrently with the backends using mock data based on our OpenAPI specification and Realtime Event definitions:
- **REST API Specs**: See `docs/api-contract/openapi.yaml`
- **Realtime Events**: See `docs/api-contract/events.md`
- **Shared Types**: See `packages/shared-types/README.md`

## Running Locally (Placeholders)
To run the full stack locally:
1. Run Frontend: `cd apps/frontend && npm run dev`
2. Run BE#1: `cd apps/backend-api-logic && npm run dev`
3. Run BE#2: `cd apps/backend-intelligence && npm run dev`
4. Run BE#3: `cd apps/backend-data && npm run dev`
