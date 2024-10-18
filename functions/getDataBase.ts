import * as fs from 'fs/promises';
import { User } from '../types/User';
import path from 'node:path';

async function getDataBase(): Promise<Array<User>> {
    const __dirname = path.resolve();
    const rawJSON = await fs.readFile(path.join(__dirname, 'database.json'), 'utf8');
    return JSON.parse(rawJSON);
}

export default getDataBase;
