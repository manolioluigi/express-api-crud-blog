const express = require('express');
const postsController = require('../controllers/postsController');
const router = express.Router();

//rotte
router.get('/', postsController.index);
router.get('/create', postsController.create);
router.get('/:slug', postsController.show);
router.get('/:slug/download', postsController.download);

module.exports = router;
