import React, { useCallback } from 'react';
import './FilePicker.css';

import Button from '../Button';

function MenuFile({ value = null, onChange }) {
  const handleChange = useCallback((event) => {
    const file = event.target.files[0];

    const reader = new FileReader();

    reader.onload = () => {
      onChange(file.name, reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  }, []);

  const handleRemove = () => {
    onChange(null);
  };

  return (
    <div className="FilePicker">
      <div className="FilePicker-name">{value && value.name ? value.name : 'Pick or Drag and Drop an image...'}</div>
      <div className="FilePicker-wrapper">
        <input type="file" className="FilePicker-input" onChange={handleChange} />

        <div className="FilePicker-image">
          {value && <img className="checkboard" src={value.data} alt={`Preview of ${value.name}`} />}
        </div>
      </div>
      <Button className="FilePicker-button" intent="danger" onClick={handleRemove}>
        Remove image
      </Button>
    </div>
  );
}

export default MenuFile;
