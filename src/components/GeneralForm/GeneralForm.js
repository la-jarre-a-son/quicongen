import React from 'react';

import './GeneralForm.css';

function GeneralForm({ size, padding, rotation, onChangeSize, onChangePadding, onChangeRotation }) {
  const handleChangeSize = (event) => {
    onChangeSize(Math.round(Number(event.target.value || 0)));
  };

  const handleChangePadding = (event) => {
    onChangePadding(Math.round(Number(event.target.value || 0)) / 100);
  };

  const handleChangeRotation = (event) => {
    onChangeRotation(Number(event.target.value || 0));
  };

  return (
    <div className="GeneralForm">
      <div className="GeneralForm-field">
        <div className="GeneralForm-fieldLabel">Size</div>
        <div className="GeneralForm-slider">
          <div className="GeneralForm-sliderLabel">{`${size}px`}</div>
          <input
            className="GeneralForm-sliderInput"
            type="range"
            min={16}
            max={1024}
            step={16}
            value={size}
            onChange={handleChangeSize}
          />
        </div>
      </div>
      <div className="GeneralForm-field">
        <div className="GeneralForm-fieldLabel">Padding</div>
        <div className="GeneralForm-slider">
          <div className="GeneralForm-sliderLabel">{`${Math.round(padding * 100)}%`}</div>
          <input
            className="GeneralForm-sliderInput"
            type="range"
            min={0}
            max={95}
            step={5}
            value={padding * 100}
            onChange={handleChangePadding}
          />
        </div>
      </div>
      <div className="GeneralForm-field">
        <div className="GeneralForm-fieldLabel">Rotate</div>
        <div className="GeneralForm-slider">
          <div className="GeneralForm-sliderLabel">{`${rotation}°`}</div>
          <input
            className="GeneralForm-sliderInput"
            type="range"
            min={0}
            max={360}
            step={15}
            value={rotation}
            onChange={handleChangeRotation}
          />
        </div>
      </div>
    </div>
  );
}

export default GeneralForm;
