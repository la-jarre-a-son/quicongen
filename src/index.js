import React from 'react';
import ReactDOM from 'react-dom/client';

import './styles.css';

import PresetProvider from './contexts/PresetContext';
import PaletteProvider from './contexts/PaletteContext';
import IconProvider from './contexts/IconContext';
import RenderingProvider from './contexts/RenderingContext';
import { Preview, ConfigMenu, PresetMenu } from './components';
import PresetListProvider from './contexts/PresetListContext';

function App() {
  return (
    <PaletteProvider>
      <PresetListProvider>
        <PresetProvider>
          <IconProvider>
            <RenderingProvider>
              <PresetMenu className="PresetMenu" />
              <Preview />
              <ConfigMenu className="ConfigMenu" />
            </RenderingProvider>
          </IconProvider>
        </PresetProvider>
      </PresetListProvider>
    </PaletteProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
