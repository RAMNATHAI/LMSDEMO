@echo off
echo ========================================
echo    Deploy LMS Prototype to Surge.sh
echo ========================================
echo.

echo [1/4] Installing Surge globally...
npm install -g surge
if %errorlevel% neq 0 (
    echo ERROR: Failed to install Surge!
    pause
    exit /b 1
)

echo.
echo [2/4] Building the project...
npm run build
if %errorlevel% neq 0 (
    echo ERROR: Build failed! Check the errors above.
    pause
    exit /b 1
)

echo.
echo [3/4] Deploying to Surge.sh...
echo.
echo Please choose a domain name (or press Enter for random):
echo Example: lms-prototype-demo.surge.sh
set /p domain="Domain name: "

if "%domain%"=="" (
    set domain=lms-prototype-demo-%RANDOM%.surge.sh
)

cd dist
surge . %domain%

echo.
echo ========================================
echo    🎉 DEPLOYMENT COMPLETE! 🎉
echo ========================================
echo.
echo 🌐 Your live demo: https://%domain%
echo 📱 Share this URL with anyone!
echo.
echo Demo Credentials:
echo   Email: demo@lms.com
echo   Password: demo123
echo.
pause
