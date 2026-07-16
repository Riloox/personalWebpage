export const BOARD_WIDTH = 2400;
export const BOARD_HEIGHT = 1350;
export const MIN_SCALE = 1;
export const MAX_SCALE = 2.6;

export type PanelId =
  | 'identity' | 'falta-uno' | 'experience' | 'freecam'
  | 'cleta' | 'skills' | 'education' | 'github' | 'contact';

export interface PanelRect { x: number; y: number; width: number; height: number }
export interface PanelDefinition extends PanelRect { id: PanelId; coordinate: string }
export interface Viewport { width: number; height: number }
export interface CameraState { x: number; y: number; scale: number; focusedPanel: PanelId | null }

const GAP = 14;
const PAD = 22;
const CELL_W = (BOARD_WIDTH - PAD * 2 - GAP * 11) / 12;
const CELL_H = (BOARD_HEIGHT - PAD * 2 - GAP * 7) / 8;

const panel = (id: PanelId, col: number, row: number, cols: number, rows: number): PanelDefinition => ({
  id,
  coordinate: `${String(col).padStart(2, '0')}.${String(row).padStart(2, '0')}`,
  x: PAD + (col - 1) * (CELL_W + GAP),
  y: PAD + (row - 1) * (CELL_H + GAP),
  width: cols * CELL_W + (cols - 1) * GAP,
  height: rows * CELL_H + (rows - 1) * GAP,
});

export const PANELS: PanelDefinition[] = [
  panel('identity', 1, 1, 5, 3), panel('falta-uno', 6, 1, 5, 4),
  panel('experience', 1, 4, 3, 2),
  panel('freecam', 4, 4, 2, 2), panel('cleta', 1, 6, 5, 3),
  panel('skills', 6, 5, 3, 4), panel('education', 9, 5, 2, 4),
  panel('github', 11, 1, 2, 6), panel('contact', 11, 7, 2, 2),
];

export const fittedScale = (viewport: Viewport) => {
  if (viewport.width <= 0 || viewport.height <= 0) return 0;
  return Math.min(viewport.width / BOARD_WIDTH, viewport.height / BOARD_HEIGHT);
};

export const resetCamera = (): CameraState => ({ x: 0, y: 0, scale: 1, focusedPanel: null });
export const clampScale = (scale: number) => Math.min(MAX_SCALE, Math.max(MIN_SCALE, Number.isFinite(scale) ? scale : 1));

export const clampCamera = (camera: CameraState, viewport: Viewport): CameraState => {
  const fit = fittedScale(viewport);
  if (!fit) return resetCamera();
  const scaledW = BOARD_WIDTH * fit * camera.scale;
  const scaledH = BOARD_HEIGHT * fit * camera.scale;
  const limitX = Math.max(0, (scaledW - viewport.width) / 2);
  const limitY = Math.max(0, (scaledH - viewport.height) / 2);
  return { ...camera, scale: clampScale(camera.scale), x: Math.min(limitX, Math.max(-limitX, camera.x)), y: Math.min(limitY, Math.max(-limitY, camera.y)) };
};

export const zoomAtPointer = (camera: CameraState, nextScale: number, pointer: { x: number; y: number }, viewport: Viewport) => {
  const scale = clampScale(nextScale);
  const ratio = scale / camera.scale;
  const cx = viewport.width / 2;
  const cy = viewport.height / 2;
  return clampCamera({ x: pointer.x - cx - (pointer.x - cx - camera.x) * ratio, y: pointer.y - cy - (pointer.y - cy - camera.y) * ratio, scale, focusedPanel: null }, viewport);
};

export const fitPanel = (rect: PanelRect, viewport: Viewport, margin = 64): CameraState => {
  const fit = fittedScale(viewport);
  if (!fit || rect.width <= 0 || rect.height <= 0) return resetCamera();
  const scale = clampScale(Math.min((viewport.width - margin * 2) / (rect.width * fit), (viewport.height - margin * 2) / (rect.height * fit)));
  const x = (BOARD_WIDTH / 2 - (rect.x + rect.width / 2)) * fit * scale;
  const y = (BOARD_HEIGHT / 2 - (rect.y + rect.height / 2)) * fit * scale;
  return clampCamera({ x, y, scale, focusedPanel: null }, viewport);
};
