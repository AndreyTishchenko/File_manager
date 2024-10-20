import { User } from "../types/User";
import database from "./getDataBase";

import fs from 'fs';

async function addUser(user: User): Promise<void> {
    database.push(user);
}
export default addUser;