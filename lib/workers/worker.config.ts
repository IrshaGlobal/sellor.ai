// Worker system configuration for sellor.ai

// Worker Tasks
class WorkerTasks {
  static AI_PRODUCT_GENERATION = 'ai-product-generation';
  static EMAIL_NOTIFICATIONS = 'email-notifications';
}

// Worker Configuration
class WorkerConfiguration {
  static get(task: string) {
    switch (task) {
      case WorkerTasks.AI_PRODUCT_GENERATION:
        return {
          concurrency: parseInt(process.env.WORKER_AI_CONCURRENCY || '5', 10),
          timeout: parseInt(process.env.WORKER_AI_TIMEOUT_MS || '60000', 10), // 1 minute
          retries: parseInt(process.env.WORKER_AI_RETRIES || '3', 10)
        };
      case WorkerTasks.EMAIL_NOTIFICATIONS:
        return {
          concurrency: parseInt(process.env.WORKER_EMAIL_CONCURRENCY || '10', 10),
          timeout: parseInt(process.env.WORKER_EMAIL_TIMEOUT_MS || '30000', 10), // 30 seconds
          retries: parseInt(process.env.WORKER_EMAIL_RETRIES || '2', 10)
        };
      default:
        throw new Error(`Unknown worker task: ${task}`);
    }
  }
}

export { WorkerTasks, WorkerConfiguration };
// Worker system configuration for sellor.ai

// Worker Tasks
class WorkerTasks {
  static AI_PRODUCT_GENERATION = 'ai-product-generation';
  static EMAIL_NOTIFICATIONS = 'email-notifications';
}

// Worker Configuration
class WorkerConfiguration {
  static get(task: string) {
    switch (task) {
      case WorkerTasks.AI_PRODUCT_GENERATION:
        return {
          concurrency: parseInt(process.env.WORKER_AI_CONCURRENCY || '5', 10),
          timeout: parseInt(process.env.WORKER_AI_TIMEOUT_MS || '60000', 10), // 1 minute
          retries: parseInt(process.env.WORKER_AI_RETRIES || '3', 10)
        };
      case WorkerTasks.EMAIL_NOTIFICATIONS:
        return {
          concurrency: parseInt(process.env.WORKER_EMAIL_CONCURRENCY || '10', 10),
          timeout: parseInt(process.env.WORKER_EMAIL_TIMEOUT_MS || '30000', 10), // 30 seconds
          retries: parseInt(process.env.WORKER_EMAIL_RETRIES || '2', 10)
        };
      default:
        throw new Error(`Unknown worker task: ${task}`);
    }
  }
}

export { WorkerTasks, WorkerConfiguration };