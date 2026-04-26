# GenLayer Resolution Layer

This folder contains a meaningful GenLayer-style intelligent resolution module for the prediction market.

Files:
- `prediction_resolver.py`: deterministic local resolver that models the contract logic.
- `examples/resolution_request.json`: example market resolution request payload.
- `examples/resolution_result_yes.json`: example structured resolution output.
- `examples/local_verification.txt`: captured output from a local verification run.

What this models:
- input question
- market deadline
- evidence sources with URL, title, excerpt, source type, reliability, stance, and timestamps
- weighted evidence scoring
- corroboration across domains
- structured output that an EVM resolver can consume

Production GenLayer interpretation:
- Wrap `PredictionMarketResolver.resolve()` in a GenLayer intelligent contract entrypoint.
- Replace static `sources` with GenLayer web fetches or caller-provided evidence bundles.
- Use GenLayer's non-deterministic execution under the equivalence principle to normalize fetched evidence.
- Return the same output shape, then pass the final outcome to the EVM market resolver.

Suggested local commands:
- `python genlayer/prediction_resolver.py genlayer/examples/resolution_request.json`
- `python -m py_compile genlayer/prediction_resolver.py`
- If GenLayer tooling is installed: `genvm-lint genlayer/prediction_resolver.py`
- If GenLayer testing is installed: `genlayer-test`

Verification boundary:
- Locally verified here: Python execution, deterministic scoring logic, example output generation, and syntax compilation.
- Conceptual/documented only: full GenVM runtime execution, Studio deployment, and live web-fetch-based equivalence testing.
