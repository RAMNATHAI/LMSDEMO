@echo off
echo ========================================
echo    Push LMS Prototype to GitHub
echo ========================================
echo.

echo Please create a GitHub repository first:
echo 1. Go to https://github.com/new
echo 2. Repository name: lms-prototype-demo
echo 3. Description: LMS Prototype - CHECKPOINT 50 - Advanced Course Catalog with Filtering
echo 4. Make it Public
echo 5. Don't initialize with README
echo.

set /p repo_url="Enter your GitHub repository URL (https://github.com/USERNAME/lms-prototype-demo.git): "

if "%repo_url%"=="" (
    echo ERROR: Repository URL is required!
    pause
    exit /b 1
)

echo.
echo Adding GitHub remote...
git remote add origin %repo_url%

echo.
echo Pushing to GitHub...
git branch -M main
git push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo    🎉 SUCCESS! 🎉
    echo ========================================
    echo.
    echo ✅ LMS Prototype pushed to GitHub!
    echo 📱 Repository: %repo_url%
    echo 🌐 Demo instructions in README.md
    echo.
    echo 🚀 Others can now:
    echo    1. Clone: git clone %repo_url%
    echo    2. Run: start-demo.bat
    echo    3. Access: http://localhost:3000
    echo.
) else (
    echo.
    echo ❌ ERROR: Failed to push to GitHub!
    echo Please check your repository URL and try again.
)

pause
