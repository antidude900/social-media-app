import { Schema, models, model, Document } from "mongoose";

export interface IPost extends Document {
	text: string;
	image: string;
	author: Schema.Types.ObjectId;
	likes: Schema.Types.ObjectId[];
	comments: Schema.Types.ObjectId[];
	createdAt: Date;
}

const PostSchema = new Schema({
	text: { type: String },
	image: { type: String },
	author: { type: Schema.Types.ObjectId, ref: "User", required: true },
	likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
	comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
	createdAt: { type: Date, default: Date.now },
});

const Post = models.Post || model("Post", PostSchema);

export default Post;
