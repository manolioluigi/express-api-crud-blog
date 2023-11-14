const express = require('express');
const postsController = require('../controllers/postsController');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'public/imgs/posts' });

//rotte
router.get('/', postsController.index);
router.get('/create', postsController.create);
router.get('/:slug', postsController.show);
router.get('/:slug/download', postsController.download);
router.post('/', upload.single('image'), postsController.store);
router.delete('/:slug', postsController.destroy);

module.exports = router;
