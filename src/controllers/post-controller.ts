import {Request, Response} from "express";
import {IPost} from "../models/post-model";
import {PostService} from "../services/post-service";

export class PostController {
    static async getAllPosts(req: Request, res: Response) {
        try {
            const postService = new PostService();
            const posts: IPost[] = await postService.getAll();
            res.status(200).json(posts);
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
            }
        }
    }

    static async createPost(req: Request, res: Response) {
        try {
            const {title, shortDescription, content, blogId} = req.body;
            const postService = new PostService();
            const newPost: IPost | undefined = await postService.create(title, shortDescription, content, blogId);
            if (newPost) res.status(201).json(newPost);
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
            }
        }
    }

    static async getOnePost(req: Request, res: Response) {
        try {
            const {id} = req.params;
            const postService = new PostService();
            const findPost: IPost | undefined = await postService.getOne(id);
            if (findPost) res.status(200).json(findPost);
        } catch (error) {
            if (error instanceof Error) {
                res.sendStatus(404);
                console.log(error.message);
            }
        }
    }

    static async updatePost(req: Request, res: Response) {
        try {
            const {id} = req.params;
            const {title, shortDescription, content, blogId} = req.body;
            const postService = new PostService();
            const updatePost: IPost | undefined = await postService.update(id, title, shortDescription, content, blogId);
            if (updatePost) res.sendStatus(204);
        } catch (error) {
            if (error instanceof Error) {
                res.sendStatus(404);
                console.log(error.message);
            }
        }
    }

    static async deletePost(req: Request, res: Response) {
        try {
            const {id} = req.params;
            const postService = new PostService();
            await postService.delete(id);
            res.sendStatus(204);
        } catch (error) {
            if (error instanceof Error) {
                res.sendStatus(404);
                console.log(error.message);
            }
        }
    }
}