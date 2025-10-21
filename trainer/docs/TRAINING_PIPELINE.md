# Training Pipeline

1. Import scan bundles using `yarn dataset:import` from the repository root.
2. Curate and relabel samples in the Trainer UI under **Label Editor**.
3. Produce augmented batches and train via `npm run train`.
4. Update checksum and metadata with `npm run export`.
5. Deploy the versioned bundle to the mobile app with `npm run deploy` or push to Supabase.

Each run adds provenance artifacts in `trainer/runs/<timestamp>/` for traceability.
