import React, { useState, useContext, useEffect, useMemo, useRef } from 'react';
import { polarToCartesian } from '../utils/angle';
import { colorHexToRGBA } from '../utils/color';

import {
  fillRectRound,
  fillRectRoundQuadratic,
  getImageDimensionsFill,
  getImageDimensionsFit,
  setCanvasFillStyle,
} from '../utils/rendering';
import useImage from '../utils/useImage';

import { useIcon } from './IconContext';
import { usePreset } from './PresetContext';
import { usePresetList } from './PresetListContext';

const RenderingContext = React.createContext();

const getFileName = (presetName, iconName) => {
  return iconName ? `${presetName}-${iconName.replace(/\.([a-z]+)$/i, '')}.png` : 'QuIconGen.png';
};

function RenderingProvider({ children }) {
  const { icon } = useIcon();
  const { currentPreset } = usePresetList();
  const { preset } = usePreset();
  const {
    size,
    padding,
    rotation,
    radius,
    radiusType,
    background,
    backgroundOpacity,
    backgroundImage,
    foreground,
    foregroundOpacity,
    shadow,
  } = preset;
  const image = useImage(icon && icon.data);

  const bgImage = useImage(backgroundImage && backgroundImage.data);

  const [dataUrl, setDataUrl] = useState(null);
  const [filename, setFilename] = useState('QuIconGen.png');

  const canvasRef = useRef(null);
  const canvasTmpRef = useRef(null);

  const drawBackgroundToTmp = () => {
    const ctx = canvasTmpRef.current.getContext('2d');
    ctx.clearRect(0, 0, size, size);

    ctx.globalAlpha = backgroundOpacity;
    ctx.globalCompositeOperation = 'source-over';

    if (background.type !== 'none') {
      setCanvasFillStyle(ctx, background, size);
      if (radiusType === 'arc') {
        fillRectRound(ctx, 0, 0, size, size, (size / 2) * radius);
      }
      if (radiusType === 'quadratic') {
        fillRectRoundQuadratic(ctx, 0, 0, size, size, (size / 2) * radius);
      }
    }
  };

  const drawForegroundToTmp = () => {
    const ctx = canvasTmpRef.current.getContext('2d');
    ctx.clearRect(0, 0, size, size);
    ctx.globalAlpha = foregroundOpacity;

    const iconSize = size - size * padding;

    if (image) {
      const { x, y, w, h } = getImageDimensionsFit(size / 2, size / 2, image.width, image.height, iconSize, iconSize);

      ctx.globalCompositeOperation = 'source-over';
      ctx.drawImage(image, x, y, w, h);

      if (foreground.type !== 'none') {
        ctx.globalCompositeOperation = 'source-in';

        setCanvasFillStyle(ctx, foreground, size);
        ctx.fillRect(0, 0, size, size);
      }
    }
  };

  const draw = () => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, size, size);

    ctx.globalCompositeOperation = 'source-over';

    if (bgImage) {
      const { x, y, w, h } = getImageDimensionsFill(size / 2, size / 2, bgImage.width, bgImage.height, size, size);

      setCanvasFillStyle(ctx, { type: 'color', color: '#000000' }, size);
      if (radiusType === 'arc') {
        fillRectRound(ctx, 0, 0, size, size, (size / 2) * radius);
      }
      if (radiusType === 'quadratic') {
        fillRectRoundQuadratic(ctx, 0, 0, size, size, (size / 2) * radius);
      }

      ctx.globalCompositeOperation = 'source-in';

      ctx.drawImage(bgImage, x, y, w, h);

      ctx.globalCompositeOperation = 'source-over';
    }

    drawBackgroundToTmp();
    ctx.drawImage(canvasTmpRef.current, 0, 0, size, size);

    const [shadowX, shadowY] = polarToCartesian(shadow.angle, shadow.distance * size);

    ctx.shadowOffsetX = shadowX;
    ctx.shadowOffsetY = shadowY;
    ctx.shadowColor = colorHexToRGBA(shadow.color, shadow.opacity);
    ctx.shadowBlur = shadow.blur * size;

    ctx.globalCompositeOperation = 'source-over';
    drawForegroundToTmp();

    ctx.save();
    ctx.translate(size / 2, size / 2);
    ctx.rotate((rotation / 180) * Math.PI);
    ctx.translate(-size / 2, -size / 2);

    ctx.drawImage(canvasTmpRef.current, 0, 0, size, size);
    ctx.restore();
  };

  useEffect(() => {
    canvasTmpRef.current = document.createElement('canvas');
    canvasRef.current = document.createElement('canvas');
  }, []);

  useEffect(() => {
    if (canvasTmpRef.current && canvasRef.current) {
      canvasRef.current.width = size;
      canvasRef.current.height = size;
      canvasTmpRef.current.width = size;
      canvasTmpRef.current.height = size;

      draw();

      setDataUrl(canvasRef.current.toDataURL());
    }
  }, [preset, image, bgImage]);

  useEffect(() => {
    setFilename(getFileName(currentPreset, icon && icon.name));
  }, [currentPreset, icon]);

  const value = useMemo(
    () => ({
      dataUrl,
      filename,
      size,
    }),
    [dataUrl, filename, size]
  );

  return <RenderingContext.Provider value={value}>{children}</RenderingContext.Provider>;
}

export const useRendering = () => {
  const context = useContext(RenderingContext);
  if (context === undefined) {
    throw new Error(`useRendering must be used within a RenderingProvider`);
  }
  return context;
};

export default RenderingProvider;
