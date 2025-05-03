import { jsx as _jsx } from "react/jsx-runtime";
/**
 * Unit tests for the SectionTracker component
 */
import { render, screen } from '@testing-library/react';
import { SectionTracker } from '../SectionTracker';
// Mock the useNavigation hook
jest.mock('@ub-ecosystem/state-management', () => ({
    useNavigation: () => ({
        setCurrentSection: jest.fn(),
        updateSectionTitle: jest.fn(),
    }),
}));
// Mock the useIntersectionObserver hook
jest.mock('../useIntersectionObserver', () => ({
    useIntersectionObserver: () => {
        // Return a ref function and a boolean indicating if the element is intersecting
        return [jest.fn(), true];
    },
}));
describe('SectionTracker', () => {
    it('renders children correctly', () => {
        render(_jsx(SectionTracker, { sectionId: "test-section", sectionTitle: "Test Section", children: _jsx("div", { "data-testid": "test-content", children: "Test Content" }) }));
        // Check that the children are rendered
        expect(screen.getByTestId('test-content')).toBeInTheDocument();
        expect(screen.getByTestId('test-content')).toHaveTextContent('Test Content');
    });
    it('applies the correct CSS classes', () => {
        render(_jsx(SectionTracker, { sectionId: "test-section", sectionTitle: "Test Section", className: "custom-class", debug: true, children: _jsx("div", { children: "Test Content" }) }));
        // Get the section tracker element
        const sectionTracker = screen.getByText('Test Content').parentElement;
        // Check that the correct CSS classes are applied
        expect(sectionTracker).toHaveClass('custom-class');
        expect(sectionTracker).toHaveClass('debug');
        expect(sectionTracker).toHaveClass('active'); // Because we mocked useIntersectionObserver to return true
    });
    it('sets the correct data attributes', () => {
        render(_jsx(SectionTracker, { sectionId: "test-section", sectionTitle: "Test Section", children: _jsx("div", { children: "Test Content" }) }));
        // Get the section tracker element
        const sectionTracker = screen.getByText('Test Content').parentElement;
        // Check that the correct data attributes are set
        expect(sectionTracker).toHaveAttribute('data-section-id', 'test-section');
        expect(sectionTracker).toHaveAttribute('id', 'test-section');
    });
});
//# sourceMappingURL=SectionTracker.test.js.map