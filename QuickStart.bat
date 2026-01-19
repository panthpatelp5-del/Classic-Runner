@echo off
TITLE Classic Runner - Quick Start
COLOR 0A

echo.
echo ========================================
echo    CLASSIC RUNNER - QUICK START
echo ========================================
echo.
echo    This will work on ANY PC!
echo    No WiFi or network needed.
echo.
echo ========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is NOT installed on this PC!
    echo.
    echo Please install Node.js from: https://nodejs.org
    echo After installing, run this file again.
    echo.
    pause
    exit
)

echo [OK] Node.js found!
echo.

REM Check if dependencies are installed
if not exist "node_modules\" (
    echo Installing game dependencies...
    echo This may take 1-2 minutes on first run.
    echo.
    call npm install --silent
    if %ERRORLEVEL% NEQ 0 (
        echo [ERROR] Installation failed!
        pause
        exit
    )
    echo.
    echo [OK] Dependencies installed!
    echo.
)

echo Starting server...
echo.

REM Kill any existing Node processes on port 3000 (in case of conflicts)
for /f "tokens=5" %%a in ('netstat -aon ^| find ":3000" ^| find "LISTENING"') do taskkill /F /PID %%a >nul 2>nul

REM Start server and open browser
start "" http://localhost:3000
timeout /t 2 /nobreak >nul

echo ========================================
echo    SERVER IS RUNNING!
echo ========================================
echo.
echo    Game opened in browser automatically.
echo    If not, manually open: http://localhost:3000
echo.
echo    KEEP THIS WINDOW OPEN WHILE PLAYING!
echo    Press Ctrl+C to stop the server.
echo ========================================
echo.

node server.js
