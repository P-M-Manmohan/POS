import { app, BrowserWindow,ipcMain } from 'electron';
import {dirname,join} from 'path';
import process from 'process';
import { fileURLToPath } from 'url';

function createWindow() {

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: join(__dirname, 'preload.js'),
            contextIsolation: true, // Enables context isolation
            enableRemoteModule: false, // Recommended for security
            nodeIntegration: false,
        }
    });

    // Load the Vite server in development, or the built files in production
    if (process.env.NODE_ENV === 'development') {
        mainWindow.loadURL('http://localhost:3000');
        mainWindow.webContents.openDevTools();

         ipcMain.on('print-invoice', (event, htmlContent) => {
    const printWindow = new BrowserWindow({ show: false });
    printWindow.loadURL('data:text/html;charset=utf-8,' + encodeURIComponent(htmlContent));

    printWindow.webContents.on('did-finish-load', () => {
      printWindow.webContents.print({ silent: false, printBackground: true });
    });
  });

    } else {
        mainWindow.loadFile(join(__dirname, 'dist', 'index.html'));
         ipcMain.on('print-invoice', (event, htmlContent) => {
    const printWindow = new BrowserWindow({ show: false });
    printWindow.loadURL('data:text/html;charset=utf-8,' + encodeURIComponent(htmlContent));

    printWindow.webContents.on('did-finish-load', () => {
      printWindow.webContents.print({ silent: false, printBackground: true });
    });
  });
    }
}
app.disableHardwareAcceleration();

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

