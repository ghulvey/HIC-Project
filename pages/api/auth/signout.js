// Next.js API route support: https://nextjs.org/docs/api-routes/introduction


export default async function logoutHandler(req, res) {

    // Invalidate the cookie by setting it to expire in the past
    res.setHeader("Set-Cookie", `user_id=${req.body.username}; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT samesite=lax; httponly;`);
    res.status(200).json({ result: 'Success' })

}