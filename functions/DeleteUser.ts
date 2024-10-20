import path from "path";
import getDataBase from "./getDataBase";
import database from "./getDataBase";
import fs from 'fs';
import { User } from "../types/User";

async function deleteUser(id: string): Promise<void> {
    const __dirname = path.resolve();
    const userIndex = database.findIndex(user => user.id === id);
    database.splice(userIndex, 1);
}
export default deleteUser;