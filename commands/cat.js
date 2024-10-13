import fs from 'fs';
import process from 'node:process';
import * as path from 'node:path';
import { Writable } from 'node:stream';
async function cat(args) {
    let arg = args.join(' ');
    let pathArg = path.join(process.env.MAIN_PATH, arg);
    const readStream = fs.createReadStream(pathArg, 'utf-8');
    const customWritable = new Writable({
        write(chunk, encoding) {
          console.log(chunk.toString());
        }
    });
    await new Promise((resolve, reject) => {
        customWritable.on('finish', resolve);
        customWritable.on('error', reject);
        readStream.pipe(customWritable);
    });
    readStream.on('error', (err) => {
        console.log('operation failed');
    });
}

export default cat;