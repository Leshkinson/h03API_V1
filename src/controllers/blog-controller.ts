import {Request, Response} from "express";
import {Blog} from "../repositories/blogs";
import {BlogService} from "../services/blog-service";
import {PostService} from "../services/post-service";

export class BlogController {

     static getAllBlogs(req: Request, res: Response) {
        try {
            const blogService = new BlogService();
            const blogs: Blog[] = blogService.getAll();
            res.status(200).json(blogs);
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
        }
    }

    static createBlog(req: Request, res: Response) {
        try {
            const {name, description, websiteUrl} = req.body;
            const blogService = new BlogService();
            const newBlogs: Blog = blogService.create(name, description, websiteUrl);
            res.status(201).json(newBlogs);
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
        }
    }

    static getOneBlog(req: Request, res: Response) {
        try {
            const {id} = req.params;
            const blogService = new BlogService();
            const findBlog: Blog | undefined = blogService.getOne(id);
            if (findBlog) res.status(200).json(findBlog);
        } catch (error) {
            if (error instanceof Error) {
                res.sendStatus(404);
                throw new Error(error.message);
            }
        }
    }

    static updateBlog(req: Request, res: Response) {
        try {
            const {id} = req.params;
            const {name, description, websiteUrl} = req.body;
            const blogService = new BlogService();
            const updateBlog: Blog | undefined = blogService.update(id, name, description, websiteUrl);
            if (updateBlog) res.sendStatus(204);
        } catch (error) {
            if (error instanceof Error) {
                res.sendStatus(404);
                throw new Error(error.message);
            }
        }
    }

    static deleteBlog(req: Request, res: Response) {
        try {
            const {id} = req.params;
            const blogService = new BlogService();
            blogService.delete(id);
            res.sendStatus(204);
        } catch (error) {
            if (error instanceof Error) {
                res.sendStatus(404);
                throw new Error(error.message);
            }
        }
    }

    static testing(req: Request, res: Response) {
        try {
            const blogService = new BlogService();
            const postService = new PostService();
            blogService.testingDelete();
            postService.testingDelete();
            res.sendStatus(204);
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
        }
    }
}