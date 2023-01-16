export interface Post {
    id: string;
    title: string;
    shortDescription: string;
    content: string;
    blogId: string;
    blogName: string;
}

export const posts: Array<Post> = [
    {
        id: "1",
        title: "Craft",
        shortDescription: "About DIY",
        content: "DIY",
        blogId: "1",
        blogName: "DanyaKraster"
    }
]