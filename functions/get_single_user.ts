import getDataBase from "./getDataBase";
import database from "./getDataBase";
async function get_single_user(id:string) {
    const user = database.find((item) => {
        return item.id == id;
    });
    return user;
}
export default get_single_user;