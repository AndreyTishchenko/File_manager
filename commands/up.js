function up() {
    process.chdir('..');
    process.env.MAIN_PATH = process.cwd();
}

export default up;