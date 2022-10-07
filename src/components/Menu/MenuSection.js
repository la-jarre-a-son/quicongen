import React from 'react';

function MenuSection({ children, title }) {
  return (
    <div className="Menu-section">
      <div className="Menu-sectionTitle">{title}</div>
      <div className="Menu-sectionContent">{children}</div>
    </div>
  );
}

export default MenuSection;
