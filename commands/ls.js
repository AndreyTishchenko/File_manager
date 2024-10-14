import fs from 'fs/promises';
import process from 'node:process';
async function ls() {
    class File {
        constructor(name, type) {
            this.name = name;
            this.type = type;
        }
    }
    let filesArr = [];
    let dirs = [];
    await fs.readdir(process.env.MAIN_PATH).then((files) => {
        return Promise.allSettled(files.map(((file) => fs.stat(file).then((statFile) => {
                    if (statFile.isDirectory()) {
                        dirs.push(new File(file, 'directory'));
                    } else if (statFile.isFile()) {
                        filesArr.push(new File(file, 'file'));
                    }
                }))
            )
        )
    })
    console.table(dirs.concat(filesArr));
}
export default ls;