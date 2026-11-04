@echo off
chcp 65001 >nul
cd /d "%~dp0"
if not exist node_modules (
  echo 처음 실행이라 패키지 설치 중...
  call npm install
)
node server/index.js
pause
