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

  const handleSwap = () => [onChange({ ...value, start: value.stop, stop: value.start })];

  return (
    <div className="PaletteForm-linear">
      <input className="PaletteForm-picker" type="color" value={value.start} onChange={handleChangeStart} />
      <button type="button" className="PaletteForm-swap" onClick={handleSwap}>
        ⇄
      </button>
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
