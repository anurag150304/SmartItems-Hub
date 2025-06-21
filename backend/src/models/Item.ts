import mongoose, { Document, Schema } from 'mongoose';

export interface ItemType extends Document {
    name: string;
    type: string;
    description: string;
    coverImage: string;
    additionalImages?: string[];
    createdAt: Date;
}

const ItemSchema: Schema = new Schema<ItemType>({
    name: { type: String, required: true },
    type: { type: String, required: true },
    description: { type: String, required: true },
    coverImage: { type: String, required: true },
    additionalImages: { type: [String], default: [] },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<ItemType>('Item', ItemSchema); 