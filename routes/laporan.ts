import { Router } from "express"
import { db } from "../db"

const router = Router()

// GET statistik umum perpustakaan
router.get("/statistik", async (req, res) => {
	try {
		// Total buku
		const [totalBuku] = (await db.query(
			"SELECT COUNT(*) as total FROM daftar_buku"
		)) as any

		// Total anggota
		const [totalAnggota] = (await db.query(
			"SELECT COUNT(*) as total FROM anggota"
		)) as any

		// Total peminjaman aktif
		const [peminjamanAktif] = (await db.query(
			"SELECT COUNT(*) as total FROM daftar_peminjaman WHERE status_peminjaman = 'Dipinjam'"
		)) as any

		// Total peminjaman selesai
		const [peminjamanSelesai] = (await db.query(
			"SELECT COUNT(*) as total FROM daftar_peminjaman WHERE status_peminjaman = 'Sudah Kembali'"
		)) as any

		res.json({
			total_buku: totalBuku[0].total,
			total_anggota: totalAnggota[0].total,
			peminjaman_aktif: peminjamanAktif[0].total,
			peminjaman_selesai: peminjamanSelesai[0].total,
		})
	} catch (error) {
		res.status(500).json({ error: "Database error" })
	}
})

router.get("/buku-terpopuler", async (req, res) => {
	try {
		const [rows] = await db.query(`
			SELECT 
				db.id,
				db.judul_buku,
				db.nama_author,
				COUNT(dp.id_peminjaman) as total_peminjaman
			FROM daftar_buku db
			LEFT JOIN daftar_peminjaman dp ON db.id = dp.id_buku
			GROUP BY db.id, db.judul_buku, db.nama_author
			ORDER BY total_peminjaman DESC
			LIMIT 10
		`)
		res.json(rows)
	} catch (error) {
		res.status(500).json({ error: "Database error" })
	}
})

// GET anggota teraktif (paling sering meminjam)
router.get("/anggota-teraktif", async (req, res) => {
	try {
		const [rows] = await db.query(`
			SELECT 
				a.kode_anggota,
				a.nama_anggota,
				COUNT(dp.id_peminjaman) as total_peminjaman
			FROM anggota a
			LEFT JOIN daftar_peminjaman dp ON a.kode_anggota = dp.kode_anggota
			GROUP BY a.kode_anggota, a.nama_anggota
			ORDER BY total_peminjaman DESC
			LIMIT 10
		`)
		res.json(rows)
	} catch (error) {
		res.status(500).json({ error: "Database error" })
	}
})

// GET peminjaman terlambat
router.get("/terlambat", async (req, res) => {
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
				DATEDIFF(CURDATE(), dp.tanggal_jatuh_tempo) as hari_terlambat
			FROM daftar_peminjaman dp
			JOIN anggota a ON dp.kode_anggota = a.kode_anggota
			JOIN daftar_buku db ON dp.id_buku = db.id
			WHERE dp.status_peminjaman = 'Dipinjam' 
			AND dp.tanggal_jatuh_tempo < CURDATE()
			ORDER BY hari_terlambat DESC
		`)
		res.json(rows)
	} catch (error) {
		res.status(500).json({ error: "Database error" })
	}
})

// GET peminjaman per bulan (tahun ini)
router.get("/per-bulan/:tahun", async (req, res) => {
	try {
		const [rows] = await db.query(
			`
			SELECT 
				MONTH(tanggal_pinjam) as bulan,
				COUNT(*) as total_peminjaman
			FROM daftar_peminjaman
			WHERE YEAR(tanggal_pinjam) = ?
			GROUP BY MONTH(tanggal_pinjam)
			ORDER BY bulan
		`,
			[req.params.tahun]
		)
		res.json(rows)
	} catch (error) {
		res.status(500).json({ error: "Database error" })
	}
})

// GET rata-rata lama peminjaman
router.get("/rata-lama-peminjaman", async (req, res) => {
	try {
		const [rows] = (await db.query(`
			SELECT 
				AVG(DATEDIFF(dpg.tanggal_faktual_kembali, dp.tanggal_pinjam)) as rata_lama_hari
			FROM daftar_peminjaman dp
			JOIN daftar_pengembalian dpg ON dp.id_peminjaman = dpg.id_peminjaman
		`)) as any
		res.json(rows[0])
	} catch (error) {
		res.status(500).json({ error: "Database error" })
	}
})

export default router
