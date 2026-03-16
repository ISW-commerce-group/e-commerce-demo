@echo off

echo ==============================
echo STARTING CI PIPELINE
echo ==============================

REM ==============================
REM FRONTEND
REM ==============================

echo.
echo Installing frontend dependencies...
pushd frontend
call npm install

echo.
echo Running frontend unit tests...
call npm test
if errorlevel 1 (
    popd
    echo.
    echo Frontend unit tests failed. Pipeline stopped.
    exit /b 1
)

echo.
echo Running ESLint for frontend...
call node_modules\.bin\eslint.cmd src
if errorlevel 1 (
    popd
    echo.
    echo ESLint detected problems in frontend. Pipeline stopped.
    exit /b 1
)

popd

echo.
echo ==============================
echo PIPELINE EXECUTED SUCCESSFULLY
echo ==============================

exit /b 0