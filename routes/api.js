var express = require('express');
var router = express.Router();

const FavouriteListsController = require('../controllers/favouriteListsController')
const VideosController = require('../controllers/videosController')

router.route("/lists")
    .get(FavouriteListsController.selectAllLists)
    .post(FavouriteListsController.insertList);

router.route("/lists/asc")
    .get(FavouriteListsController.selectAllListsASC)
  
router.route("/lists/:id")
    .put(FavouriteListsController.updateList)
    .delete(FavouriteListsController.deleteList)

router.route("/lists/:maxID/:date")
    .get(FavouriteListsController.selectFromFirstXListsInDate)

router.route("/lists/:pageNo")
    .get(FavouriteListsController.selectAllListsWithPagination)

router.route("/videos")
    .get(VideosController.selectAllVideos)
    
router.route("/videos/:listID")
    .get(VideosController.selectVideosByList)

router.route("/lists/:listID/video")
    .post(VideosController.insertVideoInList);

router.route("/lists/:listID/video/:videoID")
    .put(VideosController.updateVideoInList)
    .delete(VideosController.deleteVideoFromList)

router.route("/import")
    .post(FavouriteListsController.import)

module.exports = router;