import addUser from "./functions/AddUSer";
import deleteUser from "./functions/DeleteUser";
import getDataBase from "./functions/getDataBase";
import { User } from "./types/User";
import * as http from 'http';
import * as url from 'url';
import crypto from 'crypto';

async function RequestsHandler(req: http.IncomingMessage, res: http.ServerResponse, requestBody: string): Promise<void> {
    if (req.url) {
        const parsedUrl = url.parse(req.url, true);
        const arrUrl = parsedUrl.href.split('/');
        if (arrUrl[1] == 'api' && arrUrl[2] == 'users') {
          if (arrUrl.length === 3) {
              if (req.method === 'GET') {
                let usersObject = await getDataBase();
                let usersJSON = JSON.stringify(usersObject);
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end(usersJSON);
              } else if(req.method === 'POST'){
                console.log(requestBody);
                const userInfo = JSON.parse(requestBody);
                if (userInfo.hasOwnProperty('name') && userInfo.hasOwnProperty('age') && userInfo.hasOwnProperty('hobbies')) {
                  try {
                    const id = crypto.randomUUID().toString();
                    const user: User = {
                      id: id,
                      name: userInfo.name,
                      age: userInfo.age,
                      hobbies: userInfo.hobbies
                    }
                    await addUser(user)
                    res.writeHead(201, { 'Content-Type': 'text/plain' });
                    res.end(JSON.stringify(user));
                  } catch (error) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Internal Server Error');
                  }
                } else {
                  res.writeHead(400, { 'Content-Type': 'text/plain' });
                  res.end('Bad Request: Missing required fields');
                }
              } else {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('Not Found');
              }
          } else if(arrUrl.length === 4){
            let users = await getDataBase();
            const userIndex = users.findIndex(p => p.id === arrUrl[3]);
            if (req.method === 'DELETE') {
              if (userIndex !== -1) {
                try {
                  await deleteUser(arrUrl[3], users)
                  res.writeHead(200, { 'Content-Type': 'text/plain' });
                  res.end('User deleted successfully');
                } catch (error) {
                  res.writeHead(500, { 'Content-Type': 'text/plain' });
                  res.end('Internal Server Error');
                }
              } else {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('User not found');
              }
            }
            // else if(req.method === 'GET'){
            //   if (userIndex !== -1) {
            //     try {
            //       res.writeHead(200, { 'Content-Type': 'text/plain' });
            //       res.end(JSON.stringify(users[userIndex]));
            //     } catch (error) {
            //       res.writeHead(500, { 'Content-Type': 'text/plain' });
            //       res.end('Internal Server Error');
            //     }
            //   } else {
            //     res.writeHead(404, { 'Content-Type': 'text/plain' });
            //     res.end('User not found');
            //   }
            // }
          }
        } else {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('Not Found');
          console.log(arrUrl[1], arrUrl[2]);
        }
      }
}
export default RequestsHandler;