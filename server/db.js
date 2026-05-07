import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.resolve(__dirname, 'rankwise.db');

const db = new Database(dbPath, { verbose: console.log });

db.pragma('journal_mode = WAL');

export default db;
