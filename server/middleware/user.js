import jwt from "jsonwebtoken";
import user from "../models/userModel.js";

export const Auth = async (req, res, next) => {
  try {
    let token = req.headers.authorization.split(" ")[0];
    if (token.length < 500) {
      const verifiedUser = jwt.verify(token, process.env.SECRET);
      const rootUser = await user
        .findOne({ _id: verifiedUser.id })
        .select("-password");
      // if (!rootUser) res.status(200).json({ message: "invalid user" });
      req.token = token;
      req.rootUser = rootUser;
      req.rootUserId = rootUser._id;
    } else {
      let data = jwt.decode(token);
      req.rootUserEmail = data.email;
      const googleUser = await user
        .findOne({ email: req.rootUserEmail })
        .select("-password");
      req.rootUser = googleUser;
      req.token = token;
      req.rootUserId = googleUser._id;
    }
    next();
  } catch (error) {
    res.json({ error: "Invalid Token" });
  }
};
