import { Router } from "express"
import { db } from "../db"
import type { ResultSetHeader } from "mysql2"
import { randomUUID } from "crypto"

const router = Router()

// GET all buku
router.get("/", async (req, res) => {
	try {
		const [rows] = await db.query(
			"SELECT * FROM daftar_buku ORDER BY judul_buku"
		)
		res.json(rows)
	} catch (error) {
		res.status(500).json({ error: "Database error" })
	}
})

// GET buku by ID
router.get("/:id", async (req, res) => {
	try {
		const [rows] = await db.query("SELECT * FROM daftar_buku WHERE id = ?", [
			req.params.id,
		])
		if (Array.isArray(rows) && rows.length > 0) {
			res.json(rows[0])
		} else {
			res.status(404).json({ error: "Buku tidak ditemukan" })
		}
	} catch (error) {
		res.status(500).json({ error: "Database error" })
	}
})

// POST new buku
router.post("/", async (req, res) => {
	try {
		const { judul_buku, nama_author, tahun_terbit, kategori, sinopsis_buku } =
			req.body
		const id = randomUUID() 

		await db.query(
			"INSERT INTO daftar_buku (id, judul_buku, nama_author, tahun_terbit, kategori, sinopsis_buku) VALUES (?, ?, ?, ?, ?, ?)",
			[id, judul_buku, nama_author, tahun_terbit, kategori, sinopsis_buku]
		)
		res.json({
			message: "Buku berhasil ditambahkan",
			id: id,
			buku: {
				id,
				judul_buku,
				nama_author,
				tahun_terbit,
				kategori,
				sinopsis_buku,
			},
		})
	} catch (error) {
		res.status(500).json({ error: "Database error" })
	}
})

// PUT update buku
router.put("/:id", async (req, res) => {
	try {
		const { judul_buku, nama_author, tahun_terbit, kategori, sinopsis_buku } =
			req.body

		const [result] = (await db.query(
			"UPDATE daftar_buku SET judul_buku = ?, nama_author = ?, tahun_terbit = ?, kategori = ?, sinopsis_buku = ? WHERE id = ?",
			[
				judul_buku,
				nama_author,
				tahun_terbit,
				kategori,
				sinopsis_buku,
				req.params.id,
			]
		)) as [ResultSetHeader, any]

		if (result.affectedRows > 0) {
			res.json({ message: "Buku berhasil diupdate" })
		} else {
			res.status(404).json({ error: "Buku tidak ditemukan" })
		}
	} catch (error) {
		res.status(500).json({ error: "Database error" })
	}
})

// DELETE buku
router.delete("/:id", async (req, res) => {
	try {
		const [result] = (await db.query("DELETE FROM daftar_buku WHERE id = ?", [
			req.params.id,
		])) as [ResultSetHeader, any]

		if (result.affectedRows > 0) {
			res.json({ message: "Buku berhasil dihapus" })
		} else {
			res.status(404).json({ error: "Buku tidak ditemukan" })
		}
	} catch (error) {
		res.status(500).json({ error: "Database error" })
	}
})

export default router
