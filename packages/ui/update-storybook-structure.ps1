# Script to update Storybook story titles according to the new structure
# This script will update the title property in story files to follow the new categorization

# Define the mapping of current titles to new titles
$titleMapping = @{
    # Core components
    "UI/Button" = "Core/Buttons/Button"
    "UI/TextAlignmentToggle" = "Core/Toggles/TextAlignmentToggle"
    "UI/ThemeToggle" = "Core/Toggles/ThemeToggle"
    "UI/ThemeSettings" = "Core/Settings/ThemeSettings"
    "Navigation/TabsComponent" = "Core/Navigation/TabsComponent"
    "UI/Pullup/SnapPointIndicator" = "Core/Indicators/SnapPointIndicator"
    "UI/Pullup/EnhancedPullup" = "Core/Pullup/EnhancedPullup"
    "Theme/ThemeToggle" = "Core/Theme/ThemeToggle"
    "Theme/ReaderThemeProvider" = "Core/Theme/ReaderThemeProvider"
    "Examples/SimpleButton" = "Core/Buttons/SimpleButton"
    
    # Reader Core components
    "Content/ParagraphComponent" = "ReaderCore/Content/ParagraphComponent"
    "Content/SectionTitle" = "ReaderCore/Content/SectionTitle"
    "Content/ParagraphRenderer" = "ReaderCore/Content/ParagraphRenderer"
    "Layout/ReaderLayout" = "ReaderCore/Layout/ReaderLayout"
    "UB Reader/Pullup/PullupPanel" = "ReaderCore/Pullup/PullupPanel"
    "UB Reader/Pullup/PullupTabs" = "ReaderCore/Pullup/PullupTabs"
    "UB Reader/Pullup/SearchTab" = "ReaderCore/Pullup/SearchTab"
    "UB Reader/Panels/NotesPanel" = "ReaderCore/Panels/NotesPanel"
    "UB Reader/Components/NoteEditor" = "ReaderCore/Components/NoteEditor"
    "UB Reader/Components/ParagraphRenderer" = "ReaderCore/Components/ParagraphRenderer"
    "UB Reader/Components/SelectionMenu" = "ReaderCore/Components/SelectionMenu"
    
    # Application components
    "UB Reader/Content/UBParagraph" = "Applications/UBReader/Content/UBParagraph"
    "UB Reader/Layout/UBReaderLayout" = "Applications/UBReader/Layout/UBReaderLayout"
    "No section title provided" = "Applications/UBReader/Content/UBSection"
    
    # Examples
    "UB Reader/Examples/UBReaderDemo" = "Examples/UBReader/ReaderDemo"
    "Examples/UB Reader Theme Demo" = "Examples/UBReader/ThemeDemo"
    "Examples/UB Reader With Search" = "Examples/UBReader/SearchDemo"
}

# Function to update the title in a story file
function Update-StoryTitle {
    param (
        [string]$filePath,
        [string]$oldTitle,
        [string]$newTitle
    )
    
    $content = Get-Content $filePath -Raw
    
    # Check if the file contains the old title
    if ($content -match "title:\s*['`"]$oldTitle['`"]") {
        Write-Host "Updating $filePath"
        Write-Host "  Old title: $oldTitle"
        Write-Host "  New title: $newTitle"
        
        # Replace the title
        $updatedContent = $content -replace "title:\s*['`"]$oldTitle['`"]", "title: '$newTitle'"
        
        # Write the updated content back to the file
        Set-Content -Path $filePath -Value $updatedContent
        
        return $true
    }
    
    return $false
}

# Get all story files
$storyFiles = Get-ChildItem -Path "src" -Recurse -Filter "*.stories.tsx" | Select-Object FullName

# Initialize counters
$updatedFiles = 0
$skippedFiles = 0

# Process each story file
foreach ($file in $storyFiles) {
    $filePath = $file.FullName
    $content = Get-Content $filePath -Raw
    
    # Extract the current title
    if ($content -match "title:\s*['`"]([^'`"]+)['`"]") {
        $currentTitle = $matches[1]
        
        # Check if we have a mapping for this title
        if ($titleMapping.ContainsKey($currentTitle)) {
            $newTitle = $titleMapping[$currentTitle]
            $updated = Update-StoryTitle -filePath $filePath -oldTitle $currentTitle -newTitle $newTitle
            
            if ($updated) {
                $updatedFiles++
            } else {
                $skippedFiles++
                Write-Host "Failed to update $filePath" -ForegroundColor Yellow
            }
        } else {
            $skippedFiles++
            Write-Host "No mapping found for title: $currentTitle in file: $filePath" -ForegroundColor Yellow
        }
    } else {
        $skippedFiles++
        Write-Host "Could not extract title from file: $filePath" -ForegroundColor Yellow
    }
}

# Print summary
Write-Host ""
Write-Host "Summary:" -ForegroundColor Cyan
Write-Host "Updated files: $updatedFiles"
Write-Host "Skipped files: $skippedFiles"
Write-Host "Total files: $($updatedFiles + $skippedFiles)"
