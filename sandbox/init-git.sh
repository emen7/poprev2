#!/bin/bash

# Initialize Git repository
git init

# Add all files
git add .

# Make initial commit
git commit -m "Initial commit: PopRev2 document presentation platform"

# Instructions for adding a remote repository
echo ""
echo "Git repository initialized with initial commit."
echo ""
echo "To push to GitHub, create a new repository on GitHub and then run:"
echo "git remote add origin https://github.com/yourusername/poprev2.git"
echo "git branch -M main"
echo "git push -u origin main"
echo ""
echo "Replace 'yourusername' with your GitHub username and 'poprev2' with your repository name."