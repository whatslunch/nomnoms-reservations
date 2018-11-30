module.exports = {
  apps: [{
    name: 'nomnoms',
    script: './server/index.js',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    args: 'one two',
    instances: 'max',
    autorestart: true,
    watch: true,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development',
    },
    env_production: {
      NODE_ENV: 'production',
    },
  }],

  deploy: {
    production: {
      user: 'ubuntu',
      host: 'ec2-34-216-238-63.us-west-2.compute.amazonaws.com',
      key: '~/.ssh/reservationserver.pem',
      ref: 'origin/prod',
      repo: 'https://github.com/whatslunch/nomnoms-reservations.git',
      path: '/home/ubuntu/nomnoms-reservations',
      'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js',
    },
  },
};
