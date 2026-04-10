-- Seed initial data for Belgrano Athletic
-- Let the database generate UUIDs automatically

-- Insert team with a fixed UUID for reference
INSERT INTO teams (id, name, logo, created_at) VALUES 
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Belgrano Athletic', '/escudo.png', NOW())
ON CONFLICT (id) DO NOTHING;

-- Insert players (let DB generate UUIDs)
INSERT INTO players (team_id, first_name, last_name, dorsal_number, position, is_cited) VALUES
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Inés', 'STEGMANN', 1, 'GK', false),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Abril', 'CIVILOTTI', 2, null, false),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Mía', 'KRANEVITTER', 4, null, false),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Victoria', 'SAUZE', 5, null, false),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Martina', 'DISTÉFANO', 6, null, false),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Catalina', 'ANDREU', 7, null, false),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Fátima', 'ZÁRATE', 8, null, false),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Sofía', 'SÁNCHEZ', 9, null, false),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Catalina', 'ANDRADE', 10, null, false),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Juana', 'GAUCHAT', 11, null, false),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Juana', 'MARAÑÓN', 12, null, false),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Lucía', 'ROMERO', 14, null, false),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Francisca', 'USANDIZAGA', 15, null, false),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Emilia', 'GARAY', 17, null, false),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Catalina', 'VANZINI', 18, null, false),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Juana', 'GOTI', 19, null, false),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'María Emilia', 'ORDOÑEZ', 20, null, false),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Zoe', 'CORONEL', 22, null, false),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'María Luján', 'CARBALLO', 24, null, false),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Ana', 'SANCHIS', 26, 'GK', false),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Azul', 'BIDEGORRY', 32, null, false);

-- Insert fixtures (using correct schema columns)
INSERT INTO fixtures (team_id, date, time, opponent, opponent_logo, location, matchday) VALUES
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', '2026-03-15', '15:00', 'CASA DE PADUA', '/logos/casadepadua.png', 'local', 'Fecha 1'),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', '2026-03-22', '16:30', 'SAN FERNANDO', '/logos/sanfernando.png', 'visitante', 'Fecha 2'),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', '2026-03-29', '14:00', 'BUENOS AIRES', '/logos/buenosaires.png', 'local', 'Fecha 3'),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', '2026-04-05', '17:00', 'LOMAS', '/logos/lomas.png', 'visitante', 'Fecha 4'),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', '2026-04-11', '18:00', 'HURACÁN', '/logos/huracan.png', 'local', 'Fecha 5');
