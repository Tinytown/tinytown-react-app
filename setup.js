const Fs = require('fs');
const Path = require('path');
const axios = require('axios');
const prompts = require('prompts');
const { spawn } = require('child_process');

const relativePath = './react-app/src/config/env.config.js';
const path = Path.resolve(relativePath);

const getConfig = async (url) => {
  const writer = Fs.createWriteStream(path);

  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream',
  });

  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve);
    writer.on('error', reject);
  });
};

const createConfig = async () => {
  const team = await prompts({
    type: 'toggle',
    name: 'value',
    message: 'Are you a member of the Tinytown team?',
    initial: true,
    active: 'yes',
    inactive: 'no',
  });

  if (team.value) {
    getConfig('https://ttown.app/team_config');
    const token = await prompts({
      type: 'text',
      name: 'value',
      message: 'Enter your Developer Token:',
    });

    // Insert Dev Token in config.js
    const tokenStr = `  DEV_TOKEN: '${token.value}',`;
    const data = Fs.readFileSync(path).toString()
      .split('\n');
    data.splice(data.indexOf('});'), 0, tokenStr);
    const text = data.join('\n');
    Fs.writeFile(path, text, 'utf8', (err) => { if (err) throw err; });
  } else {
    getConfig('https://ttown.app/external_config');
  }
};

const installDeps = async () => {
  const deps = await prompts({
    type: 'toggle',
    name: 'value',
    message: 'Do you want to install dependencies with yarn now?',
    initial: true,
    active: 'yes',
    inactive: 'no',
  });

  if (deps.value) {
    spawn(
      'yarn --cwd ./firebase/functions/ install',
      { stdio: 'inherit', shell: true },
    );
    spawn(
      'yarn --cwd ./react-app/ install',
      { stdio: 'inherit', shell: true },
    );
  }
};

const installTools = async () => {
  const node12 = await prompts({
    type: 'toggle',
    name: 'value',
    message: 'Do you want to install Node 12 and Doppler with Homebrew now?',
    initial: true,
    active: 'yes',
    inactive: 'no',
  });

  if (node12.value) {
    spawn(
      'brew install node@12 doppler',
      { stdio: 'inherit', shell: true },
    );
  }
};

const runSetup = async () => {
  try {
    await createConfig();
    await installDeps();
    await installTools();
    console.log(`Config file created at: ${relativePath}. Happy coding!`);
  } catch (error) {
    console.log('Uh oh project setup exited early: ', error);
  }
};

runSetup();
