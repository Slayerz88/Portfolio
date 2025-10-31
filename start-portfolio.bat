@echo off
echo ========================================
echo  Starting Portfolio Server...
echo ========================================
echo.
echo Your portfolio will open automatically!
echo Server will run at: http://localhost:8080
echo.
echo Press Ctrl+C to stop the server
echo ========================================
echo.

npx http-server -p 8080 -o
