import os from 'node:os';
async function osFunc(args) {
    if (args.length > 1 || args.length == 0) {
        throw new Error('Invalid input');
    }
    if (args[0].split('--').length == 0){
        throw new Error('Invalid input');
    }
    let arg = args[0].split('--').join('');
    switch (arg) {
        case 'EOL':
            console.log(os.EOL);
            break;
        case 'cpus':
            console.log(os.cpus());
            break;
        case 'homedir':
            console.log(os.homedir());
            break;
        case 'username':
            console.log(os.userInfo());
            break;
        case 'arch':
            console.log(os.arch());
            break;
        default:
            throw new Error('Invalid input');
    }
}

export default osFunc;