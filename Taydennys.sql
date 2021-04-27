
-- dumbing data for table käyttäjä

SET AUTOCOMMIT=0;
INSERT INTO kayttaja (kayttaja_nimi, kayttaja_rooli, salasana)VALUES
('HEIKKI', 'ADMIN', 'L3NTOkone'),
('TOMMI', 'KAYTTAJA', 'Tietokone2'),
('TIINA', 'ADMIN', 'palJONkamaa'),
('PENTTI', 'KAYTTAJA', 'olenpasLUOVA'),
('MAIJA', 'KAYTTAJA', 'Tietokone'),
('LEENA', 'KAYTTAJA', 'mun4Kokkeli'),
('PETRA', 'KAYTTAJA', 'mMmBaCoN'),
('VENLA', 'KAYTTAJA', 'TohtoriK'),
('TONI', 'KAYTTAJA', 'jAlkApAllo'),
('JOONAS', 'KAYTTAJA', 'JoJoreferenc3');
COMMIT;


-- dumbing data for table sijainti

SET AUTOCOMMIT=0;
INSERT INTO sijainti (hyllykkö_tunnus, hylly_nro, hylly_sektori) VALUES
-- A
('A', 1, 'VASEN'),('A', 1, 'KESKI'),('A', 1, 'OIKEA'),
('A', 2, 'VASEN'),('A', 2, 'KESKI'),('A', 2, 'OIKEA'),
('A', 3, 'VASEN'),('A', 3, 'KESKI'),('A', 3, 'OIKEA'),
('A', 4, 'VASEN'),('A', 4, 'KESKI'),('A', 4, 'OIKEA'),
-- B
('B', 1, 'VASEN'),('B', 1, 'KESKI'),('B', 1, 'OIKEA'),
('B', 2, 'VASEN'),('B', 2, 'KESKI'),('B', 2, 'OIKEA'),
('B', 3, 'VASEN'),('B', 3, 'KESKI'),('B', 3, 'OIKEA'),
('B', 4, 'VASEN'),('B', 4, 'KESKI'),('B', 4, 'OIKEA'),
-- C
('C', 1, 'VASEN'),('C', 1, 'KESKI'),('C', 1, 'OIKEA'),
('C', 2, 'VASEN'),('C', 2, 'KESKI'),('C', 2, 'OIKEA'),
('C', 3, 'VASEN'),('C', 3, 'KESKI'),('C', 3, 'OIKEA'),
('C', 4, 'VASEN'),('C', 4, 'KESKI'),('C', 4, 'OIKEA'),
-- D
('D', 1, 'VASEN'),('D', 1, 'KESKI'),('D', 1, 'OIKEA'),
('D', 2, 'VASEN'),('D', 2, 'KESKI'),('D', 2, 'OIKEA'),
('D', 3, 'VASEN'),('D', 3, 'KESKI'),('D', 3, 'OIKEA'),
('D', 4, 'VASEN'),('D', 4, 'KESKI'),('D', 4, 'OIKEA'),
-- E
('E', 1, 'VASEN'),('E', 1, 'KESKI'),('E', 1, 'OIKEA'),
('E', 2, 'VASEN'),('E', 2, 'KESKI'),('E', 2, 'OIKEA'),
('E', 3, 'VASEN'),('E', 3, 'KESKI'),('E', 3, 'OIKEA'),
('E', 4, 'VASEN'),('E', 4, 'KESKI'),('E', 4, 'OIKEA'),
-- F
('F', 1, 'VASEN'),('F', 1, 'KESKI'),('F', 1, 'OIKEA'),
('F', 2, 'VASEN'),('F', 2, 'KESKI'),('F', 2, 'OIKEA'),
('F', 3, 'VASEN'),('F', 3, 'KESKI'),('F', 3, 'OIKEA'),
('F', 4, 'VASEN'),('F', 4, 'KESKI'),('F', 4, 'OIKEA'),
-- G
('G', 1, 'VASEN'),('G', 1, 'KESKI'),('G', 1, 'OIKEA'),
('G', 2, 'VASEN'),('G', 2, 'KESKI'),('G', 2, 'OIKEA'),
('G', 3, 'VASEN'),('G', 3, 'KESKI'),('G', 3, 'OIKEA'),
('G', 4, 'VASEN'),('G', 4, 'KESKI'),('G', 4, 'OIKEA');
COMMIT;


-- dumbing data for table toimittaja

SET AUTOCOMMIT=0;
INSERT INTO toimittaja (toimittaja_nimi) VALUES
('ALKEMIA OY'), 
('SUOMENLABRA KAMAT'), 
('LABRALÄHETIT');
COMMIT;


-- dumbing data for table tuote

SET AUTOCOMMIT =0;
INSERT INTO tuote (tuote_nro, tuote_nimi, maara, kategoria, TOIMITTAJA_idTOIMITTAJA, SIJAINTI_idSIJAINTI) values
-- tuote_nro voidaan korvata tuote_id:llä
(2013696, 'BETAtex maski/suunsuoja kumilenkit 3-krs sininen type IIR 50kpl', 80, 'tää on varmaan turha', 1, 5),
(13221124, 'A12T Dilutus 80% desinfektioaine keltainen 500ml', 5, 'tää on varmaan turha', 2, 1),
(13221324, 'Värjätty A12t Dilutus 80% desinfektioaine keltainen 500ml', 12, 'tää on varmaan turha', 2, 1),
(454471, '! Vacuette® Na-sitraatti-putki kierteetön 3,5ml 13x75mm 50kpl', 2, 'tää on varmaan turha', 1, 11),
(454033, 'Vacuette® EDTA K3/NaF-putki kierteetön 4ml 13x75mm 50kpl', 2, 'tää on varmaan turha', 2, 16),
(454244, '! Vacuette® Li-hepariiniputki kierteetön 4ml 13x75mm 50kpl', 2, 'tää on varmaan turha', 2, 8),
(454204, 'Vacuette® seerumiputki kierteetön 4ml 13x75mm 50kpl', 2, 'tää on varmaan turha', 3, 5),
(454020, 'Vacuette® EDTA K2 -putki PREMIUM 3ml 13x75mm 50kpl', 2, 'tää on varmaan turha', 3, 4),
(349472, 'Jakoset lääkeannostelukortti 10kpl', 5, 'tää on varmaan turha', 3, 10),
(13240124, 'Desinfektol P Desinfektioaine 500ml', 12, 'tää on varmaan turha', 1, 23),
('TEHO', 'Teholava 60x80', 1, 'tää on varmaan turha', 3, 5),
-- ---------
(436610, 'KESTOKATETRI NELAT 2-T SILIK RUISKU CH12', 50, 'tää on varmaan turha', 1, 5),
(400016, 'KIRURGINEN SUU-NENÄSUOJA IIR KINGFA(KO)', 150, 'tää on varmaan turha', 2, 1),
(406352, 'MITTANAUHA LASIKUITU 150 CM OMPELIJAN', 10, 'tää on varmaan turha', 2, 1),
(487322, 'Q-SYTE VENTTIILITULPPA', 3, 'tää on varmaan turha', 1, 11),
(451424, 'TULPPA COMBI LL STER', 500, 'tää on varmaan turha', 2, 16),
(400003, 'Tutkimuskäsine S nitriili pton (KO)', 10, 'tää on varmaan turha', 2, 8),
(400017, 'Tutkimuskäsine nitriili L ston pton', 10, 'tää on varmaan turha', 3, 5),
(400018, 'Tutkimuskäsine nitriili M ston pton', 20, 'tää on varmaan turha', 3, 4),
(100001, 'RULLAKKO', 0, 'tää on varmaan turha', 3, 10),
(100002, 'LAVA', 0, 'tää on varmaan turha', 1, 23),
(100003, 'KOLLI', 0, 'tää on varmaan turha', 3, 5),
(100004, 'VARASTON TOIMITUSMAKSU', 1, 'MAKSU TILUAKSESTA/TOIMITUKSESTA', 2, 16),
-- loput hanskat (SELVITÄ MITÄ LOPUSSA OLEVAT LUVUT ON -> mahdollisesti lisää "valmistajan osanumero")
(487726, 'KÄSINE TUTKIMUS NITR PTON STON XL', 0, 'tää on varmaan turha', 2, 1),
(487683, 'KÄSINE TUTKIMUS NITR PTON STON XS', 10, 'tää on varmaan turha', 2, 1),
(489788, 'KÄSINE TUTKIMUS SELEFA L VALK PTON NITR', 3, 'tää on varmaan turha', 1, 11),
(489775, 'KÄSINE TUTKIMUS SELEFA M VALK PTON NITR', 500, 'tää on varmaan turha', 2, 16),
(489791, 'KÄSINE TUTKIMUS SELEFA XL VALK PTON NITR', 10, 'tää on varmaan turha', 2, 8),
(489759, 'KÄSINE TUTKIMUS SELEFA XS VALK PTON NITR', 10, 'tää on varmaan turha', 3, 5),
(489762, 'KÄSINE TUTK SELEFA S VALK PTON NITRIILI', 20, 'tää on varmaan turha', 3, 4),
(487667, 'KÄSINE TUTKIMUS NITR PTON STON PITKÄV L', 0, 'tää on varmaan turha', 3, 10),
(487654, 'KÄSINE TUTKIMUS NITR PTON STON PITKÄV M', 0, 'tää on varmaan turha', 1, 23),
(487641, 'KÄSINE TUTKIMUS NITR PTON STON PITKÄV S', 0, 'tää on varmaan turha', 3, 5),
(487670, 'KÄSINE TUTKIMUS NITR PTON STON PITKÄV XL', 1, 'tä on varmaan turha', 2, 16);
COMMIT;


-- dumbing data for table tilaus

SET AUTOCOMMIT=0;
INSERT INTO tilaus (maara, tilaus_pvm, TOIMITTAJA_idTOIMITTAJA, TUOTE_idTUOTE) VALUES
(35, '2010-4-25', 3, 2),
(350, '2013-12-5', 3, 1),
(654, '2012-1-1', 1, 8),
(5, '2018-3-24', 2, 3),
(3482, '2010-4-26', 1, 12);
COMMIT;


-- dumbing data for table lainaus

SET AUTOCOMMIT=0;
-- id_lainaus luodaan automaattisesti
INSERT INTO lainaus (lainaus_maara, lainaus_pvm, KAYTTAJA_idKAYTTAJA, TUOTE_idTUOTE) VALUES
(4, '2015-3-24', 2, 4), 
(4, '2021-2-12', 5, 6), 
(6, '2021-1-1', 2, 7), 
(7, '2018-2-22', 1, 3), 
(7, '2020-1-5', 1, 6);
COMMIT;