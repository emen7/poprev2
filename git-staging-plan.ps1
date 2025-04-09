# PowerShell script to help manage git staging and commits

# Define color codes for better readability
$colorReset = "$([char]27)[0m"
$colorRed = "$([char]27)[31m"
$colorGreen = "$([char]27)[32m"
$colorYellow = "$([char]27)[33m"
$colorBlue = "$([char]27)[34m"
$colorMagenta = "$([char]27)[35m"
$colorCyan = "$([char]27)[36m"

# Function to print colored text
function Write-ColoredText {
    param (
        [string]$text,
        [string]$color
    )
    Write-Host "$color$text$colorReset"
}

# Print script header
Write-ColoredText "Git Staging Plan Generator" $colorCyan
Write-ColoredText "==========================" $colorCyan
Write-Host ""

# Check if git is installed
try {
    $gitVersion = git --version
    Write-Host "Using $gitVersion"
} catch {
    Write-ColoredText "Error: Git is not installed or not in PATH" $colorRed
    exit 1
}

# Check if current directory is a git repository
if (-not (Test-Path ".git")) {
    Write-ColoredText "Error: Current directory is not a git repository" $colorRed
    exit 1
}

# Step 1: Update .gitignore
Write-ColoredText "Step 1: Update .gitignore" $colorGreen
Write-Host ""

# Read current .gitignore
$gitignorePath = ".gitignore"
$currentGitignore = @()
if (Test-Path $gitignorePath) {
    $currentGitignore = Get-Content $gitignorePath
}

# Define patterns to add to .gitignore
$patternsToAdd = @(
    "# Build outputs",
    "dist/",
    "build/",
    ".next/",
    "out/",
    "target/",
    "bin/",
    "obj/",
    "",
    "# Generated files",
    "*.generated.*",
    "*.bundle.*",
    "*.min.*",
    "*.tsbuildinfo",
    "*.js.map",
    "*.d.ts.map",
    "",
    "# Temporary files",
    ".DS_Store",
    "Thumbs.db",
    "*.log",
    "*.tmp",
    "*.temp",
    ".cache/",
    "*.swp",
    "*.swo",
    ".turbo/",
    ""
)

# Check if patterns already exist in .gitignore
$patternsToAddFiltered = @()
foreach ($pattern in $patternsToAdd) {
    if ($pattern -and -not $currentGitignore.Contains($pattern)) {
        $patternsToAddFiltered += $pattern
    }
}

# Create updated .gitignore content
if ($patternsToAddFiltered.Count -gt 0) {
    $updatedGitignore = $currentGitignore + $patternsToAddFiltered
    
    # Create a backup of the current .gitignore
    if (Test-Path $gitignorePath) {
        Copy-Item -Path $gitignorePath -Destination "$gitignorePath.bak"
        Write-Host "Created backup of current .gitignore as $gitignorePath.bak"
    }
    
    # Write updated .gitignore
    $updatedGitignore | Out-File -FilePath $gitignorePath -Encoding utf8
    Write-Host "Updated .gitignore with new patterns"
    
    # Show git command to stage and commit .gitignore
    Write-Host ""
    Write-ColoredText "Execute these commands to commit the updated .gitignore:" $colorYellow
    Write-Host "git add .gitignore"
    Write-Host "git commit -m 'Update .gitignore to exclude generated and temporary files'"
} else {
    Write-Host "No new patterns to add to .gitignore"
}

Write-Host ""

# Step 2: Generate staging plan
Write-ColoredText "Step 2: Staging Plan" $colorGreen
Write-Host ""

# Define staging groups
$stagingGroups = @(
    @{
        Name = "Core Configuration Files"
        Description = "Essential configuration files for the project"
        Command = "git add package.json package-lock.json tsconfig.json turbo.json .prettierrc"
        CommitMessage = "Add core configuration files"
    },
    @{
        Name = "UI Package"
        Description = "UI components and styles"
        Command = "git add packages/ui/"
        CommitMessage = "Add UI package implementation"
    },
    @{
        Name = "Content Packages"
        Description = "Content-related packages"
        Command = "git add packages/content-storage/ packages/content-transformer/ packages/table-transformer/"
        CommitMessage = "Add content-related packages"
    },
    @{
        Name = "Reference Parser Package"
        Description = "Reference parser implementation"
        Command = "git add packages/reference-parser/"
        CommitMessage = "Add reference parser package"
    },
    @{
        Name = "Data Models Package"
        Description = "Data models and types"
        Command = "git add packages/data-models/"
        CommitMessage = "Add data models package"
    },
    @{
        Name = "Audio Services Package"
        Description = "Audio services implementation"
        Command = "git add packages/audio-services/"
        CommitMessage = "Add audio services package"
    },
    @{
        Name = "Reader App"
        Description = "Reader application"
        Command = "git add apps/reader/"
        CommitMessage = "Add reader application"
    },
    @{
        Name = "UB Reader App"
        Description = "UB Reader application"
        Command = "git add apps/ub-reader/"
        CommitMessage = "Add UB Reader application"
    },
    @{
        Name = "Publications App"
        Description = "Publications application"
        Command = "git add apps/publications/"
        CommitMessage = "Add publications application"
    },
    @{
        Name = "Almanac App"
        Description = "Almanac application"
        Command = "git add apps/almanac-new/"
        CommitMessage = "Add almanac application"
    },
    @{
        Name = "Content Files"
        Description = "Content files for the applications"
        Command = "git add content/"
        CommitMessage = "Add content files"
    },
    @{
        Name = "Documentation"
        Description = "Documentation files"
        Command = "git add *.md docs/"
        CommitMessage = "Add documentation files"
    },
    @{
        Name = "Scripts"
        Description = "Utility scripts"
        Command = "git add scripts/"
        CommitMessage = "Add utility scripts"
    },
    @{
        Name = "Configuration"
        Description = "Configuration files"
        Command = "git add config/"
        CommitMessage = "Add configuration files"
    },
    @{
        Name = "Remaining Files"
        Description = "Any remaining files that should be tracked"
        Command = "git add ."
        CommitMessage = "Add remaining files"
    }
)

# Print staging plan
Write-Host "Here's a recommended staging plan for your repository:"
Write-Host ""

foreach ($group in $stagingGroups) {
    Write-ColoredText "$($group.Name)" $colorMagenta
    Write-Host "$($group.Description)"
    Write-Host "Command: $($group.Command)"
    Write-Host "Commit Message: $($group.CommitMessage)"
    Write-Host ""
}

# Step 3: Generate execution script
Write-ColoredText "Step 3: Execution Script" $colorGreen
Write-Host ""

# Create execution script
$executionScriptPath = "execute-staging-plan.ps1"
$executionScriptContent = @"
# PowerShell script to execute the staging plan
# Generated by git-staging-plan.ps1

# Update .gitignore
git add .gitignore
git commit -m 'Update .gitignore to exclude generated and temporary files'

"@

foreach ($group in $stagingGroups) {
    $executionScriptContent += @"
# $($group.Name)
# $($group.Description)
$($group.Command)
git commit -m '$($group.CommitMessage)'

"@
}

# Write execution script
$executionScriptContent | Out-File -FilePath $executionScriptPath -Encoding utf8
Write-Host "Created execution script: $executionScriptPath"
Write-Host ""
Write-Host "You can run this script to execute the staging plan:"
Write-Host "pwsh -File $executionScriptPath"
Write-Host ""
Write-Host "Or you can execute the commands manually, one group at a time."

# Step 4: Provide recommendations for large repositories
Write-ColoredText "Step 4: Additional Recommendations" $colorGreen
Write-Host ""
Write-Host "For large repositories like yours, consider these additional recommendations:"
Write-Host ""
Write-Host "1. Use Git LFS for large binary files:"
Write-Host "   - Install Git LFS: https://git-lfs.github.com/"
Write-Host "   - Track large files: git lfs track '*.png' '*.jpg' '*.pdf'"
Write-Host ""
Write-Host "2. Consider splitting the repository if it's becoming too large:"
Write-Host "   - Separate apps into their own repositories"
Write-Host "   - Use monorepo tools like Lerna or Nx for better management"
Write-Host ""
Write-Host "3. Use git add -p for more granular control over what gets staged:"
Write-Host "   - This allows you to stage specific hunks of changes within files"
Write-Host "   - Useful for files with multiple unrelated changes"
Write-Host ""
Write-Host "4. Set up pre-commit hooks to enforce code quality:"
Write-Host "   - Use tools like Husky to run linters and tests before commits"
Write-Host "   - Prevent committing sensitive information"
Write-Host ""

Write-ColoredText "Next Steps:" $colorCyan
Write-Host "1. Review and execute the updated .gitignore changes"
Write-Host "2. Follow the staging plan to commit files in logical groups"
Write-Host "3. Consider the additional recommendations for better repository management"
Write-Host ""