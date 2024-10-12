import process from 'node:process';
import cd from './commands/cd.js';
import up from './commands/up.js';
function commandHandler(command, payload) {
    switch (command) {
        case '.exit':
            process.exit(0);
            break;
        case 'up':
            if (payload.length > 0) {
                throw new Error('Invalid input');
            }else{
                up()
            }
            break;
        case 'cd':
            cd(payload);
            break;
        default:
            throw  new Error('Invalid input');
            break;
    }
    console.log(`your current directory is ${process.env.MAIN_PATH}`)
}

export default commandHandler;