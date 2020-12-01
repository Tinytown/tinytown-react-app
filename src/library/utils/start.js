import { spawn } from 'child_process';
import config from '../../config/env.config.js';

if (config.DEV_TOKEN) {
  spawn(
    'doppler',
    [`run -t ${config.DEV_TOKEN} -- yarn react-native start --reset-cache`],
    { stdio: 'inherit', shell: true },
  );
} else {
  spawn('yarn', ['react-native start'], { stdio: 'inherit', shell: true });
}
