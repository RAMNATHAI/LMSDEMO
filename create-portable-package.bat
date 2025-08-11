@echo off
echo ========================================
echo    Creating Portable LMS Package
echo ========================================
echo.

set PACKAGE_NAME=LMS-Prototype-Portable
set CURRENT_DIR=%cd%

echo [1/4] Creating package directory...
if exist "%PACKAGE_NAME%" rmdir /s /q "%PACKAGE_NAME%"
mkdir "%PACKAGE_NAME%"

echo [2/4] Copying source files...
xcopy /E /I /H /Y "src" "%PACKAGE_NAME%\src\"
xcopy /E /I /H /Y "public" "%PACKAGE_NAME%\public\"
copy "package.json" "%PACKAGE_NAME%\"
copy "package-lock.json" "%PACKAGE_NAME%\"
copy "tsconfig.json" "%PACKAGE_NAME%\"
copy "vite.config.ts" "%PACKAGE_NAME%\"
copy "index.html" "%PACKAGE_NAME%\"
copy "README.md" "%PACKAGE_NAME%\"
copy "SETUP-NEW-SYSTEM.md" "%PACKAGE_NAME%\"

echo [3/4] Creating setup script...
echo @echo off > "%PACKAGE_NAME%\QUICK-START.bat"
echo echo ======================================== >> "%PACKAGE_NAME%\QUICK-START.bat"
echo echo    LMS Prototype - Quick Start >> "%PACKAGE_NAME%\QUICK-START.bat"
echo echo ======================================== >> "%PACKAGE_NAME%\QUICK-START.bat"
echo echo. >> "%PACKAGE_NAME%\QUICK-START.bat"
echo echo [1/3] Installing dependencies... >> "%PACKAGE_NAME%\QUICK-START.bat"
echo npm install >> "%PACKAGE_NAME%\QUICK-START.bat"
echo echo. >> "%PACKAGE_NAME%\QUICK-START.bat"
echo echo [2/3] Starting development server... >> "%PACKAGE_NAME%\QUICK-START.bat"
echo echo Access: http://localhost:5173/ >> "%PACKAGE_NAME%\QUICK-START.bat"
echo echo Demo: demo@lms.com / demo123 >> "%PACKAGE_NAME%\QUICK-START.bat"
echo echo. >> "%PACKAGE_NAME%\QUICK-START.bat"
echo echo [3/3] Opening browser... >> "%PACKAGE_NAME%\QUICK-START.bat"
echo start http://localhost:5173/ >> "%PACKAGE_NAME%\QUICK-START.bat"
echo npm run dev >> "%PACKAGE_NAME%\QUICK-START.bat"

echo [4/4] Package created successfully!
echo.
echo ========================================
echo    📦 PORTABLE PACKAGE READY! 📦
echo ========================================
echo.
echo 📁 Package Location: %CURRENT_DIR%\%PACKAGE_NAME%
echo 🚀 To use on new system:
echo    1. Copy '%PACKAGE_NAME%' folder to new system
echo    2. Run 'QUICK-START.bat' in the folder
echo    3. Access: http://localhost:5173/
echo    4. Demo: demo@lms.com / demo123
echo.
echo ✨ Features included:
echo    - Advanced Course Catalog with filtering
echo    - AI-powered recommendations
echo    - Leaderboards and achievements
echo    - Social features and profiles
echo    - All CHECKPOINT 50 features
echo.
pause
