import fs from 'node:fs';
import  path from 'path';

async function cp(payload) {
    const path1 = path.join(process.env.MAIN_PATH, payload[0]);
    const path2 = path.join(process.env.MAIN_PATH, payload[1]);

    await new Promise((resolve, reject) => {
        const rs = fs.createReadStream(path1);
        const ws = fs.createWriteStream(path2);

        rs.on('error', (err) => {
            reject(new Error('Read operation failed: ' + err.message));
        });

        ws.on('error', (err) => {
            reject(new Error('Write operation failed: ' + err.message));
        });

        ws.on('finish', () => {
            resolve();
        });

        rs.pipe(ws);
    });
}
export default cp;