// Database Connection Pooling system configuration for sellor.ai

// Pool Settings
class PoolSettings {
  static get() {
    return {
      enabled: process.env.DB_POOLING_ENABLED === 'true',
      maxConnections: parseInt(process.env.DB_POOLING_MAX_CONNECTIONS || '10', 10),
      minConnections: parseInt(process.env.DB_POOLING_MIN_CONNECTIONS || '2', 10),
      acquireTimeoutMillis: parseInt(process.env.DB_POOLING_ACQUIRE_TIMEOUT_MS || '30000', 10), // 30 seconds
      idleTimeoutMillis: parseInt(process.env.DB_POOLING_IDLE_TIMEOUT_MS || '600000', 10) // 10 minutes
    };
  }
}

export { PoolSettings };

import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  max: parseInt(process.env.DB_POOL_MAX || '20', 10), // Maximum number of clients in the pool
  idleTimeoutMillis: parseInt(process.env.DB_POOL_IDLE_TIMEOUT_MS || '30000', 10), // Close idle clients after this many ms
  connectionTimeoutMillis: parseInt(process.env.DB_POOL_CONNECTION_TIMEOUT_MS || '2000', 10) // Return error after this many ms if no client is available
});

// Query Execution Wrapper
class QueryExecutor {
  static async query(text: string, params?: any[]) {
    const start = Date.now();
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log('Executed query', { text, duration, rows: res.rowCount });
    return res;
  }
}

export { pool, QueryExecutor };