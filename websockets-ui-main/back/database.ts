import Game from "./classes/Game";
import Room from "./classes/Room";
import User from "./classes/User";

let users = new Map<string, User>(); // format of storage [ id: User]
let rooms = new Map<string, Room>(); // format of storage [ roomId: Room]
let games = new Map<string, Game>(); // format of storage [ gameId: Game]
export { users, rooms, games };