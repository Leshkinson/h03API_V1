export interface Blog {
    id: string;
    name: string;
    description: string;
    websiteUrl: string;
}

export const blogs: Array<Blog> = [
    {
        id: "1",
        name: "DanyaKraster",
        description: "About DIY",
        websiteUrl: "https://www.youtube.com/DanyaKraster"
    }
]