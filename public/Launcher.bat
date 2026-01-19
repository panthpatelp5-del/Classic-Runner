@echo off
TITLE Arena - Classic Runner Launcher
echo.
echo    ================================================
echo       ARENA: CLASSIC RUNNER - STARTING SERVER
echo    ================================================
echo.
echo    Checking dependencies...
if not exist "node_modules\" (
    echo    Module folder missing. Installing...
    call npm install
)

echo    Starting Game Server on http://localhost:3000...
echo.
echo    ================================================
echo    MULTIPLAYER NETWORK SETUP:
echo    ================================================
echo.
echo    [1] On THIS PC: http://localhost:3000
echo.
echo    [2] On OTHER DEVICES (phones/tablets/PCs):
echo        Check the IP address shown below when server starts!
echo        Usually looks like: http://192.168.x.x:3000
echo.
echo    IMPORTANT: All devices must be on the SAME WiFi!
echo    ================================================
echo.

start "" http://localhost:3000

echo    Server is running. Do not close this window while playing!
echo    The Network IP will be shown below...
echo.
call npm start
pause
