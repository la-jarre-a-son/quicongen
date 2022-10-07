import React from 'react';

import ShadowFormField from './ShadowFormField';

import './ShadowForm.css';

function ShadowForm({ shadow, onChange }) {
  const handleChangeColor = (event) => {
    onChange({ ...shadow, color: event.target.value });
  };

  const handleChangeOpacity = (event) => {
    onChange({ ...shadow, opacity: Math.round(Number(event.target.value || 0)) / 100 });
  };

  const handleChangeBlur = (event) => {
    onChange({ ...shadow, blur: Number(event.target.value || 0) / 100 });
  };

  const handleChangeDistance = (event) => {
    onChange({ ...shadow, distance: Number(event.target.value || 0) / 100 });
  };

  const handleChangeAngle = (event) => {
    onChange({ ...shadow, angle: Math.round(Number(event.target.value)) });
  };

  return (
    <div className="ShadowForm">
      <ShadowFormField title="Color">
        <input className="ShadowForm-picker" type="color" value={shadow.color} onChange={handleChangeColor} />
      </ShadowFormField>
      <ShadowFormField title="Opacity">
        <div className="ShadowForm-slider">
          <div className="ShadowForm-sliderLabel">{`${Math.round(shadow.opacity * 100)}%`}</div>
          <input
            className="ShadowForm-sliderInput"
            type="range"
            min={0}
            max={100}
            step={10}
            value={shadow.opacity * 100}
            onChange={handleChangeOpacity}
          />
        </div>
      </ShadowFormField>
      <ShadowFormField title="Blur">
        <div className="ShadowForm-slider">
          <div className="ShadowForm-sliderLabel">{`${(shadow.blur * 100).toFixed(1)}%`}</div>
          <input
            className="ShadowForm-sliderInput"
            type="range"
            min={0}
            max={10}
            step={0.1}
            value={shadow.blur * 100}
            onChange={handleChangeBlur}
          />
        </div>
      </ShadowFormField>
      <ShadowFormField title="Distance">
        <div className="ShadowForm-slider">
          <div className="ShadowForm-sliderLabel">{`${(shadow.distance * 100).toFixed(1)}%`}</div>
          <input
            className="ShadowForm-sliderInput"
            type="range"
            min={0}
            max={10}
            step={0.1}
            value={shadow.distance * 100}
            onChange={handleChangeDistance}
          />
        </div>
      </ShadowFormField>
      <ShadowFormField title="Angle">
        <div className="ShadowForm-slider">
          <div className="ShadowForm-sliderLabel">{`${shadow.angle}°`}</div>
          <input
            className="ShadowForm-sliderInput"
            type="range"
            min={0}
            max={360}
            step={15}
            value={shadow.angle}
            onChange={handleChangeAngle}
          />
        </div>
      </ShadowFormField>
    </div>
  );
}

export default ShadowForm;
