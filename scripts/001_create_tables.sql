-- Planificador Hockey Database Schema

-- Teams table (for multi-team support in the future)
CREATE TABLE IF NOT EXISTS teams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  logo TEXT,
  division TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default team
INSERT INTO teams (id, name, logo, division) 
VALUES ('00000000-0000-0000-0000-000000000001', 'Belgrano Athletic', '/escudo.png', 'Segunda División')
ON CONFLICT (id) DO NOTHING;

-- Players table
CREATE TABLE IF NOT EXISTS players (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID REFERENCES teams(id) ON DELETE CASCADE DEFAULT '00000000-0000-0000-0000-000000000001',
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  dorsal_number INTEGER NOT NULL,
  position TEXT,
  is_cited BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Fixtures table
CREATE TABLE IF NOT EXISTS fixtures (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID REFERENCES teams(id) ON DELETE CASCADE DEFAULT '00000000-0000-0000-0000-000000000001',
  matchday TEXT NOT NULL,
  date DATE NOT NULL,
  time TEXT NOT NULL,
  opponent TEXT NOT NULL,
  opponent_logo TEXT,
  location TEXT NOT NULL CHECK (location IN ('local', 'visitante')),
  venue TEXT,
  is_bye BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Match info (selected fixture details)
CREATE TABLE IF NOT EXISTS match_info (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID REFERENCES teams(id) ON DELETE CASCADE DEFAULT '00000000-0000-0000-0000-000000000001',
  fixture_id UUID REFERENCES fixtures(id) ON DELETE SET NULL,
  matchday TEXT,
  date TEXT,
  time TEXT,
  opponent TEXT,
  location TEXT,
  tournament TEXT,
  round TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(team_id)
);

-- Formation boards
CREATE TABLE IF NOT EXISTS formation_boards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID REFERENCES teams(id) ON DELETE CASCADE DEFAULT '00000000-0000-0000-0000-000000000001',
  name TEXT NOT NULL,
  positions JSONB DEFAULT '[]',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Corner plays (offensive)
CREATE TABLE IF NOT EXISTS corner_plays (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID REFERENCES teams(id) ON DELETE CASCADE DEFAULT '00000000-0000-0000-0000-000000000001',
  name TEXT NOT NULL,
  description TEXT,
  tokens JSONB DEFAULT '[]',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Defensive corner plays
CREATE TABLE IF NOT EXISTS defensive_corner_plays (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID REFERENCES teams(id) ON DELETE CASCADE DEFAULT '00000000-0000-0000-0000-000000000001',
  name TEXT NOT NULL,
  description TEXT,
  tokens JSONB DEFAULT '[]',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Block plays
CREATE TABLE IF NOT EXISTS block_plays (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID REFERENCES teams(id) ON DELETE CASCADE DEFAULT '00000000-0000-0000-0000-000000000001',
  name TEXT NOT NULL,
  description TEXT,
  tokens JSONB DEFAULT '[]',
  drawings JSONB DEFAULT '[]',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Fixture uniforms
CREATE TABLE IF NOT EXISTS fixture_uniforms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID REFERENCES teams(id) ON DELETE CASCADE DEFAULT '00000000-0000-0000-0000-000000000001',
  fixture_id TEXT NOT NULL,
  camiseta TEXT NOT NULL,
  pollera TEXT DEFAULT 'pollera',
  medias TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(team_id, fixture_id)
);

-- Scouting notes
CREATE TABLE IF NOT EXISTS scouting_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID REFERENCES teams(id) ON DELETE CASCADE DEFAULT '00000000-0000-0000-0000-000000000001',
  fixture_id TEXT NOT NULL,
  content TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(team_id, fixture_id)
);

-- User settings (BW mode, selected fixture, etc.)
CREATE TABLE IF NOT EXISTS user_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID REFERENCES teams(id) ON DELETE CASCADE DEFAULT '00000000-0000-0000-0000-000000000001',
  bw_mode BOOLEAN DEFAULT FALSE,
  selected_fixture_id TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(team_id)
);

-- Enable RLS on all tables (but allow public access for now since we don't have user auth yet)
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE players ENABLE ROW LEVEL SECURITY;
ALTER TABLE fixtures ENABLE ROW LEVEL SECURITY;
ALTER TABLE match_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE formation_boards ENABLE ROW LEVEL SECURITY;
ALTER TABLE corner_plays ENABLE ROW LEVEL SECURITY;
ALTER TABLE defensive_corner_plays ENABLE ROW LEVEL SECURITY;
ALTER TABLE block_plays ENABLE ROW LEVEL SECURITY;
ALTER TABLE fixture_uniforms ENABLE ROW LEVEL SECURITY;
ALTER TABLE scouting_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (can be restricted later with auth)
CREATE POLICY "Allow public read" ON teams FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON players FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON players FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update" ON players FOR UPDATE USING (true);
CREATE POLICY "Allow public delete" ON players FOR DELETE USING (true);

CREATE POLICY "Allow public read" ON fixtures FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON fixtures FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update" ON fixtures FOR UPDATE USING (true);
CREATE POLICY "Allow public delete" ON fixtures FOR DELETE USING (true);

CREATE POLICY "Allow public read" ON match_info FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON match_info FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update" ON match_info FOR UPDATE USING (true);
CREATE POLICY "Allow public delete" ON match_info FOR DELETE USING (true);

CREATE POLICY "Allow public read" ON formation_boards FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON formation_boards FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update" ON formation_boards FOR UPDATE USING (true);
CREATE POLICY "Allow public delete" ON formation_boards FOR DELETE USING (true);

CREATE POLICY "Allow public read" ON corner_plays FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON corner_plays FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update" ON corner_plays FOR UPDATE USING (true);
CREATE POLICY "Allow public delete" ON corner_plays FOR DELETE USING (true);

CREATE POLICY "Allow public read" ON defensive_corner_plays FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON defensive_corner_plays FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update" ON defensive_corner_plays FOR UPDATE USING (true);
CREATE POLICY "Allow public delete" ON defensive_corner_plays FOR DELETE USING (true);

CREATE POLICY "Allow public read" ON block_plays FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON block_plays FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update" ON block_plays FOR UPDATE USING (true);
CREATE POLICY "Allow public delete" ON block_plays FOR DELETE USING (true);

CREATE POLICY "Allow public read" ON fixture_uniforms FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON fixture_uniforms FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update" ON fixture_uniforms FOR UPDATE USING (true);
CREATE POLICY "Allow public delete" ON fixture_uniforms FOR DELETE USING (true);

CREATE POLICY "Allow public read" ON scouting_notes FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON scouting_notes FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update" ON scouting_notes FOR UPDATE USING (true);
CREATE POLICY "Allow public delete" ON scouting_notes FOR DELETE USING (true);

CREATE POLICY "Allow public read" ON user_settings FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON user_settings FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update" ON user_settings FOR UPDATE USING (true);
CREATE POLICY "Allow public delete" ON user_settings FOR DELETE USING (true);
