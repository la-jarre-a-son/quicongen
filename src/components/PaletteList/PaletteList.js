import React from 'react';
import cx from 'classnames';

import './PaletteList.css';

const getItemStyle = (config) => {
  switch (config.type) {
    case 'color':
      return { background: config.color };
    case 'linear':
      return { background: `linear-gradient(${config.angle}deg, ${config.start} 0%, ${config.stop} 100%)` };
    case 'radial':
      return { background: `radial-gradient(${config.start} 0%, ${config.stop} ${config.offset}%)` };
    default:
      return {};
  }
};

function PaletteList({ onSelect, items, value = {} }) {
  return (
    <ul className="PaletteList">
      {items.map((item) => (
        <li
          key={item.id}
          className={cx('PaletteList-item', 'checkboard', {
            'is-active': value.id === item.id,
          })}
        >
          <button
            type="button"
            className={cx('PaletteList-itemButton')}
            onClick={() => onSelect(item)}
            style={getItemStyle(item)}
            aria-label={`Palette item ${item.id}`}
          >
            {item.type === 'none' && 'IMAGE'}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default PaletteList;
