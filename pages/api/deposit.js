import path from 'path';
import { promises as fs } from 'fs';

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {


    let user_id = req.cookies['user_id'];
    if (user_id == null) {
        res.status(400).json({ result: 'Failure', error: 'User not authenticated' })
        return;
    }

    if (req.method !== 'POST') {
        res.status(400).json({ result: 'Failure', error: 'Invalid request method' })
        return;
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

    let bankName = "";
    let bankAccount = "";
    let bankRouting = "";
    let saveBank = false;

    if (req.body.savedBank) {
        bankName = userObjectData[user_id].bank_accounts[req.body.savedBank].account_name
        bankAccount = userObjectData[user_id].bank_accounts[req.body.savedBank].account_number
        bankRouting = userObjectData[user_id].bank_accounts[req.body.savedBank].routing_number
    } else {
        bankName = req.body.bankName;
        bankAccount = req.body.bankAccount;
        bankRouting = req.body.bankRouting;
        saveBank = req.body.bankRemember;
    }

    // Check to ensure account exists
    if (!accountObjectData.hasOwnProperty(req.body.account)) {
        res.status(400).json({ result: 'Failure', error: 'Account does not exist' })
    } else if (accountObjectData[req.body.account].owner !== user_id) {
        res.status(400).json({ result: 'Failure', error: 'Account does not belong to user' })
    } else {

        // Save the bank account if the user wants to
        if (saveBank) {
            userObjectData[user_id].bank_accounts.push({
                account_name: bankName,
                account_number: bankAccount,
                routing_number: bankRouting
            })
            await fs.writeFile(jsonDirectory + '/users.json', JSON.stringify(userObjectData), 'utf8');
        }

        // Find the coin for the given account
        const coin = accountObjectData[req.body.account].coin;

        // Find the value of the coin
        const value = valuesObjectData[coin].current_value;

        // Calculate the amount of coins
        const estimate = Math.round(amount / value * 100) / 100;

        // Add the coins to the account
        accountObjectData[req.body.account].balance += estimate;
        accountObjectData[req.body.account].transactions.push({
            description: "Deposit from " + bankName + " (" + bankAccount + ")",
            amount: estimate,
            usd: amount,
            date: new Date()
        })

        // Save the changes to the account
        await fs.writeFile(jsonDirectory + '/accounts.json', JSON.stringify(accountObjectData), 'utf8');

        // Return the values data, rounded to 2 decimal places
        res.status(200).json({ result: 'Success' });
    }
}