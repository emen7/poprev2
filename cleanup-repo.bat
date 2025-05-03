@echo off
echo Running repository cleanup script...
powershell -ExecutionPolicy Bypass -File "%~dp0cleanup-repo.ps1"
echo.
echo Script execution completed.
echo.
pause