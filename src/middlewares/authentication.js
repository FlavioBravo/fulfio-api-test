const constants = require("../utils/constants");

const AdminVerification = async (req, res, next) => {
  const userType = req.headers.authorization;
  if (!userType) {
    return res.status(500).send({
      success: false,
      message: "Authorization header is missing",
    });
  }

  if (userType === constants.ADMIN_ROLE) {
    next();
  } else {
    return res.status(403).send({
      success: false,
      message: "User is not type ADMIN",
    });
  }
};

const UserVerification = async (req, res, next) => {
  const userType = req.headers.authorization;
  if (!userType) {
    return res.status(500).send({
      success: false,
      message: "Authorization header is missing",
    });
  }

  if (userType === constants.USER_ROLE) {
    next();
  } else {
    return res.status(403).send({
      success: false,
      message: "User is not type USER",
    });
  }
};

module.exports = {
  AdminVerification,
  UserVerification,
};
