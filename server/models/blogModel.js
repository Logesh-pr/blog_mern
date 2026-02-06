import { Schema, model } from "mongoose";
import slugify from "slugify";
import crypto from "crypto";

const blogSchema = Schema({
  title: { type: String, required: true, minlenght: 5 },
  slug: { type: String, uniqure: true, index: true },
  description: { type: String, reuired: true, minlenght: 100, maxlength: 300 },
  tag: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "user", required: true },
  createdAt: { type: Date, default: Date.now },
});

blogSchema.pre("save", function () {
  if (!this.isModified("title")) return;

  const baseSlug = slugify(this.title, {
    lower: true,
    strict: true,
  });
  const random = crypto.randomBytes(3).toString("hex");
  this.slug = `${baseSlug}-${random}`;
});
blogSchema.set("toJSON", {
  transform: (_doc, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});
const Blog = model("blogs", blogSchema);

export default Blog;
