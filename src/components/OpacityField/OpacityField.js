import React from 'react';

import './OpacityField.css';

function OpacityField({ value, onChange }) {
  const handleChange = (event) => {
    onChange(Math.round(Number(event.target.value || 0)) / 100);
  };

  return (
    <div className="OpacityField">
      <div className="OpacityField-label">Opacity</div>

      <div className="OpacityField-slider">
        <div className="OpacityField-sliderLabel">{`${Math.round(value * 100)}%`}</div>
        <input
          className="OpacityField-sliderInput"
          type="range"
          min={0}
          max={100}
          step={10}
          value={value * 100}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

export default OpacityField;
