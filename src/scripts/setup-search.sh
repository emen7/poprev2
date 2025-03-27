#!/bin/bash

# Setup Search Functionality
# This script installs the necessary dependencies and builds the search index

# Install Fuse.js
echo "Installing Fuse.js..."
npm install fuse.js

# Create sample content
echo "Creating sample content directories..."
mkdir -p content/posts
mkdir -p content/raw/scientific/markdown
mkdir -p content/raw/perplexity
mkdir -p content/raw/lectionary

# Copy existing content if available
echo "Copying existing content..."
if [ -d "src/content/posts" ]; then
  cp -r src/content/posts/* content/posts/ 2>/dev/null || :
fi

if [ -d "src/content/raw/scientific/markdown" ]; then
  cp -r src/content/raw/scientific/markdown/* content/raw/scientific/markdown/ 2>/dev/null || :
fi

if [ -d "src/content/raw/perplexity" ]; then
  cp -r src/content/raw/perplexity/* content/raw/perplexity/ 2>/dev/null || :
fi

if [ -d "src/content/raw/lectionary" ]; then
  cp -r src/content/raw/lectionary/* content/raw/lectionary/ 2>/dev/null || :
fi

# Create a sample post if none exists
if [ ! -f "content/posts/hello-world.md" ]; then
  echo "Creating a sample post..."
  cat > content/posts/hello-world.md << EOL
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
EOL
fi

# Build the search index
echo "Building search index..."
npm run build:search-index

echo "Setup complete! You can now use the search functionality."