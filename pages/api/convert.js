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
        return;
    }

    console.log(req.body)

    const jsonDirectory = path.join(process.cwd(), 'data');

    //Read the json data file values.json
    const accountFileContents = await fs.readFile(jsonDirectory + '/accounts.json', 'utf8');
    const accountObjectData = JSON.parse(accountFileContents);

    //Read the json data file values.json
    const valuesFileContents = await fs.readFile(jsonDirectory + '/values.json', 'utf8');
    const valuesObjectData = JSON.parse(valuesFileContents);

    const amount = parseFloat(req.body.amount);

    if (accountObjectData[req.body.srcAccount].owner !== user_id) {
        // Check to ensure account belongs to user
        res.status(400).json({ result: 'Failure', error: 'Source account does not belong to user' })
    } else if (accountObjectData[req.body.srcAccount].balance < amount) {
        // Check to ensure account has enough coins
        res.status(400).json({ result: 'Failure', error: 'Source account does not have enough coins' })
    } else {

        // Find the coin for the given account
        const { srcAccount, destAccount } = req.body;

        const coin = accountObjectData[srcAccount].coin;
        const dest = accountObjectData[destAccount].coin;

        // Find the value of the coin
        const valueCoin = valuesObjectData[coin].current_value;
        const valueDest = valuesObjectData[dest].current_value;

        // Find the value of the coin to USD
        const estimate = Math.round(amount * valueCoin * 100) / 100;
        // Convert from USD to the destination coin
        const addEst = Math.round(estimate / valueDest * 100) / 100;

        // Remove the coins to the account
        accountObjectData[req.body.srcAccount].balance -= amount;
        accountObjectData[req.body.srcAccount].transactions.push({
            description: `Convert from ${coin} to ${dest} (${srcAccount})`,
            amount: amount,
            usd: estimate,
            date: new Date()
        })

        // Add the coins to the account
        accountObjectData[destAccount].balance += addEst;
        accountObjectData[destAccount].transactions.push({
            description: `Convert to ${dest} from ${coin} to (${destAccount})`,
            amount: addEst,
            usd: estimate,
            date: new Date()
        })

        // Save the changes to the account
        await fs.writeFile(jsonDirectory + '/accounts.json', JSON.stringify(accountObjectData), 'utf8');

        // Return the values data, rounded to 2 decimal places
        res.status(200).json({ result: 'Success' });
    }
}