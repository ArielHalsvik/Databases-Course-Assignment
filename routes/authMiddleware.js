module.exports = {
  checkIfAdmin: (req, res, next) => {
    if (req.user.role === 1) {
      next();
    } else {
      res.status(403).send("Not authorized");
    }
  },

  checkIfMember: (req, res, next) => {
    if (req.user.role === 2) {
      next();
    } else {
      res.status(403).send("Not authorized");
    }
  },
};