import React from 'react';

function PaletteFormLinear({ onChange, value = {} }) {
  const handleChangeStart = (event) => {
    onChange({ ...value, start: event.target.value });
  };

  const handleChangeStop = (event) => {
    onChange({ ...value, stop: event.target.value });
  };

  const handleChangeAngle = (event) => {
    onChange({ ...value, angle: Number(event.target.value) });
  };

  return (
    <div className="PaletteForm-linear">
      <input className="PaletteForm-picker" type="color" value={value.start} onChange={handleChangeStart} />
      <input className="PaletteForm-picker" type="color" value={value.stop} onChange={handleChangeStop} />
      <div className="PaletteForm-slider">
        <div className="PaletteForm-sliderLabel">{`${value.angle}°`}</div>
        <input
          className="PaletteForm-sliderInput"
          type="range"
          min={0}
          max={360}
          step={15}
          value={value.angle}
          onChange={handleChangeAngle}
        />
      </div>
    </div>
  );
}

export default PaletteFormLinear;
