//model
import Blog from "../models/blogModel.js";

//express validation
import { validationResult } from "express-validator";

const getAllBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find().populate("author", "name");
    if (!blogs) {
      return res.status(404).json({ message: "Blog not found" });
    }
    return res.status(200).json({ blogs });
  } catch (error) {
    next(error);
  }
};

const createBlog = async (req, res, next) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) return res.status(400).json({ error: error.array() });

    const { title, description, tag } = req.body.blog;
    const blog = await Blog.create({
      title,
      description,
      tag,
      author: req.user,
    });

    await blog.populate("author", "name");

    if (!blog) {
      return res
        .status(500)
        .json({ message: "Failed to create blog, Try again later" });
    }
    return res.status(201).json({ blog });
  } catch (error) {
    next(error);
  }
};

const getBlog = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const blog = await Blog.findOne({ slug }).populate("author", "name");
    if (!blog) {
      return res
        .status(400)
        .json({ message: "Something went wrong , Try again later" });
    }
    const blogObj = blog.toObject();
    delete blogObj._id;
    delete blogObj.__v;

    return res.status(200).json({ blog: blogObj });
  } catch (error) {
    next(error);
  }
};

const updateBlog = async (req, res, next) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) return res.status(400).json({ error: error.array() });

    const { slug } = req.params;
    const { title, description, tag } = req.body.blog;
    const blog = await Blog.findOneAndUpdate(
      { slug, author: req.user },
      { title, description, tag },
      { new: true, runValidators: true },
    ).populate("author", "name");

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    return res.status(200).json({ blog });
  } catch (error) {
    next(error);
  }
};

const deleteBlog = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const blog = await Blog.findOneAndDelete({ slug, author: req.user });
    if (!blog) {
      return res
        .status(400)
        .json({ message: "could't delete, Try again later" });
    }
    return res.status(200).json({ blog });
  } catch (error) {
    next(error);
  }
};
export { getAllBlogs, createBlog, getBlog, deleteBlog, updateBlog };
