import cp from './cp.js';
import rm from './rm.js';
import path from 'path';
async function mv(payload) {
    const path1 = path.join(process.env.MAIN_PATH, payload[0]);
    const path2 = path.join(process.env.MAIN_PATH, payload[1]);
    await cp([payload[0], payload[1]]);
    await rm([payload[0]]);
}
export default mv;