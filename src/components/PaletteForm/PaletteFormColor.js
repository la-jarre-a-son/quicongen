import React from 'react';

function PaletteFormColor({ onChange, value = {} }) {
  const handleChangeColor = (event) => {
    onChange({ ...value, color: event.target.value });
  };

  return (
    <div className="PaletteForm-color">
      <input className="PaletteForm-picker" type="color" value={value.color} onChange={handleChangeColor} />
    </div>
  );
}

export default PaletteFormColor;
