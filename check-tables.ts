import { config } from 'dotenv';
import { db } from './lib/db';

config({ path: '.env' });

async function checkTables() {
  try {
    console.log('🔍 Checking database tables...');
    
    // Try to query the information_schema to see what tables exist
    const result = await db.execute(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `);
    
    console.log('📋 Existing tables:');
    console.log(result);
    
  } catch (error) {
    console.error('❌ Error checking tables:', error);
  }
}

checkTables(); 