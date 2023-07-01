const express = require('express');
const router = express.Router();
const clubController = require('../Controller/club.controller');
const uploader = require('../../Util/imageParser');

router.post('/create', uploader.single("image"), clubController.createClub);
router.post('/update', uploader.single("image"), clubController.updateClub);
router.post('/delete', clubController.deleteClub);
router.post('/delete-player', clubController.deletePlayerFromClub);

// trả về thông _id, name, image, coach, players list, mỗi player có shirtNumber, image, name, stadium
router.get('/:clubId/:seasonId', clubController.getClub);



// Tìm tất cả các mùa đội theo query
// http://localhost:5000/club?name=adfds&seasonId
// mỗi đội có thông tin _id, name, image
// query chỉ có name -> trả về tất cả có tên khớp, sử dụng regex case insensitive để match
 // query chỉ có seasonId ->  trả về tất cả trong mùa giải
 // có cả name và seasonId -> có tên khớp và có trong mùa giải (này viểt ra thoi, chưa cần xử lý)
 // không có gì, trả về tất cả
router.get('/', clubController.findClub);

module.exports = router;