const path = require('path');
const express = require('express');

const router = express.Router();

router.get('/get404', (req, res, next) => {
    res.status(404).render('404', { pageTitle: 'Page Not Found', path: '/404' });
  });




module.exports = router;