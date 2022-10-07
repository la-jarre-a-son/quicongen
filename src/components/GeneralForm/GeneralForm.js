import React from 'react';
import { usePreset } from '../../contexts/PresetContext';

import Button from '../Button';
import GeneralFormField from './GeneralFormField';

import './GeneralForm.css';

function GeneralForm() {
  const { preset, setPadding, setSize, setRotation, setRadiusType, setRadius } = usePreset();

  const { size, padding, rotation, radius, radiusType } = preset;

  const handleChangeSize = (event) => {
    setSize(Math.round(Number(event.target.value || 0)));
  };

  const handleChangePadding = (event) => {
    setPadding(Math.round(Number(event.target.value || 0)) / 100);
  };

  const handleChangeRotation = (event) => {
    setRotation(Number(event.target.value || 0));
  };

  const handleChangeRadiusType = (type) => () => {
    setRadiusType(type);
  };

  const handleChangeRadius = (event) => {
    setRadius(Math.round(Number(event.target.value || 0)) / 100);
  };

  return (
    <div className="GeneralForm">
      <GeneralFormField title="Size">
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
      </GeneralFormField>
      <GeneralFormField title="Padding">
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
      </GeneralFormField>
      <GeneralFormField title="Radius Type">
        <div className="GeneralForm-buttonGroup">
          <Button intent={radiusType === 'arc' ? 'primary' : 'neutral'} onClick={handleChangeRadiusType('arc')}>
            Arc
          </Button>
          <Button
            intent={radiusType === 'quadratic' ? 'primary' : 'neutral'}
            onClick={handleChangeRadiusType('quadratic')}
          >
            Quadratic
          </Button>
        </div>
      </GeneralFormField>
      <GeneralFormField title="Radius">
        <div className="GeneralForm-slider">
          <div className="GeneralForm-sliderLabel">{`${Math.round(radius * 100)}%`}</div>
          <input
            className="GeneralForm-sliderInput"
            type="range"
            min={0}
            max={100}
            step={5}
            value={radius * 100}
            onChange={handleChangeRadius}
          />
        </div>
      </GeneralFormField>
      <GeneralFormField title="Icon Rotation">
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
      </GeneralFormField>
    </div>
  );
}

export default GeneralForm;
