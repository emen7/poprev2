/**
 * ARIA role constants
 */
export const ROLES = {
  ALERT: 'alert',
  ALERTDIALOG: 'alertdialog',
  BUTTON: 'button',
  CHECKBOX: 'checkbox',
  DIALOG: 'dialog',
  GRID: 'grid',
  LINK: 'link',
  LISTBOX: 'listbox',
  MENU: 'menu',
  MENUITEM: 'menuitem',
  MENUITEMCHECKBOX: 'menuitemcheckbox',
  MENUITEMRADIO: 'menuitemradio',
  OPTION: 'option',
  PROGRESSBAR: 'progressbar',
  RADIO: 'radio',
  RADIOGROUP: 'radiogroup',
  SCROLLBAR: 'scrollbar',
  SLIDER: 'slider',
  SPINBUTTON: 'spinbutton',
  STATUS: 'status',
  TAB: 'tab',
  TABLIST: 'tablist',
  TABPANEL: 'tabpanel',
  TEXTBOX: 'textbox',
  TIMER: 'timer',
  TOOLBAR: 'toolbar',
  TOOLTIP: 'tooltip',
  TREE: 'tree',
  TREEGRID: 'treegrid',
  TREEITEM: 'treeitem',
};

/**
 * Creates props for an ARIA button
 *
 * @param onClick - The click handler
 * @param label - The accessible label
 * @param disabled - Whether the button is disabled
 * @returns Props for an ARIA button
 */
export const createButtonProps = (
  onClick: (event: React.MouseEvent | React.KeyboardEvent) => void,
  label: string,
  disabled: boolean = false
): Record<string, unknown> => {
  return {
    role: ROLES.BUTTON,
    tabIndex: disabled ? -1 : 0,
    'aria-disabled': disabled,
    'aria-label': label,
    onClick: disabled ? undefined : onClick,
    onKeyDown: disabled
      ? undefined
      : (event: React.KeyboardEvent) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            onClick(event);
          }
        },
  };
};

/**
 * Creates props for an ARIA checkbox
 *
 * @param checked - Whether the checkbox is checked
 * @param onChange - The change handler
 * @param label - The accessible label
 * @param disabled - Whether the checkbox is disabled
 * @returns Props for an ARIA checkbox
 */
export const createCheckboxProps = (
  checked: boolean,
  onChange: (checked: boolean) => void,
  label: string,
  disabled: boolean = false
): Record<string, unknown> => {
  return {
    role: ROLES.CHECKBOX,
    tabIndex: disabled ? -1 : 0,
    'aria-checked': checked,
    'aria-disabled': disabled,
    'aria-label': label,
    onClick: disabled
      ? undefined
      : () => {
          onChange(!checked);
        },
    onKeyDown: disabled
      ? undefined
      : (event: React.KeyboardEvent) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            onChange(!checked);
          }
        },
  };
};

/**
 * Creates props for an ARIA tab
 *
 * @param selected - Whether the tab is selected
 * @param onClick - The click handler
 * @param controls - ID of the controlled tabpanel
 * @param label - The accessible label
 * @param disabled - Whether the tab is disabled
 * @returns Props for an ARIA tab
 */
export const createTabProps = (
  selected: boolean,
  onClick: () => void,
  controls: string,
  label: string,
  disabled: boolean = false
): Record<string, unknown> => {
  return {
    role: ROLES.TAB,
    tabIndex: selected && !disabled ? 0 : -1,
    'aria-selected': selected,
    'aria-controls': controls,
    'aria-disabled': disabled,
    'aria-label': label,
    onClick: disabled ? undefined : onClick,
    onKeyDown: disabled
      ? undefined
      : (event: React.KeyboardEvent) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            onClick();
          }
        },
  };
};

/**
 * Creates props for an ARIA tabpanel
 *
 * @param id - ID of the tabpanel
 * @param labelledBy - ID of the tab that labels this panel
 * @param hidden - Whether the tabpanel is hidden
 * @returns Props for an ARIA tabpanel
 */
export const createTabPanelProps = (
  id: string,
  labelledBy: string,
  hidden: boolean = false
): Record<string, unknown> => {
  return {
    role: ROLES.TABPANEL,
    id,
    'aria-labelledby': labelledBy,
    hidden,
    tabIndex: hidden ? -1 : 0,
  };
};
