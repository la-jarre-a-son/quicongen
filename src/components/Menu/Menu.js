import React from 'react';
import cx from 'classnames';

import './Menu.css';

function Menu({ className, title, footer, children }) {
  return (
    <section className={cx('Menu', className)}>
      <header className="Menu-header">{title}</header>
      <div className="Menu-content">{children}</div>
      <footer className="Menu-footer">{footer}</footer>
    </section>
  );
}

export default Menu;
