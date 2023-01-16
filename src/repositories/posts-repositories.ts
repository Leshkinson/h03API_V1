import{PostModel, IPost} from "../models/post-model";
import {Model} from "mongoose";



// export const postsRepositories: Array<Post> = [
//     {
//         id: "1",
//         title: "Craft",
//         shortDescription: "About DIY",
//         content: "DIY",
//         blogId: "1",
//         blogName: "DanyaKraster"
//     }
// ]

export class PostsRepository {
    private postModel: Model<IPost>

    constructor() {
        this.postModel = PostModel
    }

    public async getAllPosts() {
        return this.postModel.find()
    }

    public async createPost(title: string, shortDescription: string, content: string, blogId: string, blogName: string) {
        return await this.postModel.create({title, shortDescription, content, blogId, blogName})
    }

    public async getOnePost(id: string) {
        return this.postModel.findById(id)
    }

    public async deletePost(id: string) {
        return this.postModel.findOneAndDelete({id})
    }

    public async deleteAll() {
        return this.postModel.deleteMany()
    }


}