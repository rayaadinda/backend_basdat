import { Router } from "express"
import { db } from "../db"
import type { ResultSetHeader } from "mysql2"

const router = Router()

// GET all anggota
router.get("/", async (req, res) => {
	try {
		const [rows] = await db.query("SELECT * FROM anggota")
		res.json(rows)
	} catch (error) {
		res.status(500).json({ error: "Database error" })
	}
})

// GET anggota by kode_anggota
router.get("/:kode", async (req, res) => {
	try {
		const [rows] = await db.query(
			"SELECT * FROM anggota WHERE kode_anggota = ?",
			[req.params.kode]
		)
		if (Array.isArray(rows) && rows.length > 0) {
			res.json(rows[0])
		} else {
			res.status(404).json({ error: "Anggota tidak ditemukan" })
		}
	} catch (error) {
		res.status(500).json({ error: "Database error" })
	}
})

// POST new anggota
router.post("/", async (req, res) => {
	try {
		const {
			username,
			password,
			kode_anggota,
			nama_anggota,
			alamat_anggota,
			email_anggota,
			role_anggota,
		} = req.body

		await db.query(
			"INSERT INTO anggota (username, password, kode_anggota, nama_anggota, alamat_anggota, email_anggota, role_anggota) VALUES (?, ?, ?, ?, ?, ?, ?)",
			[
				username,
				password,
				kode_anggota,
				nama_anggota,
				alamat_anggota,
				email_anggota,
				role_anggota,
			]
		)
		res.json({ message: "Anggota berhasil ditambahkan" })
	} catch (error) {
		res.status(500).json({ error: "Database error" })
	}
})

// PUT update anggota
router.put("/:kode", async (req, res) => {
	try {
		const {
			username,
			password,
			nama_anggota,
			alamat_anggota,
			email_anggota,
			role_anggota,
		} = req.body

		const [result] = (await db.query(
			"UPDATE anggota SET username = ?, password = ?, nama_anggota = ?, alamat_anggota = ?, email_anggota = ?, role_anggota = ? WHERE kode_anggota = ?",
			[
				username,
				password,
				nama_anggota,
				alamat_anggota,
				email_anggota,
				role_anggota,
				req.params.kode,
			]
		)) as [ResultSetHeader, any]

		if (result.affectedRows > 0) {
			res.json({ message: "Anggota berhasil diupdate" })
		} else {
			res.status(404).json({ error: "Anggota tidak ditemukan" })
		}
	} catch (error) {
		res.status(500).json({ error: "Database error" })
	}
})

// DELETE anggota
router.delete("/:kode", async (req, res) => {
	try {
		const [result] = (await db.query(
			"DELETE FROM anggota WHERE kode_anggota = ?",
			[req.params.kode]
		)) as [ResultSetHeader, any]

		if (result.affectedRows > 0) {
			res.json({ message: "Anggota berhasil dihapus" })
		} else {
			res.status(404).json({ error: "Anggota tidak ditemukan" })
		}
	} catch (error) {
		res.status(500).json({ error: "Database error" })
	}
})

export default router
