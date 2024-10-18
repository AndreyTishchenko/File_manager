import { User } from "../types/User";
import getDataBase from "./getDataBase";
import fs from 'fs';
import path from 'path';

async function updateUser(id: string, userInfo: User): Promise<User | null> {
    const __dirname = path.resolve();
    const users = await getDataBase();
    const userIndex = users.findIndex(user => user.id === id);
    users[userIndex] = { ...users[userIndex], ...userInfo };
    users[userIndex].id = id;
    fs.writeFile(path.join(__dirname, '/database.json'), JSON.stringify(users), err => {
        if (err) {
            throw err
        }
    });
    return users[userIndex];
}
export default updateUser;