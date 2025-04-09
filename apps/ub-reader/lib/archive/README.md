# Archived Libraries

This directory contains libraries that are no longer actively used in the UB Reader application. They have been archived for reference purposes but should not be used in new development.

## Reader Core

The Reader Core library has been deprecated in favor of a more streamlined approach using the Traditional Reader implementation. The Traditional Reader provides a more focused reading experience that better matches the improved-demo.html design.

## Why We Archived These Libraries

The Reader Core library was part of an experimental implementation that explored different approaches to the UB Reader interface. While it provided valuable insights, the Traditional Reader implementation was found to better meet the needs of users and more closely align with the design goals of the project.

## Using the Traditional Reader

To use the Traditional Reader in your application, import the `TraditionalReader` component from `apps/ub-reader/components/traditional-reader`:

```tsx
import { TraditionalReader } from '../components/traditional-reader';

export default function YourPage() {
  return <TraditionalReader />;
}
```

See the `apps/ub-reader/app/traditional-test` directory for an example of how to use the Traditional Reader.
