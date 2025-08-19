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
## API Endpoints

| Endpoint                     | URL                                      | Keterangan                                      |
|-------------------------------|-----------------------------------------|------------------------------------------------|
| Register User                 | `/api/auth/register`                     | Register user baru                              |
| Login User                    | `/api/auth/login`                        | Login dan dapatkan JWT token                    |
| Get All Users                 | `/api/users`                             | Ambil semua user (Admin, permission: view_user)|
| Create User                   | `/api/users`                             | Buat user baru (Admin, permission: create_user)|
| Update User                   | `/api/users/:id`                         | Update user tertentu (Admin, permission: edit_user)|
| Delete User                   | `/api/users/:id`                         | Hapus user (Admin, permission: delete_user)    |
| Get All Roles                 | `/api/roles`                             | Ambil semua role (Admin)                        |
| Create Role                   | `/api/roles`                             | Buat role baru (Admin)                          |
| Update Role                   | `/api/roles/:id`                         | Update role tertentu (Admin)                    |
| Delete Role                   | `/api/roles/:id`                         | Hapus role (Admin)                              |
| Assign Permissions to Role    | `/api/roles/:roleId/permissions`         | Assign permission ke role (Admin)              |
| Get All Permissions           | `/api/permissions`                       | Ambil semua permission (Admin)                 |
| Create Permission             | `/api/permissions`                       | Buat permission baru (Admin)                   |
| Update Permission             | `/api/permissions/:id`                   | Update permission tertentu (Admin)             |
| Delete Permission             | `/api/permissions/:id`                   | Hapus permission (Admin)                        |
| Test Admin Route              | `/api/test/admin-test`                    | Route khusus admin                              |
| Test User Route               | `/api/test/user-test`                     | Route khusus user                               |
| Test Public Route             | `/api/test/public-test`                   | Route publik, bisa diakses semua               |

## Swagger Documentation
http://localhost:3000/api/docs