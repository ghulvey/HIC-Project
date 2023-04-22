import path from 'path';
import { promises as fs } from 'fs';

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {

    const amount = parseFloat(req.body.amount);
    console.log(amount);
    console.log(req.body.account);

    const jsonDirectory = path.join(process.cwd(), 'data');
    //Read the json data file values.json
    const accountFileContents = await fs.readFile(jsonDirectory + '/accounts.json', 'utf8');
    const accountObjectData = JSON.parse(accountFileContents);

    //Read the json data file values.json
    const valuesFileContents = await fs.readFile(jsonDirectory + '/values.json', 'utf8');
    const valuesObjectData = JSON.parse(valuesFileContents);


    // Find the coin for the given account
    const coin = accountObjectData[req.body.account].coin;

    // Find the value of the coin
    const value = valuesObjectData[coin].current_value;

    // Calculate the amount of coins
    const estimate = Math.round(amount * value * 100) / 100;
    console.log(estimate)

    // Return the values data, rounded to 2 decimal places
    res.status(200).json({
        estimate: estimate,
        new_balance: accountObjectData[req.body.account].balance - amount
    });
}