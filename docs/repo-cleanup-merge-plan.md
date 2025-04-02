# Repository Cleanup Merge Plan

This document outlines the plan for merging the `repo-cleanup-dev` branch to the `main` branch, completing the repository structure refinement process.

## Current Status

The `repo-cleanup-dev` branch contains several improvements to the repository structure:

1. **Removed Duplicate UB JSON Files**

   - Kept the primary copy in `apps/reader/content/ub-json`
   - Removed duplicates from other locations

2. **Renamed Almanac Directory**

   - Renamed `apps/almanac` to `apps/almanac-new` for clarity

3. **Moved Almanac Reference**

   - Moved `almanac-reference` from the root directory to `sandbox/almanac-reference`

4. **Moved Documentation**

   - Moved all documentation .md files from the root directory to `docs/archive`

5. **Created New Documentation**
   - Created `docs/almanac-structure-clarification.md`
   - Created `docs/reader-architecture-clarification.md`
   - Created `docs/project-appraisal.md`
   - Created `docs/src-migration-completion-plan.md`
   - Created `docs/ub-reader-implementation-plan.md`
   - Created `docs/publication-readers-development-plan.md`

## Merge Plan

### Phase 1: Pre-Merge Testing

1. **Build Verification**

   - Run `npm run build` to verify that all packages build correctly
   - Fix any build errors that arise

2. **Functionality Testing**

   - Test key functionality to ensure it works correctly
   - Verify that the UB Reader can load and display content
   - Verify that the document reader component works correctly
   - Test any other critical functionality

3. **Code Review**
   - Review all changes in the `repo-cleanup-dev` branch
   - Ensure that all changes are well-documented
   - Verify that all changes follow best practices
   - Address any issues identified during the review

### Phase 2: Merge Preparation

1. **Update Documentation**

   - Update the README.md file to reflect the new repository structure
   - Ensure that all documentation is up-to-date
   - Add any missing documentation

2. **Create Merge Request**

   - Create a merge request from `repo-cleanup-dev` to `main`
   - Include a detailed description of the changes
   - Reference relevant documentation
   - Assign reviewers

3. **Address Feedback**
   - Address any feedback from reviewers
   - Make necessary changes
   - Update the merge request

### Phase 3: Merge Execution

1. **Final Verification**

   - Verify that all tests pass
   - Verify that all feedback has been addressed
   - Verify that the merge request is ready for approval

2. **Merge to Main**

   - Merge the `repo-cleanup-dev` branch to `main`
   - Use a merge commit to preserve the history
   - Include a detailed commit message

3. **Post-Merge Verification**
   - Verify that the merge was successful
   - Run tests on the `main` branch
   - Verify that all functionality works correctly

### Phase 4: Post-Merge Activities

1. **Tag Release**

   - Create a new tag for the merged changes
   - Use semantic versioning (e.g., v1.0.0)
   - Include release notes

2. **Update Dependencies**

   - Update any dependencies that reference specific branches
   - Ensure that all projects reference the `main` branch

3. **Clean Up**

   - Delete the `repo-cleanup-dev` branch if no longer needed
   - Archive any temporary branches or forks

4. **Communicate Changes**
   - Inform all team members about the merge
   - Provide guidance on the new repository structure
   - Share relevant documentation

## Merge Approach

1. **Merge Commit**

   - Use a merge commit to preserve the history
   - Include a detailed commit message
   - Reference relevant documentation

2. **Squash and Merge**

   - Alternatively, squash all commits into a single commit
   - Use a detailed commit message
   - Reference relevant documentation

3. **Rebase and Merge**
   - Another option is to rebase the branch and then merge
   - This creates a linear history
   - May be preferred for cleaner history

## Risks and Mitigations

1. **Merge Conflicts**

   - Risk: Conflicts between `repo-cleanup-dev` and `main`
   - Mitigation: Resolve conflicts carefully, test after resolution

2. **Build Failures**

   - Risk: Build failures after merge
   - Mitigation: Run builds before and after merge, fix issues immediately

3. **Functionality Breakage**

   - Risk: Functionality breaking after merge
   - Mitigation: Test thoroughly before and after merge

4. **Documentation Gaps**
   - Risk: Missing or outdated documentation
   - Mitigation: Review and update all documentation before merge

## Timeline

1. **Phase 1: Pre-Merge Testing** - 1 day
2. **Phase 2: Merge Preparation** - 1 day
3. **Phase 3: Merge Execution** - 1 day
4. **Phase 4: Post-Merge Activities** - 1 day

Total estimated time: 4 days

## Conclusion

This plan provides a detailed roadmap for merging the `repo-cleanup-dev` branch to the `main` branch, completing the repository structure refinement process. By following this plan, we can ensure a smooth transition to the new repository structure while preserving all functionality.

Once the merge is complete, we can proceed with the next steps in the project:

1. Complete the src migration as outlined in `docs/src-migration-completion-plan.md`
2. Implement the UB Reader as outlined in `docs/ub-reader-implementation-plan.md`
3. Develop the publication readers as outlined in `docs/publication-readers-development-plan.md`
