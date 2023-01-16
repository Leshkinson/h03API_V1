import {IBlog} from "../models/blog-model";
import {BlogService} from "./blog-service";
import {PostsRepository} from "../repositories/posts-repositories";
import {IPost} from "../models/post-model";

export class PostService {
    
    private postRepository: PostsRepository; 
    
    constructor() {
        this.postRepository = new PostsRepository()
    }
    public async getAll(): Promise<IPost[]> {
        return await this.postRepository.getAllPosts();
    }

    public async create(title: string, shortDescription: string, content: string, blogId: string): Promise<IPost | undefined> {
        const blogService = new BlogService();
        const blog: IBlog | undefined = await blogService.find(blogId);
        if (blog) {
            return await this.postRepository.createPost(title, shortDescription, content, blog._id, blog.name);
        }
    }

    public async find(id: string): Promise<IPost | undefined> {
        const post= await this.postRepository.getOnePost(id);
        if (!post) throw new Error();

        return post;
    }

    public async getOne(id: string): Promise<IPost | undefined> {
        const findPost: IPost | undefined = await this.find(id);
        if (findPost) return findPost;
        throw new Error();
    }

    // public update(id: string, title: string, shortDescription: string, content: string, blogId: string): Post | undefined {
    //     const blogService = new BlogService();
    //     const blog: Blog | undefined = blogService.find(blogId);
    //     const updatePost: Post | undefined = this.find(id);
    //     if (blog && updatePost) {
    //         updatePost.title = title;
    //         updatePost.shortDescription = shortDescription;
    //         updatePost.content = content;
    //
    //         return updatePost;
    //     }
    //     throw new Error()
    // }
    //
    public async delete(id: string): Promise<void> {
        // const deletePost: IPost = this.find(id);
        // if (deletePost) {
        //     const index = postsRepositories.indexOf(deletePost);
        //     postsRepositories.splice(index, 1);
        //
        //     return;
        // }
        // throw new Error()
        await this.postRepository.deletePost(id)

    }

    public async testingDelete(): Promise<void> {
        await this.postRepository.deleteAll() ;
    }
}