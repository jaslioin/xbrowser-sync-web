export interface Bookmark {
    id: string;
    title: string;
    url: string;
    description?: string;
    children?: Bookmark[];
    tags?: string[];
}

export interface SearchBookmark extends Bookmark {
    isMatch?: boolean;
    path?:string;
}
