import React from 'react';

import { usePreset } from '../../contexts/PresetContext';
import { usePalette, canAddItem, canRemoveItem } from '../../contexts/PaletteContext';

import { Menu, MenuSection } from '../Menu';
import PaletteForm from '../PaletteForm';
import PaletteList from '../PaletteList';
import FilePicker from '../FilePicker';
import Button from '../Button';
import { useRendering } from '../../contexts/RenderingContext';
import GeneralForm from '../GeneralForm';

function ConfigMenu({ className }) {
  const { dataUrl } = useRendering();
  const { items, removeItem, addItem } = usePalette();
  const { unsaved, currentPreset, preset, setBackground, setBackgroundImage, setForeground, save } = usePreset();
  const { background, backgroundImage, foreground } = preset;

  const handleSavePreset = () => {
    const name = prompt('Preset Name ?', currentPreset); // eslint-disable-line

    if (name) {
      save(name, dataUrl);
    }
  };

  return (
    <Menu
      className={className}
      title="Settings"
      footer={
        <Button className="ConfigMenu-button" intent="success" onClick={handleSavePreset} disabled={!unsaved}>
          Save Preset
        </Button>
      }
    >
      <Button className="ConfigMenu-button" intent="success" onClick={handleSavePreset} disabled={!unsaved}>
        Save Preset
      </Button>
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

      <MenuSection title="Background Image">
        <FilePicker value={backgroundImage} onChange={setBackgroundImage} removeable />
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
