import process from 'node:process';
async function cd(args) {
    let arg = args.join(' ');
    try {
        process.chdir(arg);
        process.env.MAIN_PATH = process.cwd();
    } catch (error) {
        throw new Error('Operation failed');
    }
}

export default cd;