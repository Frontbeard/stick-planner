-- Complete data update with correct player names and fixture
-- Get the team ID
DO $$
DECLARE
  team_uuid UUID;
BEGIN
  SELECT id INTO team_uuid FROM teams WHERE name = 'Belgrano Athletic' LIMIT 1;
  
  -- Delete existing players
  DELETE FROM players WHERE team_id = team_uuid;
  
  -- Delete existing fixtures
  DELETE FROM fixtures WHERE team_id = team_uuid;
  
  -- Insert all 21 players with correct names and dorsal numbers
  INSERT INTO players (team_id, first_name, last_name, dorsal_number, position, is_cited) VALUES
    (team_uuid, 'Melissa Carolina', 'Fernandez Niego', 96, 'Arquera', false),
    (team_uuid, 'Florencia Gabriela', 'Gonzalez', 22, NULL, false),
    (team_uuid, 'Débora', 'Vera', 24, NULL, false),
    (team_uuid, 'María Belén', 'Bianchi', 14, NULL, false),
    (team_uuid, 'Gisele Adriana', 'Frenedoso', 7, NULL, false),
    (team_uuid, 'Tamara Alejandra', 'Cortez Mendoza', 38, NULL, false),
    (team_uuid, 'Josefina Maria', 'Pegels', 36, NULL, false),
    (team_uuid, 'Marianela', 'Lopez', 13, NULL, false),
    (team_uuid, 'Paula Andrea', 'Rebutti', 79, NULL, false),
    (team_uuid, 'Vanina Lucía', 'del Villar Coux', 4, NULL, false),
    (team_uuid, 'María Soledad', 'Gnisci', 25, NULL, false),
    (team_uuid, 'Rocío Belén', 'Rodriguez', 16, NULL, false),
    (team_uuid, 'Micaela', 'Fernández', 19, NULL, false),
    (team_uuid, 'Aylen', 'Gaddi', 21, NULL, false),
    (team_uuid, 'Florencia', 'Benzo', 15, NULL, false),
    (team_uuid, 'Martina Alejandra', 'Renó', 72, NULL, false),
    (team_uuid, 'Kiara Nahir', 'Chabin', 27, NULL, false),
    (team_uuid, 'Geraldine Giselle', 'Caiafa', 11, NULL, false),
    (team_uuid, 'Milagros', 'Nuñez Labollita', 57, NULL, false),
    (team_uuid, 'María Paula', 'Rodríguez', 17, NULL, false),
    (team_uuid, 'Gisela', 'Silva', 10, NULL, false);

  -- Insert all 7 fixtures with correct data
  -- FECHA 1: San Lorenzo B vs B. Hipotecario (Visitante)
  INSERT INTO fixtures (team_id, matchday, date, time, opponent, location, opponent_logo, maps_url) VALUES
    (team_uuid, 'Fecha 1', '2025-03-07', '18:00', 'San Lorenzo B', 'visitante', 
     'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SAN%20LORENZO%20B-SFZT5PSNTb1BcYPQPBZU4hfEzs3PT8.png',
     'https://www.google.com/maps/search/?api=1&query=Cafferata%203099,%20B1772%20Villa%20Celina,%20Provincia%20de%20Buenos%20Aires%20Villa%20Celina%20Buenos%20Aires');

  -- FECHA 2: Liceo Militar vs B. Hipotecario (Visitante)
  INSERT INTO fixtures (team_id, matchday, date, time, opponent, location, opponent_logo, maps_url) VALUES
    (team_uuid, 'Fecha 2', '2025-03-14', '18:00', 'Liceo Militar', 'visitante',
     'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LICEO%20MILITAR-Zb87m3sGdzAqX1bvAQLf0ykHH1qo3E.png',
     'https://www.google.com/maps/search/?api=1&query=Av.%20Bernab%C3%A9%20M%C3%A1rquez%206156,%20Loma%20Hermosa,%20Provincia%20de%20Buenos%20Aires%20Loma%20Hermosa%20Buenos%20Aires');

  -- FECHA 3: B. Hipotecario vs B.A.C.R.C (Local)
  INSERT INTO fixtures (team_id, matchday, date, time, opponent, location, opponent_logo, maps_url) VALUES
    (team_uuid, 'Fecha 3', '2025-03-21', '18:00', 'B.A.C.R.C', 'local',
     'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/B.A.C.R.C-8RoOgxZZR7RPWafC66mXxb0VjiVpwg.png',
     'https://www.google.com/maps/search/?api=1&query=Cafferata%203099,%20B1772%20Villa%20Celina,%20Provincia%20de%20Buenos%20Aires%20Villa%20Celina%20Buenos%20Aires');

  -- FECHA 4: Fecha Libre
  INSERT INTO fixtures (team_id, matchday, date, time, opponent, location, opponent_logo, maps_url, is_bye) VALUES
    (team_uuid, 'Fecha 4', '2025-03-28', '18:00', 'FECHA LIBRE', 'local', NULL, NULL, true);

  -- FECHA 5: B. Hipotecario vs Huracán (Local)
  INSERT INTO fixtures (team_id, matchday, date, time, opponent, location, opponent_logo, maps_url) VALUES
    (team_uuid, 'Fecha 5', '2025-04-11', '18:00', 'Huracán', 'local',
     'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/HURAC%C3%81N-a0uwFOktwHGfAbOOG2sbMSpH3guVv3.png',
     'https://www.google.com/maps/search/?api=1&query=Cafferata%203099,%20B1772%20Villa%20Celina,%20Provincia%20de%20Buenos%20Aires%20Villa%20Celina%20Buenos%20Aires');

  -- FECHA 6: San Marcos vs B. Hipotecario (Visitante)
  INSERT INTO fixtures (team_id, matchday, date, time, opponent, location, opponent_logo, maps_url) VALUES
    (team_uuid, 'Fecha 6', '2025-04-18', '18:00', 'San Marcos', 'visitante',
     'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SAN%20MARCOS-kU3AGyw0wtfATsFJDYcJkOgN0LH0Fu.png',
     'https://maps.app.goo.gl/VqZZF57H8cWePT5H8');

  -- FECHA 7: B. Hipotecario vs Pueyrredon (Local)
  INSERT INTO fixtures (team_id, matchday, date, time, opponent, location, opponent_logo, maps_url) VALUES
    (team_uuid, 'Fecha 7', '2025-04-25', '18:00', 'Pueyrredon', 'local',
     'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/PUEYRREDON-HBQUkmp7Z4wv7ce0dW1tn2Y2cbevu8.png',
     'https://www.google.com/maps/search/?api=1&query=Cafferata%203099,%20B1772%20Villa%20Celina,%20Provincia%20de%20Buenos%20Aires%20Villa%20Celina%20Buenos%20Aires');

END $$;
