export interface Item {
    _id: string;
    name: string;
    type: string;
    description: string;
    coverImage: string;
    additionalImages: string[];
    createdAt: Date;
} 