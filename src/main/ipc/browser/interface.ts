import { TabbedBrowserWindow } from "@/browser/window";
import { browser } from "@/index";
import { BrowserWindow } from "electron";
import { ipcMain } from "electron";

ipcMain.on("window-button:set-position", (event, position: { x: number; y: number }) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  if (win && "setWindowButtonPosition" in win) {
    win.setWindowButtonPosition(position);
  }
});

ipcMain.on("window-button:set-visibility", (event, visible: boolean) => {
  const tabbedWindow = browser?.getWindowFromWebContents(event.sender);
  if (tabbedWindow) {
    tabbedWindow.setWindowButtonVisibility(visible);
  }
});

export function toggleSidebar(win: TabbedBrowserWindow) {
  for (const webContents of win.coreWebContents) {
    webContents.send("sidebar:on-toggle");
  }
}
