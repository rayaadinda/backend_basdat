-- Script untuk mengupdate database agar menggunakan UUID
-- Jalankan script ini di MariaDB/MySQL

-- 1. Backup data existing (optional)
-- CREATE TABLE daftar_buku_backup AS SELECT * FROM daftar_buku;

-- 2. Drop foreign key constraints terlebih dahulu
ALTER TABLE daftar_peminjaman DROP FOREIGN KEY daftar_peminjaman_ibfk_2;

-- 3. Update struktur tabel daftar_buku
ALTER TABLE daftar_buku MODIFY COLUMN id VARCHAR(36) NOT NULL;
ALTER TABLE daftar_buku DROP PRIMARY KEY;
ALTER TABLE daftar_buku ADD PRIMARY KEY (id);

-- 4. Update struktur tabel daftar_peminjaman
ALTER TABLE daftar_peminjaman MODIFY COLUMN id_buku VARCHAR(36) NOT NULL;

-- 5. Re-add foreign key constraint
ALTER TABLE daftar_peminjaman 
ADD CONSTRAINT daftar_peminjaman_ibfk_2 
FOREIGN KEY (id_buku) REFERENCES daftar_buku(id);

-- 6. Update data existing dengan UUID (jika ada data)
-- UPDATE daftar_buku SET id = UUID() WHERE id REGEXP '^[0-9]+$';

-- 7. Update peminjaman dengan UUID buku yang baru (jika ada data)
-- UPDATE daftar_peminjaman dp 
-- JOIN daftar_buku db ON dp.id_buku = db.id 
-- SET dp.id_buku = db.id 
-- WHERE dp.id_buku REGEXP '^[0-9]+$'; 