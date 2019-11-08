import React from 'react';

import Icon from '../icon/Icon';
import styles from './link.module.scss';

interface Props2 {
  children: React.ReactNode;
  withArrow?: boolean;
  className?: string;
}

const LinkInner = ({ children, withArrow }: Props2) => <span>{children}</span>;

export interface Props {
  LinkWrapper?: object;
  children: React.ReactNode;
  containsIcon?: boolean;
  isButton?: boolean;
  withArrow?: boolean;
  href: string;
  className?: string;
}

function Link({ withArrow, children }: Props) {
  const content = (
    <div className={styles.link}>
      <LinkInner className={styles.linkInner} withArrow={withArrow}>
        {children}
        {withArrow && <Icon name="arrowRight" />}
      </LinkInner>
    </div>
  );

  return content;
}

export default Link;
