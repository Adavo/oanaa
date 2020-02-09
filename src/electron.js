// electron
const { app, BrowserWindow, Menu } = require("electron");
const path = require("path");

require("electron-reload")(path.join(__dirname, "../public/"));

function createWindow() {
    // Create the browser window.
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });

    // and load the index.html of the app.
    win.loadFile(path.join(__dirname, "../public/index.html"));

    // Open the DevTools.
    win.webContents.openDevTools();

    const menu = Menu.buildFromTemplate([
        {
            label: "File",
            submenu: [
                {
                    label: "New Game",
                    click: () => {
                        win.webContents.send("NEW_GAME");
                    }
                },
                { label: "Save Game" },
                { label: "Load Game" },
                { type: "separator" },
                { label: "Exit", role: "quit" }
            ]
        }
    ]);
    Menu.setApplicationMenu(menu);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.