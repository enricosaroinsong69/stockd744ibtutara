/*
 * Menandai bahwa halaman sedang berjalan di dalam aplikasi desktop.
 * Tab "Ganti Data" di aplikasi hanya muncul kalau penanda ini ada,
 * sehingga tidak pernah tampil di HP salesman.
 */
const { contextBridge } = require('electron');
contextBridge.exposeInMainWorld('STOK_DESKTOP', true);
