import path from "path";
import getDataBase from "./getDataBase";

import fs from 'fs';
import { User } from "../types/User";

async function deleteUser(id: string, users: Array<User>): Promise<void> {
    const __dirname = path.resolve();
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex !== -1) {
        users.splice(userIndex, 1);
        const json = JSON.stringify(users);
        fs.writeFile(path.join(__dirname, '/database.json'), json, err => {
            if (err) {
                throw err
            }
        });
    }
}export default deleteUser;