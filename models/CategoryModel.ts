export interface Category {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    image: string | null;
    active: boolean;
    children: Category[] | null;
}