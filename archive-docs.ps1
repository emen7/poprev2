# PowerShell script to archive outdated documentation files

# List of files to archive (implementation plans and other outdated docs)
$filesToArchive = @(
    "document-transformer-next-steps.md",
    "next-steps-implementation-plan.md",
    "notation-system-implementation-plan.md",
    "reader-features-implementation-plan.md",
    "repository-cleanup-benefits.md",
    "repository-cleanup-master-plan.md",
    "repository-cleanup-next-steps.md",
    "repository-cleanup-plan-summary.md",
    "repository-cleanup-plan.md",
    "repository-cleanup-quick-reference.md",
    "repository-cleanup-revised-plan.md",
    "repository-cleanup-risks-and-mitigations.md",
    "repository-cleanup-summary.md",
    "repository-structure-refinement-plan.md",
    "sticky-headers-and-responsive-navigation-implementation-plan.md",
    "ub-content-management-implementation-plan.md",
    "ub-ecosystem-implementation-plan.md",
    "ub-ecosystem-master-implementation-plan.md",
    "ub-reader-comprehensive-implementation-plan.md",
    "ub-reader-enhancement-plan.md",
    "ub-reader-experience-implementation-plan.md",
    "ub-reader-implementation-detailed-plan.md",
    "ub-reader-implementation-plan.md",
    "ub-reader-incremental-implementation-plan.md",
    "ub-unified-ui-implementation-plan.md",
    "ui-component-duplication-resolution-plan.md"
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

# Also check docs directory for outdated documentation
$docsDir = "docs"
if (Test-Path $docsDir) {
    $docFiles = Get-ChildItem -Path $docsDir -Filter "*.md"
    
    # Create docs archive subdirectory
    $docsArchiveDir = "$archiveDir/docs"
    if (-not (Test-Path $docsArchiveDir)) {
        New-Item -ItemType Directory -Path $docsArchiveDir | Out-Null
    }
    
    # Move implementation plan files from docs directory
    $docsMovedCount = 0
    foreach ($file in $docFiles) {
        if ($file.Name -like "*implementation-plan*" -or $file.Name -like "*plan*") {
            Move-Item -Path $file.FullName -Destination "$docsArchiveDir/$($file.Name)"
            Write-Host "Archived from docs: $($file.Name)"
            $docsMovedCount++
        }
    }
    
    Write-Host "Archived $docsMovedCount files from docs directory"
}

# Update .gitignore to ignore the archive directory
$gitignorePath = ".gitignore"
$gitignoreContent = Get-Content $gitignorePath -ErrorAction SilentlyContinue

if ($gitignoreContent -notcontains "docs-archive/") {
    Add-Content -Path $gitignorePath -Value "`n# Archived documentation`ndocs-archive/"
    Write-Host "Updated .gitignore to ignore docs-archive directory"
}

Write-Host "Documentation archiving complete!"