import React from 'react';
import { css } from 'glamor';
import ScrollToBottom from 'react-scroll-to-bottom';

const ROOT_CSS = css({
  height: '100%',
  width: 'auto',
});

const ScrollBottom = ({ children }) => (
  <ScrollToBottom className={ROOT_CSS}>
    {children}
  </ScrollToBottom>
);

export default ScrollBottom;
