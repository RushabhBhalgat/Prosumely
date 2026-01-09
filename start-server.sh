#!/bin/bash
# Startup script for DigitalOcean App Platform with Next.js standalone build

# Copy public folder to standalone directory if it exists
if [ -d "public" ] && [ -d ".next/standalone" ]; then
  echo "Copying public folder to standalone build..."
  cp -r public .next/standalone/public
  echo "Public folder copied successfully"
fi

# Copy static files
if [ -d ".next/static" ] && [ -d ".next/standalone/.next" ]; then
  echo "Copying static files..."
  cp -r .next/static .next/standalone/.next/static
  echo "Static files copied successfully"
fi

# Start the server from standalone directory
cd .next/standalone
echo "Starting Next.js server..."
node server.js
