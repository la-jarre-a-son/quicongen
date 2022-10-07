import React from 'react';

function ShadowFormField({ title, children }) {
  return (
    <div className="ShadowForm-field">
      <div className="ShadowForm-fieldLabel">{title}</div>
      {children}
    </div>
  );
}

export default ShadowFormField;
