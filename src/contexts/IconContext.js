import React, { useState, useContext, useEffect, useMemo, useCallback } from 'react';

const readIcon = () => {
  try {
    return JSON.parse(window.localStorage.getItem(`icon`));
  } catch (err) {
    return null;
  }
};

const writeIcon = (icon) => {
  window.localStorage.setItem(`icon`, JSON.stringify(icon));
};

const IconContext = React.createContext();

function IconProvider({ children }) {
  const [icon, _setIcon] = useState(readIcon());

  useEffect(() => {
    writeIcon(icon);
  }, [icon]);

  const setIcon = useCallback((name, data) => {
    if (name === null) {
      _setIcon(null);
    } else {
      _setIcon({ name, data });
    }
  }, []);

  const value = useMemo(
    () => ({
      icon,
      setIcon,
    }),
    [icon]
  );

  return <IconContext.Provider value={value}>{children}</IconContext.Provider>;
}

export const useIcon = () => {
  const context = useContext(IconContext);
  if (context === undefined) {
    throw new Error(`useIcon must be used within a IconProvider`);
  }
  return context;
};

export default IconProvider;
