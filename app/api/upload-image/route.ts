// app/api/upload-image/route.ts
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

// Promisify fs.mkdir for ensuring directory exists
const mkdirAsync = promisify(fs.mkdir);
const writeFileAsync = promisify(fs.writeFile); // If using async/await for fs.writeFile

// Define allowed file types and max size (5MB)
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']; // Added GIF
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('image') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No image file provided.' }, { status: 400 });
    }

    // Validate file type
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: `Invalid file type: ${file.type}. Allowed types: ${ALLOWED_MIME_TYPES.join(', ')}` },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: `File too large (${(file.size / (1024 * 1024)).toFixed(2)}MB). Max size is ${MAX_FILE_SIZE / (1024 * 1024)}MB.` },
        { status: 400 }
      );
    }

    // Sanitize filename and make it unique
    const originalFilename = file.name.replace(/[^a-zA-Z0-9._-]/g, '_'); // Sanitize
    const uniqueFilename = `${Date.now()}-${originalFilename}`;

    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'temp_images');
    const filePath = path.join(uploadDir, uniqueFilename);

    // Ensure upload directory exists
    await mkdirAsync(uploadDir, { recursive: true });


    // Convert ArrayBuffer to Buffer and write file
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFileAsync(filePath, buffer);

    // TODO: Implement cloud storage (e.g., S3, Cloudinary) for production.
    // For local dev, the public URL will be relative to the public folder
    const publicUrl = `/uploads/temp_images/${uniqueFilename}`;

    return NextResponse.json({ imageUrl: publicUrl, message: 'Image uploaded successfully.' });

  } catch (error: any) {
    console.error('Image upload error:', error);
    let errorMessage = 'Image upload failed due to an internal server error.';
    if (error.message && typeof error.message === 'string') {
        // Potentially more specific errors if any part of fs operations fail
        if (error.code === 'EACCES') {
            errorMessage = 'Permission denied when trying to save the image.';
        } else if (error.code === 'ENOSPC') {
            errorMessage = 'Not enough disk space to save the image.';
        }
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
