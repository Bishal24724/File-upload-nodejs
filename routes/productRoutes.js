import express from 'express';
import multer from 'multer';
import { renderAddProductForm, addProduct, listProducts } from '../controllers/productController.js';

const router = express.Router();

// Configure Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});


const upload = multer({ storage });

// Routes
router.get('/add', renderAddProductForm);
router.post('/add', upload.single('image'), addProduct);
router.get('/', listProducts);

export default router;
