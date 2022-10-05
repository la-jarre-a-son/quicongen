import React, { useCallback } from 'react';
import './FilePicker.css';

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

  return (
    <div className="FilePicker">
      <div className="FilePicker-name">{value && value.name ? value.name : 'Pick or Drag and Drop an image...'}</div>
      <div className="FilePicker-wrapper">
        <input type="file" className="FilePicker-input" onChange={handleChange} />

        <div className="FilePicker-image">
          {value && <img className="checkboard" src={value.data} alt={`Preview of ${value.name}`} />}
        </div>
      </div>
    </div>
  );
}

export default MenuFile;
