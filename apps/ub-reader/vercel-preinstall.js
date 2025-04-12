const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Running Vercel preinstall script...');

// Function to update package.json to remove workspace: references
function updatePackageJson(packageJsonPath) {
  if (!fs.existsSync(packageJsonPath)) {
    return false;
  }

  console.log(`Updating ${packageJsonPath}...`);
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  let modified = false;

  if (packageJson.dependencies) {
    Object.keys(packageJson.dependencies).forEach(dep => {
      const version = packageJson.dependencies[dep];
      if (typeof version === 'string' && version.startsWith('workspace:')) {
        console.log(`  Replacing workspace: reference for ${dep}`);
        packageJson.dependencies[dep] = '0.1.0';
        modified = true;
      }
    });
  }

  if (packageJson.devDependencies) {
    Object.keys(packageJson.devDependencies).forEach(dep => {
      const version = packageJson.devDependencies[dep];
      if (typeof version === 'string' && version.startsWith('workspace:')) {
        console.log(`  Replacing workspace: reference for ${dep}`);
        packageJson.devDependencies[dep] = '0.1.0';
        modified = true;
      }
    });
  }

  if (modified) {
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    return true;
  }

  return false;
}

// Update package.json files in the monorepo
const rootDir = path.resolve(__dirname, '../..');
const packagesDir = path.join(rootDir, 'packages');

if (fs.existsSync(packagesDir)) {
  const packages = fs.readdirSync(packagesDir);
  packages.forEach(pkg => {
    const packageJsonPath = path.join(packagesDir, pkg, 'package.json');
    updatePackageJson(packageJsonPath);
  });
}

// Update the root package.json
updatePackageJson(path.join(rootDir, 'package.json'));

// Update the app's package.json
updatePackageJson(path.join(__dirname, 'package.json'));

console.log('Preinstall script completed');
