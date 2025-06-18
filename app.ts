import express from "express"
import bukuRouter from "./routes/buku"
import anggotaRouter from "./routes/anggota"
import peminjamanRouter from "./routes/peminjaman"
import laporanRouter from "./routes/laporan"

const app = express()
app.use(express.json())

app.use("/buku", bukuRouter)
app.use("/anggota", anggotaRouter)
app.use("/peminjaman", peminjamanRouter)
app.use("/laporan", laporanRouter)

app.listen(3000, () => {
	console.log("Server running on http://localhost:3000")
})
