import path from 'path';
import { promises as fs } from 'fs';

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
    //if (req.method !== 'POST') {
    let user_id = req.cookies['user_id'];

    //Find the absolute path of the json directory
    const jsonDirectory = path.join(process.cwd(), 'data');
    //Read the json data file data.json
    const userFileContents = await fs.readFile(jsonDirectory + '/users.json', 'utf8');
    const userObjectData = JSON.parse(userFileContents);

    const accountFileContents = await fs.readFile(jsonDirectory + '/accounts.json', 'utf8');
    const accountObjectData = JSON.parse(accountFileContents);


    // Process a POST request
    if (req.method === 'POST') {
        console.log(user_id)
        if (user_id != null) {
            let accounts = []
            let transactions = []
            for (let i = 0; i < userObjectData[user_id].accounts.length; i++) {
                accounts.push(accountObjectData[userObjectData[user_id].accounts[i]])
                for (let j = 0; j < accountObjectData[userObjectData[user_id].accounts[i]].transactions.length; j++) {
                    let temp = accountObjectData[userObjectData[user_id].accounts[i]].transactions[j]
                    temp.coin = accountObjectData[userObjectData[user_id].accounts[i]].coin
                    transactions.push(temp)
                }
            }
            res.status(200).json({
                first_name: userObjectData[user_id].first_name,
                last_name: userObjectData[user_id].last_name,
                accounts: accounts,
                transactions: transactions
            })
        } else {
            res.status(400).json({ result: 'Failure', error: 'User not authenticated' })
        }
    } else {
        // Handle any other HTTP method
        res.status(200).json({ error: 'Invalid HTTP Request' });
    }

}