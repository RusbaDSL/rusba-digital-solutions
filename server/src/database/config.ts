import sqlite3 from 'sqlite3';
import path from 'path';

const dbPath = path.join(__dirname, '../../rusba.db');
const db = new sqlite3.Database(dbPath);

// Create promisified versions of database methods
export const dbAsync = {
    run: (sql: string, params: any[] = []): Promise<any> => {
        return new Promise((resolve, reject) => {
            db.run(sql, params, function(err) {
                if (err) reject(err);
                else resolve({ lastID: this.lastID, changes: this.changes });
            });
        });
    },
    get: (sql: string, params: any[] = []): Promise<any> => {
        return new Promise((resolve, reject) => {
            db.get(sql, params, (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });
    },
    all: (sql: string, params: any[] = []): Promise<any[]> => {
        return new Promise((resolve, reject) => {
            db.all(sql, params, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    },
    exec: (sql: string): Promise<void> => {
        return new Promise((resolve, reject) => {
            db.exec(sql, (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
    }
};

export default db;
