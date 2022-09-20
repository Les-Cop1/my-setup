const dotenv = require('dotenv')
dotenv.config()

module.exports = {
  deploy: {
    production: {
      key: 'deploy.key',
      user: process.env.HOST_USER,
      host: [
        {
          host: process.env.HOST,
          port: process.env.HOST_PORT,
        },
      ],
      ssh_options: ['StrictHostKeyChecking=no'],
      ref: 'origin/main',
      repo: 'git@github.com:Les-Cop1/my-setup.git',
      path: process.env.HOST_PATH,
      'post-deploy': 'yarn setup && yarn build',
      env: {
        NODE_ENV: process.env.NODE_ENV,
      },
    },
  },
}
