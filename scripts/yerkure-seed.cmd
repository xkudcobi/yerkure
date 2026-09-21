@echo off
rem Yerküre: tüm seeder'ları çalıştır, çıktıyı logs/ altına yaz (Görev Zamanlayıcı bunu 30 dk'da bir çağırır).
cd /d "%~dp0.."
for /f "tokens=1-3 delims=/. " %%a in ("%date%") do set D=%%c-%%b-%%a
set LOG=logs\seed-%D%.log
echo ==== %date% %time% ==== >> "%LOG%"
"C:\Program Files\Git\bin\bash.exe" -lc "cd '%CD:\=/%' && SEED_TIMEOUT=600 bash scripts/run-seeders.sh" >> "%LOG%" 2>&1
