import mongoose, {Schema} from "mongoose";

export interface IPost {
    id: string;
    title: string;
    shortDescription: string;
    content: string;
    blogId: string;
    blogName: string;
}

export const PostSchema = new Schema<IPost>({
    title: {type: String, required: true},
    shortDescription: {type: String, required: true},
    content: {type: String, required: true},
    blogId: {type: String, required: true},
    blogName: {type: String, required: true},
}, {timestamps: true});

PostSchema.set('toJSON', {
    transform: function (doc, dto) {
        dto.id = dto._id;
        delete dto._id;
        delete dto.__v;
        delete dto.updatedAt
    }
})

export const PostModel = mongoose.model<IPost>('Post', PostSchema)