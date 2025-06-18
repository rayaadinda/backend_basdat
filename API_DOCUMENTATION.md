# API Perpustakaan - Dokumentasi

## Base URL

```
http://localhost:3000
```

## Endpoints

### 1. BUKU

#### GET /buku

Mendapatkan semua daftar buku

```bash
GET http://localhost:3000/buku
```

#### GET /buku/:id

Mendapatkan buku berdasarkan ID (UUID)

```bash
GET http://localhost:3000/buku/550e8400-e29b-41d4-a716-446655440000
```

#### POST /buku

Menambahkan buku baru (ID akan di-generate otomatis sebagai UUID)

```bash
POST http://localhost:3000/buku
Content-Type: application/json

{
  "judul_buku": "Judul Buku",
  "nama_author": "Nama Penulis",
  "tahun_terbit": 2024,
  "kategori": "Novel",
  "sinopsis_buku": "Sinopsis buku..."
}
```

**Response:**

```json
{
	"message": "Buku berhasil ditambahkan",
	"id": "550e8400-e29b-41d4-a716-446655440000",
	"buku": {
		"id": "550e8400-e29b-41d4-a716-446655440000",
		"judul_buku": "Judul Buku",
		"nama_author": "Nama Penulis",
		"tahun_terbit": 2024,
		"kategori": "Novel",
		"sinopsis_buku": "Sinopsis buku..."
	}
}
```

#### PUT /buku/:id

Update data buku berdasarkan ID (UUID)

```bash
PUT http://localhost:3000/buku/550e8400-e29b-41d4-a716-446655440000
Content-Type: application/json

{
  "judul_buku": "Judul Buku Updated",
  "nama_author": "Nama Penulis Updated",
  "tahun_terbit": 2024,
  "kategori": "Novel Updated",
  "sinopsis_buku": "Sinopsis buku updated..."
}
```

#### DELETE /buku/:id

Hapus buku berdasarkan ID (UUID)

```bash
DELETE http://localhost:3000/buku/550e8400-e29b-41d4-a716-446655440000
```

### 2. ANGGOTA

#### GET /anggota

Mendapatkan semua daftar anggota

```bash
GET http://localhost:3000/anggota
```

#### GET /anggota/:kode

Mendapatkan anggota berdasarkan kode

```bash
GET http://localhost:3000/anggota/0001
```

#### POST /anggota

Menambahkan anggota baru

```bash
POST http://localhost:3000/anggota
Content-Type: application/json

{
  "username": "username",
  "password": "password",
  "kode_anggota": "0002",
  "nama_anggota": "Nama Anggota",
  "alamat_anggota": "Alamat",
  "email_anggota": "email@example.com",
  "role_anggota": "member"
}
```

#### PUT /anggota/:kode

Update data anggota

```bash
PUT http://localhost:3000/anggota/0001
Content-Type: application/json

{
  "username": "username_updated",
  "password": "password_updated",
  "nama_anggota": "Nama Updated",
  "alamat_anggota": "Alamat Updated",
  "email_anggota": "email_updated@example.com",
  "role_anggota": "admin"
}
```

#### DELETE /anggota/:kode

Hapus anggota

```bash
DELETE http://localhost:3000/anggota/0001
```

### 3. PEMINJAMAN

#### GET /peminjaman

Mendapatkan semua daftar peminjaman

```bash
GET http://localhost:3000/peminjaman
```

#### GET /peminjaman/anggota/:kode

Mendapatkan peminjaman berdasarkan kode anggota

```bash
GET http://localhost:3000/peminjaman/anggota/0001
```

#### GET /peminjaman/aktif

Mendapatkan peminjaman yang sedang aktif

```bash
GET http://localhost:3000/peminjaman/aktif
```

#### POST /peminjaman

Menambahkan peminjaman baru (gunakan UUID buku)

```bash
POST http://localhost:3000/peminjaman
Content-Type: application/json

{
  "kode_anggota": "0001",
  "id_buku": "550e8400-e29b-41d4-a716-446655440000",
  "tanggal_pinjam": "2024-01-15",
  "tanggal_jatuh_tempo": "2024-01-22"
}
```

#### PUT /peminjaman/:id/kembalikan

Mengembalikan buku

```bash
PUT http://localhost:3000/peminjaman/1/kembalikan
Content-Type: application/json

{
  "tanggal_faktual_kembali": "2024-01-20"
}
```

### 4. LAPORAN

#### GET /laporan/statistik

Mendapatkan statistik umum perpustakaan

```bash
GET http://localhost:3000/laporan/statistik
```

#### GET /laporan/buku-terpopuler

Mendapatkan daftar buku terpopuler

```bash
GET http://localhost:3000/laporan/buku-terpopuler
```

#### GET /laporan/anggota-teraktif

Mendapatkan daftar anggota teraktif

```bash
GET http://localhost:3000/laporan/anggota-teraktif
```

#### GET /laporan/terlambat

Mendapatkan daftar peminjaman terlambat

```bash
GET http://localhost:3000/laporan/terlambat
```

#### GET /laporan/per-bulan/:tahun

Mendapatkan statistik peminjaman per bulan

```bash
GET http://localhost:3000/laporan/per-bulan/2024
```

#### GET /laporan/rata-lama-peminjaman

Mendapatkan rata-rata lama peminjaman

```bash
GET http://localhost:3000/laporan/rata-lama-peminjaman
```




