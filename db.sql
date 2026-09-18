-- ===========================================================
-- DYA.ATTIRE SEMARANG — Database Schema & Seed Data
-- MySQL 5.7+ / MariaDB 10.3+
-- ===========================================================

CREATE DATABASE IF NOT EXISTS dya_attire
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_unicode_ci;

USE dya_attire;

-- -----------------------------------------------------------
-- Tabel Kebaya
-- -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS kebayas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(20) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    category ENUM('wisuda', 'lamaran', 'modern', 'bridesmaid') NOT NULL,
    ld_range VARCHAR(50) NOT NULL COMMENT 'Contoh: LD 90-94 cm (M)',
    color_group VARCHAR(50) NOT NULL,
    price INT NOT NULL,
    duration_days INT DEFAULT 3,
    image_mannequin VARCHAR(255) NOT NULL,
    image_model VARCHAR(255) NOT NULL,
    status ENUM('ready', 'booked', 'laundry') DEFAULT 'ready',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------
-- Tabel Reservasi Fitting
-- -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS fitting_reservations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    booking_code VARCHAR(30) NOT NULL UNIQUE,
    customer_name VARCHAR(100) NOT NULL,
    customer_whatsapp VARCHAR(25) NOT NULL,
    event_date DATE NOT NULL,
    fitting_date DATE NOT NULL,
    fitting_time VARCHAR(20) NOT NULL,
    kebaya_ids TEXT NOT NULL COMMENT 'Format JSON array: ["KB-001", "KB-003"]',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------
-- Seed Data: 8 Kebaya
-- -----------------------------------------------------------
INSERT INTO kebayas (code, name, category, ld_range, color_group, price, duration_days, image_mannequin, image_model, status) VALUES
('KB-001', 'Sekar Arum',        'wisuda',      'LD 88-92 cm (M)',   'Sage Green',      350000, 3, 'https://images.unsplash.com/photo-1594552072238-b8a33785b261?q=80&w=600', 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=600', 'ready'),
('KB-002', 'Ratih Kumaladewi',  'lamaran',     'LD 84-88 cm (S)',   'Champagne Gold',  450000, 3, 'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?q=80&w=600', 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=600', 'ready'),
('KB-003', 'Putri Serayu',      'modern',      'LD 90-94 cm (M)',   'Dusty Rose',      400000, 3, 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=600', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600', 'ready'),
('KB-004', 'Anindya Laras',     'wisuda',      'LD 94-98 cm (L)',   'Navy Blue',       375000, 3, 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?q=80&w=600', 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=600', 'booked'),
('KB-005', 'Cempaka Sari',      'bridesmaid',  'LD 88-92 cm (M)',   'Lilac Purple',    300000, 3, 'https://images.unsplash.com/photo-1614251056798-0a63eda2bb25?q=80&w=600', 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=600', 'ready'),
('KB-006', 'Gayatri Puspita',   'lamaran',     'LD 100-104 cm (XL)','Ivory White',     500000, 3, 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d44?q=80&w=600', 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?q=80&w=600', 'ready'),
('KB-007', 'Nirmala Ayu',       'modern',      'LD 84-88 cm (S)',   'Emerald Green',   425000, 3, 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=600', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600', 'laundry'),
('KB-008', 'Kartika Dewi',      'bridesmaid',  'LD 94-98 cm (L)',   'Blush Pink',      325000, 3, 'https://images.unsplash.com/photo-1562572159-4efc207f5aff?q=80&w=600', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600', 'ready');
