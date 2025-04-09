# Archived Components

This directory contains components that are no longer actively used in the UB Reader application. They have been archived for reference purposes but should not be used in new development.

## Enhanced Reader

The Enhanced Reader components have been deprecated in favor of the Traditional Reader implementation, which provides a more streamlined and focused reading experience that better matches the improved-demo.html design.

The Traditional Reader implementation includes:

- Reference detection and linking
- Navigation with hamburger menu
- Settings panel
- Sticky headers
- Paragraph numbering
- Copy to clipboard functionality

## Why We Archived These Components

The Enhanced Reader was an experimental implementation that explored different approaches to the UB Reader interface. While it provided valuable insights, the Traditional Reader implementation was found to better meet the needs of users and more closely align with the design goals of the project.

## Using the Traditional Reader

To use the Traditional Reader in your application, import the `TraditionalReader` component from `apps/ub-reader/components/traditional-reader`:

```tsx
import { TraditionalReader } from '../components/traditional-reader';

export default function YourPage() {
  return <TraditionalReader />;
}
```

See the `apps/ub-reader/app/traditional-test` directory for an example of how to use the Traditional Reader.
