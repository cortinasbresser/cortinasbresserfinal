module.exports = {
    apps: [
        {
            name: 'cortinasbresser',
            script: 'npm',
            args: 'start',
            cwd: '/var/www/cortinasbresser',
            instances: 1,
            autorestart: true,
            watch: false,
            max_memory_restart: '1G',
            env: {
                NODE_ENV: 'production',
                PORT: 3000,
                // Variáveis de Email (Preencha com seus dados ou use .env)
                SMTP_HOST: process.env.SMTP_HOST,
                SMTP_PORT: process.env.SMTP_PORT,
                SMTP_USER: process.env.SMTP_USER,
                SMTP_PASS: process.env.SMTP_PASS,
                RECIPIENT_EMAIL: process.env.RECIPIENT_EMAIL,
            },
            error_file: '/var/log/pm2/cortinasbresser-error.log',
            out_file: '/var/log/pm2/cortinasbresser-out.log',
            log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
            merge_logs: true,
        }
    ],
    deploy: {
        production: {
            user: 'root',
            host: ['YOUR_VPS_IP'],
            ref: 'origin/main',
            repo: 'https://github.com/YOUR_USERNAME/cortinasbresser.git',
            path: '/var/www/cortinasbresser',
            'post-deploy': 'npm install && npm run build && pm2 reload ecosystem.config.js --env production',
            'pre-setup': ''
        }
    }
};
