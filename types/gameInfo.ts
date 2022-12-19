import { reviewType } from './review';

export type gameInfoType = {
    console_id: string;
    title: string;
    resume: string;
    developer: string;
    genre: string;
    rating: number;
    img: string;
    reviews: Array<reviewType>;
    createdAt: string;
    updatedAt: string;
    id: string;
} | null;
