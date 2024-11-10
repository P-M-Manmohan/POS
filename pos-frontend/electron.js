import { app, BrowserWindow } from 'electron';
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
            nodeIntegration: true,
        }
    });

    // Load the Vite server in development, or the built files in production
    if (process.env.NODE_ENV === 'development') {
        mainWindow.loadURL('http://localhost:3000');
        mainWindow.webContents.openDevTools();
    } else {
        mainWindow.loadFile(join(__dirname, 'dist', 'index.html'));
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

