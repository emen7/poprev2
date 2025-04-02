# Setup Search Functionality
# This script installs the necessary dependencies and builds the search index

# Install Fuse.js
Write-Host "Installing Fuse.js..." -ForegroundColor Green
npm install fuse.js

# Create sample content directories
Write-Host "Creating sample content directories..." -ForegroundColor Green
New-Item -Path "content/posts" -ItemType Directory -Force | Out-Null
New-Item -Path "content/raw/scientific/markdown" -ItemType Directory -Force | Out-Null
New-Item -Path "content/raw/perplexity" -ItemType Directory -Force | Out-Null
New-Item -Path "content/raw/lectionary" -ItemType Directory -Force | Out-Null

# Copy existing content if available
Write-Host "Copying existing content..." -ForegroundColor Green
if (Test-Path "src/content/posts") {
    Copy-Item -Path "src/content/posts/*" -Destination "content/posts/" -Recurse -Force -ErrorAction SilentlyContinue
}

if (Test-Path "src/content/raw/scientific/markdown") {
    Copy-Item -Path "src/content/raw/scientific/markdown/*" -Destination "content/raw/scientific/markdown/" -Recurse -Force -ErrorAction SilentlyContinue
}

if (Test-Path "src/content/raw/perplexity") {
    Copy-Item -Path "src/content/raw/perplexity/*" -Destination "content/raw/perplexity/" -Recurse -Force -ErrorAction SilentlyContinue
}

if (Test-Path "src/content/raw/lectionary") {
    Copy-Item -Path "src/content/raw/lectionary/*" -Destination "content/raw/lectionary/" -Recurse -Force -ErrorAction SilentlyContinue
}

# Create a sample post if none exists
if (-not (Test-Path "content/posts/hello-world.md")) {
    Write-Host "Creating a sample post..." -ForegroundColor Green
    $samplePost = @"
---
title: Hello, World!
author: PopRev2 Team
date: 2025-03-26
categories: [General]
tags: [Welcome, Introduction]
---

# Hello, World!

Welcome to PopRev2, a versatile document presentation platform. This is a sample post to demonstrate the search functionality.

## Features

- Multi-purpose document presentation
- Uniform display across web and mobile interfaces
- Support for various document types
- Intuitive navigation and organization

## Getting Started

Explore the different document types and use the search functionality to find content across the platform.
"@

    Set-Content -Path "content/posts/hello-world.md" -Value $samplePost
}

# Build the search index
Write-Host "Building search index..." -ForegroundColor Green
npm run build:search-index

Write-Host "Setup complete! You can now use the search functionality." -ForegroundColor Green