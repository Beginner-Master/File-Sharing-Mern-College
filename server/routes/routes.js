import express from 'express';
import { uploadImage, downloadImage } from '../controller/image-controller.js';
import upload from '../utils/upload.js';

const router = express.Router();

router.post('/upload', upload.single('file'), uploadImage);
router.get('/file/:fileId', downloadImage);

export default router;


// import express from 'express';
// import upload from '../utils/upload.js';  // Import the multer instance
// import File from '../models/file.js';    // Assuming you have a File model to store file details in DB

// const router = express.Router();

// // Route to handle file upload
// router.post('/upload', upload.single('file'), async (req, res) => {
//     if (!req.file) {
//         return res.status(400).json({ error: 'No file uploaded' });
//     }

//     // Create a file object with the path and name
//     const fileObj = {
//         path: req.file.path, // Path of the uploaded file
//         name: req.file.originalname // Original file name
//     };

//     try {
//         // Save the file details in your database (MongoDB or any other DB you're using)
//         const file = await File.create(fileObj);
        
//         // Respond with the file URL
//         res.status(200).json({ path: `http://localhost:8000/file/${file._id}` });
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).json({ error: error.message });
//     }
// });

// export default router;






