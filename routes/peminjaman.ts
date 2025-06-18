import { Router } from "express"
import { db } from "../db"
import type { ResultSetHeader } from "mysql2"

const router = Router()

// GET all peminjaman
router.get("/", async (req, res) => {
	try {
		const [rows] = await db.query(`
			SELECT 
				dp.id_peminjaman,
				dp.kode_anggota,
				a.nama_anggota,
				dp.id_buku,
				db.judul_buku,
				dp.tanggal_pinjam,
				dp.tanggal_jatuh_tempo,
				dp.status_peminjaman
			FROM daftar_peminjaman dp
			JOIN anggota a ON dp.kode_anggota = a.kode_anggota
			JOIN daftar_buku db ON dp.id_buku = db.id
			ORDER BY dp.tanggal_pinjam DESC
		`)
		res.json(rows)
	} catch (error) {
		console.error(error)
		res.status(500).json({ error: "Database error" })
	}
})

// GET peminjaman by kode_anggota
router.get("/anggota/:kode", async (req, res) => {
	try {
		const [rows] = await db.query(
			`
			SELECT 
				dp.id_peminjaman,
				dp.kode_anggota,
				a.nama_anggota,
				dp.id_buku,
				db.judul_buku,
				dp.tanggal_pinjam,
				dp.tanggal_jatuh_tempo,
				dp.status_peminjaman
			FROM daftar_peminjaman dp
			JOIN anggota a ON dp.kode_anggota = a.kode_anggota
			JOIN daftar_buku db ON dp.id_buku = db.id
			WHERE dp.kode_anggota = ?
			ORDER BY dp.tanggal_pinjam DESC
		`,
			[req.params.kode]
		)
		res.json(rows)
	} catch (error) {
		console.error(error)
		res.status(500).json({ error: "Database error" })
	}
})

// GET peminjaman yang sedang dipinjam
router.get("/aktif", async (req, res) => {
	try {
		const [rows] = await db.query(`
			SELECT 
				dp.id_peminjaman,
				dp.kode_anggota,
				a.nama_anggota,
				dp.id_buku,
				db.judul_buku,
				dp.tanggal_pinjam,
				dp.tanggal_jatuh_tempo,
				dp.status_peminjaman
			FROM daftar_peminjaman dp
			JOIN anggota a ON dp.kode_anggota = a.kode_anggota
			JOIN daftar_buku db ON dp.id_buku = db.id
			WHERE dp.status_peminjaman = 'Dipinjam'
			ORDER BY dp.tanggal_jatuh_tempo ASC
		`)
		res.json(rows)
	} catch (error) {
		console.error(error)
		res.status(500).json({ error: "Database error" })
	}
})

// POST new peminjaman
router.post("/", async (req, res) => {
	try {
		if (!req.body || typeof req.body !== "object") {
			return res.status(400).json({ error: "Invalid or missing JSON body" })
		}
		const { kode_anggota, id_buku, tanggal_pinjam, tanggal_jatuh_tempo } =
			req.body
		if (!kode_anggota || !id_buku || !tanggal_pinjam || !tanggal_jatuh_tempo) {
			return res.status(400).json({ error: "Semua field harus diisi" })
		}

		// Check if buku is available
		const [existingPeminjaman] = await db.query(
			"SELECT * FROM daftar_peminjaman WHERE id_buku = ? AND status_peminjaman = 'Dipinjam'",
			[id_buku]
		)

		if (Array.isArray(existingPeminjaman) && existingPeminjaman.length > 0) {
			res.status(400).json({ error: "Buku sedang dipinjam" })
			return
		}

		await db.query(
			"INSERT INTO daftar_peminjaman (kode_anggota, id_buku, tanggal_pinjam, tanggal_jatuh_tempo, status_peminjaman) VALUES (?, ?, ?, ?, 'Dipinjam')",
			[kode_anggota, id_buku, tanggal_pinjam, tanggal_jatuh_tempo]
		)
		res.json({ message: "Peminjaman berhasil ditambahkan" })
	} catch (error) {
		console.error(error)
		res.status(500).json({ error: "Database error" })
	}
})

// PUT update status peminjaman (kembalikan buku)
router.put("/:id/kembalikan", async (req, res) => {
	try {
		const { tanggal_faktual_kembali } = req.body

		// Update status peminjaman
		const [result] = (await db.query(
			"UPDATE daftar_peminjaman SET status_peminjaman = 'Sudah Kembali' WHERE id_peminjaman = ?",
			[req.params.id]
		)) as [ResultSetHeader, any]

		if (result.affectedRows > 0) {
			// Insert ke daftar_pengembalian
			await db.query(
				"INSERT INTO daftar_pengembalian (id_peminjaman, tanggal_faktual_kembali) VALUES (?, ?)",
				[req.params.id, tanggal_faktual_kembali]
			)
			res.json({ message: "Buku berhasil dikembalikan" })
		} else {
			res.status(404).json({ error: "Peminjaman tidak ditemukan" })
		}
	} catch (error) {
		console.error(error)
		res.status(500).json({ error: "Database error" })
	}
})

export default router
