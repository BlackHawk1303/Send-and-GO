import os
import win32api, win32print

ghost = "C:\\Program Files (x86)\\gs\\gs9.27\\bin\\gswin32.exe"
gsprint = "C:\\Program Files\\Ghostgum\\gsview\\gsprint.exe"
archivo = "C:\\ag.pdf"
c = win32print.GetDefaultPrinter()

x = win32api.ShellExecute(0,'open', gsprint, '-ghostscript "'+ghost+'" -printer "'+c+'" "'+archivo+'"','.',0)
print(gsprint)
print(x)
