@echo off
title CattleAI - Starting

cd /d "C:\Users\sensu\cattle breed distinguish"

echo Starting FastAPI backend...
start "CattleAI Backend" cmd /k "C:\Users\sensu\anaconda3\envs\cattle\python.exe -m uvicorn backend.main:app --reload"

timeout /t 5 /nobreak >nul

echo Starting React frontend...
cd /d "C:\Users\sensu\cattle breed distinguish\frontend"
start "CattleAI Frontend" cmd /k "npm run dev"

timeout /t 5 /nobreak >nul

echo Opening CattleAI...
start "" "http://localhost:5173/"

echo.
echo CattleAI is starting!
pause