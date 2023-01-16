import {Blog} from "../repositories/blogs";
import {BlogService} from "./blog-service";
import {posts, Post} from "../repositories/posts";

export class PostService {
    public getAll(): Post[] {
        return posts;
    }

    public create(title: string, shortDescription: string, content: string, blogId: string): Post | undefined {
        const blogService = new BlogService();
        const blog: Blog = blogService.find(blogId);
        if (blog) {
            const newPost: Post = {
                id: String(+(new Date)),
                title,
                shortDescription,
                content,
                blogId: blog.id,
                blogName: blog.name
            };
            posts.push(newPost);

            return newPost;
        }
    }

    public find(id: string): Post {
        const post: Post | undefined = posts.find(post => post.id === id);
        if (!post) throw new Error();

        return post;
    }

    public getOne(id: string): Post | undefined {
        const findPost: Post | undefined = this.find(id);
        if (findPost) return findPost;
        throw new Error();
    }

    public update(id: string, title: string, shortDescription: string, content: string, blogId: string): Post | undefined {
        const blogService = new BlogService();
        const blog: Blog | undefined = blogService.find(blogId);
        const updatePost: Post | undefined = this.find(id);
        if (blog && updatePost) {
            updatePost.title = title;
            updatePost.shortDescription = shortDescription;
            updatePost.content = content;

            return updatePost;
        }
        throw new Error()
    }

    public delete(id: string): void {
        const deletePost: Post = this.find(id);
        if (deletePost) {
            const index = posts.indexOf(deletePost);
            posts.splice(index, 1);

            return;
        }
        throw new Error()
    }

    public testingDelete(): Post[] {
        posts.length = 0;

        return posts;
    }
}