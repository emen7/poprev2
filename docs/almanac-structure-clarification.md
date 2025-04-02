# Almanac Structure Clarification

## Current Structure

The repository currently contains the Urantia Book JSON files in one primary location:

1. `apps/reader/content/ub-json` - **Primary location** for the UB Reader application

## Almanac Application Clarification

There are two distinct almanac-related components in the repository:

1. **Current Almanac Reference** (available in two locations)

   - `almanac-reference/` - Original location in the root directory
   - `sandbox/almanac-reference/` - Copy in the sandbox directory
   - Both are cloned from https://github.com/emen7/almanac-live
   - Serves as reference material for the new almanac
   - Contains the original HTML files

2. **New Almanac** (`apps/almanac-new/`)
   - Will be a complete restructuring of the content from almanac-live
   - Uses a modern architecture with Next.js
   - Will reference the UB Reader for Urantia Book content rather than duplicating it

## Plan for UB JSON Files

To reduce duplication and clarify the structure:

1. The primary copy of the UB JSON files is in `apps/reader/content/ub-json`

   - This is the version that will be used by the UB Reader application

2. We have removed duplicate copies from:

   - `almanac-reference/ub-json`
   - `sandbox/almanac-reference/data/urantia-book`
   - `sandbox/almanac-reference/ub-json`
   - `apps/almanac/content/ub` (directory renamed to `apps/almanac-new`)

3. Any code that references these files will be updated to use the primary location

## Relationship Between Components

- **UB Reader** (`apps/reader/`) - Primary application for reading the Urantia Book

  - Uses the JSON files in `apps/reader/content/ub-json`

- **New Almanac** (`apps/almanac-new/`) - Modernized version of the almanac

  - References the Urantia Book through the UB Reader
  - Will have its own content structure without duplicating UB content

- **Reference Material** (`sandbox/almanac-reference/` and `almanac-reference/`) - Original almanac for reference
  - Will not be actively used in the application
  - Serves as a reference for the development of the new almanac
