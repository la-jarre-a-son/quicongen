import React from 'react';

function MenuSection({ children, title }) {
  return (
    <div className="Menu-section">
      <div className="Menu-sectionTitle">{title}</div>
      {children}
    </div>
  );
}

export default MenuSection;
