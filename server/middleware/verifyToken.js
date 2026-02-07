//jwt
import jwt from "jsonwebtoken";

//dotenv
import "dotenv/config.js";

//model
import User from "../models/userModel.js";

export default async function verifyToken(req, res, next) {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Un Authorization" });
    const verify = jwt.verify(token, process.env.JWT_SIGNATURE);
    const user = await User.findById(verify.sub);
    if (!user) return res.status(401).json({ message: "No user found" });
    req.user = verify.sub;
    next();
  } catch (error) {
    next(error);
  }
}
