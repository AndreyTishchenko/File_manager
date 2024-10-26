import users from "./users_database"
export default function createRoom(ws: WebSocket){
    // Use Map's values() method to find the user
    const user = Array.from(users.values()).find(element => element.ws_connection === ws) || null;
    if (user) { // TypeScript already knows user is not null here
        const id = user.index;
        // You can add logic to create the room using the id
        console.log(`User ID: ${id}`); // Example usage
    } else {
        console.error("User not found for the given WebSocket connection.");
    }
}