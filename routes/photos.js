var express = require('express');
var router = express.Router();
var photosController = require("../controllers/photos");
var _ = require('lodash');

/* Retrieve flickr public photos. */
router.get('/public', function(req, res, next) {

  photosController.getPublicPhotos((err, data) => {
    if (!err){
      res.json(data)
    }else{
      next(err);
    }
  });

});

/* Retrieve flickr search photos. */
router.post('/search', function(req, res, next) {

  let searchString = req.body.searchString;

  if (!_.isEmpty(searchString)) {
    photosController.searchPublicPhotos(searchString, (err, data) => {
      if (!err){
        res.json(data)
      }else{
        next(err);
      }
    });
  }else{
    next(new Error('Search string cannot be empty'));
  }

});

module.exports = router;
