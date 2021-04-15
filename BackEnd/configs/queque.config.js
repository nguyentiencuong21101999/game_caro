
const queue_config = {
    jobOpts: {
        priority: process.env.PRIORITY,
        delay: process.env.DELAY,
        attempts: process.env.ATTEMPTS,
        lifo: process.env.LIFO,
        timeout: process.env.TIMEOUT,
    },
    limiter: {
        max: process.env.MAX,
        duration: process.env.DURATION
        
    }
}
module.exports = queue_config;