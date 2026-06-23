# 🚀 Teamora

[![Framework](https://img.shields.io/badge/Framework-Next.js%2015-black?style=flat&logo=nextdotjs)](https://nextjs.org/)
[![Language](https://img.shields.io/badge/Language-TypeScript-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Database](https://img.shields.io/badge/Database-PostgreSQL-blue?style=flat&logo=postgresql)](https://www.postgresql.org/)
[![Styling](https://img.shields.io/badge/Styling-Tailwind%20CSS-38bdf8?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![Deployment](https://img.shields.io/badge/Deployment-Vercel-black?style=flat&logo=vercel)](https://vercel.com/)

**Teamora** adalah platform manajemen tugas dan kolaborasi proyek berbasis *Multi-Tenant* yang dirancang untuk membantu tim maupun individu mengelola ruang kerja, proyek, dan tugas secara terstruktur dan efisien. 

Aplikasi ini dibangun menggunakan arsitektur modern yang mendukung skalabilitas tinggi, keamanan tipe data yang kuat (*type-safety*), serta manajemen hak akses (*role*) yang fleksibel.

🔗 **Live Demo:** [teamora-orcin.vercel.app](https://teamora-orcin.vercel.app)

---

## ✨ Fitur Utama

- **Multi-Tenancy Workspace**: User dapat membuat atau bergabung ke dalam lebih dari satu *Tenant* (Ruang Kerja/Organisasi) yang terisolasi dengan aman.
- **Multi-Project Management**: Di dalam setiap tenant, user dapat mengelola beberapa proyek secara simultan untuk memisahkan fokus pekerjaan.
- **Granular RBAC (Role-Based Access Control)**: Sistem hak akses yang fleksibel di mana seorang user dapat memiliki peran (*role*) yang berbeda di setiap *Tenant* maupun di setiap *Project* yang mereka ikuti.
- **Task Tracking**: Manajemen dan pelacakan tugas (*task*) di dalam proyek untuk memastikan alur kerja berjalan sesuai rencana.

---

## 📐 Arsitektur Data

Aplikasi ini menerapkan hirarki data sebagai berikut:
`User ➔ Tenant (Multi-Role) ➔ Project (Multi-Role) ➔ Tasks`

---

## 🛠️ Stack Teknologi

- **Frontend & Backend**: Next.js 15 (App Router) & TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL
- **ORM**: Prisma
- **State Management**: Zustand
- **Deployment**: Vercel

---

## 📦 Cara Menjalankan secara Lokal

Ikuti langkah-langkah berikut untuk menjalankan proyek ini di komputer Anda:

### 1. Clone Repositori
```bash
git clone https://github.com/Abdurrozaq63/teamora.git
cd teamora
```
### 2. Install Dependensi
```bash
npm install
```
### 3. Konfigurasi Environtment Variables
```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
NEXTAUTH_SECRET="your-secret-key-here"
```
### 4. Jalankan Migrasi Database
```bash
npx prisma migrate dev
npx prisma generate
```
### 5. Jalankan Server Pengembang
```
npm run dev
```
buka http://localhost:3000 di browser anda
