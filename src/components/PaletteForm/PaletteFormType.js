import React from 'react';
import cx from 'classnames';

function PaletteFormType({ onChange, value = 'color' }) {
  return (
    <div className="PaletteForm-type">
      <button
        type="button"
        className={cx('PaletteForm-item', 'PaletteForm-item--type', 'PaletteForm-item--typeColor', {
          'is-active': value === 'color',
        })}
        onClick={() => onChange('color')}
      >
        Color
      </button>
      <button
        type="button"
        className={cx('PaletteForm-item', 'PaletteForm-item--type', 'PaletteForm-item--typeLinear', {
          'is-active': value === 'linear',
        })}
        onClick={() => onChange('linear')}
      >
        Linear Gradient
      </button>
      <button
        type="button"
        className={cx('PaletteForm-item', 'PaletteForm-item--type', 'PaletteForm-item--typeRadial', {
          'is-active': value === 'radial',
        })}
        onClick={() => onChange('radial')}
      >
        Radial Gradient
      </button>
    </div>
  );
}

export default PaletteFormType;
