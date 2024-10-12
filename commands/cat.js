import fs from 'fs';
import process from 'node:process';
import * as path from 'node:path';
import { Writable } from 'node:stream';
function cat(args) {
    try {
        let arg = args.join(' ');
        let pathArg = path.join(process.env.MAIN_PATH, arg);
        const readStream = fs.createReadStream(pathArg, 'utf-8');
        readStream.pipe(customWritable);
        const customWritable = new Writable({
            write(chunk, encoding) {
              console.log(chunk.toString());
            }
        });
    } catch (error) {
        throw new Error('Operation failed');
    }

}

export default cat;