import React from 'react';
import cx from 'classnames';

import './PresetList.css';

function PresetList({ onSelect, items, value = 'default' }) {
  return (
    <ul className="PresetList">
      {items.map((item) => (
        <li
          key={item.name}
          className={cx('PresetList-item', {
            'is-active': value === item.name,
          })}
        >
          <button type="button" className="PresetList-itemButton checkboard" onClick={() => onSelect(item)}>
            <img className="PresetList-itemPreview" src={item.preview} alt="" />
            <span className="PresetList-itemName">{item.name}</span>
          </button>
        </li>
      ))}
    </ul>
  );
}

export default PresetList;
