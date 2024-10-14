import fs from 'node:fs';
async function rn(payload){
    let oldFileName = payload[0];
    let newFileName = payload[1];
    fs.rename(oldFileName, newFileName, function(err) {
        if (err) throw err;
    });
}
export default rn;