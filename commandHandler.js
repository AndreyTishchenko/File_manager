import process from 'node:process';
import cd from './commands/cd.js';
import up from './commands/up.js';
import ls from './commands/ls.js';
import cat from './commands/cat.js';
import osFunc from './commands/os.js';
async function commandHandler(command, payload) {
    switch (command) {
        case '.exit':
            process.exit(0);
        case 'up':
            if (payload.length > 0) {
                throw new Error('Invalid input');
            } else {
                up()
            }
            break;
        case 'cd':
            cd(payload);
            break;
        case 'ls':
            if (payload.length > 0) {
                throw new Error('Invalid input');
            } else {
                await ls()
            }
            break;
        case 'cat':
            cat(payload);
            break;
        case 'os':
            osFunc(payload);
            break;
        default:
            throw new Error('Invalid input');
    }
}
export default commandHandler;