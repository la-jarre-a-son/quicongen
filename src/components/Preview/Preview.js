import React, { useState } from 'react';
import cx from 'classnames';

import { useRendering } from '../../contexts/RenderingContext';
import Button from '../Button';

import './Preview.css';

function Preview() {
  const { dataUrl, filename, size } = useRendering();
  const [zoom, setZoom] = useState('fit');

  const imageSize = zoom === 'fit' ? null : zoom * size;

  const handleZoomChange = (event) => {
    setZoom(event.target.value);
  };
  return (
    <section className="Preview">
      <label htmlFor="select-zoom">
        Zoom:
        <select id="select-zoom" className="Preview-zoom" onChange={handleZoomChange} value={zoom}>
          <option value="fit">Fit</option>
          <option value="1">100%</option>
          <option value="2">200%</option>
          <option value="3">300%</option>
        </select>
      </label>
      <a className={cx('Preview-frame', `Preview-frame--${zoom}`)} href={dataUrl} download={filename}>
        <img
          className="Preview-image checkboard"
          width={imageSize}
          height={imageSize}
          src={dataUrl}
          alt="Preview of generated icon"
        />
      </a>
      <Button as="a" className="Preview-download" href={dataUrl} download={filename}>
        Download icon
      </Button>
    </section>
  );
}

export default Preview;
