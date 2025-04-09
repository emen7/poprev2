# Reader App Archive

## Migration Status

The original `apps/reader` directory was intended to be archived in this location as part of the repository restructuring plan. However, at the time of migration:

1. The contents of `apps/reader` had already been successfully copied to `apps/ub-reader`
2. The original `apps/reader` directory was empty
3. The directory could not be automatically deleted because it was being used by another process (possibly Notepad++)

## Manual Action Required

Please manually delete the `apps/reader` directory after closing any applications that might be using it (such as Notepad++).

## Reference

This migration was part of the directory structure improvements outlined in the document-transformer-next-steps.md file:

> - ✅ Created new `apps/ub-reader` directory to match the package name "ub-reader" in package.json
> - ✅ Copied all contents from `apps/reader` to `apps/ub-reader`
> - ⏳ Original `apps/reader` directory should be moved to `docs/archive/oldcode` after VSCode restart
