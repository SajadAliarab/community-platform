export interface Topic {
    id: number;
    categries_id: number;
    user_id: number;
    title: string;
    content: string;
    view: number;
    pinned: boolean;
    locked: boolean;
    created_at: string;
}