import React, { useState, useContext, useEffect, useMemo, useCallback } from 'react';

const DEFAULT_PALETTE = [
  { type: 'none', id: 'none' },
  { type: 'color', id: 'color:#ffffff', color: '#ffffff' },
  { type: 'color', id: 'color:#000000', color: '#000000' },
];

export const getItemId = (item) => {
  switch (item.type) {
    case 'color':
      return `color:${item.color}`;
    case 'linear':
      return `linear:${item.angle}:${item.start}:${item.stop}`;
    case 'radial':
      return `radial:${item.offset}:${item.start}:${item.stop}`;
    default:
      return 'none';
  }
};

export const canAddItem = (items, value) => {
  const id = value.id || getItemId(value);

  if (id === 'none') return false;

  return !items.find((i) => i.id === id);
};

export const canRemoveItem = (items, value) => {
  if (!value || value.type === 'none') return false;

  return !canAddItem(items, value);
};

const getPalette = () => {
  try {
    return JSON.parse(window.localStorage.getItem('palettes')) || DEFAULT_PALETTE;
  } catch (err) {
    return DEFAULT_PALETTE;
  }
};

const savePalette = (palette) => {
  window.localStorage.setItem('palettes', JSON.stringify(palette));
};

const PaletteContext = React.createContext();

function PaletteProvider({ children }) {
  const [items, setItems] = useState(getPalette());

  const removeItem = useCallback((id) => {
    setItems((state) => state.filter((item) => item.id !== id));
  }, []);

  const addItem = useCallback((value) => {
    const item = {
      ...value,
      id: getItemId(value),
    };

    setItems((state) => [...state, item]);
  }, []);

  useEffect(() => {
    savePalette(items);
  }, [items]);

  const value = useMemo(
    () => ({
      items,
      removeItem,
      addItem,
    }),
    [items, removeItem, addItem]
  );

  return <PaletteContext.Provider value={value}>{children}</PaletteContext.Provider>;
}

export const usePalette = () => {
  const context = useContext(PaletteContext);
  if (context === undefined) {
    throw new Error(`usePalette must be used within a PaletteProvider`);
  }
  return context;
};

export default PaletteProvider;
