import fs from 'fs';
import process from 'node:process';
import * as path from 'node:path';
import { Writable } from 'node:stream';
async function cat(args) {
    let arg = args.join(' ');
    let pathArg = path.join(process.env.MAIN_PATH, arg);
    const readStream = fs.createReadStream(pathArg, 'utf-8');
    readStream.on('data', (chunk) => {
        console.log(chunk);
    });
    await new Promise((resolve, reject) => {
        readStream.on('error', reject);
        readStream.on('end', resolve);
    });
}

export default cat;