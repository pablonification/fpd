ALTER TABLE projects ADD COLUMN IF NOT EXISTS author text;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS abstract text;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS doi text;

UPDATE projects SET 
  author = principal_investigator,
  abstract = description
WHERE author IS NULL;
