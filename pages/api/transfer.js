import path from 'path';
import { promises as fs } from 'fs';

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {


    let user_id = req.cookies['user_id'];
    if (user_id == null) {
        res.status(400).json({ result: 'Failure', error: 'User not authenticated' })
    }

    if (req.method !== 'POST') {
        res.status(400).json({ result: 'Failure', error: 'Invalid request method' })
    }

    console.log(req.body)

    const jsonDirectory = path.join(process.cwd(), 'data');

    //Read the json data file users.json
    const userFileContents = await fs.readFile(jsonDirectory + '/users.json', 'utf8');
    const userObjectData = JSON.parse(userFileContents);

    //Read the json data file values.json
    const accountFileContents = await fs.readFile(jsonDirectory + '/accounts.json', 'utf8');
    const accountObjectData = JSON.parse(accountFileContents);

    //Read the json data file values.json
    const valuesFileContents = await fs.readFile(jsonDirectory + '/values.json', 'utf8');
    const valuesObjectData = JSON.parse(valuesFileContents);

    const amount = parseFloat(req.body.amount);
    let destAccount = req.body.destAccount;

    // If username is provided, find the account with the same coin type
    if (req.body.destUser) {
        let destAccounts = userObjectData[req.body.destUser].accounts
        for (let i = 0; i < destAccounts.length; i++) {
            if (accountObjectData[destAccounts[i]].coin === accountObjectData[req.body.srcAccount].coin) {
                destAccount = destAccounts[i]
                break;
            }
        }
    }


    if (!accountObjectData.hasOwnProperty(req.body.srcAccount)) {
        // Check to ensure source account exists
        res.status(400).json({ result: 'Failure', error: 'Source account does not exist' })
    } else if (!accountObjectData.hasOwnProperty(destAccount)) {
        // Check to ensure destination account exists
        res.status(400).json({ result: 'Failure', error: 'No destination account exists' })
    } else if (accountObjectData[req.body.srcAccount].owner !== user_id) {
        // Check to ensure account belongs to user
        res.status(400).json({ result: 'Failure', error: 'Source account does not belong to user' })
    } else if (accountObjectData[req.body.srcAccount].balance < amount) {
        // Check to ensure account has enough coins
        res.status(400).json({ result: 'Failure', error: 'Source account does not have enough coins' })
    } else if (accountObjectData[req.body.srcAccount].coin !== accountObjectData[destAccount].coin) {
        // Check to ensure accounts are the same coin
        res.status(400).json({ result: 'Failure', error: 'Source and destination accounts are not the same coin' })
    } else {

        // Find the coin for the given account
        const coin = accountObjectData[req.body.srcAccount].coin;

        // Find the value of the coin
        const value = valuesObjectData[coin].current_value;

        // Calculate the amount of coins
        const estimate = Math.round(amount * value * 100) / 100;

        // Remove the coins to the account
        accountObjectData[req.body.srcAccount].balance -= amount;
        accountObjectData[req.body.srcAccount].transactions.push({
            description: "Transfer to " + accountObjectData[destAccount].owner + " (" + destAccount + ")",
            amount: amount,
            usd: estimate,
            date: new Date()
        })

        // Add the coins to the account
        accountObjectData[destAccount].balance += amount;
        accountObjectData[destAccount].transactions.push({
            description: "Transfer from " + accountObjectData[req.body.srcAccount].owner + " (" + req.body.srcAccount + ")",
            amount: amount,
            usd: estimate,
            date: new Date()
        })

        // Save the changes to the account
        await fs.writeFile(jsonDirectory + '/accounts.json', JSON.stringify(accountObjectData), 'utf8');

        // Return the values data, rounded to 2 decimal places
        res.status(200).json({ result: 'Success' });
    }
}