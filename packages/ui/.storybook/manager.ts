import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming/create';

const theme = create({
  base: 'light',
  brandTitle: 'UB Ecosystem UI',
  brandUrl: 'https://github.com/emen7/poprev2',
  brandTarget: '_blank',
  colorPrimary: '#4a6da7',
  colorSecondary: '#6c757d',
});

addons.setConfig({
  theme,
  showToolbar: true,
});
