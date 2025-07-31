#!/bin/bash

# Frontend Setup Script
# This script helps set up the frontend environment

echo "🚀 Setting up frontend environment..."

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "📝 Creating .env.local from example..."
    cp env.local.example .env.local
    echo "✅ .env.local created with default settings"
    echo "   API URL: http://localhost:8000"
else
    echo "✅ .env.local already exists"
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

echo "✅ Frontend setup completed!"
echo ""
echo "To start development:"
echo "npm run dev"
echo ""
echo "To build for production:"
echo "npm run build"
echo ""
echo "Current API URL: $(grep NEXT_PUBLIC_API_URL .env.local | cut -d '=' -f2)" 