export interface CalibrationInput {
  checkerboardCellMM: number;
  horizontalCells: number;
  verticalCells: number;
  pixelWidth: number;
  pixelHeight: number;
}

export interface CalibrationResult {
  pxPerMM: number;
  focalPx: number;
  timestamp: string;
}

const DEFAULT_FOCAL_PX = 1200;

export function computeCalibration(
  image: CalibrationInput
): CalibrationResult {
  const physicalWidth =
    image.checkerboardCellMM * (image.horizontalCells - 1);
  const physicalHeight =
    image.checkerboardCellMM * (image.verticalCells - 1);

  const pxPerMMWidth = image.pixelWidth / physicalWidth;
  const pxPerMMHeight = image.pixelHeight / physicalHeight;
  const pxPerMM = (pxPerMMWidth + pxPerMMHeight) / 2;

  return {
    pxPerMM,
    focalPx: DEFAULT_FOCAL_PX * (pxPerMM / 7.5),
    timestamp: new Date().toISOString()
  };
}

export function mergeCalibrations(
  history: CalibrationResult[],
  next: CalibrationResult
): CalibrationResult {
  if (history.length === 0) {
    return next;
  }

  const pxPerMMAverage =
    (history.reduce((acc, item) => acc + item.pxPerMM, 0) + next.pxPerMM) /
    (history.length + 1);
  const focalAverage =
    (history.reduce((acc, item) => acc + item.focalPx, 0) + next.focalPx) /
    (history.length + 1);

  return {
    pxPerMM: pxPerMMAverage,
    focalPx: focalAverage,
    timestamp: next.timestamp
  };
}
