import fs from 'fs';
import path from 'path';

function fetchConfiguration(env: string) {
  console.log(`Fetching configuration data for ${env} environment`);
  return {};
}

const CONFIG_CACHE_PATH = path.resolve('.configuration');

export default async function getMembers() {
  let cachedData;

  try {
    cachedData = JSON.parse(fs.readFileSync(path.join(__dirname, CONFIG_CACHE_PATH), 'utf8'));
  } catch (error) {
    console.log('Configuration cache not initialized');
  }

  if (!cachedData) {
    const data = fetchConfiguration(process.env.NODE_ENV);

    try {
      fs.writeFileSync(path.join(__dirname, CONFIG_CACHE_PATH), JSON.stringify(data), 'utf8');
      console.log('Wrote to configuration cache');
    } catch (error) {
      console.log('ERROR WRITING CONFIGURATION CACHE TO FILE');
      console.log(error);
    }

    cachedData = data;
  }

  return cachedData;
}
