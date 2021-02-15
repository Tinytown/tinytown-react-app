const { spawn } = require('child_process');
const config = require('../config/env.config');

if (config.DEV_TOKEN) {
  spawn(
    'doppler',
    [`run -t ${config.DEV_TOKEN} -- firebase emulators:start`],
    { stdio: 'inherit', shell: true },
  );
} else {
  spawn('firebase', ['emulators:start'], { stdio: 'inherit', shell: true });
}
