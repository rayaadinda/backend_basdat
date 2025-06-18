-- MariaDB dump 10.19  Distrib 10.4.28-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: db_perpustakaan
-- ------------------------------------------------------
-- Server version	10.4.28-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `anggota`
--

DROP TABLE IF EXISTS `anggota`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `anggota` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `kode_anggota` varchar(20) NOT NULL,
  `nama_anggota` varchar(100) NOT NULL,
  `alamat_anggota` text DEFAULT NULL,
  `email_anggota` varchar(100) DEFAULT NULL,
  `role_anggota` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `kode_anggota` (`kode_anggota`),
  UNIQUE KEY `email_anggota` (`email_anggota`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `anggota`
--

LOCK TABLES `anggota` WRITE;
/*!40000 ALTER TABLE `anggota` DISABLE KEYS */;
INSERT INTO `anggota` VALUES (1,'admin','admin123','0001','admin','admin','admin','admin');
/*!40000 ALTER TABLE `anggota` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `daftar_buku`
--

DROP TABLE IF EXISTS `daftar_buku`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `daftar_buku` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `judul_buku` varchar(255) NOT NULL,
  `nama_author` varchar(100) NOT NULL,
  `tahun_terbit` year(4) DEFAULT NULL,
  `kategori` varchar(50) DEFAULT NULL,
  `sinopsis_buku` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `daftar_buku`
--

LOCK TABLES `daftar_buku` WRITE;
/*!40000 ALTER TABLE `daftar_buku` DISABLE KEYS */;
INSERT INTO `daftar_buku` VALUES (1,'Laskar Pelangi','Andrea Hirata',2005,'Novel Inspiratif','Kisah perjuangan 10 anak dari keluarga miskin di Belitung untuk bersekolah dan meraih mimpi mereka di tengah keterbatasan.'),(2,'Bumi Manusia','Pramoedya Ananta Toer',1980,'Fiksi Sejarah','Kisah Minke, seorang pribumi terpelajar di era kolonial, yang berjuang melawan ketidakadilan rasial dan menemukan cinta.'),(3,'Negeri 5 Menara','Ahmad Fuadi',2009,'Novel Inspiratif','Perjalanan Alif dari Maninjau ke Pondok Madani di Jawa Timur, belajar tentang persahabatan, impian, dan kekuatan mantra \"Man Jadda Wajada\".'),(4,'Perahu Kertas','Dee Lestari',2009,'Roman','Kisah cinta yang unik antara Kugy, seorang gadis yang gemar berkhayal dan menulis dongeng, dengan Keenan, seorang pelukis berbakat.'),(5,'Cantik Itu Luka','Eka Kurniawan',2002,'Realisme Magis','Mengisahkan kehidupan seorang pelacur bernama Dewi Ayu dan anak-anaknya, dengan latar belakang sejarah Indonesia yang kelam dan penuh mitos.'),(6,'Harry Potter dan Batu Bertuah','J.K. Rowling',1997,'Fantasi','Seorang anak yatim piatu mengetahui pada ulang tahunnya yang kesebelas bahwa ia adalah seorang penyihir dan diundang ke Sekolah Sihir Hogwarts.'),(7,'The Alchemist','Paulo Coelho',1988,'Fiksi Filosofis','Perjalanan seorang gembala Andalusia bernama Santiago untuk menemukan harta karun setelah bermimpi tentangnya, sebuah pencarian yang mengubahnya selamanya.'),(8,'The Hobbit','J.R.R. Tolkien',1937,'Fantasi','Petualangan Bilbo Baggins, seorang hobbit yang cinta damai, yang terbawa dalam sebuah perjalanan epik untuk merebut kembali harta karun dari naga Smaug.'),(9,'To Kill a Mockingbird','Harper Lee',1960,'Fiksi Klasik','Mengeksplorasi ketidakadilan rasial di Amerika Selatan melalui mata seorang anak, Scout Finch, dan ayahnya, seorang pengacara bernama Atticus.'),(10,'Norwegian Wood','Haruki Murakami',1987,'Roman','Sebuah kisah nostalgia tentang kehilangan dan seksualitas. Toru Watanabe mengenang masa lalunya sebagai mahasiswa di Tokyo dan hubungannya yang rumit.');
/*!40000 ALTER TABLE `daftar_buku` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `daftar_peminjaman`
--

DROP TABLE IF EXISTS `daftar_peminjaman`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `daftar_peminjaman` (
  `id_peminjaman` int(11) NOT NULL AUTO_INCREMENT,
  `kode_anggota` varchar(20) NOT NULL,
  `id_buku` int(11) NOT NULL,
  `tanggal_pinjam` date NOT NULL,
  `tanggal_jatuh_tempo` date NOT NULL,
  `status_peminjaman` enum('Dipinjam','Sudah Kembali') NOT NULL DEFAULT 'Dipinjam',
  PRIMARY KEY (`id_peminjaman`),
  KEY `kode_anggota` (`kode_anggota`),
  KEY `id_buku` (`id_buku`),
  CONSTRAINT `daftar_peminjaman_ibfk_1` FOREIGN KEY (`kode_anggota`) REFERENCES `anggota` (`kode_anggota`),
  CONSTRAINT `daftar_peminjaman_ibfk_2` FOREIGN KEY (`id_buku`) REFERENCES `daftar_buku` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `daftar_peminjaman`
--

LOCK TABLES `daftar_peminjaman` WRITE;
/*!40000 ALTER TABLE `daftar_peminjaman` DISABLE KEYS */;
/*!40000 ALTER TABLE `daftar_peminjaman` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `daftar_pengembalian`
--

DROP TABLE IF EXISTS `daftar_pengembalian`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `daftar_pengembalian` (
  `id_pengembalian` int(11) NOT NULL AUTO_INCREMENT,
  `id_peminjaman` int(11) NOT NULL,
  `tanggal_faktual_kembali` date NOT NULL,
  PRIMARY KEY (`id_pengembalian`),
  UNIQUE KEY `id_peminjaman` (`id_peminjaman`),
  CONSTRAINT `daftar_pengembalian_ibfk_1` FOREIGN KEY (`id_peminjaman`) REFERENCES `daftar_peminjaman` (`id_peminjaman`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `daftar_pengembalian`
--

LOCK TABLES `daftar_pengembalian` WRITE;
/*!40000 ALTER TABLE `daftar_pengembalian` DISABLE KEYS */;
/*!40000 ALTER TABLE `daftar_pengembalian` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-17 14:11:25
