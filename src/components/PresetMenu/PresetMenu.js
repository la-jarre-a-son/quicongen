import React from 'react';

import { usePresetList } from '../../contexts/PresetListContext';
import { useIcon } from '../../contexts/IconContext';

import { Menu, MenuSection } from '../Menu';
import FilePicker from '../FilePicker';
import PresetList from '../PresetList/PresetList';
import Button from '../Button';

function PresetMenu({ className }) {
  const { icon, setIcon } = useIcon();
  const { presets, currentPreset, setCurrentPreset, removePreset } = usePresetList();

  const handleSelect = (preset) => {
    setCurrentPreset(preset.name);
  };

  const handleRemove = () => {
    removePreset(currentPreset);
  };

  return (
    <Menu className={className} title="Generate">
      <MenuSection title="Presets">
        <PresetList items={presets} value={currentPreset} onSelect={handleSelect} />
        <Button className="PresetMenu-button" intent="danger" onClick={handleRemove} disabled={presets.length <= 1}>
          Remove preset
        </Button>
      </MenuSection>
      <MenuSection title="Icon">
        <FilePicker value={icon} onChange={setIcon} />
      </MenuSection>
    </Menu>
  );
}

export default PresetMenu;
