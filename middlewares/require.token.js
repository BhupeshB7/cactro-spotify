export const requireToken = (req, res, next) => {
    const bearer = req.headers.authorization?.split(" ")[1];
    const cookieToken = req.cookies?.access_token;

    const token = bearer || cookieToken;
   
    if (!token) {
        return res.status(401).json({
            error: "Access token required. Please login at /api/spotify/login",
        });
    }

    req.userToken = token;
    next();
};
