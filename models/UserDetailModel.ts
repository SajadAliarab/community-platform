import { title } from "~/enums/title";
export interface UserDetailModel {
    image: string ;
    cover_image: string ;
    tagline: string;
    title: title;
    website: string;
    mobile: string;
    point: number;
}