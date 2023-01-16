//import {Blog, blogs} from "../repositories/blogs";
import {BlogsRepository} from "../repositories/blogs-repositories";
import {IBlog} from "../models/blog-model";



export class BlogService {
    private blogRepository: BlogsRepository;
    constructor() {
        this.blogRepository = new BlogsRepository()
    }

    public async getAll(): Promise<IBlog[]> {
        return await this.blogRepository.getAllBlogs()
    }

    public async create(name: string, description: string, websiteUrl: string): Promise<IBlog> {
        // const newBlog: Blog = {
        //     id: String(+(new Date)),
        //     name,
        //     description,
        //     websiteUrl
        // }
        // blogs.push(newBlog);
        return await this.blogRepository.createBlog(name, description, websiteUrl);
    }

    public async find(id: string): Promise<IBlog | undefined> {
        const blog = await this.blogRepository.getOneBlog(id);
        if (!blog) throw new Error();

        return blog;
    }

    public async getOne(id: string): Promise<IBlog | undefined> {
        const findBlog: IBlog | undefined = await this.find(id);
        if (findBlog) return findBlog;
        throw new Error();
    }

    public async update(id: string, name: string, description: string, websiteUrl: string): Promise<IBlog | undefined> {
        //const updateBlog: IBlog = this.find(id);
        const updateBlog = await this.blogRepository.updateBlog(id, name, description, websiteUrl);
        if (updateBlog) return updateBlog;
        throw new Error()
    }

    public async delete(id: string): Promise<void> {
        //const deleteBlog: IBlog = this.find(id);
       await this.blogRepository.deleteBlog(id)
        // if (deleteBlog) {
        //     const index = blogs.indexOf(deleteBlog);
        //     blogs.splice(index, 1);
        //
        //     return;
        // }
        //throw new Error()
    }

    public async testingDelete(): Promise<void> {
        // blogs.length = 0;
        //
        // return blogs;
        await this.blogRepository.deleteAll()

    }
}