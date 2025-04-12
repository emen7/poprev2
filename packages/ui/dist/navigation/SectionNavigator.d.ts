import './SectionNavigator.css';
export interface Section {
  /**
   * Unique identifier for the section
   */
  id: string;
  /**
   * Display title for the section
   */
  title: string;
  /**
   * Section number (optional)
   */
  number?: string | number;
}
export interface SectionNavigatorProps {
  /**
   * Array of sections to display
   */
  sections: Section[];
  /**
   * ID of the currently active section
   */
  currentSectionId?: string;
  /**
   * Function called when a section is selected
   */
  onSectionChange: (sectionId: string) => void;
  /**
   * Label for the dropdown button
   * @default 'Sections'
   */
  label?: string;
  /**
   * Whether to show section numbers
   * @default true
   */
  showNumbers?: boolean;
  /**
   * Additional CSS class name
   */
  className?: string;
  /**
   * Whether to close the dropdown when a section is selected
   * @default true
   */
  closeOnSelect?: boolean;
}
/**
 * SectionNavigator Component
 *
 * A dropdown component for navigating between sections.
 * Displays the current section and allows selection from a list.
 */
export declare function SectionNavigator({
  sections,
  currentSectionId,
  onSectionChange,
  label,
  showNumbers,
  className,
  closeOnSelect,
}: SectionNavigatorProps): import('react/jsx-runtime').JSX.Element;
export default SectionNavigator;
//# sourceMappingURL=SectionNavigator.d.ts.map
