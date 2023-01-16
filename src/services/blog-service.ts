import {Blog, blogs} from "../repositories/blogs";

export class BlogService {

    public getAll(): Blog[] {
        return blogs;
    }

    public create(name: string, description: string, websiteUrl: string): Blog {
        const newBlog: Blog = {
            id: String(+(new Date)),
            name,
            description,
            websiteUrl
        }
        blogs.push(newBlog);

        return newBlog;
    }

    public find(id: string): Blog {
        const blog: Blog | undefined = blogs.find(blog => blog.id === id);
        if (!blog) throw new Error();

        return blog;
    }

    public getOne(id: string): Blog | undefined {
        const findBlog: Blog | undefined = this.find(id);
        if (findBlog) return findBlog;
        throw new Error();
    }

    public update(id: string, name: string, description: string, websiteUrl: string): Blog | undefined {
        const updateBlog: Blog = this.find(id);
        if (updateBlog) {
            updateBlog.name = name;
            updateBlog.description = description;
            updateBlog.websiteUrl = websiteUrl;

            return updateBlog;
        }
        throw new Error()
    }

    public delete(id: string): void {
        const deleteBlog: Blog = this.find(id);
        if (deleteBlog) {
            const index = blogs.indexOf(deleteBlog);
            blogs.splice(index, 1);

            return;
        }
        throw new Error()
    }

    public testingDelete(): Blog[] {
        blogs.length = 0;

        return blogs;
    }
}