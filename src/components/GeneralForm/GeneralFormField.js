import React from 'react';

function GeneralFormField({ title, children }) {
  return (
    <div className="GeneralForm-field">
      <div className="GeneralForm-fieldLabel">{title}</div>
      {children}
    </div>
  );
}

export default GeneralFormField;
