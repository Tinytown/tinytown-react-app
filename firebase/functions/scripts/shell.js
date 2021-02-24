const { spawn } = require('child_process');
const config = require('../config/env.config');

if (config.DEV_TOKEN) {
  spawn(
    'doppler',
    [`run -t ${config.DEV_TOKEN} -- firebase functions:shell`],
    { stdio: 'inherit', shell: true },
  );
} else {
  spawn('firebase', ['functions:shell'], { stdio: 'inherit', shell: true });
}
