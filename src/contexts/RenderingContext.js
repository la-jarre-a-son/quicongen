import React, { useState, useContext, useEffect, useMemo, useRef } from 'react';

import { fillRectRound, fillRectRoundQuadratic, getImageDimensions, setCanvasFillStyle } from '../utils/rendering';
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
  const { size, padding, rotation, radius, radiusType, background, foreground } = preset;
  const image = useImage(icon && icon.data);

  const [dataUrl, setDataUrl] = useState(null);
  const [filename, setFilename] = useState('QuIconGen.png');

  const cBackgroundRef = useRef(null);
  const cForegroundRef = useRef(null);

  const drawBackground = () => {
    const ctx = cBackgroundRef.current.getContext('2d');

    ctx.clearRect(0, 0, size, size);

    if (background.type !== 'none') {
      setCanvasFillStyle(ctx, background, size);
      if (radiusType === 'arc') {
        fillRectRound(ctx, 0, 0, size, size, (size / 2) * radius);
      }
      if (radiusType === 'quadratic') {
        fillRectRoundQuadratic(ctx, 0, 0, size, size, (size / 2) * radius);
      }
    }

    ctx.globalCompositeOperation = 'source-over';

    ctx.save();
    ctx.translate(size / 2, size / 2);
    ctx.rotate((rotation / 180) * Math.PI);
    ctx.translate(-size / 2, -size / 2);
    ctx.drawImage(cForegroundRef.current, 0, 0, size, size);
    ctx.restore();
  };

  const drawForeground = () => {
    const iconSize = size - size * padding;

    const ctx = cForegroundRef.current.getContext('2d');

    if (image) {
      const { x, y, w, h } = getImageDimensions(size / 2, size / 2, image.width, image.height, iconSize, iconSize);

      ctx.globalCompositeOperation = 'copy';
      ctx.drawImage(image, x, y, w, h);

      if (foreground.type !== 'none') {
        ctx.globalCompositeOperation = 'source-in';

        setCanvasFillStyle(ctx, foreground, size);
        ctx.fillRect(0, 0, size, size);
      }
    }
  };

  useEffect(() => {
    cForegroundRef.current = document.createElement('canvas');
    cBackgroundRef.current = document.createElement('canvas');
  }, []);

  useEffect(() => {
    if (cForegroundRef.current && cBackgroundRef.current) {
      cBackgroundRef.current.width = size;
      cBackgroundRef.current.height = size;
      cForegroundRef.current.width = size;
      cForegroundRef.current.height = size;

      drawForeground();
      drawBackground();

      setDataUrl(cBackgroundRef.current.toDataURL());
    }
  }, [preset, image]);

  useEffect(() => {
    setFilename(getFileName(currentPreset, icon && icon.name));
  }, [currentPreset, icon]);

  const value = useMemo(
    () => ({
      dataUrl,
      filename,
    }),
    [dataUrl, filename]
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
