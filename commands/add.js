import fs from 'node:fs';
async function add(payload){
    let arg = payload.join(' ');
    fs.open(arg, 'w', (err) => {
        if (err) {
            console.log(err);
            return;
        }
    });
}
export default add;