#!/usr/bin/env ts-node

import app from '@/app';
import { db } from '@/lib/db';
import { PORT } from '@/config/environment';

async function main() {
  try {
    // Initialize database connection
    await db.$connect();
    console.log('Database connected successfully');
    
    // Check if we need to run migrations
    if (process.env.RUN_MIGRATIONS === 'true') {
      console.log('Running database migrations...');
      // Import migrate-db script
      const { migrateDb } = require('./migrate-db');
      await migrateDb();
    }
    
    // Start the server
    const server = app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV}`);
      console.log('Ready to accept requests');
    });
    
    // Handle graceful shutdown
    process.on('SIGINT', async () => {
      console.log('Received SIGINT signal. Shutting down gracefully...');
      
      // Close server
      server.close((err) => {
        if (err) {
          console.error('Error closing server:', err);
        }
        console.log('Server closed');
      });
      
      // Disconnect database
      await db.$disconnect();
      console.log('Database disconnected');
      
      process.exit(0);
    });
    
    // Handle uncaught exceptions
    process.on('uncaughtException', async (err) => {
      console.error('Uncaught exception:', err);
      
      // Attempt to close server and disconnect database
      await new Promise<void>((resolve) => {
        if (server.listening) {
          server.close(() => resolve());
        } else {
          resolve();
        }
      });
      
      await db.$disconnect();
      process.exit(1);
    });
    
  } catch (error) {
    console.error('Failed to start application:', error);
    await db.$disconnect();
    process.exit(1);
  }
}

// Run the main function
main();