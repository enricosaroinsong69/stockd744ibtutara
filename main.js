/*
 * Stok Daihatsu D744 — jendela desktop.
 *
 * Aplikasinya sendiri tetap tinggal di Netlify; berkas .exe ini hanya
 * jendelanya. Jadi memperbarui aplikasi cukup dengan mengunggah ulang
 * ke Netlify — tidak perlu membangun .exe baru dan tidak perlu dipasang
 * ulang di komputer mana pun.
 */
const { app, BrowserWindow, shell, Menu, dialog } = require('electron');
const path = require('path');

const ALAMAT = process.env.STOK_URL || 'https://GANTI-NAMA-SITUS.netlify.app/';

let win;

function buatJendela() {
  win = new BrowserWindow({
    width: 1280,
    height: 860,
    minWidth: 900,
    minHeight: 600,
    backgroundColor: '#0F2E47',
    title: 'Stok Daihatsu D744',
    icon: path.join(__dirname, 'icon.ico'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      spellcheck: false
    }
  });

  Menu.setApplicationMenu(Menu.buildFromTemplate([
    {
      label: 'Aplikasi',
      submenu: [
        { label: 'Muat ulang', accelerator: 'F5', click: () => win.reload() },
        { label: 'Muat ulang paksa (abaikan simpanan)', accelerator: 'Ctrl+F5',
          click: () => win.webContents.reloadIgnoringCache() },
        { type: 'separator' },
        { label: 'Perbesar', role: 'zoomIn' },
        { label: 'Perkecil', role: 'zoomOut' },
        { label: 'Ukuran normal', role: 'resetZoom' },
        { type: 'separator' },
        { label: 'Alat pengembang', accelerator: 'F12',
          click: () => win.webContents.toggleDevTools() },
        { type: 'separator' },
        { label: 'Keluar', role: 'quit' }
      ]
    },
    {
      label: 'Bantuan',
      submenu: [{
        label: 'Tentang',
        click: () => dialog.showMessageBox(win, {
          type: 'info',
          title: 'Tentang',
          message: 'Stok Daihatsu D744',
          detail: 'Versi jendela ' + app.getVersion() +
                  '\nIsi aplikasi dimuat dari:\n' + ALAMAT +
                  '\n\nAplikasi diperbarui dari sisi web — tidak perlu pasang ulang.'
        })
      }]
    }
  ]));

  win.loadURL(ALAMAT).catch(tampilkanLuring);
  win.webContents.on('did-fail-load', (_e, kode, pesan, url, utama) => {
    if (utama) tampilkanLuring(new Error(pesan + ' (' + kode + ')'));
  });

  // Tautan luar dibuka di peramban biasa, bukan menumpuk di dalam jendela ini.
  win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });
}

function tampilkanLuring() {
  if (win) win.loadFile(path.join(__dirname, 'offline.html'));
}

app.whenReady().then(buatJendela);
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) buatJendela(); });
