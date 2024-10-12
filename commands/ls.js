import fs from 'node:fs';
import process from 'node:process';
async function listFiles() {
    await fs.readdir(process.env.MAIN_PATH, (err, files) => {
        if (err) {
            console.log(err);
            return;
        }
        
        let filesArr = [];
        let  dirs = [];
        class File {
            constructor(name, type) {
                this.name = name;
                this.type = type;
            }
        }
        files.forEach((file) => {
            if (fs.statSync(file).isDirectory()) {
                dirs.push(new File(file, 'dir'));
            }else if (fs.statSync(file).isFile()) {
                filesArr.push(new File(file, 'file'));
            }
            
            dirs.sort(function(a, b) {
                return a.name.localeCompare(b.name);
            });
            filesArr.sort(function(a, b) {
                return a.name.localeCompare(b.name);
            });
        });
        console.table(dirs.concat(filesArr))
        console.log('your current directory is: ', process.env.MAIN_PATH)
    });
}
export default listFiles;