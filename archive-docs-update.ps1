# PowerShell script to archive outdated documentation files

# List of files to archive (implementation plans and other outdated docs)
$filesToArchive = @(
    # Files with CL- prefix (older documents)
    "CL-Advisory Document_ Unified CMS Strategy with Tina.md",
    "CL-Data Synchronization Strategy for UB Ecosystem.md",
    "CL-DR-UB Ecosystem Monorepo_ Implementation Guide.md",
    "CL-Ecosystem Hub Page.md",
    "CL-General Repo Recommendations.md",
    "CL-Pullups and Downs for Large screens.md",
    "CL-Reader Design with pull-downs and ups.md",
    "CL-Technical Debt Management Plan for UB Ecosystem.md",
    "CL-User Experience Consistency Guide for UB Ecosystem.md",
    
    # Content integration files (superseded by new architecture plan)
    "ub-content-integration-diagram.md",
    "ub-content-integration-diagram-revised.md",
    "ub-content-integration-plan.md",
    "ub-content-integration-plan-revised.md",
    "ub-content-integration-selection-menu.md",
    "ub-content-integration-tasks.md",
    "ub-content-integration-tasks-revised.md",
    
    # Template files
    "app-readme-template.md",
    "package-readme-template.md",
    "README-template.md",
    "sandbox-readme-template.md",
    
    # Older analysis and implementation documents
    "DN-ub-reader-page-template.md",
    "DR-Comprehensive Analysis of PopRev2 Monorepo for UB.md",
    "Modern Theme Implementation Guide (1).md",
    "PPLX notation plan.md",
    "reader-enhancement-summary.md",
    "Roo-repo-analysis.md",
    "Search System Implementation Recommendations for U.md",
    "ub-ecosystem-architecture-comprehensive.md",
    "ub-reader-appearance-issues.md",
    "ub-reader-demo-evaluation-guide.md",
    "ub-reader-highlighting-integration-plan.md",
    "vs-code-resolution-summary.md"
)

# Files to keep in root directory
$filesToKeep = @(
    "ub-ecosystem-architecture-plan-2025.md",  # Current architecture plan
    "README.md",                               # Main repository documentation
    "pullup-and-highlighting-progress.md",     # Recent feature progress
    "git-workflow-recommendations.md",         # Workflow guidance
    "VS Code Extensions for Browser Preview and Mobile.md", # Recent VS Code setup
    "code-mode-guidelines.md",                 # Active guidelines
    "package-development-guide.md",            # Active development guide
    "vscode-setup-instructions.md"             # Active setup instructions
)

# Create archive directory if it doesn't exist
$archiveDir = "docs-archive"
if (-not (Test-Path $archiveDir)) {
    New-Item -ItemType Directory -Path $archiveDir | Out-Null
    Write-Host "Created archive directory: $archiveDir"
}

# Move files to archive directory
$movedCount = 0
foreach ($file in $filesToArchive) {
    if (Test-Path $file) {
        Move-Item -Path $file -Destination "$archiveDir/$file"
        Write-Host "Archived: $file"
        $movedCount++
    } else {
        Write-Host "File not found: $file"
    }
}

Write-Host "Archived $movedCount files to $archiveDir"
Write-Host "Kept the following files in root directory:"
foreach ($file in $filesToKeep) {
    if (Test-Path $file) {
        Write-Host "  - $file"
    }
}

Write-Host "Documentation archiving complete!"