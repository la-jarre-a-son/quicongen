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
import ShadowForm from '../ShadowForm';
import OpacityField from '../OpacityField';

function ConfigMenu({ className }) {
  const { dataUrl } = useRendering();
  const { items, removeItem, addItem } = usePalette();
  const {
    unsaved,
    currentPreset,
    preset,
    setBackground,
    setBackgroundOpacity,
    setBackgroundImage,
    setForeground,
    setForegroundOpacity,
    setShadow,
    save,
  } = usePreset();
  const { background, backgroundOpacity, backgroundImage, foreground, foregroundOpacity, shadow } = preset;

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
        <OpacityField value={backgroundOpacity} onChange={setBackgroundOpacity} />
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
        <OpacityField value={foregroundOpacity} onChange={setForegroundOpacity} />
      </MenuSection>

      <MenuSection title="Icon Shadow">
        <ShadowForm shadow={shadow} onChange={setShadow} />
      </MenuSection>
    </Menu>
  );
}

export default ConfigMenu;
