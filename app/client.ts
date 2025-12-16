import { createClient } from '@supabase/supabase-js';

const URL = 'https://vkpxuygsiffpscblnksd.supabase.co';

const API_KEY = 'sb_publishable_ZfENNuW4JxJZae5Y_mKUVw_eyHEnCpg';

export const supabase = createClient(URL, API_KEY);