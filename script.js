import process from 'node:process';
import * as path from 'node:path';
import commandHandler from './commandHandler.js';
import * as readline from 'node:readline';
if (process.argv.length == 2 || process.argv > 3) {
    console.log('Missing arguments');
    process.exit(1);
}

if (process.argv > 3) {
    console.log('Too many arguments');
    process.exit(1);
}

const arg = process.argv[2];
const name = arg.split('=')[1];
process.env.USERNAME = name;
process.env.MAIN_PATH = path.join(process.cwd());

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: ''
});

console.log('welcome to the File Manager, ${process.env.USERNAME}!')

rl.prompt();

rl.on('line', async line => {
    const [command, ...payload] = line.trim().split(' ');
    try {
        await commandHandler(command, payload);
    } catch (error) {
        console.log(error.message);
    }
    rl.prompt();
}).on

process.on('exit', (text) => {
    console.log(`Thank you for using File Manager, ${process.env.USERNAME}, goodbye!`);
});