import { checkSchema } from "express-validator";

const signupValidation = checkSchema({
  username: {
    isString: true,
    notEmpty: {
      errorMessage: "name is required",
    },
    trim: true,
    isLength: {
      options: { min: 5, max: 15 },
      errorMessage: "username must be 5 to 15 characters only allowed",
    },
  },
  email: {
    isEmail: {
      errorMessage: "Invalid email",
    },
    normalizeEmail: true,
  },
  password: {
    notEmpty: {
      errorMessage: "Please enter the password field",
    },
    isString: {
      errorMessage: "Password must be string",
    },
    isLength: {
      options: { min: 6 },
      errorMessage: "Password must atlest 6 characters",
    },
  },
  confirmPassword: {
    custom: {
      options: (value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Password do not match");
        }
        return true;
      },
    },
  },
});

const loginValidation = checkSchema({
  email: {
    notEmpty: {
      errorMessage: "Please enter the email field",
    },
    isEmail: {
      errorMessage: "Invalid email",
    },
    normalizeEmail: true,
  },
  password: {
    notEmpty: {
      errorMessage: "Please enter the password field",
    },
    isString: {
      errorMessage: "Password must be string",
    },
    isLength: {
      options: { min: 6 },
      errorMessage: "Password must atlest 6 characters",
    },
  },
});

const blogValidation = checkSchema({
  "blog.title": {
    notEmpty: {
      errorMessage: "Please enter the title field",
    },
    isString: {
      errorMessage: "Title must be a string",
    },
    isLength: {
      options: { min: 10 },
      errorMessage: "Title must be atleast 10 characters",
    },
    custom: {
      options: (value) => value.length <= 30,
      errorMessage: "Maximum 30 characters allowed",
    },
  },
  "blog.description": {
    notEmpty: {
      errorMessage: "Please enter the description field",
    },
    isString: {
      errorMessage: "description must be a string",
    },
    isLength: {
      options: { min: 100 },
      errorMessage: "description must be atleast 100 characters",
    },
    custom: {
      options: (value) => value.length <= 300,
      errorMessage: "Maximum 300 characters allowed",
    },
  },
  "blog.tag": {
    notEmpty: {
      errorMessage: "Please enter the tag field",
    },
    isString: {
      errorMessage: "tag must be a string",
    },
    isLength: {
      options: { max: 10 },
      errorMessage: "Maximum 10 characters are allowed",
    },
  },
});
export { signupValidation, loginValidation, blogValidation };
