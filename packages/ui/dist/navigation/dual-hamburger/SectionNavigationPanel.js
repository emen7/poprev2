import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useNavigation } from '@ub-ecosystem/state-management';
import styles from './SectionNavigationPanel.module.css';
/**
 * SectionNavigationPanel Component
 *
 * A sliding panel that displays section-level navigation options for the current paper.
 */
export function SectionNavigationPanel({ isOpen, className = '' }) {
  const { toggleSectionNav, setCurrentSection, currentPaperId, currentSectionId } = useNavigation();
  // Example section data - in a real implementation, this would come from a data source
  // and would be filtered based on the current paper
  const sections = [
    { id: 'section1', title: 'Introduction' },
    { id: 'section2', title: "The Father's Name" },
    { id: 'section3', title: 'The Reality of God' },
    { id: 'section4', title: 'God as a Universal Reality' },
    { id: 'section5', title: 'Personality of the Universal Father' },
    { id: 'section6', title: 'Personality in the Universe' },
    { id: 'section7', title: 'Spiritual Value of the Personality Concept' },
  ];
  const handleSectionClick = sectionId => {
    setCurrentSection(sectionId);
    toggleSectionNav(); // Close the navigation panel after selection
  };
  const panelClasses = [styles.sectionNavigationPanel, isOpen ? styles.open : '', className]
    .filter(Boolean)
    .join(' ');
  // Get the paper title based on the current paper ID
  const paperTitle =
    currentPaperId === 'paper1'
      ? 'The Universal Father'
      : currentPaperId === 'paper2'
        ? 'The Nature of God'
        : currentPaperId === 'paper3'
          ? 'The Attributes of God'
          : currentPaperId === 'paper4'
            ? "God's Relation to the Universe"
            : currentPaperId === 'paper5'
              ? "God's Relation to the Individual"
              : 'Current Paper';
  return _jsxs('nav', {
    className: panelClasses,
    'aria-hidden': !isOpen,
    children: [
      _jsxs('div', {
        className: styles.header,
        children: [
          _jsx('h2', { className: styles.title, children: paperTitle }),
          _jsx('button', {
            className: styles.closeButton,
            onClick: toggleSectionNav,
            'aria-label': 'Close section navigation',
            children: '\u00D7',
          }),
        ],
      }),
      _jsx('ul', {
        className: styles.navigationList,
        children: sections.map(section =>
          _jsx(
            'li',
            {
              className: styles.navigationItem,
              children: _jsx('a', {
                href: `#${section.id}`,
                className: `${styles.navigationLink} ${section.id === currentSectionId ? styles.active : ''}`,
                onClick: e => {
                  e.preventDefault();
                  handleSectionClick(section.id);
                },
                children: section.title,
              }),
            },
            section.id
          )
        ),
      }),
    ],
  });
}
export default SectionNavigationPanel;
//# sourceMappingURL=SectionNavigationPanel.js.map
