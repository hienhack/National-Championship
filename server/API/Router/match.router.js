const express = require('express');
const router = express.Router();
const matchController = require('../../API/Controller/match.controller');


// mỗi đội bóng trả về thông _id, name, logo
// Mỗi bàn thắng trả về _id, time, type, scoredPlayer (tên ct), assitedPlayer (tên ct), club
// Ví dụ:
// {
//     round: 1,
//     datetime: ...,
//     stadium: "Hang Day",
//     club1Id: {
//         _id: "adfadsf",
//         name: "Manchester City",
//         image: 
//     },
//     club2Id: {
//         // như trên
//     },
//     isPlayed: Boolean,
//     result: {
//         club1: 2,
//         club2: 0,
//     },
//     goals: [{
//         _id: "asdfasd",
//        time: 90,
//        type: "P",
//        club: 1,
//        scoredPlayer: "Nguyen Quang Hai"
//        assistedPlayer: "Nguyen Cong Phuong"
//     }],
//     cards: [{
//         club: 1,
//         player: "Quang Hai",
//         time: 60
//     }]
// };        
router.get('/:matchId', matchController.matchDetail);



// Lấy theo query, mỗi trận đấu có _id, club1, club2 (_id, name, logo), datetime, isplayed
// Ví dụ https://localhost:5000/api/match?round=4$seasonId=5&result=true
// nếu result=true thì có thêm trường result, không có hoặc false thì không cứ như trên
// Không có round thì trả về tất cả các trận trong mùa giải, ví dụ
// data  = [{
//     round: 1,
//     matches: [
//         {
//             ...
//         },
//         {
//             ...
//         }
//     ],
//     round: 2,
//     matches: [{
//
//     }]
// }]
// Không có seasonId thì trả về request không hợp lệ
router.get('/', matchController.getAll);








router.post('/create', matchController.create);
router.post('/add-goal', matchController.addGoal);
router.post('/delete-goal', matchController.deleteGoal);
router.post('/add-redcard', matchController.addCard);
router.post('/delete-redcard', matchController.deleteCard);
router.post('/update', matchController.update);
router.post('/delete', matchController.delete);

module.exports = router;