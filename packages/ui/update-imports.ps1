# Script to update import statements after moving files

# Define the mapping of old import paths to new import paths
$importMapping = @{
    # Core components
    "../components/TextAlignmentToggle" = "../core/toggles/TextAlignmentToggle"
    "../components/ThemeToggle" = "../core/toggles/ThemeToggle"
    "../components/ThemeSettings" = "../core/settings/ThemeSettings"
    "../navigation/TabsComponent" = "../core/navigation/TabsComponent"
    "../pullup/SnapPointIndicator" = "../core/indicators/SnapPointIndicator"
    "../pullup/EnhancedPullup" = "../core/pullup/EnhancedPullup"
    "../theme/ThemeToggle" = "../core/theme/ThemeToggle"
    "../theme/ReaderThemeProvider" = "../core/theme/ReaderThemeProvider"
    "../examples/SimpleButton" = "../core/buttons/SimpleButton"
    "../examples/button" = "../core/buttons/Button"
    
    # Reader Core components
    "../content/ParagraphComponent" = "../reader-core/content/ParagraphComponent"
    "../content/SectionTitle" = "../reader-core/content/SectionTitle"
    "../content/ParagraphRenderer" = "../reader-core/content/ParagraphRenderer"
    "../layout/ReaderLayout" = "../reader-core/layout/ReaderLayout"
    "../pullup/PullupPanel" = "../reader-core/pullup/PullupPanel"
    "../pullup/PullupTabs" = "../reader-core/pullup/PullupTabs"
    "../pullup/SearchTab" = "../reader-core/pullup/SearchTab"
    "../panels/NotesPanel" = "../reader-core/panels/NotesPanel"
    "../components/NoteEditor" = "../reader-core/components/NoteEditor"
    "../components/ParagraphRenderer" = "../reader-core/components/ParagraphRenderer"
    "../components/SelectionMenu" = "../reader-core/components/SelectionMenu"
    
    # Application components
    "../content/UBParagraph" = "../applications/ub-reader/content/UBParagraph"
    "../content/UBSection" = "../applications/ub-reader/content/UBSection"
    "../layout/UBReaderLayout" = "../applications/ub-reader/layout/UBReaderLayout"
    
    # Examples
    "../examples/UBReaderDemo" = "../examples/ub-reader/ReaderDemo"
    "../examples/UBReaderThemeDemo" = "../examples/ub-reader/ThemeDemo"
    "../examples/UBReaderWithSearch" = "../examples/ub-reader/SearchDemo"
}

# Function to update import statements in a file
function Update-ImportStatements {
    param (
        [string]$filePath
    )
    
    $content = Get-Content $filePath -Raw
    $originalContent = $content
    $updated = $false
    
    # Check each import mapping
    foreach ($oldImport in $importMapping.Keys) {
        $newImport = $importMapping[$oldImport]
        
        # Look for import statements with the old path
        if ($content -match "import\s+(\{[^}]+\}|\w+)\s+from\s+['\`"]$oldImport['\`"]") {
            Write-Host "Updating imports in $filePath"
            Write-Host "  Old import: $oldImport"
            Write-Host "  New import: $newImport"
            
            # Replace the import path
            $content = $content -replace "import\s+(\{[^}]+\}|\w+)\s+from\s+['\`"]$oldImport['\`"]", "import `$1 from '$newImport'"
            $updated = $true
        }
    }
    
    # Write the updated content back to the file if changes were made
    if ($updated) {
        Set-Content -Path $filePath -Value $content
        return $true
    }
    
    return $false
}

# Get all TypeScript and TypeScript React files
$tsFiles = Get-ChildItem -Path "src" -Recurse -Include "*.ts", "*.tsx" | Select-Object FullName

# Initialize counters
$updatedFiles = 0
$skippedFiles = 0

# Process each file
foreach ($file in $tsFiles) {
    $filePath = $file.FullName
    $updated = Update-ImportStatements -filePath $filePath
    
    if ($updated) {
        $updatedFiles++
    } else {
        $skippedFiles++
    }
}

# Print summary
Write-Host ""
Write-Host "Summary:" -ForegroundColor Cyan
Write-Host "Updated files: $updatedFiles"
Write-Host "Skipped files: $skippedFiles"
Write-Host "Total files: $($updatedFiles + $skippedFiles)"
