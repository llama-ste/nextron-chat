import { app } from "electron";
import serve from "electron-serve";
import { UserRecord } from "firebase-admin/lib/auth/user-record";
import { FirebaseError } from "firebase-admin";
import { createWindow } from "./helpers";

const { ipcMain } = require("electron");
const serviceAccount = require("/nextron-chat-537b6-039b137dd9bb.json");
const admin = require("firebase-admin");

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
const auth = admin.auth();

const isProd: boolean = process.env.NODE_ENV === "production";

if (isProd) {
  serve({ directory: "app" });
} else {
  app.setPath("userData", `${app.getPath("userData")} (development)`);
}

(async () => {
  await app.whenReady();

  const mainWindow = createWindow("main", {
    width: 500,
    height: 600,
  });

  if (isProd) {
    await mainWindow.loadURL("app://./sign-in.html");
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/sign-in`);
    mainWindow.webContents.openDevTools();
  }
})();

app.on("window-all-closed", () => {
  app.quit();
});

// 유저 리스트를 가져오는 api
ipcMain.on("get-users", (e) => {
  e.sender.send("users-loading", true);

  auth
    .listUsers() // default 1000명
    .then((res: { users: UserRecord[] }) => {
      e.sender.send("users-list", res.users);
    })
    .catch((err: FirebaseError) => {
      e.sender.send("users-error", err);
    })
    .finally(() => e.sender.send("users-loading", false));
});
