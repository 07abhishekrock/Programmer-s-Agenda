import { createClient } from '@supabase/supabase-js'

const supabase = createClient("https://uksuvqctqonlaevvbjww.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyNjE5MDE5OSwiZXhwIjoxOTQxNzY2MTk5fQ.LEW2giswtWAjY3YiafC80Lgyz6WiLuQwo-9BJR-jtv0");

export {supabase};