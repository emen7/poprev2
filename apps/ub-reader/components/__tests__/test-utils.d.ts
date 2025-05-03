import React from 'react';
import { axe, checkA11y } from './axe-helper';
declare const customRender: (ui: React.ReactElement) => import("@testing-library/react").RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
export * from '@testing-library/react';
export { customRender as render, axe, checkA11y };
//# sourceMappingURL=test-utils.d.ts.map