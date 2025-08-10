@echo off
echo ========================================
echo    LMS Prototype - Docker Demo Setup
echo ========================================
echo.

echo [1/4] Checking Docker installation...
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Docker is not installed or not running!
    echo Please install Docker Desktop and try again.
    pause
    exit /b 1
)
echo ✓ Docker is installed

echo.
echo [2/4] Building LMS Demo container...
docker-compose build
if %errorlevel% neq 0 (
    echo ERROR: Failed to build container!
    pause
    exit /b 1
)
echo ✓ Container built successfully

echo.
echo [3/4] Starting LMS Demo...
docker-compose up -d
if %errorlevel% neq 0 (
    echo ERROR: Failed to start container!
    pause
    exit /b 1
)
echo ✓ LMS Demo is starting...

echo.
echo [4/4] Waiting for application to be ready...
timeout /t 10 /nobreak >nul
echo ✓ Application should be ready!

echo.
echo ========================================
echo    🎉 LMS DEMO IS READY! 🎉
echo ========================================
echo.
echo 📱 Open in browser: http://localhost:3000
echo 🌐 Share with others: http://YOUR_IP:3000
echo.
echo 👤 Demo Login:
echo    Email: demo@lms.com
echo    Password: demo123
echo.
echo 🛑 To stop demo: docker-compose down
echo 📊 View logs: docker-compose logs -f
echo.
pause
