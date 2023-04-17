import path from 'path';
import { promises as fs } from 'fs';
//import { getCookies, setCookies, removeCookies } from 'cookies-next';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {



    //Find the absolute path of the json directory
    const jsonDirectory = path.join(process.cwd(), 'data');
    //Read the json data file data.json
    const fileContents = await fs.readFile(jsonDirectory + '/users.json', 'utf8');
    let objectData = JSON.parse(fileContents);

    if (req.method === 'POST') {
        // Process a POST request
        let errCheck = false;
        let errMessage = '';
        if (req.body.username === '') {
            errCheck = true;
            errMessage += 'Username not entered. ';
        } else if (objectData.hasOwnProperty(req.body.username)) {
            errCheck = true;
            errMessage = 'Username already exists. ';
        }
        if (req.body.firstName === '') {
            errCheck = true;
            errMessage += 'First name not entered. ';
        }
        if (req.body.lastName === '') {
            errCheck = true;
            errMessage += 'Last name not entered. ';
        }
        if (req.body.password != '' && req.body.confirmPassword != '') {
            if (req.body.password !== req.body.confirmPassword) {
                errCheck = true;
                errMessage += 'Passwords do not match. ';
            }
        } else {
            errCheck = true;
            errMessage += 'Password not entered. ';
        }

        if (errCheck) {
            res.status(200).json({ result: 'Failure', error: errMessage })
        } else {
            objectData[req.body.username] = {
                "first_name": req.body.firstName,
                "last_name": req.body.lastName,
                "password": req.body.password,
                "accounts": []
            }
            const jsonString = JSON.stringify(objectData);
            await fs.writeFile(jsonDirectory + '/users.json', jsonString, 'utf8');
            res.setHeader("Set-Cookie", `user_id=${req.body.username}; path=/; samesite=lax; httponly;`);
            res.status(200).json({ result: 'Success' })
        }
    } else {
        // Handle any other HTTP method
        res.status(400).json({ result: 'Failure', error: 'Invalid HTTP Request' })
    }
}