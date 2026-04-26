# GenLayer Prediction Market Implementation Plan

> For Hermes: use the BuildersClaw brief as the source of truth. Optimize for brief compliance, correctness, local verifiability, and two-minute judge readability.

Goal: Build a public hackathon repo for a simple prediction market with a Next.js frontend, a Foundry Solidity contract, and a meaningful GenLayer resolution layer.

Architecture: A monorepo with three clearly separated parts. The EVM contract manages market creation, staking, resolution, and claims. The GenLayer contract models intelligent resolution by gathering evidence and producing a structured result. The Next.js app demonstrates the market lifecycle with documented mock integration points.

Tech stack: Next.js App Router + TypeScript, Foundry Solidity, Python GenLayer source, markdown docs.

---

## Task 1: Discovery capture
- Save live BuildersClaw brief details in the README/doc set.
- Save live GenLayer development notes that matter for implementation:
  - GenLayer Studio is the zero-setup option.
  - Local environment docs call for Python 3.12+, Node 18+, optional Docker.
  - `genvm-lint` and `genlayer-test` are the main local verification tools.
  - GenLayer supports web access and equivalence-principle based non-determinism.

## Task 2: Repository skeleton
- Create root README, docs, apps/web, contracts, and genlayer directories.
- Add root `.gitignore` and light workspace files.

## Task 3: Solidity contract
- Implement a minimal parimutuel prediction market contract in `contracts/src/PredictionMarket.sol`.
- Include events, create/place/resolve/claim flow, invalid-market refund flow, and anti-double-claim logic.

## Task 4: Solidity tests
- Add Foundry tests in `contracts/test/PredictionMarket.t.sol` for create, stake, late-stake rejection, resolve, claim, double-claim rejection, losing-claim rejection, and invalid refund.

## Task 5: GenLayer contract source
- Add a meaningful intelligent contract in `genlayer/prediction_resolver.py`.
- Model evidence fetching, structured resolution output, and equivalence-principle usage.
- Include a deterministic example input/output JSON and an explanation of how the EVM resolver would consume the result.

## Task 6: Frontend
- Build a clean Next.js app with:
  - market list page
  - create market page
  - market detail page
  - yes/no position panel
  - resolution panel
  - claim status panel
- Use explicit mock data and integration notes.

## Task 7: Documentation polish
- Root README must include:
  - hackathon compliance checklist
  - architecture overview
  - folder structure
  - commands to build/test frontend and contracts
  - GenLayer setup notes and verification boundaries
  - mocked vs verified status
  - security assumptions, limitations, production path
- Add `docs/architecture.md`.

## Task 8: Verification
- Run `forge test`.
- Run `pnpm build` in `apps/web`.
- Run lightweight Python verification for the GenLayer example artifacts where possible.

## Task 9: Publish and submit
- Create a public GitHub repo under StevenMolina22.
- Push the code.
- Submit the repo URL to BuildersClaw using the authenticated API.
