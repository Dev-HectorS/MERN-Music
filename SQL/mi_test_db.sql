DROP DATABASE IF EXISTS mi_test_db;

CREATE DATABASE mi_test_db;

USE mi_test_db;

CREATE TABLE personas (
	persona_id int NOT NULL AUTO_INCREMENT,
	telefono varchar(10) NOT NULL,
	nombre varchar(50) NOT NULL,
	apaterno varchar(50) NOT NULL,
	amaterno varchar(50) NOT NULL,
	fecha_nacimiento varchar(20) NOT NULL,
	genero varchar(1) NOT NULL,
	PRIMARY KEY (persona_id)
);

CREATE TABLE usuarios (
	usuario_id int NOT NULL AUTO_INCREMENT,
	persona_id int NOT NULL,
	rol int(1) NOT NULL,
	email varchar(60) NOT NULL,
	usuario varchar(20) NOT NULL,
	password varchar(250) NOT NULL,
	token varchar(250),
	token_recovery varchar(250),
	isActive int(1) NOT NULL,
	createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updateAt TIMESTAMP,
	deletedAt TIMESTAMP,
	PRIMARY KEY (usuario_id),
	FOREIGN KEY (persona_id) REFERENCES personas(persona_id) ON DELETE CASCADE
);

CREATE TABLE mimusica (
	mi_musica_id int NOT NULL AUTO_INCREMENT,
	persona_id int NOT NULL,
	name varchar(250) NOT NULL,
	author varchar(250) NOT NULL,
	PRIMARY KEY (mi_musica_id),
	FOREIGN KEY (persona_id) REFERENCES personas(persona_id) ON DELETE CASCADE
);

-- 1. Script para poblar todas las tablas. 
INSERT INTO personas (telefono, nombre, apaterno, amaterno, fecha_nacimiento, genero)
   VALUES
      ('1482911086', 'Kristal', 'Kerridge', 'Pittock', '1989-03-07', 'F'),
      ('5838862661', 'Robbert', 'Dugood', 'Kearton', '1995-07-07', 'M'),
      ('4366277018', 'Huberto', 'Arndtsen', 'Walshe', '1992-06-25', 'M'),
      ('5016849374', 'Antons', 'Beresfore', 'Benardette', '1995-04-01', 'M'),
      ('4216387640', 'Arley', 'Dominik', 'Kembrey', '1995-04-15', 'M'),
      ('8647584724', 'Brittni', 'Yegorshin', 'Haine', '1983-03-06', 'F'),
      ('4414883571', 'Rickie', 'Pinsent', 'Allderidge', '1989-02-05', 'F'),
      ('1333152191', 'Janenna', 'Cloonan', 'Gregg', '1993-03-12', 'F'),
      ('9688472999', 'Berte', 'Sallans', 'Askew', '1987-10-15', 'F'),
      ('3832934219', 'Emmy', 'Sigars', 'Radden', '1999-10-30', 'F'),
      ('3125252814', 'Shirlee', 'Ambrosoni', 'Tweede', '1987-03-23', 'F'),
      ('7380567047', 'Brennen', 'Towsey', 'Devo', '1994-01-23', 'M'),
      ('8159774141', 'Eydie', 'Yewman', 'Seals', '1989-11-30', 'F'),
      ('8877964766', 'Suzy', 'Mersh', 'Sherrard', '1983-10-19', 'F'),
      ('7505862502', 'Evania', 'Crichton', 'Frarey', '1986-02-14', 'F'),
      ('2969849879', 'Mathe', 'Essex', 'Cowoppe', '1993-08-21', 'M'),
      ('9813934476', 'Analise', 'Leethem', 'Cockell', '1984-06-18', 'F'),
      ('5749628213', 'Gabriele', 'Lethabridge', 'Dudman', '1982-04-06', 'M'),
      ('8707408587', 'Brnaba', 'Shera', 'Curnok', '1995-12-10', 'M'),
      ('1780819536', 'Pete', 'Kneath', 'Fick', '1989-04-18', 'M');
   
INSERT INTO usuarios (persona_id, rol, email, usuario, password, isActive, createdAt) 
   VALUES 
      (1, 1, 'bconochie0@drupal.org', 'rbindin0', 'ir6NHerF', 0, '2004-02-26'),
      (2, 1, 'kocurrine1@aboutads.info', 'rstigger1', 'XvXUp5KB', 1, '2003-07-29'),
      (3, 1, 'eblazejewski2@topsy.com', 'wglavias2', '0MLafRy1G', 0, '2004-06-08'),
      (4, 1, 'pscalia3@twitter.com', 'aarnke3', 'C4Mvga1kA', 0, '2001-05-29'),
      (5, 1, 'tparlott4@privacy.gov.au', 'vbiggerstaff4', '1H9xgrg', 0, '2005-11-26'),
      (6, 1, 'asheron5@psu.edu', 'branaghan5', '1STfFi', 1, '2005-01-16'),
      (7, 1, 'ndemer6@bbb.org', 'ccornill6', 'sTKMO1', 1, '2002-03-09'),
      (8, 1, 'strunchion7@flickr.com', 'gwhitfield7', 'CvdXQPs2', 0, '2000-07-24'),
      (9, 1, 'rsumption8@gmpg.org', 'alanger8', 'PQculfyt5Rqb', 0, '2001-03-21'),
      (10, 1, 'tlambrook9@usgs.gov', 'srohlfs9', 'lrpPDPMs', 1, '2005-09-10'),
      (11, 1, 'lpettingalla@shutterfly.com', 'landriolia', 'A7X5oceV', 0, '2001-01-28'),
      (12, 1, 'lscoterboshb@nasa.gov', 'pthistletonb', 'tbTgkbTD', 1, '2001-10-26'),
      (13, 1, 'dspinellic@theguardian.com', 'dmunghamc', 'GxcTGnyf', 1, '2002-11-07'),
      (14, 1, 'gadamovitzd@usgs.gov', 'bwashingtond', 'wi6W6730', 1, '2000-06-20'),
      (15, 1, 'sorablee@quantcast.com', 'pmaccambridgee', 'fJ7zcKo3P', 1, '2003-07-17'),
      (16, 1, 'vorchardf@symantec.com', 'wbrighteyf', 'PravCr', 1, '2002-06-07'),
      (17, 1, 'kridgewellg@rambler.ru', 'bhiggeng', 'NbZVCq6GhTl', 1, '2005-12-24'),
      (18, 1, 'rpawsonh@squidoo.com', 'ltytheh', 'XLKyQEB5tn7', 0, '2000-03-31'),
      (19, 1, 'tspinielloi@ifeng.com', 'kflaxoni', 'Nsh4ux', 1, '2005-01-25'),
      (20, 1, 'lhulmesj@friendfeed.com', 'kedisonj', 'tF4X7OoQJgw3', 0, '2001-05-22');

INSERT INTO mimusica (persona_id, name, author)
   VALUES
      (1,'Sweet Home Alabama','Lynyrd Skynyrd'),
      (2,'Eruption','Van Halen'),
      (4,'Key to the Highway', 'Eric Clapton'),
      (5,'Sharp Dressed Man', 'ZZ Top'),
      (6,'Free Bird', 'Lynyrd Skynyrd'),
      (7,'Thunderstruck', 'AC/DC'),
      (8,'Candy Shop','50 cent'),
      (9,'Enter Sandman', 'Metallica'),
      (10,'Sad But True', 'Metallica'),
      (11,'Thunderstruck', 'AC/DC'),
      (12,'Candy Shop','50 cent'),
      (13,'Enter Sandman', 'Metallica'),
      (14,'Free Bird', 'Lynyrd Skynyrd'),
      (15,'Sweet Home Alabama','Lynyrd Skynyrd');