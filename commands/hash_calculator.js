import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';
import process from 'node:process';
const hash_calculator = async (args) => {
    let arg = args.join(' ')
    let FilePath = path.join(process.env.MAIN_PATH, arg);
    const hash = crypto.createHash('sha256');
    const rs = fs.createReadStream(FilePath);
    await new Promise((resolve, reject) => {
        rs.on('error', reject);
        rs.on('end', resolve);
        rs.on('data', chunk => hash.update(chunk));
    });
    console.log(hash.digest('hex'))
};
export default hash_calculator;