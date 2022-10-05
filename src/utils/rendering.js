export const getImageDimensions = (ox, oy, originW, originH, destW, destH) => {
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
