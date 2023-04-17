import path from 'path';
import { promises as fs } from 'fs';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction


export default async function logoutHandler(req, res) {


    res.setHeader("Set-Cookie", `user_id=${req.body.username}; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT samesite=lax; httponly;`);
    res.status(200).json({ result: 'Success' })

}