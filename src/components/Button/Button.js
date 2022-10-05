import React from 'react';
import cx from 'classnames';

import './Button.css';

function Button({ className, as, intent, children, ...otherProps }) {
  const Element = as || 'button';

  return (
    <Element className={cx('Button', intent && `Button--${intent}`, className)} {...otherProps}>
      {children}
    </Element>
  );
}

export default Button;
