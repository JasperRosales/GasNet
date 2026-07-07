# Project Instructions — GasNet

**GasNet** is an AI-Driven Decision Support and Point-of-Sale System for CJG LPG Trading.

This file is the entry point for anyone (human or AI agent) working on this codebase. Read it in full before writing or modifying any code.

---

## 1. Repository Structure

```
/
├── instructions.md          ← you are here
├── Requirements/            ← source of truth for every task
│   ├── Ob1W1D1.md
│   ├── Ob1W2D1.md
│   ├── ...
│   └── Ob3W6D1.md
├── frontend/                  ← React frontend (created as work begins)
└── backend/                  ← Express backend (created as work begins)
```

Each file in `Requirements/` follows the naming pattern:

```
Ob{objective}W{week}D{day}.md
```

- **Objective 1** = Sales Recording and Transaction Management
- **Objective 2** = Seamless Integration and Synchronization Across Multiple Devices
- **Objective 3** = AI-Based Decision Support and Business Analytics

Example: `Ob3W4D1.md` = Objective 3 (AI Analytics), Week 4, Day 1.

---

## 2. Mandatory Workflow: Read Before You Build

**Before writing or editing any code, you must read the relevant requirement file(s) in `Requirements/` first.** Do not rely on memory of earlier turns, summaries, or assumptions about what a task involves — open and read the actual file.

For any task, follow this sequence:

1. **Identify the task** by its Objective / Week / Day (e.g., "build the receipt generation component" → `Ob1W4D1.md`).
2. **Open and read that file in full.** Each requirement file contains:
   - The task description and owner
   - **Sub-Tasks (Breakdown)** — the concrete pieces of work to implement
   - **Deliverable(s)** — the components/modules/endpoints expected to exist when done
   - **Test Suite / PR Acceptance Criteria** — the exact behaviors that must pass before the PR is merged
3. **Check for dependencies.** Many tasks depend on earlier deliverables:
   - Objective 2 (sync) depends on transaction data produced by Objective 1 (POS).
   - Objective 3 (AI analytics) depends on both the POS data from Objective 1 and the synchronized records from Objective 2.
   - If the current task references a prior deliverable, read that file too before proceeding.
4. **Implement only what the file describes.** Do not add scope beyond the sub-tasks and deliverables listed. Do not skip a sub-task because it seems minor — each maps to an acceptance criterion.
5. **Validate against the acceptance criteria** before marking the task done. Every bullet under "Test Suite / PR Acceptance Criteria" must be either covered by an automated test or explicitly noted as a manual check in the PR description.
6. **Write the actual tests** (see Section 4) so each acceptance criterion has a corresponding automated check wherever feasible.

If a requirement file is ambiguous or conflicts with another, flag it rather than guessing — use the most conservative interpretation and note the assumption in your PR description.

---

## 3. Technology Stack

| Layer | Technology |
|---|---|
| Frontend | **React.js** (JavaScript — no TypeScript) |
| Backend | **Express.js** (Node.js — JavaScript, no TypeScript) |
| Data | **Mock data** (no real database yet) |
| Testing | **Vitest** + **React Testing Library** |

### 3.1 Frontend (React)

- Plain JavaScript (`.jsx` / `.js`) — do not introduce TypeScript or `.tsx` files.
- Functional components with hooks only (no class components).
- Each requirement file's deliverables should map to a clearly identifiable component or page — don't bundle unrelated deliverables into a single file.

### 3.2 Backend (Express)

- Plain JavaScript (`.js`) — do not introduce TypeScript.
- Organize code as `routes → controllers → services` so each layer maps cleanly to the deliverables named in the requirement files (e.g., a file naming a "Transaction Synchronization Service" should produce an identifiable service module, not be buried inside an unrelated controller).

### 3.3 Data Layer — Mock Data for Now

Requirement files across all three objectives describe database-backed operations (saving transactions, syncing records across devices, storing analytics results). **For this phase, do not connect a real database.** Instead:

- Represent each described schema as an in-memory JavaScript data structure (array of objects or a JSON file imported into the backend).
- Shape mock data fields to exactly match what each requirement file describes (e.g., sales transaction records must carry product, quantity, price, and total as described in the Objective 1 files; branch sync records must carry branch identifier, timestamp, and data payload as implied by the Objective 2 files).
- Implement all "database" operations (save, retrieve, update, sync, deduct, etc.) as functions that mutate the in-memory mock data — so the API contract behaves identically to a real database-backed implementation.
- Isolate mock data and its accessor functions (e.g., a `data/` or `mockData/` folder per resource) so a real database can be swapped in behind the same function signatures later without touching route or controller code.
- Seed enough mock records to exercise the edge cases implied by the acceptance criteria — for example:
  - At least one completed LPG transaction with a generated receipt (Objective 1)
  - At least one pending and one failed sync record to exercise status indicators (Objective 2)
  - Sales data spread across different weeks, months, and branches to exercise all analytics periods (Objective 3)
  - At least one AI insight result and one recommendation entry for the AI cards (Objective 3)

### 3.4 Notes on Bluetooth Printing (Objective 1, Week 4 Day 2)

The Bluetooth receipt printing requirement (`Ob1W4D2.md`) involves hardware. For this phase:
- Mock the Bluetooth connection as a simulated async function that resolves after a short delay.
- The printer connection test should verify the mock resolves, not test actual hardware.
- Document the mock clearly so it can be replaced with a real Bluetooth SDK call (e.g., Web Bluetooth API or React Native BLE) when hardware integration begins.

### 3.5 Notes on AI Insights (Objective 3)

The AI insight and recommendation features (`Ob3W2D2.md`, `Ob3W4D1.md`, `Ob3W5D1.md`, `Ob3W5D2.md`) require AI-generated outputs. For this phase:
- Use static mock insight objects that mirror the shape the real AI service would return (e.g., `{ insight: "...", recommendation: "...", trend: "..." }`).
- Isolate the AI service call behind a thin adapter function so the real API call can be swapped in later without changing the components that consume it.

---

## 4. Testing Setup

Install the testing dependencies with:

```bash
npm install vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom --save-dev
```

Guidelines:

- Frontend component tests use **Vitest** as the runner and **React Testing Library** for rendering/interaction (`render`, `screen`, `userEvent`), with `jsdom` as the test environment.
- Use `@testing-library/jest-dom` matchers (e.g., `toBeInTheDocument`, `toHaveTextContent`) for assertions.
- Configure Vitest's `environment` as `jsdom` for any test file touching the DOM (component tests); plain logic/service tests (e.g., calculation engine, sync validation, analytics aggregation) can run in the default `node` environment.
- Name test files `*.test.js` (or `*.test.jsx` for component tests) alongside the code they test, or in a parallel `__tests__/` folder.
- **Every "Test Suite / PR Acceptance Criteria" bullet in a requirement file should be traceable to at least one test.** Where a criterion can't be automated (e.g., purely visual layout, physical Bluetooth printer), note it as a manual check in the PR description instead of skipping it silently.

---

## 5. Task Execution Checklist

For every task you pick up:

- [ ] Read the matching `Requirements/ObXWYDZ.md` file in full
- [ ] Read any dependent requirement files it relies on
- [ ] Confirm tech stack constraints (JS only, mock data only) before scaffolding new code
- [ ] Implement only the listed sub-tasks and deliverables
- [ ] Write Vitest/RTL tests covering the acceptance criteria
- [ ] Run the test suite and confirm it passes
- [ ] Note any criteria that couldn't be automated, and why

---

## 6. Naming Conventions Recap

- Requirement files: `Ob{objective}W{week}D{day}.md`
- Objectives: `1` = POS/Sales, `2` = Sync/Integration, `3` = AI Analytics
- Keep component, route, and service names close to the deliverable names used in the requirement files so it is easy to trace any piece of code back to the spec that justified it.
