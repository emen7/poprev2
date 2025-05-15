# Master script for Storybook reorganization

# Function to display a section header
function Show-SectionHeader {
    param (
        [string]$title
    )

    Write-Host ""
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host " $title" -ForegroundColor Cyan
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host ""
}

# Function to prompt for confirmation
function Confirm-Action {
    param (
        [string]$message
    )

    $confirmation = Read-Host "$message (y/n)"
    return $confirmation -eq "y"
}

# Display welcome message
Show-SectionHeader "Storybook Reorganization"
Write-Host "This script will guide you through the process of reorganizing the Storybook structure."
Write-Host "The reorganization will categorize components into four main groups:"
Write-Host "  1. Core - Basic UI components that are application-agnostic"
Write-Host "  2. Reader Core - Components specific to reader applications but shared across different readers"
Write-Host "  3. Applications - Components specific to individual applications (UB Reader, Scientific Reader, etc.)"
Write-Host "  4. Examples - Complete examples and demos showing integration of components"
Write-Host ""

# Confirm before proceeding
if (-not (Confirm-Action "Do you want to proceed with the reorganization?")) {
    Write-Host "Reorganization cancelled." -ForegroundColor Yellow
    exit
}

# Step 1: Create the new directory structure
Show-SectionHeader "Step 1: Create Directory Structure"
Write-Host "Creating the new directory structure..."
& ./create-directory-structure.ps1

# Confirm before proceeding to the next step
if (-not (Confirm-Action "Do you want to proceed to the next step?")) {
    Write-Host "Reorganization stopped after creating directory structure." -ForegroundColor Yellow
    exit
}

# Step 2: Update story titles
Show-SectionHeader "Step 2: Update Story Titles"
Write-Host "Updating story titles to reflect the new categorization..."
& ./update-storybook-structure.ps1

# Confirm before proceeding to the next step
if (-not (Confirm-Action "Do you want to proceed to the next step?")) {
    Write-Host "Reorganization stopped after updating story titles." -ForegroundColor Yellow
    exit
}

# Step 3: Move files to their new locations
Show-SectionHeader "Step 3: Move Files"
Write-Host "This step involves moving files to their new locations according to the directory-reorganization-plan.md."
Write-Host "Due to the complexity of this step, it needs to be done manually to ensure proper handling of each file."
Write-Host ""
Write-Host "Please follow these steps:"
Write-Host "1. Open the directory-reorganization-plan.md file"
Write-Host "2. Follow the instructions in the 'Phase 2: Move Files to New Locations' section"
Write-Host "3. Move each file to its new location as specified in the plan"
Write-Host ""

# Confirm before proceeding to the next step
if (-not (Confirm-Action "Have you completed moving the files to their new locations?")) {
    Write-Host "Reorganization stopped after updating story titles." -ForegroundColor Yellow
    exit
}

# Step 4: Update import statements
Show-SectionHeader "Step 4: Update Import Statements"
Write-Host "Updating import statements to reflect the new file locations..."
& ./update-imports.ps1

# Step 5: Test the reorganized structure
Show-SectionHeader "Step 5: Test the Reorganized Structure"
Write-Host "Testing the reorganized structure..."
Write-Host "Running Storybook to verify that all components are displayed correctly..."

# Start Storybook
if (Confirm-Action "Do you want to start Storybook to test the reorganization?") {
    Write-Host "Starting Storybook..."
    npm run storybook
}

# Final message
Show-SectionHeader "Reorganization Complete"
Write-Host "The Storybook reorganization is complete!"
Write-Host ""
Write-Host "Next steps:"
Write-Host "1. Verify that all components are displayed correctly in Storybook"
Write-Host "2. Check that the new categorization makes sense"
Write-Host "3. Verify that all components can be imported and used correctly"
Write-Host "4. Update any documentation that references the old structure"
Write-Host ""
Write-Host "If you encounter any issues, refer to the STORYBOOK-REORGANIZATION.md file for guidance."
