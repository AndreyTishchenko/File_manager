import { User } from "../types/User";
import getDataBase from "./getDataBase";

import fs from 'fs';

async function addUser(user: User): Promise<void> {
    let users = await getDataBase();
    users.push(user);
    const json = JSON.stringify(users);
    fs.writeFile('./database.json', json, err => {
        if (err) {
            console.error(err);
        }
    });
}
export default addUser;