@echo off
echo Installing Python packages...
python -m pip install --upgrade pip
pip install fastapi==0.104.1
pip install uvicorn==0.24.0
pip install pymongo==4.6.0
pip install "python-jose[cryptography]"
pip install "passlib[bcrypt]"
pip install python-dotenv
echo.
echo Installation complete!
echo Now run: python main.py
pause
