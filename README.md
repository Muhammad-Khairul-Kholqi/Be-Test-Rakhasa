# Admin Panel API

API untuk manajemen user, role, permission, dan route test role-based access. Cocok untuk pengembangan backend atau testing pekerjaan.

## Fitur
- Autentikasi: register, login
- Manajemen User (view, create, update, delete)
- Manajemen Role (view, create, update, delete, assign permission)
- Manajemen Permission (view, create, update, delete)
- Test route: admin, user, public
- Dokumentasi Swagger UI

## Requirement
- Node.js >= 16
- MySQL / MariaDB

## Setup Project

1. Clone repository:
```bash
git clone <repo-url>
cd <project-folder>

2. Install dependencies:
```bash
npm install

4. Buat file .env dari template:
cp .env.example .env

5. Isi konfigurasi .env sesuai environment:
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password
DB_NAME=admin_panel
JWT_SECRET=your_jwt_secret

6. Jalankan
```bash
nodemon server.js
http://localhost:3000

## Struktur Folder
/routes      -> Semua route API
/controllers -> Logic untuk route
/middleware  -> Auth & permission middleware

## API Endpoints
API Endpoints

## API Endpoints
| Route | Method | Description | Protected / Role / Permission |
|-------|--------|-------------|-------------------------------|
| /api/auth/register | POST | Register user baru | No |
| /api/auth/login | POST | Login dan dapatkan JWT token | No |
| /api/users | GET | Ambil semua user | Yes / Admin / view_user |
| /api/users | POST | Buat user baru | Yes / Admin / create_user |
| /api/users/:id | PUT | Update user | Yes / Admin / edit_user |
| /api/users/:id | DELETE | Hapus user | Yes / Admin / delete_user |
| /api/roles | GET | Ambil semua role | Yes / Admin |
| /api/roles | POST | Buat role baru | Yes / Admin |
| /api/roles/:id | PUT | Update role | Yes / Admin |
| /api/roles/:id | DELETE | Hapus role | Yes / Admin |
| /api/roles/:roleId/permissions | POST | Assign permission ke role | Yes / Admin |
| /api/permissions | GET | Ambil semua permission | Yes / Admin |
| /api/permissions | POST | Buat permission baru | Yes / Admin |
| /api/permissions/:id | PUT | Update permission | Yes / Admin |
| /api/permissions/:id | DELETE | Hapus permission | Yes / Admin |
| /api/test/admin-test | GET | Route khusus admin | Yes / Admin |
| /api/test/user-test | GET | Route khusus user | Yes / User |
| /api/test/public-test | GET | Route public | No |

## Swagger Documentation
http://localhost:3000/api/docs