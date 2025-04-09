# Clean VS Code Tabs Script
# This script checks if the files in the open VS Code tabs actually exist
# and provides instructions for closing tabs that reference non-existent files.

Write-Host "Checking for non-existent files in VS Code tabs..." -ForegroundColor Cyan

# Get the list of open tabs from the environment_details
$openTabs = @(
    "src/lib/document-transformer/types.ts",
    "src/lib/document-transformer/markdown-transformer.ts",
    "src/lib/document-transformer/content-normalizer.ts",
    "src/lib/document-transformer/metadata-enricher.ts",
    "src/lib/document-transformer/content-validator.ts",
    "src/app/example/page.tsx",
    "src/components/document-reader.css",
    "src/lib/document-transformer/docx-transformer.ts",
    "src/components/document-reader.tsx",
    "src/init-git.sh",
    "src/.eslintrc.json",
    "src/next.config.ts",
    "src/app/test/page.tsx",
    "src/architecture-plan-updated.md",
    "src/architecture-plan.md",
    "src/tina/schema.ts",
    "src/tina/queries.ts",
    "src/components/tina-provider.tsx",
    "src/scripts/init-tina.js",
    "src/app/tina-example/page.tsx"
)

$nonExistentFiles = @()
$existingFiles = @()

foreach ($tab in $openTabs) {
    $fullPath = Join-Path -Path (Get-Location) -ChildPath $tab
    if (-not (Test-Path $fullPath)) {
        $nonExistentFiles += $tab
    } else {
        $existingFiles += $tab
    }
}

# Display results
Write-Host "`nResults:" -ForegroundColor Green
Write-Host "--------" -ForegroundColor Green

if ($nonExistentFiles.Count -gt 0) {
    Write-Host "`nThe following files do not exist but are open in VS Code tabs:" -ForegroundColor Yellow
    foreach ($file in $nonExistentFiles) {
        Write-Host "  - $file" -ForegroundColor Yellow
    }
    
    Write-Host "`nTo resolve the 'strange loop' issue, please:" -ForegroundColor Cyan
    Write-Host "1. Close VS Code completely" -ForegroundColor Cyan
    Write-Host "2. Reopen VS Code" -ForegroundColor Cyan
    Write-Host "3. Open the project again" -ForegroundColor Cyan
    Write-Host "This will refresh VS Code's file cache and state." -ForegroundColor Cyan
} else {
    Write-Host "All open tabs reference existing files." -ForegroundColor Green
}

if ($existingFiles.Count -gt 0) {
    Write-Host "`nThe following files exist and are open in VS Code tabs:" -ForegroundColor Green
    foreach ($file in $existingFiles) {
        Write-Host "  - $file" -ForegroundColor Green
    }
}

Write-Host "`nDone!" -ForegroundColor Cyan