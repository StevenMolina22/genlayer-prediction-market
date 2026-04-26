# GenLayer Prediction Market

A hackathon-ready monorepo for BuildersClaw’s “Build a GenLayer Prediction Market App”.

This repo ships three clearly separated layers:
- apps/web: a Next.js frontend that walks judges through create → trade → resolve → claim
- contracts: a Foundry-based Solidity prediction market contract with passing tests
- genlayer: a meaningful resolution layer that models how GenLayer would evaluate evidence and produce a structured verdict

The product demo question is intentionally simple:
“Will GenLayer launch a public mainnet before October 1, 2026?”

The repo is optimized for quick judging:
- easy to understand in under two minutes
- locally verifiable where practical
- explicit about what is mocked versus what is implemented
- simple financial logic over fancy-but-fragile architecture

## Hackathon compliance checklist

- [x] Public-repo-ready monorepo structure
- [x] Next.js frontend included under apps/web
- [x] GenLayer intelligent contract/source included under genlayer
- [x] EVM Solidity contract using Foundry included under contracts
- [x] Prediction market flow included: create, take YES/NO positions, resolve, claim
- [x] Foundry tests pass locally
- [x] Next.js production build passes locally
- [x] GenLayer resolution source returns structured outcome data
- [x] README documents architecture, setup, mocks, and verification boundaries
- [ ] Public GitHub URL to be added at submission time
- [ ] Full live GenLayer runtime execution in Studio / local GenVM environment

## Live brief notes used for this build

The live BuildersClaw hackathon details and contract metadata were fetched before implementation.

Key discovered constraints:
- hackathon title: Build a GenLayer Prediction Market App
- required submission: public GitHub repository URL
- required stack: Next.js frontend, GenLayer intelligent contract/source, EVM Solidity contract using Foundry
- judging weights emphasize brief compliance, contract correctness, meaningful GenLayer usage, local verifiability, and README clarity
- chain metadata for the hackathon itself is BNB Smart Chain Mainnet (chain ID 56)
- BuildersClaw contract-backed join escrow: 0xeAC136bcA404664685D5Be5045A4873b61348Fe5

Key discovered GenLayer notes:
- GenLayer docs recommend Python 3.12+, Node 18+, and optional Docker for full Studio-local workflows
- `genvm-lint` and `genlayer-test` are the main local validation tools in the GenLayer docs
- web access and equivalence-principle-safe non-determinism are core GenLayer concepts
- skills.genlayer.com highlights linting, direct tests, integration tests, and CLI / Studio workflows

## Architecture overview

### 1) Frontend: apps/web
The frontend is a judge-friendly mock UI that shows:
- market list / home page
- create market page
- market detail page
- YES/NO position panel
- resolution panel
- claim / refund panel

It is intentionally static and mocked, but the copy maps directly to real contract integration points.

### 2) EVM settlement layer: contracts
The Solidity contract is a simple parimutuel market:
- creator opens a market with question, deadline, and resolver
- users stake ETH on YES or NO
- staking closes at deadline
- resolver finalizes outcome as YES, NO, or INVALID
- winners claim proportional payouts from the total pool
- INVALID returns each user’s original stake
- double claims are prevented

### 3) GenLayer resolution layer: genlayer
The GenLayer module models the intelligent decision step:
- takes a question, deadline, and evidence bundle
- scores evidence by reliability, directness, source class, and timing
- checks corroboration across domains
- returns structured resolution output:
  - outcome
  - confidence
  - reasoning
  - evidence_summary
  - resolved_at

See docs/architecture.md for the full flow.

## Folder structure

```text
.
├── README.md
├── apps/
│   └── web/
│       ├── app/
│       ├── components/
│       ├── lib/
│       ├── package.json
│       └── pnpm-lock.yaml
├── contracts/
│   ├── foundry.toml
│   ├── src/
│   │   └── PredictionMarket.sol
│   ├── test/
│   │   └── PredictionMarket.t.sol
│   └── lib/
├── docs/
│   ├── architecture.md
│   └── plans/
└── genlayer/
    ├── README.md
    ├── prediction_resolver.py
    └── examples/
        ├── resolution_request.json
        ├── resolution_result_yes.json
        └── local_verification.txt
```

## Prediction market flow

1. Create market
   - user defines a question, deadline, and resolver
2. Take positions
   - traders stake on YES or NO before the deadline
3. Resolve market
   - GenLayer evaluates evidence and decides YES, NO, or INVALID
4. Finalize on EVM
   - resolver / relay posts the final outcome to the settlement contract
5. Claim
   - winners claim proportional payout, or everyone refunds if INVALID

## GenLayer resolution flow

The included resolver is intentionally meaningful, not a placeholder.

Input:
- question
- deadline
- sources[]
- optional market_id
- optional evidence_notes

Each source can include:
- url
- title
- excerpt
- published_at
- source_type
- reliability_hint
- stance
- notes

Resolver behavior:
- infers or consumes the source stance
- scores evidence quality
- rewards corroboration across independent domains
- downgrades weak / speculative / low-quality evidence
- returns INVALID when evidence is too thin or too conflicted

Output:
- outcome: YES | NO | INVALID
- confidence
- reasoning
- evidence_summary
- resolved_at
- scored_evidence

## EVM contract design

The contract in contracts/src/PredictionMarket.sol is intentionally small and auditable.

Implemented behavior:
- createMarket(question, deadline, resolver)
- placePosition(marketId, YES/NO) payable
- resolveMarket(marketId, outcome)
- claim(marketId)
- getMarket(...)
- getPosition(...)

Events:
- MarketCreated
- PositionPlaced
- MarketResolved
- Claimed

Important safety / correctness rules:
- staking is blocked after deadline
- staking is blocked after resolution
- users cannot flip sides inside the same market
- losing positions cannot claim winning payouts
- double claims revert
- INVALID refunds original stake

Payout math:
- YES win payout = userYesStake * totalPool / totalYesStake
- NO win payout = userNoStake * totalPool / totalNoStake
- INVALID payout = original stake

## Setup commands

### Frontend

```bash
cd apps/web
pnpm install
pnpm build
pnpm dev
```

### Foundry

```bash
cd contracts
forge build
forge test
```

### GenLayer / local resolver

Locally runnable in this repo:

```bash
python3 genlayer/prediction_resolver.py genlayer/examples/resolution_request.json
python3 -m py_compile genlayer/prediction_resolver.py
```

If you have GenLayer tooling installed in your environment, the intended next checks are:

```bash
genvm-lint genlayer/prediction_resolver.py
genlayer-test
```

## What is mocked

Explicitly mocked in this hackathon repo:
- frontend wallet connection and live onchain writes
- frontend live reads from deployed contracts
- live GenLayer web-fetch execution inside an actual GenVM runtime
- relay / bridge transaction that posts the GenLayer result onchain
- persistence layer for detailsURI / evidence artifact hosting

The frontend is a polished mock walkthrough, not a deployed trading app.

## What is locally verified

Verified locally in this environment:
- forge test passes
- next build passes in apps/web
- python resolver executes successfully against the example request
- python bytecode compilation succeeds for the resolver

Verification evidence:
- Solidity: 8 passing Foundry tests
- Frontend: successful production Next.js build with static routes
- GenLayer modeling: example structured YES outcome produced from included sample evidence

Not fully verified locally here:
- real GenLayer Studio deployment
- live genvm-lint / genlayer-test execution
- deployed onchain settlement flow between GenLayer and the EVM contract
- deployed frontend-to-contract wiring

## Security assumptions

- the market resolver role is trusted to post the final outcome on the EVM contract
- market questions are objective enough to evaluate from public evidence
- in production, the full GenLayer result would be content-addressed and hashed before relay
- only minimal hot-wallet funds should be used for autonomous agent participation
- production deployment should gate resolution through an authorized relay / resolver policy

## Known limitations

- the frontend is mocked and does not submit live transactions
- the Solidity contract uses native ETH staking for simplicity instead of an ERC20 quote asset
- the included GenLayer resolver is locally executable Python that models contract behavior, not a fully deployed GenLayer runtime package
- production evidence fetching, disputes, appeals, and offchain artifact storage are documented but not fully implemented
- there is no production wallet auth / market-creation persistence layer yet

## Future production steps

1. wrap the resolver logic in a real GenLayer contract entrypoint using web access and equivalence-principle-safe nondeterminism
2. add a dedicated EVM resolver / relay contract interface with evidence hash storage
3. wire the Next.js app to live reads and writes using a wallet client
4. store full resolution artifacts on IPFS / Arweave and relay only compact settlement payloads onchain
5. add CI for forge test, next build, and GenLayer lint/test commands
6. add dispute / appeal handling for contested resolutions

## Why this repo is strong for judging

- simple enough to inspect quickly
- complete enough to demonstrate the full product flow
- Solidity logic is real and tested
- GenLayer usage has a meaningful role in resolution, not just a placeholder folder
- README is explicit about what works locally and what remains conceptual
