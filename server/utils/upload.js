// import multer from 'multer';

// const upload = multer({ dest: 'uploads' });

// export default upload;
import multer from 'multer';
import path from 'path';

// Set up storage engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Ensure the 'uploads' folder is used
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        // Naming the file to avoid conflicts
        cb(null, Date.now() + path.extname(file.originalname)); // Add timestamp to avoid duplicate names
    }
});

// Initialize multer with storage configuration
const upload = multer({ storage: storage });

export default upload;
