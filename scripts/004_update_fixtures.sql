-- Update fixtures with correct data and logos
-- First add maps_url column if it doesn't exist
ALTER TABLE fixtures ADD COLUMN IF NOT EXISTS maps_url TEXT;

-- Delete existing fixtures for the team
DELETE FROM fixtures WHERE team_id = (SELECT id FROM teams WHERE name = 'Belgrano Athletic' LIMIT 1);

-- Insert correct fixtures with actual logos
INSERT INTO fixtures (team_id, date, time, opponent, opponent_logo, location, matchday, maps_url) VALUES
-- FECHA 1: visitante
((SELECT id FROM teams WHERE name = 'Belgrano Athletic' LIMIT 1), '2026-03-07', '18:00', 'SAN LORENZO B', 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SAN%20LORENZO%20B-mLETlsnYyLWb2ZCFpT6QP57R5jMjY4.png', 'visitante', 'Fecha 1', 'https://www.google.com/maps/search/?api=1&query=Cafferata%203099,%20B1772%20Villa%20Celina,%20Provincia%20de%20Buenos%20Aires%20Villa%20Celina%20Buenos%20Aires'),
-- FECHA 2: visitante
((SELECT id FROM teams WHERE name = 'Belgrano Athletic' LIMIT 1), '2026-03-14', '18:00', 'LICEO MILITAR', 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LICEO%20MILITAR-osVSkudC6qsLvIzNxH9ge6CpGv8vPi.png', 'visitante', 'Fecha 2', 'https://www.google.com/maps/search/?api=1&query=Av.%20Bernab%C3%A9%20M%C3%A1rquez%206156,%20Loma%20Hermosa,%20Provincia%20de%20Buenos%20Aires%20Loma%20Hermosa%20Buenos%20Aires'),
-- FECHA 3: local
((SELECT id FROM teams WHERE name = 'Belgrano Athletic' LIMIT 1), '2026-03-21', '18:00', 'B.A.C.R.C', 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/B.A.C.R.C-Fp3jvSYUkAkThwUaRqlHUVTqlbs2ra.png', 'local', 'Fecha 3', 'https://www.google.com/maps/search/?api=1&query=Cafferata%203099,%20B1772%20Villa%20Celina,%20Provincia%20de%20Buenos%20Aires%20Villa%20Celina%20Buenos%20Aires'),
-- FECHA 4: libre
((SELECT id FROM teams WHERE name = 'Belgrano Athletic' LIMIT 1), '2026-03-28', '18:00', 'FECHA LIBRE', NULL, 'local', 'Fecha 4', NULL),
-- FECHA 5: local
((SELECT id FROM teams WHERE name = 'Belgrano Athletic' LIMIT 1), '2026-04-11', '18:00', 'HURACÁN', 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/HURAC%C3%81N-Do9WwlUvulTE5cISSymMbY4DSNcnpo.png', 'local', 'Fecha 5', 'https://www.google.com/maps/search/?api=1&query=Cafferata%203099,%20B1772%20Villa%20Celina,%20Provincia%20de%20Buenos%20Aires%20Villa%20Celina%20Buenos%20Aires'),
-- FECHA 6: visitante
((SELECT id FROM teams WHERE name = 'Belgrano Athletic' LIMIT 1), '2026-04-18', '18:00', 'SAN MARCOS', 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SAN%20MARCOS-XdT50G2qUX4kp838fvHAhTarhflLkn.png', 'visitante', 'Fecha 6', 'https://maps.app.goo.gl/VqZZF57H8cWePT5H8'),
-- FECHA 7: local
((SELECT id FROM teams WHERE name = 'Belgrano Athletic' LIMIT 1), '2026-04-25', '18:00', 'PUEYRREDON', 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/PUEYRREDON-aWHx0MnLB8TPkCIHdMT8KAPdR6NXHp.png', 'local', 'Fecha 7', 'https://www.google.com/maps/search/?api=1&query=Cafferata%203099,%20B1772%20Villa%20Celina,%20Provincia%20de%20Buenos%20Aires%20Villa%20Celina%20Buenos%20Aires');
