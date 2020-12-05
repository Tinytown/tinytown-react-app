import Fs from 'fs';
import Path from 'path';
import Axios from 'axios';
import prompts from 'prompts';

const relativePath = './src/config/env.config.js'
const path = Path.resolve(relativePath);

const getConfig = async (url) => {
  const writer = Fs.createWriteStream(path);

  const response = await Axios({
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

(async () => {
  const team = await prompts({
    type: 'toggle',
    name: 'value',
    message: 'Are you a member of the Tinytown team?',
    initial: true,
    active: 'yes',
    inactive: 'no',
  });

  const doneMsg = `Config file created at: ${relativePath}. Happy coding!`;

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
    Fs.writeFile(path, text, 'utf8', (err) => {
      if (err) {
        throw err;
      }
      console.log(doneMsg);
    });
    return;
  } else if (team.value === false) {
    getConfig('https://ttown.app/external_config');
    console.log(doneMsg);
    return;
  }
  console.log('Project setup exited early');
})();
