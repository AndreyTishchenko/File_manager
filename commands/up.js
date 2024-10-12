function up() {
    process.chdir('..');
    process.env.MAIN_PATH = process.cwd();
    console.log('your current directory is: ', process.env.MAIN_PATH)
}

export default up;