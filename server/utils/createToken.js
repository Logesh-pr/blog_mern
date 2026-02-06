import jwt from "jsonwebtoken";
import "dotenv/config";

export default function createToken(user) {
  const token = jwt.sign({ sub: user._id }, process.env.JWT_SIGNATURE, {
    expiresIn: "7d",
  });

  return token;
}
