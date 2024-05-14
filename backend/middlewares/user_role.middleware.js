const userRoleMiddleware = async (req, res, next) => {
  const userType = req.user?.userType;

  if (!userType) {
    return res.status(401).send("Unauthorized");
  }

  if (userType !== "USER" && userType !== "ADMIN") {
    return res.status(403).send("Forbidden: Insufficient permissions");
  }

  next();
};

module.exports = {
  userRoleMiddleware,
};
