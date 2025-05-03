import { jsx as _jsx } from "react/jsx-runtime";
import { render } from '@testing-library/react';
import { vi } from 'vitest';
import { axe, checkA11y } from './axe-helper';
// Mock the HighlightProvider
const mockHighlightManager = {
    showSelectionMenu: vi.fn(),
    createHighlight: vi.fn(),
};
vi.mock('../HighlightProvider', () => ({
    useHighlight: () => ({
        highlightManager: mockHighlightManager,
    }),
}));
// Mock the ThemeContext
vi.mock('../../contexts/ThemeContext', () => ({
    useTheme: () => ({
        theme: 'traditional',
        setTheme: vi.fn(),
    }),
}));
// Mock the UserPreferencesContext
vi.mock('../../contexts/UserPreferencesContext', () => ({
    useUserPreferences: () => ({
        preferences: {
            reader: {
                showParagraphNumbers: true,
            },
        },
        updatePreferences: vi.fn(),
    }),
}));
// Mock the ReferenceProcessor component
vi.mock('../references', () => ({
    ReferenceProcessor: ({ content }) => (_jsx("div", { dangerouslySetInnerHTML: { __html: content } })),
}));
// Custom render function with providers if needed
const customRender = (ui) => {
    return render(ui);
};
export * from '@testing-library/react';
export { customRender as render, axe, checkA11y };
//# sourceMappingURL=test-utils.js.map