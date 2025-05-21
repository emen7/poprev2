import React from 'react';
import { PARAM_KEY as A11Y_PARAM_KEY } from '@storybook/addon-a11y';

// Global styles
import './storybook.css';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  [A11Y_PARAM_KEY]: {
    element: '#root',
    manual: false,
  },
  viewport: {
    viewports: {
      mobile1: {
        name: 'Small Mobile',
        styles: {
          width: '320px',
          height: '568px',
        },
      },
      mobile2: {
        name: 'Large Mobile',
        styles: {
          width: '414px',
          height: '896px',
        },
      },
      tablet: {
        name: 'Tablet',
        styles: {
          width: '768px',
          height: '1024px',
        },
      },
      laptop: {
        name: 'Laptop',
        styles: {
          width: '1366px',
          height: '768px',
        },
      },
      desktop: {
        name: 'Desktop',
        styles: {
          width: '1920px',
          height: '1080px',
        },
      },
    },
  },
};

// Add decorators
export const decorators = [
  Story => (
    <div className="light-theme">
      <Story />
    </div>
  ),
];
