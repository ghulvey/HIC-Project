import path from 'path';
import { promises as fs } from 'fs';
//import { getCookies, setCookies, removeCookies } from 'cookies-next';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {



    //Find the absolute path of the json directory
    const jsonDirectory = path.join(process.cwd(), 'data');
    //Read the json data file data.json
    const fileContents = await fs.readFile(jsonDirectory + '/users.json', 'utf8');
    const objectData = JSON.parse(fileContents);

    if (req.method === 'POST') {
        // Process a POST request
        if (objectData.hasOwnProperty(req.body.username)) {
            if (objectData[req.body.username]["password"] === req.body.password) {
                res.setHeader("Set-Cookie", `user_id=${req.body.username}; path=/; samesite=lax; httponly;`);
                res.status(200).json({ result: 'Success' })
            } else {
                res.status(200).json({ result: 'Failure', error: 'Invalid login credentials' })
            }
        } else {
            res.status(200).json({ result: 'Failure', error: 'Invalid login credentials' })
        }

    } else {
        // Handle any other HTTP method
        res.status(400).json({ error: 'Invalid HTTP Request' })
    }
}