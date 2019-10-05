/* Seeds for Product Database */
INSERT INTO products (id, name, type, mood, stock, price, createdAt, updatedAt) VALUES (1, "Purple Haze", "Indica", "Chill", 300, 8.60, "2019-09-20 00:00:00", "2019-09-20 00:00:00");
INSERT INTO products (id, name, type, mood, stock, price, createdAt, updatedAt) VALUES (2, "Northern Lights", "Indica", "Relaxing", 275, 13.90, "2019-09-20 00:00:00", "2019-09-20 00:00:00");
INSERT INTO products (id, name, type, mood, stock, price, createdAt, updatedAt) VALUES (3, "Sour Diesel", "Stavia", "Relaxing", 25, 9.70, "2019-09-20 00:00:00", "2019-09-20 00:00:00");
INSERT INTO products (id, name, type, mood, stock, price, createdAt, updatedAt) VALUES (4, "Girl Scout Cookies", "Hybrid", "Party", 130, 8.30, "2019-09-20 00:00:00", "2019-09-20 00:00:00");
INSERT INTO products (id, name, type, mood, stock, price, createdAt, updatedAt) VALUES (5, "OG Cush", "Hybrid", "Intense", 235, 6.75, "2019-09-20 00:00:00", "2019-09-20 00:00:00");
INSERT INTO products (id, name, type, mood, stock, price, createdAt, updatedAt) VALUES (6, "Green Crack", "Sativa", "Energetic", 175, 11.25, "2019-09-20 00:00:00", "2019-09-20 00:00:00");
/* Seeds for User Information */
INSERT INTO users (id, userName, password, createdAt, updatedAt) VALUES (1, "admin", "admin", "2019-09-20 00:00:00", "2019-09-20 00:00:00");
/* Checkout Table Seed --- For Testing Only ---- Remove Before Deploy */
INSERT INTO purchases (id, name, price, amount, createdAt, updatedAt) VALUES (1, "Sour Diesel", 9.70, 15, "2019-09-20 00:00:00", "2019-09-20 00:00:00");
INSERT INTO purchases (id, name, price, amount, createdAt, updatedAt) VALUES (1, "Northern Ligths", 13.90, 8, "2019-09-20 00:00:00", "2019-09-20 00:00:00");