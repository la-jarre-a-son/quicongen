import React from 'react';

import { getItemId } from '../../contexts/PaletteContext';

import Button from '../Button';

import PaletteFormType from './PaletteFormType';
import PaletteFormColor from './PaletteFormColor';
import PaletteFormLinear from './PaletteFormLinear';
import PaletteFormRadial from './PaletteFormRadial';

import './PaletteForm.css';

function PaletteForm({ onChange, onAdd, onRemove, value = {}, canAdd, canRemove }) {
  const handleAdd = () => {
    onAdd(value);
  };

  const handleRemove = () => {
    onRemove(value.id);
  };

  const handleChange = (newValue) => {
    onChange({
      ...newValue,
      id: getItemId(newValue),
    });
  };

  const handleTypeChange = (type) => {
    if (value.type === type) return;

    if (type === 'color') {
      const item = {
        type: 'color',
        color: value.start || value.color || '#000000',
      };

      onChange({
        ...item,
        id: getItemId(item),
      });
    }

    if (type === 'linear') {
      const item = {
        type: 'linear',
        start: value.color || value.start || '#000000',
        stop: value.color || value.stop || '#ffffff',
        angle: 0,
      };

      onChange({
        ...item,
        id: getItemId(item),
      });
    }

    if (type === 'radial') {
      const item = {
        type: 'radial',
        start: value.color || value.start || '#000000',
        stop: value.color || value.stop || '#ffffff',
        offset: 100,
      };

      onChange({
        ...item,
        id: getItemId(item),
      });
    }
  };

  return (
    <div className="PaletteForm">
      <div className="PaletteForm-header">Customize</div>
      <div className="PaletteForm-content">
        <PaletteFormType value={value.type} onChange={handleTypeChange} />
        {value.type === 'color' && <PaletteFormColor value={value} onChange={handleChange} />}
        {value.type === 'linear' && <PaletteFormLinear value={value} onChange={handleChange} />}
        {value.type === 'radial' && <PaletteFormRadial value={value} onChange={handleChange} />}
        <div className="PaletteForm-footer">
          <Button className="PaletteForm-button" onClick={handleAdd} disabled={!canAdd}>
            Add to palette
          </Button>
          <Button className="PaletteForm-button" intent="danger" onClick={handleRemove} disabled={!canRemove}>
            Remove from palette
          </Button>
        </div>
      </div>
    </div>
  );
}

export default PaletteForm;
