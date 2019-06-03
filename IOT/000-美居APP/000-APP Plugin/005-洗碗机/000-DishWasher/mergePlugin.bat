@echo off

setlocal enabledelayedexpansion

:: ����ԴĿ¼
set buildPath=D:\workspace\H5\midea-weex-template\dist\midea-card
::����Ŀ��·��
set pluginPath=D:\Download

set "year=%date:~0,4%"
set "month=%date:~5,2%"
set "day=%date:~8,2%"
set "hour_ten=%time:~0,1%"
set "hour_one=%time:~1,1%"
set "minute=%time:~3,2%"

if "%hour_ten%" == " " (
    set d=%year%%month%%day%_0%hour_one%%minute%
) else (
    set d=%year%%month%%day%_%hour_ten%%hour_one%%minute%
)
echo %d%


echo "ɾ��%pluginPath%\dist_zip"
if exist "%pluginPath%\dist_zip" rmdir "%pluginPath%\dist_zip" /q /s 

::��ʼѭ����Ҫ������Ŀ¼
for /d %%i in ("%pluginPath%\*") do (
    set folderName=%%~ni
    if exist "%%i\midea-card" rmdir "%%i\midea-card" /q /s 
    if exist "%buildPath%\!folderName!" (
        echo "����!folderName!��!folderName!"
        XCOPY "%buildPath%\!folderName!\*.*" %%i /s/y/q
    ) else (
        set shortFolderName="!folderName:~0,5!"
        if exist "%buildPath%\!shortFolderName!" (
            echo "����!shortFolderName!��!folderName!"
            XCOPY "%buildPath%\!shortFolderName!\*.*" %%i /s/y/q
        ) else (
            echo "����T0xcommon��!folderName!"
            XCOPY "%buildPath%\T0xcommon\*.*" %%i /s/y/q
        )
    )
    if not exist "%pluginPath%\dist_zip" md "%pluginPath%\dist_zip"
    "C:\Program Files\HaoZip\HaoZipC.exe" a -tzip "%pluginPath%\dist_zip\!folderName!_%d%.zip" %%i -sn
    echo "ѹ����%pluginPath%\dist_zip\!folderName!_%d%.zip""
);
 
pause
