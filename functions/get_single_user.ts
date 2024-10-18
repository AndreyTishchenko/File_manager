import getDataBase from "./getDataBase";
async function get_single_user(id:string) {
    const users = await getDataBase();
    const user = users.find((item) => {
        return item.id == id;
    });
    return user;
}
export default get_single_user;