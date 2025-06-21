import { Request, Response } from 'express';
import Item from '../models/Item.js';
import nodemailer from 'nodemailer';

// POST /api/items
export const addItem = async (req: Request, res: Response) => {
    try {
        const { name, type, description } = req.body;

        const files = req.files as {
            [fieldname: string]: Express.Multer.File[];
        };

        const coverImage = files.coverImage?.[0];
        const additionalImages = files.additionalImages || [];

        const coverImageUrl = (coverImage as any)?.path;
        const additionalImageUrls = additionalImages.length > 0 ? additionalImages.map((file) => (file as any).path) : [];
        console.log(additionalImageUrls);
        // Save to DB (example)
        const newItem = await Item.create({
            name,
            type,
            description,
            coverImage: coverImageUrl,
            additionalImages: additionalImageUrls
        });
        res.status(201).json({ message: 'Item successfully added', item: newItem });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error while adding item' });
    }
};


// GET /api/items
export const getItems = async (req: Request, res: Response) => {
    try {
        const items = await Item.find().sort({ createdAt: -1 });
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch items', error });
    }
};

// POST /api/items/enquire/:id
export const enquireItem = async (req: Request, res: Response) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) return res.status(404).json({ message: 'Item not found' });

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_RECEIVER,
            subject: `Inquiry for Item: ${item.name}`,
            text: `Inquiry for item:\nName: ${item.name}\nType: ${item.type}\nDescription: ${item.description}`,
        };

        await transporter.sendMail(mailOptions);
        res.json({ message: 'Inquiry sent successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to send inquiry', error });
    }
}; 