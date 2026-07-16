import { describe, expect, it } from 'vitest';
import { BOARD_HEIGHT, BOARD_WIDTH, clampCamera, clampScale, fitPanel, fittedScale, resetCamera, zoomAtPointer } from './board';

const viewport = { width: 1920, height: 1080 };
describe('camera math', () => {
  it('contains the entire board at reset', () => expect(fittedScale(viewport)).toBe(0.8));
  it('handles invalid viewports', () => expect(fittedScale({ width: 0, height: 100 })).toBe(0));
  it('clamps scale', () => { expect(clampScale(-2)).toBe(1); expect(clampScale(9)).toBe(2.6); });
  it('resets deterministically', () => expect(resetCamera()).toEqual({ x: 0, y: 0, scale: 1, focusedPanel: null }));
  it('keeps the pointer anchor stable while zooming', () => {
    const next = zoomAtPointer(resetCamera(), 2, { x: 1400, y: 700 }, viewport);
    expect(next.scale).toBe(2); expect(next.x).toBe(-440); expect(next.y).toBe(-160);
  });
  it('clamps excessive panning', () => {
    const result = clampCamera({ x: 9999, y: -9999, scale: 2, focusedPanel: null }, viewport);
    expect(result.x).toBe(960); expect(result.y).toBe(-540);
  });
  it('fits a panel and respects scale bounds', () => {
    const result = fitPanel({ x: 0, y: 0, width: BOARD_WIDTH / 2, height: BOARD_HEIGHT / 2 }, viewport);
    expect(result.scale).toBeGreaterThan(1); expect(result.scale).toBeLessThanOrEqual(2.6);
  });
});
