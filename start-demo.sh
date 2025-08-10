#!/bin/bash

echo "========================================"
echo "   LMS Prototype - Docker Demo Setup"
echo "========================================"
echo

echo "[1/4] Checking Docker installation..."
if ! command -v docker &> /dev/null; then
    echo "❌ ERROR: Docker is not installed!"
    echo "Please install Docker and try again."
    exit 1
fi
echo "✅ Docker is installed"

echo
echo "[2/4] Building LMS Demo container..."
if ! docker-compose build; then
    echo "❌ ERROR: Failed to build container!"
    exit 1
fi
echo "✅ Container built successfully"

echo
echo "[3/4] Starting LMS Demo..."
if ! docker-compose up -d; then
    echo "❌ ERROR: Failed to start container!"
    exit 1
fi
echo "✅ LMS Demo is starting..."

echo
echo "[4/4] Waiting for application to be ready..."
sleep 10
echo "✅ Application should be ready!"

echo
echo "========================================"
echo "   🎉 LMS DEMO IS READY! 🎉"
echo "========================================"
echo
echo "📱 Open in browser: http://localhost:3000"
echo "🌐 Share with others: http://YOUR_IP:3000"
echo
echo "👤 Demo Login:"
echo "   Email: demo@lms.com"
echo "   Password: demo123"
echo
echo "🛑 To stop demo: docker-compose down"
echo "📊 View logs: docker-compose logs -f"
echo
