import React from 'react';

function PaletteFormRadial({ onChange, value = {} }) {
  const handleChangeStart = (event) => {
    onChange({ ...value, start: event.target.value });
  };

  const handleChangeStop = (event) => {
    onChange({ ...value, stop: event.target.value });
  };

  const handleChangeOffset = (event) => {
    onChange({ ...value, offset: Number(event.target.value) });
  };

  return (
    <div className="PaletteForm-radial">
      <input className="PaletteForm-picker" type="color" value={value.start} onChange={handleChangeStart} />
      <input className="PaletteForm-picker" type="color" value={value.stop} onChange={handleChangeStop} />
      <div className="PaletteForm-slider">
        <div className="PaletteForm-sliderLabel">{`${value.offset}%`}</div>
        <input
          className="PaletteForm-sliderInput"
          type="range"
          min={10}
          max={150}
          step={10}
          value={value.offset}
          onChange={handleChangeOffset}
        />
      </div>
    </div>
  );
}

export default PaletteFormRadial;
