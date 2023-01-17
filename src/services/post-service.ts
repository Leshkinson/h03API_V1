import {IBlog} from "../models/blog-model";
import {BlogService} from "./blog-service";
import {IPost} from "../models/post-model";
import {PostsRepository} from "../repositories/posts-repositories";
import {BlogsRepository} from "../repositories/blogs-repositories";

export class PostService {

    private postRepository: PostsRepository;
    private blogRepository: BlogsRepository;

    constructor() {
        this.postRepository = new PostsRepository()
        this.blogRepository = new BlogsRepository()
    }

    public async getAll(): Promise<IPost[]> {
        return await this.postRepository.getAllPosts();
    }

    public async create(title: string, shortDescription: string, content: string, blogId: string): Promise<IPost | undefined> {
        const blogService = new BlogService();
        const blog: IBlog | undefined = await blogService.find(blogId);
        if (blog) {
            return await this.postRepository.createPost(title, shortDescription, content, blog.id, blog.name);
        }
    }

    public async find(id: string): Promise<IPost | undefined> {
        const post = await this.postRepository.getOnePost(id);
        if (!post) throw new Error();

        return post;
    }

    public async getOne(id: string): Promise<IPost | undefined> {
        const findPost: IPost | undefined = await this.find(id);
        if (findPost) return findPost;
        throw new Error();
    }

    public async update(id: string, title: string, shortDescription: string, content: string, blogId: string): Promise<IPost | undefined> {

        const blog: IBlog | undefined | null = await this.blogRepository.getOneBlog(blogId);
        const updatePost: IPost | undefined | null = await this.postRepository.updatePost(id, title, shortDescription, content, blogId);
        if (blog && updatePost) {
            updatePost.title = title;
            updatePost.shortDescription = shortDescription;
            updatePost.content = content;

            return updatePost;
        }
        throw new Error()
    }

    public async delete(id: string): Promise<void> {
        await this.postRepository.deletePost(id)
    }

    public async testingDelete(): Promise<void> {
        await this.postRepository.deleteAll();
    }
}