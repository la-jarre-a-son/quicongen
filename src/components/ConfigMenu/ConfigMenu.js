import React, { Fragment } from 'react';

import { usePreset } from '../../contexts/PresetContext';
import { usePalette, canAddItem, canRemoveItem } from '../../contexts/PaletteContext';

import { Menu, MenuSection } from '../Menu';
import PaletteForm from '../PaletteForm';
import PaletteList from '../PaletteList';
import Button from '../Button';
import { useRendering } from '../../contexts/RenderingContext';
import GeneralForm from '../GeneralForm';

function ConfigMenu({ className }) {
  const { dataUrl } = useRendering();
  const { items, removeItem, addItem } = usePalette();
  const { preset, setBackground, setForeground, save, add } = usePreset();
  const { background, foreground } = preset;

  const handleSavePreset = () => {
    save(dataUrl);
  };

  const handleAddPreset = () => {
    const name = prompt('Preset Name ?'); // eslint-disable-line

    if (name) {
      add(name, dataUrl);
    }
  };

  return (
    <Menu
      className={className}
      title="Settings"
      footer={
        <Fragment>
          <Button className="ConfigMenu-button" intent="success" onClick={handleSavePreset}>
            Save Preset
          </Button>
          <Button className="ConfigMenu-button" onClick={handleAddPreset}>
            Add Preset
          </Button>
        </Fragment>
      }
    >
      <MenuSection title="General">
        <GeneralForm />
      </MenuSection>
      <MenuSection title="Background">
        <PaletteList items={items} value={background} onSelect={setBackground} />
        <PaletteForm
          value={background}
          onAdd={addItem}
          onRemove={removeItem}
          onChange={setBackground}
          canAdd={canAddItem(items, background)}
          canRemove={canRemoveItem(items, background)}
        />
      </MenuSection>

      <MenuSection title="Foreground">
        <PaletteList items={items} value={foreground} onSelect={setForeground} />
        <PaletteForm
          value={foreground}
          onAdd={addItem}
          onRemove={removeItem}
          onChange={setForeground}
          canAdd={canAddItem(items, foreground)}
          canRemove={canRemoveItem(items, foreground)}
        />
      </MenuSection>
    </Menu>
  );
}

export default ConfigMenu;
