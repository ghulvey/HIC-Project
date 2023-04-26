import path from 'path';
import { promises as fs } from 'fs';

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {

    const amount = parseFloat(req.body.amount);

    const jsonDirectory = path.join(process.cwd(), 'data');
    //Read the json data file values.json
    const accountFileContents = await fs.readFile(jsonDirectory + '/accounts.json', 'utf8');
    const accountObjectData = JSON.parse(accountFileContents);

    //Read the json data file values.json
    const valuesFileContents = await fs.readFile(jsonDirectory + '/values.json', 'utf8');
    const valuesObjectData = JSON.parse(valuesFileContents);

    // Get the source and destination accounts
    const { srcAccount, destAccount } = req.body;

    // If the source and destination accounts are the same, return 0
    if (srcAccount === destAccount) {
        res.status(200).json({
            estimate: 0,
            new_balance: accountObjectData[destAccount].balance
        });
        return;
    }


    // Find the coins for the given accounts
    const coin = accountObjectData[srcAccount].coin;
    const dest = accountObjectData[destAccount].coin;

    // Find the value of the coin to USD
    const valueCoin = valuesObjectData[coin].current_value;
    // Convert from USD to the destination coin
    const valueDest = valuesObjectData[dest].current_value;

    // Calculate the amount of coin
    const estimate = Math.round(amount * valueCoin * 100) / 100;
    const addEst = Math.round(estimate / valueDest * 100) / 100;


    // Return the values data, rounded to 2 decimal places
    res.status(200).json({
        estimate: addEst,
        new_balance: addEst + accountObjectData[destAccount].balance
    });
}