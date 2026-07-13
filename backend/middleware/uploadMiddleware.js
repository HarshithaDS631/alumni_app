const multer = require('multer');

// Configure multer to use memory storage
// We will upload the file buffer to GridFS in the controller
const storage = multer.memoryStorage();

const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter: (req, file, cb) => {
        // Allow images and documents (PDF, DOC, etc)
        if (file.mimetype.startsWith('image/') || 
            file.mimetype === 'application/pdf' || 
            file.mimetype.includes('msword') || 
            file.mimetype.includes('officedocument') ||
            file.mimetype.includes('text/')) {
            cb(null, true);
        } else {
            cb(new Error('Only images and documents are allowed!'), false);
        }
    }
});

module.exports = upload;
