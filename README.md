# RodEye Monorepo

```
Mobile Scanner ─┐
                ├─ Shared Schemas & Tooling Catalog ── Trainer Web App
Dataset & Models ┘
```

RodEye is a dual-application system for HDD thread pitch inspection. The mobile **Scanner** captures line-laser frames, measures thread geometry, and performs on-device classification. The desktop/web **Trainer** curates datasets, trains classifiers, and ships TensorFlow Lite bundles back to the scanner.

## Getting Started

```bash
yarn install
```

### Launch the Apps

```bash
yarn mobile:dev      # Expo + React Native scanner
yarn trainer:dev     # Vite + React trainer UI
```

## Scanner Calibration & Measurement

1. Print `/mobile/calibration/checkerboard-40mm.pdf` at 100% scale.
2. Place the sheet perpendicular to the drill rod and capture a frame using **Calibrate**.
3. Laser Mode toggles red/green stripe detection; ensure proper PPE.
4. Captured scans are recorded in SQLite and can be exported (`exportScanBundle`) as `{frame.jpg, frame.meta.json}` for the Trainer.

Pitch is estimated from the laser stripe span (px → mm) and converted to threads-per-inch. Outer diameter is inferred from stripe curvature. Matches are resolved locally against `/mobile/src/data/tooling.sample.json` using shared schema types.

## Trainer Pipeline

1. Import scanner exports into `dataset/` (`yarn dataset:import <zip>`).
2. Review labels under **Label Editor**; metadata syncs with `shared/data/tooling.master.json`.
3. Run `yarn trainer:train` to append provenance artifacts in `trainer/runs/<timestamp>/`.
4. Update bundle checksums with `yarn trainer:export` (`checksum.sha256`, manifest).
5. Ship the versioned bundle to the scanner with `yarn trainer:deploy` (copies into `/mobile/assets/model/threadClassifier/`).

Metrics are visualized in the Trainer via Chart.js and stored alongside model artifacts in `trainer/models/threadClassifier/1.0.0/`.

## Dataset Layout

```
dataset/
  calibration/<device>_<timestamp>.json
  scans/<family>/<partNumber>/<scanId>/{frame.jpg, frame.meta.json, stripe.npy, mask.png}
  labels/{classes.json, mapping.json}
  catalog/tooling.master.json
```

The repo includes a demo `sample_frames.zip` bundle (5 frames with metadata) for quick imports.

## Model Bundles

Versioned TensorFlow Lite bundles live in `trainer/models/threadClassifier/<semver>/`. Each version ships with:

- `model.tflite`
- `manifest.json` (checksum, IO shape, compatibility)
- `labels.json`
- `preproc.json`
- `metrics.json`
- `checksum.sha256`
- `README.md`

The mobile app validates manifest compatibility before loading external models and falls back to the bundled baseline.

## Laser Safety

- Use Class 2/3R line lasers with caution; never view beam directly.
- Wear rated eyewear when using >1 mW emitters.
- Disable Laser Mode during calibration to avoid overexposure.

## Continuous Integration

GitHub Actions (`.github/workflows/ci.yml`) installs dependencies, lints each workspace, and runs jest/vitest suites on Node.js 20.

---

MIT licensed. Contributions welcome via PR.
