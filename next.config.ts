import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,

  // Next.js 16 memblokir request ke asset internal (/_next/*, termasuk
  // /_next/image yang dipakai <Image>) kalau originnya bukan localhost.
  // Tanpa ini, buka lewat IP LAN atau domain preview (mis. dari platform
  // AI/hosting) bikin gambar map gagal load walau filenya ada.
  // Tambahkan origin lain yang kamu pakai untuk akses dev server di sini.
  allowedDevOrigins: [
    "192.168.1.101", // IP LAN laptop kamu — sesuaikan kalau berubah
    "*.googleusercontent.com", // umum dipakai domain preview AI Studio
  ],

  // Matikan Next.js Image Optimization API (/_next/image).
  // Beberapa platform hosting (GitHub Pages, static export, dsb) tidak
  // menjalankan server Next.js penuh, jadi endpoint optimizer itu tidak
  // tersedia dan <Image> gagal load walau file aslinya ada di public/.
  // Dengan unoptimized: true, <Image> langsung pakai src asli seperti
  // <img> biasa — aman di semua platform, cuma tidak di-resize otomatis.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
