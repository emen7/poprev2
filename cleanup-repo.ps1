# PowerShell script to clean up build artifacts and temporary files

Write-Host "Starting repository cleanup..." -ForegroundColor Green

# Function to remove directories and files safely
function Remove-SafeItem {
    param (
        [string]$Path,
        [string]$Description
    )
    
    if (Test-Path $Path) {
        Write-Host "Removing $Description at $Path..." -ForegroundColor Yellow
        try {
            Remove-Item -Path $Path -Recurse -Force -ErrorAction Stop
            Write-Host "Successfully removed $Description." -ForegroundColor Green
        }
        catch {
            $errorMessage = $Error[0].ToString()
            Write-Host "Error removing $Description. Error: $errorMessage" -ForegroundColor Red
        }
    }
    else {
        Write-Host "$Description not found at $Path. Skipping." -ForegroundColor Cyan
    }
}

# Clean up Turborepo cache
Remove-SafeItem -Path ".turbo" -Description "Turborepo cache"
Remove-SafeItem -Path "**/.turbo" -Description "Nested Turborepo cache"

# Clean up Next.js build outputs
Remove-SafeItem -Path ".next" -Description "Next.js build output"
Remove-SafeItem -Path "apps/*/.next" -Description "Next.js app build outputs"
Remove-SafeItem -Path "out" -Description "Next.js export output"
Remove-SafeItem -Path "apps/*/out" -Description "Next.js app export outputs"

# Clean up Node.js artifacts
Remove-SafeItem -Path "node_modules/.cache" -Description "Node modules cache"
Remove-SafeItem -Path "**/node_modules/.cache" -Description "Nested Node modules cache"

# Clean up TypeScript build artifacts
Remove-SafeItem -Path "tsconfig.tsbuildinfo" -Description "TypeScript build info"
Remove-SafeItem -Path "**/tsconfig.tsbuildinfo" -Description "Nested TypeScript build info"

# Clean up build directories
Remove-SafeItem -Path "dist" -Description "Distribution directory"
Remove-SafeItem -Path "**/dist" -Description "Nested distribution directories"
Remove-SafeItem -Path "build" -Description "Build directory"
Remove-SafeItem -Path "**/build" -Description "Nested build directories"

# Clean up cache directories
Remove-SafeItem -Path ".cache" -Description "Cache directory"
Remove-SafeItem -Path "**/.cache" -Description "Nested cache directories"

# Clean up test coverage
Remove-SafeItem -Path "coverage" -Description "Test coverage"
Remove-SafeItem -Path "**/coverage" -Description "Nested test coverage"
Remove-SafeItem -Path ".nyc_output" -Description "NYC output"
Remove-SafeItem -Path "**/.nyc_output" -Description "Nested NYC output"

# Clean up log files
Remove-SafeItem -Path "*.log" -Description "Log files"
Remove-SafeItem -Path "**/*.log" -Description "Nested log files"

# Clean up temporary files
Remove-SafeItem -Path "*.tmp" -Description "Temporary files"
Remove-SafeItem -Path "**/*.tmp" -Description "Nested temporary files"
Remove-SafeItem -Path "*.temp" -Description "Temp files"
Remove-SafeItem -Path "**/*.temp" -Description "Nested temp files"
Remove-SafeItem -Path "*.bak" -Description "Backup files"
Remove-SafeItem -Path "**/*.bak" -Description "Nested backup files"

Write-Host "Cleanup complete!" -ForegroundColor Green
Write-Host "You can now check git status to see the reduced number of changes." -ForegroundColor Green
Write-Host "Note: You may need to restart your development server if it was running during cleanup." -ForegroundColor Yellow