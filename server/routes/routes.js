import express from "express";

//auth controllers
import {
  checkUserName,
  signup,
  login,
  logout,
  validateUser,
} from "../controllers/authControllers.js";

//blog controllers
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getBlog,
  updateBlog,
} from "../controllers/blogControllers.js";

//custom middleware
import verifyToken from "../middleware/verifyToken.js";
import {
  signupValidation,
  loginValidation,
  blogValidation,
} from "../middleware/validator.js";

const routes = express.Router();

//auth
routes.get("/auth/check-userName", checkUserName);
routes.post("/auth/signup", signupValidation, signup);
routes.post("/auth/login", loginValidation, login);
routes.post("/auth/logout", verifyToken, logout);
routes.get("/auth/me", verifyToken, validateUser);

//blog
routes.get("/blogs", getAllBlogs);
routes.post("/create-blog", verifyToken, blogValidation, createBlog);
routes.get("/get-blog/:slug", getBlog);
routes.delete("/delete-blog/:slug", verifyToken, deleteBlog);
routes.put("/update-blog/:slug", verifyToken, blogValidation, updateBlog);
export default routes;
