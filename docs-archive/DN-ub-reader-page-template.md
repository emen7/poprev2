

## Bottom Pullup System

- Persistent tabbed interface with Notes, Quotes, and Settings tabs
- User can pull it up at will.
- May also be automatically pulled up by text selection note entry choice.
- May also be activated by clicking or touching the Note indicator by the paragraph number. 
- When text is selected, users are presented with three toggle options: Note, Quote, and Highlight
- Selected options light up and users finalize choices with checkmark/X buttons
- System maintains paragraph-level association with user content


## Notes Functionality

- When Note option is selected, the pullup displays a text entry box in the Notes tab, right below the tabs. The box defaults to around a third of the maximum wide-screen width. Can be the whole width for phones.
- "Add Note" button appears below the text box for submission
- Below the Add Note button, is the Notes title, with choices. 
- NOTES: Display in order of ENTRY PAPER. (Where Entry is by most recent first, and Paper arranges them in sequential PAPER order.
- Default to Entry Order.
- All notes automatically include standard reference format (Paper:Section.Title)
- Visual indicators appear next to the paragraph numbers that contain notes
- Indicators match the color of the "Note" tab label
- Clicking indicators retrieves the associated note


## Quotes Management

- Selected text marked as "Quote" is saved to the Quotes tab
- Visual confirmation, the pullup's Quote Label lights, indicates successful quote saving
- Quotes are automatically referenced using standard format
- No auto-pullup is required - just confirmation of action


## Navigation Structure

- Top navigation row contains:
    - Two hamburger menus on the left (larger for Book navigation, smaller for Section navigation)
    - "Urantia<nbsp>Book" title centered
    - Right side reserved for future link implementation
- Book navigation follows improved-demo.html model
- Section navigation is paper-specific


## Dynamic Headers

- Paper row displays the Paper Title
- Section row implements dynamic title display:
    - Starts blank (for untitled intro section)
    - Updates with section title as user scrolls through content
    - Titles appear/disappear/progress based on scroll position
    - Section titles are left-aligned in the framework (unlike centered JSON defaults)
	- Titles font sizes are sized and bolded and matched for visual elegance.
	- Titles respect the users serif/sans toggle

## Content Implementation

- Text content comes from JSON file, starting with intro text
- JSON's title elements are omitted as they're redundant with the header rows
- Section titles from JSON are reformatted to match the left-aligned design
- The jsons thenselves are never changed.



