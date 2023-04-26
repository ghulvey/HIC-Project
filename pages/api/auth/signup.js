import path from 'path';
import { promises as fs } from 'fs';
import { hash } from 'argon2';
//import { getCookies, setCookies, removeCookies } from 'cookies-next';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {



    //Find the absolute path of the json directory
    const jsonDirectory = path.join(process.cwd(), 'data');
    //Read the json data file data.json
    const userFileContents = await fs.readFile(jsonDirectory + '/users.json', 'utf8');
    let userObjectData = JSON.parse(userFileContents);

    const accountFileContents = await fs.readFile(jsonDirectory + '/accounts.json', 'utf8');
    let accountObjectData = JSON.parse(accountFileContents);

    if (req.method === 'POST') {
        // Process a POST request
        let errCheck = false;
        let errMessage = '';
        if (req.body.username === '') {
            errCheck = true;
            errMessage += 'Username not entered. ';
        } else if (userObjectData.hasOwnProperty(req.body.username)) {
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
            // Find the next available account number
            let accountNumber = accountObjectData["CONFIG"]["next_id"]
            console.log(accountObjectData.CONFIG.next_id)
            accountObjectData["CONFIG"]["next_id"] += 1;

            // Create the new account
            accountObjectData['M' + accountNumber] = {
                "account_number": 'M' + accountNumber,
                "owner": req.body.username,
                "coin": "Maletic Money",
                "balance": 0.0,
                "transactions": []
            }

            accountObjectData['N' + accountNumber] = {
                "account_number": 'N' + accountNumber,
                "owner": req.body.username,
                "coin": "Nesty Coin",
                "balance": 0.0,
                "transactions": []
            }

            accountObjectData['G' + accountNumber] = {
                "account_number": 'G' + accountNumber,
                "owner": req.body.username,
                "coin": "Giovanni Token",
                "balance": 0.0,
                "transactions": []
            }

            userObjectData[req.body.username] = {
                "first_name": req.body.firstName,
                "last_name": req.body.lastName,
                "password": await hash(req.body.password),
                "accounts": ['G' + accountNumber, 'M' + accountNumber, 'N' + accountNumber],
                "bank_accounts": []
            }
            const jsonString = JSON.stringify(userObjectData);
            await fs.writeFile(jsonDirectory + '/users.json', jsonString, 'utf8');

            const accountString = JSON.stringify(accountObjectData);
            await fs.writeFile(jsonDirectory + '/accounts.json', accountString, 'utf8');
            res.setHeader("Set-Cookie", `user_id=${req.body.username}; path=/; samesite=lax; httponly;`);
            res.status(200).json({ result: 'Success' })
        }
    } else {
        // Handle any other HTTP method
        res.status(400).json({ result: 'Failure', error: 'Invalid HTTP Request' })
    }
}