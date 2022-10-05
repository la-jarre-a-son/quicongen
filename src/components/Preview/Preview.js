import React from 'react';

import { useRendering } from '../../contexts/RenderingContext';
import Button from '../Button';

import './Preview.css';

function Preview() {
  const { dataUrl, filename } = useRendering();

  return (
    <section className="Preview">
      <a className="Preview-frame" href={dataUrl} download={filename}>
        <div className="Preview-wrapper">
          <img className="Preview-image checkboard" src={dataUrl} alt="Preview of generated icon" />
        </div>
      </a>
      <Button as="a" className="Preview-download" href={dataUrl} download={filename}>
        Download icon
      </Button>
    </section>
  );
}

export default Preview;
