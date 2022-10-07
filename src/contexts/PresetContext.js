import React, { useState, useContext, useEffect, useMemo, useCallback } from 'react';
import { usePresetList } from './PresetListContext';

import DEFAULT_PRESET from '../defaults/preset.json';

const getPreset = (presetName) => {
  try {
    return { ...DEFAULT_PRESET, ...JSON.parse(window.localStorage.getItem(`preset-${presetName}`)) };
  } catch (err) {
    return { ...DEFAULT_PRESET };
  }
};

const savePreset = (presetName, preset) => {
  window.localStorage.setItem(`preset-${presetName}`, JSON.stringify(preset));
};

const PresetContext = React.createContext();

function PresetProvider({ children }) {
  const { currentPreset, updatePreset, addPreset, setCurrentPreset } = usePresetList();
  const [preset, setPreset] = useState(getPreset(currentPreset));

  const setBackground = useCallback((background) => {
    setPreset((state) => ({ ...state, background }));
  }, []);

  const setForeground = useCallback((foreground) => {
    setPreset((state) => ({ ...state, foreground }));
  }, []);

  const setSize = useCallback((size) => {
    setPreset((state) => ({ ...state, size: Math.max(0, Math.min(1024, size)) }));
  }, []);

  const setPadding = useCallback((padding) => {
    setPreset((state) => ({ ...state, padding }));
  }, []);

  const setRotation = useCallback((rotation) => {
    setPreset((state) => ({ ...state, rotation }));
  }, []);

  const setRadiusType = useCallback((radiusType) => {
    setPreset((state) => ({ ...state, radiusType }));
  }, []);

  const setRadius = useCallback((radius) => {
    setPreset((state) => ({ ...state, radius }));
  }, []);

  const save = useCallback(
    (preview) => {
      updatePreset(currentPreset, preview);
      savePreset(currentPreset, preset);
    },
    [currentPreset, preset]
  );

  const add = useCallback(
    (name, preview) => {
      savePreset(name, preset);
      addPreset(name, preview);
      setCurrentPreset(name);
    },
    [preset]
  );

  useEffect(() => {
    setPreset(getPreset(currentPreset));
  }, [currentPreset]);

  const value = useMemo(
    () => ({
      preset,
      setBackground,
      setForeground,
      setSize,
      setPadding,
      setRotation,
      setRadiusType,
      setRadius,
      save,
      add,
    }),
    [preset, setBackground]
  );

  return <PresetContext.Provider value={value}>{children}</PresetContext.Provider>;
}

export const usePreset = () => {
  const context = useContext(PresetContext);
  if (context === undefined) {
    throw new Error(`usePreset must be used within a PresetProvider`);
  }
  return context;
};

export default PresetProvider;
