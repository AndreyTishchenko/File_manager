import process from 'node:process';
function cd(args) {
    let arg = args.join(' ');
    try {
        process.chdir(arg);
        process.env.MAIN_PATH = process.cwd();
    } catch (error) {
        throw new Error('Operation failed');
    }
    console.log(`cd finished`)
    console.log('your current directory is: ', process.env.MAIN_PATH)
}

export default cd;