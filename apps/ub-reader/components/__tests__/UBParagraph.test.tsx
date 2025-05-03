import { describe, it, expect } from &apos;vitest';

import UBParagraph from '../UBParagraph';

import { render, screen, checkA11y } from './test-utils';

describe('UBParagraph', () => {
  it('renders paragraph text correctly', () => {
    const testParagraph = {
      number: 1,
      text: &apos;This is a test paragraph',
    };
    render(<UBParagraph paragraph={testParagraph} />);

    expect(screen.getByText(testParagraph.text)).toBeInTheDocument();
  });

  it('applies the correct CSS class', () => {
    const testParagraph = {
      number: 2,
      text: &apos;This is a test paragraph',
    };
    render(<UBParagraph paragraph={testParagraph} />);

    const paragraphElement = screen.getByText(testParagraph.text).closest('.ub-paragraph');
    expect(paragraphElement).toHaveClass('ub-paragraph');
  });

  it('should not have any accessibility violations', async () => {
    const testParagraph = {
      number: 3,
      text: &apos;This is a test paragraph for accessibility',
    };
    const { container } = render(<UBParagraph paragraph={testParagraph} />);

    // Check for accessibility violations
    await checkA11y(container);
  });
});
