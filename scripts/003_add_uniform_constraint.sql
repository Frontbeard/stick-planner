-- Add unique constraint for fixture_uniforms upsert
ALTER TABLE fixture_uniforms 
ADD CONSTRAINT fixture_uniforms_team_fixture_unique 
UNIQUE (team_id, fixture_id);
