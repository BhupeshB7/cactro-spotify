export const requireToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      error: "Access token required. Please login at /api/spotify/login",
    });
  }
  req.userToken = token;
  next();
};
