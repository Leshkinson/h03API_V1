import {Request, Response} from "express";

import {PostService} from "../services/post-service";
import {IPost} from "../models/post-model";

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
            const postService = new PostService();
            const {title, shortDescription, content, blogId} = req.body;
            const newPost = await postService.create(title, shortDescription, content, blogId);
            res.status(201).json(newPost);
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
            }
        }
    }

    // static getOnePost(req: Request, res: Response) {
    //     try {
    //         const {id} = req.params;
    //         const postService = new PostService();
    //         const findPost: Post | undefined = postService.getOne(id);
    //         if (findPost) res.status(200).json(findPost);
    //     } catch (error) {
    //         if (error instanceof Error) {
    //             res.sendStatus(404);
    //             console.log(error.message);
    //         }
    //     }
    // }
    //
    // static updatePost(req: Request, res: Response) {
    //     try {
    //         const {id} = req.params;
    //         const {title, shortDescription, content, blogId} = req.body;
    //         const postService = new PostService();
    //         const updatePost: Post | undefined = postService.update(id, title, shortDescription, content, blogId);
    //         if (updatePost) res.sendStatus(204);
    //     } catch (error) {
    //         if (error instanceof Error) {
    //             res.sendStatus(404);
    //             console.log(error.message);
    //         }
    //     }
    // }
    //
    // static deletePost(req: Request, res: Response) {
    //     try {
    //         const {id} = req.params;
    //         const postService = new PostService();
    //         postService.delete(id);
    //         res.sendStatus(204);
    //     } catch (error) {
    //         if (error instanceof Error) {
    //             res.sendStatus(404);
    //             console.log(error.message);
    //         }
    //     }
    // }
}