import React, { useState, useContext, useEffect, useMemo, useCallback } from 'react';

import DEFAULT_PRESET_LIST from '../defaults/presetList.json';

const getPresetList = () => {
  try {
    return JSON.parse(window.localStorage.getItem('presets')) || DEFAULT_PRESET_LIST;
  } catch (err) {
    return DEFAULT_PRESET_LIST;
  }
};

const savePresetList = (presets) => {
  window.localStorage.setItem('presets', JSON.stringify(presets));
};

const getCurrentPreset = () => {
  try {
    return JSON.parse(window.localStorage.getItem('preset')) || 'default';
  } catch (err) {
    return 'default';
  }
};

const saveCurrentPreset = (presets) => {
  window.localStorage.setItem('preset', JSON.stringify(presets));
};

const deletePreset = (presetName) => {
  window.localStorage.removeItem(`preset-${presetName}`);
};

const PresetListContext = React.createContext();

function PresetListProvider({ children }) {
  const [presets, setPresets] = useState(getPresetList());
  const [currentPreset, setCurrentPreset] = useState(getCurrentPreset());

  const removePreset = useCallback((name) => {
    setPresets((state) => state.filter((item) => item.name !== name));
    deletePreset(name);
  }, []);

  const addPreset = useCallback((name, preview) => {
    setPresets((state) => [...state, { name, preview }]);
  }, []);

  const updatePreset = useCallback(
    (name, preview) => {
      setPresets((state) =>
        state.find((preset) => preset.name === name)
          ? state.map((preset) => (preset.name === currentPreset ? { ...preset, preview } : preset), [])
          : [...state, { name, preview }]
      );
    },
    [currentPreset]
  );

  useEffect(() => {
    savePresetList(presets);
  }, [presets]);

  useEffect(() => {
    saveCurrentPreset(currentPreset);
  }, [currentPreset]);

  const value = useMemo(
    () => ({
      currentPreset,
      setCurrentPreset,
      presets,
      removePreset,
      addPreset,
      updatePreset,
    }),
    [currentPreset, presets, removePreset, addPreset]
  );

  return <PresetListContext.Provider value={value}>{children}</PresetListContext.Provider>;
}

export const usePresetList = () => {
  const context = useContext(PresetListContext);
  if (context === undefined) {
    throw new Error(`usePresetList must be used within a PresetListProvider`);
  }
  return context;
};

export default PresetListProvider;
