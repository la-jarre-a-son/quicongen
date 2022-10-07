import React from 'react';

import { usePresetList } from '../../contexts/PresetListContext';
import { useIcon } from '../../contexts/IconContext';

import { Menu, MenuSection } from '../Menu';
import FilePicker from '../FilePicker';
import PresetList from '../PresetList/PresetList';
import Button from '../Button';
import { usePreset } from '../../contexts/PresetContext';

function PresetMenu({ className }) {
  const { icon, setIcon } = useIcon();
  const { presets, currentPreset, setCurrentPreset, removePreset } = usePresetList();
  const { unsaved } = usePreset();

  const handleSelect = (preset) => {
    if (unsaved) {
      // eslint-disable-next-line no-restricted-globals, no-alert
      const shouldDiscardChanges = confirm(
        'You have unsaved changes to the current preset.\nDo you want to discard changes ?'
      );
      if (!shouldDiscardChanges) return;
    }
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
