import React, { useState, useContext, useEffect, useMemo, useCallback } from 'react';
import { usePresetList } from './PresetListContext';

import DEFAULT_PRESET from '../defaults/preset.json';

const readPreset = (presetName) => {
  try {
    return { ...DEFAULT_PRESET, ...JSON.parse(window.localStorage.getItem(`preset-${presetName}`)) };
  } catch (err) {
    return { ...DEFAULT_PRESET };
  }
};

const writePreset = (presetName, preset) => {
  window.localStorage.setItem(`preset-${presetName}`, JSON.stringify(preset));
};

const PresetContext = React.createContext();

function PresetProvider({ children }) {
  const { currentPreset, savePreset, setCurrentPreset } = usePresetList();
  const [preset, setPreset] = useState(readPreset(currentPreset));
  const [unsaved, setUnsaved] = useState(false);

  const updatePreset = useCallback((p) => {
    setPreset(p);
    setUnsaved(true);
  }, []);

  const setBackground = useCallback((background) => {
    updatePreset((state) => ({ ...state, background }));
  }, []);

  const setBackgroundOpacity = useCallback((backgroundOpacity) => {
    updatePreset((state) => ({ ...state, backgroundOpacity }));
  }, []);

  const setBackgroundImage = useCallback((name, data) => {
    if (name === null) {
      updatePreset((state) => ({ ...state, backgroundImage: null }));
    } else {
      updatePreset((state) => ({ ...state, backgroundImage: { name, data } }));
    }
  }, []);

  const setForeground = useCallback((foreground) => {
    updatePreset((state) => ({ ...state, foreground }));
  }, []);

  const setForegroundOpacity = useCallback((foregroundOpacity) => {
    updatePreset((state) => ({ ...state, foregroundOpacity }));
  }, []);

  const setSize = useCallback((size) => {
    updatePreset((state) => ({ ...state, size: Math.max(0, Math.min(1024, size)) }));
  }, []);

  const setPadding = useCallback((padding) => {
    updatePreset((state) => ({ ...state, padding }));
  }, []);

  const setRotation = useCallback((rotation) => {
    updatePreset((state) => ({ ...state, rotation }));
  }, []);

  const setRadiusType = useCallback((radiusType) => {
    updatePreset((state) => ({ ...state, radiusType }));
  }, []);

  const setRadius = useCallback((radius) => {
    updatePreset((state) => ({ ...state, radius }));
  }, []);

  const setShadow = useCallback((shadow) => {
    updatePreset((state) => ({ ...state, shadow }));
  }, []);

  const save = useCallback(
    (name, preview) => {
      savePreset(name, preview);
      writePreset(name, preset);
      setCurrentPreset(name);
      setUnsaved(false);
    },
    [currentPreset, preset]
  );

  useEffect(() => {
    setPreset(readPreset(currentPreset));
    setUnsaved(false);
  }, [currentPreset]);

  const value = useMemo(
    () => ({
      currentPreset,
      unsaved,
      preset,
      setBackground,
      setBackgroundImage,
      setBackgroundOpacity,
      setForeground,
      setForegroundOpacity,
      setSize,
      setPadding,
      setRotation,
      setRadiusType,
      setRadius,
      setShadow,
      save,
    }),
    [currentPreset, unsaved, preset]
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
