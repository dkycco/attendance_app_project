# Project Absensi

Sistem absensi berbasis web yang terintegrasi dengan WhatsApp menggunakan [whatsapp-web.js](https://github.com/pedroslopez/whatsapp-web.js) dan real-time socket communication. Dibangun dengan Express, Sequelize, dan EJS sebagai template engine.

## Fitur

- Autentikasi dan validasi data pengguna
- Manajemen data absensi
- Koneksi ke WhatsApp untuk interaksi otomatis
- Komunikasi real-time menggunakan Socket.IO
- Database dengan Sequelize ORM dan MySQL
- Template dinamis menggunakan EJS

## Instalasi

1. Clone repositori:

   ```bash
   git clone https://github.com/username/project_absensi.git
   cd project_absensi
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Buat file `.env` berdasarkan konfigurasi yang dibutuhkan, contoh:

   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASS=password
   DB_NAME=absensi_db
   SESSION_SECRET=your_secret_key
   ```

4. Jalankan migrasi dan seeder (opsional):

   ```bash
   npm run migrate
   npm run seed
   ```

   Atau untuk reset semua data:

   ```bash
   npm run migrate:fresh
   ```

## Menjalankan Aplikasi

```bash
node app.js
```

## Script Tersedia

| Script            | Deskripsi                                     |
|------------------|-----------------------------------------------|
| `npm run migrate`        | Menjalankan semua migrasi database             |
| `npm run seed`           | Menjalankan seeder untuk mengisi data awal     |
| `npm run migrate:fresh`  | Reset database dan jalankan migrasi + seeder   |
| `npm run make:migration` | Membuat file migrasi baru                      |
| `npm run make:seeder`    | Membuat file seeder baru                       |

## Dependencies

- [express](https://www.npmjs.com/package/express)
- [sequelize](https://www.npmjs.com/package/sequelize)
- [mysql2](https://www.npmjs.com/package/mysql2)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [ejs](https://www.npmjs.com/package/ejs)
- [express-ejs-layouts](https://www.npmjs.com/package/express-ejs-layouts)
- [express-validator](https://www.npmjs.com/package/express-validator)
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [socket.io](https://www.npmjs.com/package/socket.io)
- [whatsapp-web.js](https://www.npmjs.com/package/whatsapp-web.js)
- [qrcode-terminal](https://www.npmjs.com/package/qrcode-terminal)
- [dayjs](https://www.npmjs.com/package/dayjs)

## Lisensi

ISC License