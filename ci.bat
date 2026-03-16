@echo off

echo ==============================
echo STARTING CI PIPELINE
echo ==============================

echo.
echo Executing unit tests for frontend...

pushd frontend
call npm test

if errorlevel 1 (
    popd
    echo.
    echo Unit tests failed. Pipeline stopped.
    exit /b 1
)

popd

echo.
echo Executing ESLint for frontend...

pushd frontend
call node_modules\.bin\eslint.cmd src

if errorlevel 1 (
    popd
    echo.
    echo Problems detected in frontend. Pipeline stopped.
    exit /b 1
)

popd

echo.
echo Pipeline executed successfully.
exit /b 0