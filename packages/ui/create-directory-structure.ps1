# Script to create the new directory structure for the Storybook reorganization

# Define the directories to create
$directories = @(
    # Core components
    "src/core",
    "src/core/buttons",
    "src/core/indicators",
    "src/core/navigation",
    "src/core/pullup",
    "src/core/settings",
    "src/core/theme",
    "src/core/toggles",
    
    # Reader Core components
    "src/reader-core",
    "src/reader-core/components",
    "src/reader-core/content",
    "src/reader-core/layout",
    "src/reader-core/panels",
    "src/reader-core/pullup",
    
    # Application components
    "src/applications",
    "src/applications/ub-reader",
    "src/applications/ub-reader/content",
    "src/applications/ub-reader/layout",
    "src/applications/scientific-reader",
    
    # Examples
    "src/examples/ub-reader",
    "src/examples/scientific-reader"
)

# Create the directories
foreach ($directory in $directories) {
    $fullPath = Join-Path -Path (Get-Location) -ChildPath $directory
    
    if (-not (Test-Path -Path $fullPath)) {
        Write-Host "Creating directory: $directory"
        New-Item -Path $fullPath -ItemType Directory | Out-Null
    } else {
        Write-Host "Directory already exists: $directory" -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "Directory structure created successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:"
Write-Host "1. Run the update-storybook-structure.ps1 script to update story titles"
Write-Host "2. Move files to their new locations according to the directory-reorganization-plan.md"
Write-Host "3. Update import statements in the codebase"
Write-Host "4. Test the reorganized structure"
