import fs from 'node:fs';
async function rm(payload) {
    const arg = payload.join(' ');
    fs.unlink(arg, (err) => {
        if (err) {
            throw new Error('Operation failed');
        }
    });
}
export default rm;