import { User } from "../types/User";
import database  from "./getDataBase";
import fs from 'fs';
import path from 'path';

async function updateUser(id: string, userInfo: User): Promise<User | null> {
    const __dirname = path.resolve();
    const userIndex = database.findIndex(user => user.id === id);
    database[userIndex] = { ...database[userIndex], ...userInfo };
    database[userIndex].id = id;
    return database[userIndex];
}
export default updateUser;