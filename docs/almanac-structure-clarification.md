# Almanac Structure Clarification

## Current Structure

The repository currently contains multiple copies of the Urantia Book JSON files in different locations:

1. `apps/reader/content/ub-json` - **Primary location** for the UB Reader application
2. `almanac-reference/ub-json` - Original location from the cloned repository
3. `sandbox/almanac-reference/ub-json` - Copy created during repository restructuring
4. `sandbox/almanac-reference/data/urantia-book` - Another copy in the data directory

## Almanac Application Clarification

There are two distinct almanac-related components in the repository:

1. **Current Almanac** (`almanac-reference/`)

   - Cloned from https://github.com/emen7/almanac-live
   - Serves as reference material for the new almanac
   - Contains the original HTML and JSON files

2. **New Almanac** (`apps/almanac/`)
   - Will be a complete restructuring of the content from almanac-live
   - Uses a modern architecture with Next.js
   - Content is organized in `apps/almanac/content/`

## Plan for UB JSON Files

To reduce duplication and clarify the structure:

1. The primary copy of the UB JSON files will be in `apps/reader/content/ub-json`

   - This is the version that will be used by the UB Reader application

2. We will remove the duplicate copies from:

   - `almanac-reference/ub-json`
   - `sandbox/almanac-reference/data/urantia-book`
   - `sandbox/almanac-reference/ub-json`

3. Any code that references these files will be updated to use the primary location

## Relationship Between Components

- **UB Reader** (`apps/reader/`) - Primary application for reading the Urantia Book

  - Uses the JSON files in `apps/reader/content/ub-json`

- **New Almanac** (`apps/almanac/`) - Modernized version of the almanac

  - References the Urantia Book through the UB Reader
  - Contains its own content in `apps/almanac/content/`

- **Reference Material** (`sandbox/almanac-reference/`) - Original almanac for reference
  - Will not be actively used in the application
  - Serves as a reference for the development of the new almanac
