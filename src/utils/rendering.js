export const getImageDimensionsFit = (ox, oy, originW, originH, destW, destH) => {
  const w = originW >= originH ? destW : (destW / originH) * originW;
  const h = originW >= originH ? (destH / originW) * originH : destH;
  const x = ox - w / 2;
  const y = oy - h / 2;

  return {
    w,
    h,
    x,
    y,
  };
};

export const getImageDimensionsFill = (ox, oy, originW, originH, destW, destH) => {
  const w = originW >= originH ? (destW / originH) * originW : destW;
  const h = originW >= originH ? destH : (destH / originW) * originH;
  const x = ox - w / 2;
  const y = oy - h / 2;

  return {
    w,
    h,
    x,
    y,
  };
};

export const degToRad = (deg) => ((deg + 90) / 180) * Math.PI;

const inSquareLength = (t) => Math.max(Math.abs(Math.cos(t)), Math.abs(Math.sin(t)));

export const getLinearGradientVector = (angle, width, height) => {
  const rad = degToRad(angle);

  const hWidth = width / 2;
  const hHeight = height / 2;
  const x = (Math.cos(rad) * hWidth) / inSquareLength(rad);
  const y = (Math.sin(rad) * hHeight) / inSquareLength(rad);

  const x1 = x + hWidth;
  const y1 = y + hHeight;

  const x2 = -x + hWidth;
  const y2 = -y + hHeight;

  return { x1, y1, x2, y2 };
};

export const setCanvasFillStyle = (ctx, config, size) => {
  if (config.type === 'color') {
    ctx.fillStyle = config.color;
  }

  if (config.type === 'linear') {
    const { x1, y1, x2, y2 } = getLinearGradientVector(config.angle, size, size);
    const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
    gradient.addColorStop(0, config.start);
    gradient.addColorStop(1, config.stop);

    ctx.fillStyle = gradient;
  }

  if (config.type === 'radial') {
    const gradient = ctx.createRadialGradient(
      size / 2,
      size / 2,
      0,
      size / 2,
      size / 2,
      ((size / 2) * 1.4142 * config.offset) / 100
    );
    gradient.addColorStop(0, config.start);
    gradient.addColorStop(1, config.stop);

    ctx.fillStyle = gradient;
  }
};

/**
 * Draws a rounded rectangle quadratic curves
 *
 * @param {CanvasRenderingContext2D} ctx
 * @param {Number} x1 The top left x coordinate
 * @param {Number} y1 The top left y coordinate
 * @param {Number} x2 The bottom right x coordinate
 * @param {Number} y2 The bottom right y coordinate
 * @param {Number} [radius = 0] The corner radius
 */
export const fillRectRoundQuadratic = (ctx, x1, y1, x2, y2, radius = 0) => {
  let r = radius;
  if (x2 - x1 - 2 * r < 0) {
    r = (x2 - x1) / 2;
  } // ensure that the radius isn't too large for x
  if (y2 - y1 - 2 * r < 0) {
    r = (y2 - y1) / 2;
  } // ensure that the radius isn't too large for y
  ctx.beginPath();
  ctx.moveTo(x1 + r, y1);
  ctx.lineTo(x2 - r, y1);
  ctx.quadraticCurveTo(x2, y1, x2, y1 + r);
  ctx.lineTo(x2, y2 - r);
  ctx.quadraticCurveTo(x2, y2, x2 - r, y2);
  ctx.lineTo(x1 + r, y2);
  ctx.quadraticCurveTo(x1, y2, x1, y2 - r);
  ctx.lineTo(x1, y1 + r);
  ctx.quadraticCurveTo(x1, y1, x1 + r, y1);
  ctx.closePath();
  ctx.fill();
};

/**
 * Draws a rounded rectangle arcs
 *
 * @param {CanvasRenderingContext2D} ctx
 * @param {Number} x1 The top left x coordinate
 * @param {Number} y1 The top left y coordinate
 * @param {Number} x2 The bottom right x coordinate
 * @param {Number} y2 The bottom right y coordinate
 * @param {Number} [radius = 0] The corner radius
 */
export const fillRectRound = (ctx, x1, y1, x2, y2, radius = 0) => {
  const r2d = Math.PI / 180;
  let r = radius;
  if (x2 - x1 - 2 * r < 0) {
    r = (x2 - x1) / 2;
  } // ensure that the radius isn't too large for x
  if (y2 - y1 - 2 * r < 0) {
    r = (y2 - y1) / 2;
  } // ensure that the radius isn't too large for y
  ctx.beginPath();
  ctx.moveTo(x1 + r, y1);
  ctx.lineTo(x2 - r, y1);
  ctx.arc(x2 - r, y1 + r, r, r2d * 270, r2d * 360, false);
  ctx.lineTo(x2, y2 - r);
  ctx.arc(x2 - r, y2 - r, r, r2d * 0, r2d * 90, false);
  ctx.lineTo(x1 + r, y2);
  ctx.arc(x1 + r, y2 - r, r, r2d * 90, r2d * 180, false);
  ctx.lineTo(x1, y1 + r);
  ctx.arc(x1 + r, y1 + r, r, r2d * 180, r2d * 270, false);
  ctx.closePath();
  ctx.fill();
};
