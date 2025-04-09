import { Dispatch } from 'react';

export interface NavigationState {
  /**
   * Whether the book navigation panel is open
   */
  isBookNavOpen: boolean;

  /**
   * Whether the section navigation panel is open
   */
  isSectionNavOpen: boolean;

  /**
   * The ID of the current paper
   */
  currentPaperId: string;

  /**
   * The ID of the current section
   */
  currentSectionId: string;

  /**
   * The title of the current section
   */
  currentSectionTitle: string;
}

export enum NavigationActionType {
  TOGGLE_BOOK_NAV = 'TOGGLE_BOOK_NAV',
  TOGGLE_SECTION_NAV = 'TOGGLE_SECTION_NAV',
  SET_CURRENT_PAPER = 'SET_CURRENT_PAPER',
  SET_CURRENT_SECTION = 'SET_CURRENT_SECTION',
  UPDATE_SECTION_TITLE = 'UPDATE_SECTION_TITLE',
}

export type NavigationAction =
  | { type: NavigationActionType.TOGGLE_BOOK_NAV }
  | { type: NavigationActionType.TOGGLE_SECTION_NAV }
  | { type: NavigationActionType.SET_CURRENT_PAPER; payload: { paperId: string } }
  | { type: NavigationActionType.SET_CURRENT_SECTION; payload: { sectionId: string } }
  | { type: NavigationActionType.UPDATE_SECTION_TITLE; payload: { title: string } };

export interface NavigationContextType {
  state: NavigationState;
  dispatch: Dispatch<NavigationAction>;
}
