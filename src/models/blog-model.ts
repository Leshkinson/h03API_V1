import mongoose, {Schema} from "mongoose";

export interface IBlog {
    _id: string
    name: string;
    description: string;
    websiteUrl: string;
}

export const BlogSchema = new Schema<IBlog>({
    _id: {type: String, unique: true, required: true},
    name: {type: String, required: true},
    description: {type: String, required: true},
    websiteUrl: {type: String, required: true},
}, { timestamps: true })

BlogSchema.set('toJSON', {
    transform: function (doc, dto) {
        dto.id = dto._id;
        delete dto._id;
        delete dto.__v;
        delete dto.updatedAt
    }
})

export const BlogModel = mongoose.model<IBlog>('Blog', BlogSchema)
