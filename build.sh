#!/bin/bash

# Check Node.js version
REQUIRED_NODE="18.16.0"
CURRENT_NODE=$(node --version | cut -d'v' -f2)

echo "Required Node.js version: $REQUIRED_NODE"
echo "Current Node.js version: $CURRENT_NODE"

# Check if Node.js version is compatible
if [[ "$CURRENT_NODE" == 18.* ]]; then
    echo "Node.js version is compatible"
else
    echo "Warning: Node.js version may not be compatible"
fi

# Install dependencies with legacy peer deps
echo "Installing dependencies..."
npm ci --legacy-peer-deps

# Build the project
echo "Building project..."
npm run build

echo "Build completed successfully!"
