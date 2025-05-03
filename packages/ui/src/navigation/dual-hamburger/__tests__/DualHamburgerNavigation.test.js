import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Unit tests for the DualHamburgerNavigation component
 */
import { render, screen, fireEvent } from '@testing-library/react';
import { DualHamburgerNavigation } from '../DualHamburgerNavigation';
// Mock the useNavigation hook
const mockToggleBookNav = jest.fn();
const mockToggleSectionNav = jest.fn();
jest.mock('@ub-ecosystem/state-management', () => ({
    useNavigation: () => ({
        isBookNavOpen: false,
        isSectionNavOpen: false,
        toggleBookNav: mockToggleBookNav,
        toggleSectionNav: mockToggleSectionNav,
    }),
}));
// Mock the BookNavigationPanel and SectionNavigationPanel components
jest.mock('../BookNavigationPanel', () => ({
    BookNavigationPanel: ({ isOpen }) => (_jsx("div", { "data-testid": "book-navigation-panel", "data-is-open": isOpen, children: "Book Navigation Panel" })),
}));
jest.mock('../SectionNavigationPanel', () => ({
    SectionNavigationPanel: ({ isOpen }) => (_jsx("div", { "data-testid": "section-navigation-panel", "data-is-open": isOpen, children: "Section Navigation Panel" })),
}));
// Mock the HamburgerButton component
jest.mock('../HamburgerButton', () => ({
    HamburgerButton: ({ variant, isOpen, onClick, }) => (_jsxs("button", { "data-testid": `${variant}-hamburger-button`, "data-is-open": isOpen, onClick: onClick, children: [variant, " Hamburger Button"] })),
}));
describe('DualHamburgerNavigation', () => {
    beforeEach(() => {
        // Reset mock functions
        mockToggleBookNav.mockReset();
        mockToggleSectionNav.mockReset();
    });
    it('renders correctly', () => {
        render(_jsx(DualHamburgerNavigation, {}));
        // Check that the hamburger buttons are rendered
        expect(screen.getByTestId('book-hamburger-button')).toBeInTheDocument();
        expect(screen.getByTestId('section-hamburger-button')).toBeInTheDocument();
        // Check that the navigation panels are rendered
        expect(screen.getByTestId('book-navigation-panel')).toBeInTheDocument();
        expect(screen.getByTestId('section-navigation-panel')).toBeInTheDocument();
    });
    it('applies custom class name', () => {
        var _a;
        render(_jsx(DualHamburgerNavigation, { className: "custom-class" }));
        // Check that the custom class name is applied
        const navigationElement = (_a = screen.getByTestId('book-hamburger-button').closest('div')) === null || _a === void 0 ? void 0 : _a.parentElement;
        expect(navigationElement).toHaveClass('custom-class');
    });
    it('calls toggleBookNav when book hamburger button is clicked', () => {
        render(_jsx(DualHamburgerNavigation, {}));
        // Click the book hamburger button
        fireEvent.click(screen.getByTestId('book-hamburger-button'));
        // Check that toggleBookNav was called
        expect(mockToggleBookNav).toHaveBeenCalledTimes(1);
    });
    it('calls toggleSectionNav when section hamburger button is clicked', () => {
        render(_jsx(DualHamburgerNavigation, {}));
        // Click the section hamburger button
        fireEvent.click(screen.getByTestId('section-hamburger-button'));
        // Check that toggleSectionNav was called
        expect(mockToggleSectionNav).toHaveBeenCalledTimes(1);
    });
    it('calls toggleBookNav when overlay is clicked and book nav is open', () => {
        // Mock the useNavigation hook to return isBookNavOpen: true
        jest.spyOn(require('@ub-ecosystem/state-management'), 'useNavigation').mockReturnValue({
            isBookNavOpen: true,
            isSectionNavOpen: false,
            toggleBookNav: mockToggleBookNav,
            toggleSectionNav: mockToggleSectionNav,
        });
        render(_jsx(DualHamburgerNavigation, {}));
        // Click the overlay
        const overlay = screen.getByRole('presentation', { hidden: true });
        fireEvent.click(overlay);
        // Check that toggleBookNav was called
        expect(mockToggleBookNav).toHaveBeenCalledTimes(1);
    });
    it('calls toggleSectionNav when overlay is clicked and section nav is open', () => {
        // Mock the useNavigation hook to return isSectionNavOpen: true
        jest.spyOn(require('@ub-ecosystem/state-management'), 'useNavigation').mockReturnValue({
            isBookNavOpen: false,
            isSectionNavOpen: true,
            toggleBookNav: mockToggleBookNav,
            toggleSectionNav: mockToggleSectionNav,
        });
        render(_jsx(DualHamburgerNavigation, {}));
        // Click the overlay
        const overlay = screen.getByRole('presentation', { hidden: true });
        fireEvent.click(overlay);
        // Check that toggleSectionNav was called
        expect(mockToggleSectionNav).toHaveBeenCalledTimes(1);
    });
});
//# sourceMappingURL=DualHamburgerNavigation.test.js.map