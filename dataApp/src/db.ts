import {
  CapacitorSQLite,
  SQLiteConnection,
  SQLiteDBConnection,
} from '@capacitor-community/sqlite';

const sqlite = new SQLiteConnection(CapacitorSQLite);
let db: SQLiteDBConnection | null = null;

// iniciamos base de datos
export const initDB = async () => {
  if (db) return;
  
  const dbConn = await sqlite.createConnection('offlineDB', false, 'no-encryption', 1, false);

  await dbConn.open();

  await dbConn.execute(`
    CREATE TABLE IF NOT EXISTS clientes (
      id INTEGER PRIMARY KEY,
      nombre TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      sync_status TEXT NOT NULL
    );
  `);

  db = dbConn;
};

export const getDB = () => {
  if (!db) throw new Error('La base de datos no está inicializada.');
  return db;
};
