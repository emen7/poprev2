# PowerShell script to analyze git status and categorize files

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
Write-ColoredText "Git Status Analysis Tool" $colorCyan
Write-ColoredText "=========================" $colorCyan
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

# Get git status
Write-Host "Analyzing git status..."
$gitStatus = git status --porcelain -uall

if (-not $gitStatus) {
    Write-ColoredText "No changes detected. Working tree is clean." $colorGreen
    exit 0
}

# Initialize counters and collections
$totalFiles = 0
$stagedFiles = 0
$unstagedFiles = 0
$untrackedFiles = 0

# Initialize category collections
$sourceCodeFiles = @()
$configFiles = @()
$documentationFiles = @()
$generatedFiles = @()
$dependencyFiles = @()
$assetFiles = @()
$buildFiles = @()
$tempFiles = @()
$otherFiles = @()

# Define file extension patterns for categorization
$sourceCodeExtensions = @(".js", ".jsx", ".ts", ".tsx", ".css", ".scss", ".html", ".py", ".java", ".c", ".cpp", ".cs", ".go", ".rb", ".php")
$configExtensions = @(".json", ".yml", ".yaml", ".xml", ".config", ".conf", ".ini", ".env", ".toml", ".eslintrc", ".prettierrc", ".babelrc")
$documentationExtensions = @(".md", ".txt", ".pdf", ".doc", ".docx", ".rtf", ".csv")
$assetExtensions = @(".png", ".jpg", ".jpeg", ".gif", ".svg", ".ico", ".webp", ".mp3", ".mp4", ".wav", ".ogg", ".ttf", ".woff", ".woff2", ".eot")

# Define path patterns for categorization
$generatedPatterns = @("dist/", "build/", ".next/", "node_modules/", "coverage/", "*.min.*", "*.generated.*", "*.bundle.*")
$dependencyPatterns = @("node_modules/", "packages/", "vendor/", "bower_components/")
$buildPatterns = @("dist/", "build/", ".next/", "out/", "target/", "bin/", "obj/")
$tempPatterns = @(".DS_Store", "Thumbs.db", "*.log", "*.tmp", "*.temp", ".cache/", "*.swp", "*.swo")

# Function to categorize a file based on its path and extension
function Get-FileCategory {
    param (
        [string]$filePath
    )
    
    # Check for generated files
    foreach ($pattern in $generatedPatterns) {
        if ($filePath -like $pattern) {
            return "generated"
        }
    }
    
    # Check for dependency files
    foreach ($pattern in $dependencyPatterns) {
        if ($filePath -like $pattern) {
            return "dependency"
        }
    }
    
    # Check for build files
    foreach ($pattern in $buildPatterns) {
        if ($filePath -like $pattern) {
            return "build"
        }
    }
    
    # Check for temporary files
    foreach ($pattern in $tempPatterns) {
        if ($filePath -like $pattern) {
            return "temp"
        }
    }
    
    # Get file extension
    $extension = [System.IO.Path]::GetExtension($filePath).ToLower()
    
    # Categorize by extension
    if ($sourceCodeExtensions -contains $extension) {
        return "source"
    } elseif ($configExtensions -contains $extension) {
        return "config"
    } elseif ($documentationExtensions -contains $extension) {
        return "documentation"
    } elseif ($assetExtensions -contains $extension) {
        return "asset"
    } else {
        return "other"
    }
}

# Process git status output
foreach ($line in $gitStatus) {
    $totalFiles++
    
    # Parse status and file path
    $status = $line.Substring(0, 2).Trim()
    $filePath = $line.Substring(3)
    
    # Determine file status
    if ($status -eq "??") {
        $untrackedFiles++
        $fileStatus = "untracked"
    } elseif ($status[0] -ne " ") {
        $stagedFiles++
        $fileStatus = "staged"
    } else {
        $unstagedFiles++
        $fileStatus = "unstaged"
    }
    
    # Categorize file
    $category = Get-FileCategory -filePath $filePath
    
    # Add file to appropriate category collection
    $fileInfo = [PSCustomObject]@{
        Path = $filePath
        Status = $fileStatus
    }
    
    switch ($category) {
        "source" { $sourceCodeFiles += $fileInfo }
        "config" { $configFiles += $fileInfo }
        "documentation" { $documentationFiles += $fileInfo }
        "generated" { $generatedFiles += $fileInfo }
        "dependency" { $dependencyFiles += $fileInfo }
        "asset" { $assetFiles += $fileInfo }
        "build" { $buildFiles += $fileInfo }
        "temp" { $tempFiles += $fileInfo }
        "other" { $otherFiles += $fileInfo }
    }
}

# Print summary
Write-Host ""
Write-ColoredText "Summary:" $colorCyan
Write-Host "Total files: $totalFiles"
Write-Host "  - Staged: $stagedFiles"
Write-Host "  - Unstaged: $unstagedFiles"
Write-Host "  - Untracked: $untrackedFiles"
Write-Host ""

# Function to print category summary
function Write-CategorySummary {
    param (
        [string]$category,
        [array]$files,
        [string]$color,
        [string]$recommendation
    )
    
    if ($files.Count -eq 0) {
        return
    }
    
    Write-ColoredText "$category Files: $($files.Count)" $color
    Write-Host "Recommendation: $recommendation"
    
    # Count by status
    $stagedCount = ($files | Where-Object { $_.Status -eq "staged" }).Count
    $unstagedCount = ($files | Where-Object { $_.Status -eq "unstaged" }).Count
    $untrackedCount = ($files | Where-Object { $_.Status -eq "untracked" }).Count
    
    Write-Host "  - Staged: $stagedCount"
    Write-Host "  - Unstaged: $unstagedCount"
    Write-Host "  - Untracked: $untrackedCount"
    
    # Print sample files (up to 5)
    $sampleFiles = $files | Select-Object -First 5
    if ($sampleFiles.Count -gt 0) {
        Write-Host "  Sample files:"
        foreach ($file in $sampleFiles) {
            $statusColor = switch ($file.Status) {
                "staged" { $colorGreen }
                "unstaged" { $colorYellow }
                "untracked" { $colorRed }
                default { $colorReset }
            }
            Write-Host "    - $($statusColor)[$($file.Status)]$colorReset $($file.Path)"
        }
        
        if ($files.Count -gt 5) {
            Write-Host "    ... and $($files.Count - 5) more"
        }
    }
    
    Write-Host ""
}

# Print category summaries with recommendations
Write-CategorySummary -category "Source Code" -files $sourceCodeFiles -color $colorGreen -recommendation "Stage and commit these files in logical groups"
Write-CategorySummary -category "Configuration" -files $configFiles -color $colorCyan -recommendation "Stage and commit these files, but check for sensitive information"
Write-CategorySummary -category "Documentation" -files $documentationFiles -color $colorBlue -recommendation "Stage and commit these files"
Write-CategorySummary -category "Generated" -files $generatedFiles -color $colorRed -recommendation "Add to .gitignore, do not commit"
Write-CategorySummary -category "Dependencies" -files $dependencyFiles -color $colorRed -recommendation "Add to .gitignore, do not commit"
Write-CategorySummary -category "Assets" -files $assetFiles -color $colorMagenta -recommendation "Stage and commit these files, consider Git LFS for large files"
Write-CategorySummary -category "Build" -files $buildFiles -color $colorRed -recommendation "Add to .gitignore, do not commit"
Write-CategorySummary -category "Temporary" -files $tempFiles -color $colorRed -recommendation "Add to .gitignore, do not commit"
Write-CategorySummary -category "Other" -files $otherFiles -color $colorYellow -recommendation "Review these files individually"

# Generate .gitignore recommendations
$gitignoreRecommendations = @()

if ($generatedFiles.Count -gt 0) {
    $gitignoreRecommendations += "# Generated files"
    $gitignoreRecommendations += "dist/"
    $gitignoreRecommendations += "build/"
    $gitignoreRecommendations += ".next/"
    $gitignoreRecommendations += "*.min.*"
    $gitignoreRecommendations += "*.generated.*"
    $gitignoreRecommendations += "*.bundle.*"
}

if ($dependencyFiles.Count -gt 0) {
    $gitignoreRecommendations += "# Dependencies"
    $gitignoreRecommendations += "node_modules/"
    $gitignoreRecommendations += "packages/*/node_modules/"
    $gitignoreRecommendations += "vendor/"
    $gitignoreRecommendations += "bower_components/"
}

if ($buildFiles.Count -gt 0) {
    $gitignoreRecommendations += "# Build outputs"
    $gitignoreRecommendations += "dist/"
    $gitignoreRecommendations += "build/"
    $gitignoreRecommendations += ".next/"
    $gitignoreRecommendations += "out/"
    $gitignoreRecommendations += "target/"
    $gitignoreRecommendations += "bin/"
    $gitignoreRecommendations += "obj/"
}

if ($tempFiles.Count -gt 0) {
    $gitignoreRecommendations += "# Temporary files"
    $gitignoreRecommendations += ".DS_Store"
    $gitignoreRecommendations += "Thumbs.db"
    $gitignoreRecommendations += "*.log"
    $gitignoreRecommendations += "*.tmp"
    $gitignoreRecommendations += "*.temp"
    $gitignoreRecommendations += ".cache/"
    $gitignoreRecommendations += "*.swp"
    $gitignoreRecommendations += "*.swo"
}

# Print .gitignore recommendations
if ($gitignoreRecommendations.Count -gt 0) {
    Write-ColoredText "Recommended .gitignore additions:" $colorCyan
    Write-Host ""
    foreach ($line in $gitignoreRecommendations) {
        Write-Host $line
    }
    Write-Host ""
}

# Print staging recommendations
Write-ColoredText "Staging Recommendations:" $colorCyan
Write-Host ""
Write-Host "1. Update your .gitignore file first to exclude unnecessary files"
Write-Host "2. Stage and commit files in logical groups:"
Write-Host "   - Core configuration files first"
Write-Host "   - Source code by feature or component"
Write-Host "   - Documentation and assets last"
Write-Host ""
Write-Host "Example git commands:"
Write-Host ""
Write-Host "# Update .gitignore"
Write-Host "git add .gitignore"
Write-Host "git commit -m 'Update .gitignore to exclude generated and temporary files'"
Write-Host ""
Write-Host "# Stage and commit configuration files"
Write-Host "git add package.json tsconfig.json"
Write-Host "git commit -m 'Add core configuration files'"
Write-Host ""
Write-Host "# Stage and commit source code by package"
Write-Host "git add packages/ui/src/"
Write-Host "git commit -m 'Add UI package implementation'"
Write-Host ""
Write-Host "# Stage and commit documentation"
Write-Host "git add *.md"
Write-Host "git commit -m 'Add documentation files'"
Write-Host ""

Write-ColoredText "Next Steps:" $colorCyan
Write-Host "1. Review the categorized files and recommendations"
Write-Host "2. Update your .gitignore file to exclude unnecessary files"
Write-Host "3. Stage and commit files in logical groups"
Write-Host "4. Consider using git add -p for more granular control over what gets staged"
Write-Host ""