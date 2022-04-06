import React from 'react';
import { createGlobalStyles, CssBaseline } from '@xl-vision/react';

const GlobalStyle = createGlobalStyles(({ theme }) => {
  const { color, transition } = theme;

  return {
    a: {
      color: color.themes.primary.color,
      textDecoration: 'none',
      transition: transition.standard('color'),
      ':hover': {
        color: color.themes.primary.hover,
      },
    },
  };
});

const CustomCssBaseline = () => {
  return (
    <>
      <CssBaseline />
      <GlobalStyle />
    </>
  );
};

export default CustomCssBaseline;
