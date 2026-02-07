//mongoose model
import User from "../models/userModel.js";

//token
import createToken from "../utils/createToken.js";

//cookies
import setCookies from "../utils/setCookies.js";

//express validator
import { validationResult } from "express-validator";

const checkUserName = async (req, res, next) => {
  try {
    const { username } = req.query;
    const user = await User.findOne({ name: username });
    if (user) {
      return res.status(200).json({ message: "username already exist" });
    }
    return res.status(200).json({ message: "username avaliable" });
  } catch (error) {
    next(error);
  }
};

const signup = async (req, res, next) => {
  try {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }
    const { username: name, email, password } = req.body;
    const checkUser = await User.findOne({ $or: [{ name }, { email }] });

    if (checkUser) {
      if (checkUser.name === name)
        return res.status(400).json({ message: "username already taken" });
      if (checkUser.email === email)
        return res.status(400).json({ message: "Email already taken" });
    }

    const user = await User.create({ name, email, password });
    if (user) {
      const token = createToken(user);
      setCookies(res, token);

      return res.status(201).json({
        user: {
          name: user.name,
        },
      });
    }
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) return res.status(400).json({ error: error.array() });
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    const checkPassword = await user.comparePassword(password);

    if (checkPassword) {
      const token = createToken(user);
      const cookies = setCookies(res, token);
      if (cookies) {
        res.status(200).json({
          message: "Successfully login",
          user: {
            name: user.name,
          },
        });
      } else
        res.status(400).json({ message: "Something went wrong try again" });
    } else {
      res.status(400).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const sub = req.user;
    const user = await User.findById(sub);
    if (!user) {
      return res.status(400).json({
        message: "Something went wrong. Try again later",
      });
    }
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.isProduction === "production",
    });
    res.json({ status: 200, message: "Logout successfully" });
  } catch (error) {
    next(error);
  }
};

const validateUser = async (req, res, next) => {
  try {
    const sub = req.user;
    const user = await User.findById(sub);
    res.status(200).json({
      user: {
        name: user.name,
      },
    });
  } catch (error) {
    next(error);
  }
};
export { checkUserName, signup, login, logout, validateUser };
