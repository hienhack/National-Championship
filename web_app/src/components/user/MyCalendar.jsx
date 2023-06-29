import React, { useState, useEffect, useCallback } from "react";
import { Navigate, Routes, Route, useNavigate } from "react-router-dom";
import $ from "jquery";
import axios from "axios";
import "../../css/style.css";
import moment from "moment";
import EditNoteIcon from '@mui/icons-material/EditNote';
import { notification } from "antd";
import ArrowCircleLeftSharpIcon from '@mui/icons-material/ArrowCircleLeftSharp';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import "../../style/myteam.css";
import BuildIcon from "@mui/icons-material/Build";
import SellIcon from '@mui/icons-material/Sell';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
const API = "http://127.0.0.1:5000/api/match";
const API1 = "http://127.0.0.1:5000/api/club";

function MyCalendar() {
  return (
    <Routes>
      <Route index element={<Navigate to="all" replace />} />

      <Route path="all" element={<AddMatch />} />
      <Route path="add" element={<AllCalendar />} />
      <Route path="info" element={<EditMatch />} />
    </Routes>
  );
}

// function AllCalendar() {
//   const [listMatch, setListMatch] = useState([]);
//   // const [round, setRound] = useState("Tất cả");
//   // useEffect(() => {
//   //   axios
//   //     .get(API, {
//   //       headers: {
//   //         "content-type": "application/json",
//   //         accept: "application/json",
//   //       },
//   //     })
//   //     .then((response) => {
//   //       // setListMatch(response.data.data);
//   //       console.log(response.data.data);
//   //     })
//   //     .catch((err) => { });
//   // }, []);

//   function convertToLocalDate(utcDateTime) {
//     var utcDate = new Date(utcDateTime);
//     var localDate = utcDate.toLocaleString();
//     return localDate;
//   }
//   const navigate = useNavigate();
//   const handleOnClick = useCallback(
//     () => navigate("../add", { replace: true }),
//     [navigate]
//   );
//   const handleOnClick1 = useCallback(
//     () => navigate("../edit", { replace: true }),
//     [navigate]
//   );
//   return (
//     <div className="contentUser">
//       <Content />
//       <div className="main-wrapper">


//         <div className="d-flex flex-column gap-4 p-4">
//           <h5 className="m-0">Tạo lịch thi đấu</h5>

//           <div className="m-auto bg-white shadow rounded-2" style={{ width: 800 }}>
//             <div className="d-flex justify-content-between p-4">
//               <div className="round-select input-group" style={{ width: 180 }}>
//                 <label className="input-group-text" htmlFor="inputGroupSelect01">Vòng đấu</label>
//                 <select className="form-select" id="inputGroupSelect01">
//                   <option defaultValue="1">1</option>
//                   <option value="2">2</option>
//                   <option value="3">3</option>
//                 </select>
//               </div>
//               <button className="btn btn-success fs-7" data-bs-toggle="modal"
//                 data-bs-target="#add-match-modal"><AddIcon></AddIcon> Thêm trận
//                 đấu</button>
//               <div className="modal fade" id="add-match-modal" tabIndex="-1" aria-hidden="true">
//                 <div className="modal-dialog">
//                   <div className="modal-content">
//                     <div className="modal-header px-4">
//                       <h1 className="modal-title fs-6" id="exampleModalLabel">Biểu mẫu thêm trận đấu
//                       </h1>
//                       <button type="button" className="btn-close" data-bs-dismiss="modal"
//                         aria-label="Close"></button>
//                     </div>
//                     <div className="modal-body px-4">
//                       <form>
//                         <div className="d-flex flex-column gap-3">
//                           <div>
//                             <label className="fs-8 mb-1">Vòng</label>
//                             <div className="input-group">
//                               <input type="number" className="form-control" value="1"
//                                 readOnly />
//                             </div>
//                           </div>
//                           <div>
//                             <label className="fs-8 mb-1">Đội bóng 1</label>
//                             <select className="form-select" aria-label="Default select example">
//                               <option defaultValue="">Chọn đội bóng</option>
//                               <option value="1">Manchester City</option>
//                               <option value="2">Manchester United</option>
//                               <option value="3">Liverpool</option>
//                             </select>
//                           </div>
//                           <div>
//                             <label className="fs-8 mb-1">Đội bóng 1</label>
//                             <select className="form-select" aria-label="Default select example">
//                               <option defaultValue="">Chọn đội bóng</option>
//                               <option value="1">Manchester City</option>
//                               <option value="2">Manchester United</option>
//                               <option value="3">Liverpool</option>
//                             </select>
//                           </div>

//                           <div className="d-flex gap-3">
//                             <div>
//                               <label className="fs-8 mb-1">Giờ</label>
//                               <div className="input-group">
//                                 <input type="number" className="form-control" value="1" />
//                               </div>
//                             </div>
//                             <div>
//                               <label className="fs-8 mb-1">Phút</label>
//                               <div className="input-group">
//                                 <input type="number" className="form-control" value="1" />
//                               </div>
//                             </div>
//                             <div>
//                               <label className="fs-8 mb-1">Ngày</label>
//                               <div className="input-group">
//                                 <input type="date" className="form-control" />
//                               </div>
//                             </div>
//                           </div>
//                           <div>
//                             <label className="fs-8 mb-1">Sân đấu</label>
//                             <div className="input-group">
//                               <input type="text" className="form-control" />
//                             </div>
//                           </div>
//                         </div>
//                       </form>
//                     </div>
//                     <div className="modal-footer py-2 px-4">
//                       <button type="button" className="btn btn-light"
//                         data-bs-dismiss="modal">Hủy</button>
//                       <button type="button" className="btn btn-primary">Lưu</button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <hr className="m-0" />
//             <div className="row row-cols-2 g-0 p-4">
//               <div className="col">
//                 <div className="match d-flex border">
//                   <div className="d-flex flex-column justify-content-center gap-2 flex-grow-1 p-3">
//                     <div>
//                       <img className="club-logo" alt="" style={{ height: 25, width: 25 }}
//                         src="https://upload.wikimedia.org/wikipedia/vi/1/1d/Manchester_City_FC_logo.svg" />
//                       <span>Manchester City</span>
//                     </div>
//                     <div>
//                       <img className="club-logo" alt="" style={{ height: 25, width: 25 }}
//                         src="https://upload.wikimedia.org/wikipedia/vi/1/1d/Manchester_City_FC_logo.svg" />
//                       <span>Manchester City</span>
//                     </div>
//                   </div>
//                   <div
//                     className="border-start p-3 d-flex flex-column justify-content-center align-items-center">
//                     <span className="fs-8 text-secondary">20/01</span>
//                     <span className="fs-8 text-secondary">19:00</span>
//                     <span className="fs-8 text-secondary">Sân Hàng Đẫy</span>
//                   </div>
//                   <div className="remove-match p-3 bg-danger">
//                     <button className="text-muted"><DeleteIcon></DeleteIcon></button>
//                   </div>
//                 </div>
//               </div>
//               <div className="col">
//                 <div className="match d-flex border">
//                   <div className="d-flex flex-column justify-content-center gap-2 flex-grow-1 p-3">
//                     <div>
//                       <img className="club-logo" alt="" style={{ height: 25, width: 25 }}
//                         src="https://upload.wikimedia.org/wikipedia/vi/1/1d/Manchester_City_FC_logo.svg" />
//                       <span>Manchester City</span>
//                     </div>
//                     <div>
//                       <img className="club-logo" alt="" style={{ height: 25, width: 25 }}
//                         src="https://upload.wikimedia.org/wikipedia/vi/1/1d/Manchester_City_FC_logo.svg" />
//                       <span>Manchester City</span>
//                     </div>
//                   </div>
//                   <div
//                     className="border-start p-3 d-flex flex-column justify-content-center align-items-center">
//                     <span className="fs-8 text-secondary">20/01</span>
//                     <span className="fs-8 text-secondary">19:00</span>
//                     <span className="fs-8 text-secondary">Sân Hàng Đẫy</span>
//                   </div>
//                   <div className="remove-match p-3 bg-danger">
//                     <button className="text-muted"><DeleteIcon></DeleteIcon></button>
//                   </div>
//                 </div>
//               </div>
//               <div className="col">
//                 <div className="match d-flex border">
//                   <div className="d-flex flex-column justify-content-center gap-2 flex-grow-1 p-3">
//                     <div>
//                       <img className="club-logo" alt="" style={{ height: 25, width: 25 }}
//                         src="https://upload.wikimedia.org/wikipedia/vi/1/1d/Manchester_City_FC_logo.svg" />
//                       <span>Manchester City</span>
//                     </div>
//                     <div>
//                       <img className="club-logo" alt="" style={{ height: 25, width: 25 }}
//                         src="https://upload.wikimedia.org/wikipedia/vi/1/1d/Manchester_City_FC_logo.svg" />
//                       <span>Manchester City</span>
//                     </div>
//                   </div>
//                   <div
//                     className="border-start p-3 d-flex flex-column justify-content-center align-items-center">
//                     <span className="fs-8 text-secondary">20/01</span>
//                     <span className="fs-8 text-secondary">19:00</span>
//                     <span className="fs-8 text-secondary">Sân Hàng Đẫy</span>
//                   </div>
//                   <div className="remove-match p-3 bg-danger">
//                     <button className="text-muted"><DeleteIcon></DeleteIcon></button>
//                   </div>
//                 </div>
//               </div>
//               <div className="col">
//                 <div className="match d-flex border">
//                   <div className="d-flex flex-column justify-content-center gap-2 flex-grow-1 p-3">
//                     <div>
//                       <img className="club-logo" alt="" style={{ height: 25, width: 25 }}
//                         src="https://upload.wikimedia.org/wikipedia/vi/1/1d/Manchester_City_FC_logo.svg" />
//                       <span>Manchester City</span>
//                     </div>
//                     <div>
//                       <img className="club-logo" alt="" style={{ height: 25, width: 25 }}
//                         src="https://upload.wikimedia.org/wikipedia/vi/1/1d/Manchester_City_FC_logo.svg" />
//                       <span>Manchester City</span>
//                     </div>
//                   </div>
//                   <div
//                     className="border-start p-3 d-flex flex-column justify-content-center align-items-center">
//                     <span className="fs-8 text-secondary">20/01</span>
//                     <span className="fs-8 text-secondary">19:00</span>
//                     <span className="fs-8 text-secondary">Sân Hàng Đẫy</span>
//                   </div>
//                   <div className="remove-match p-3 bg-danger">
//                     <button className="text-muted"><DeleteIcon></DeleteIcon></button>
//                   </div>
//                 </div>
//               </div>
//             </div>

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

const combineDateTime = (date, hour, minute) => {
  const formattedDate = moment(date).format("YYYY-MM-DD");
  const formattedTime = moment().set({ hour, minute }).format("HH:mm:ss");

  const dateTime = `${formattedDate}T${formattedTime}.000Z`;
  return dateTime;
};

const submitAddMatch = async () => {
  let round = $("#roundAdd").val();
  let club1 = $("#club1Add").val();
  let club2 = $("#club2Add").val();
  let hour = $("#hourAdd").val();
  let minute = $("#minuteAdd").val();
  let date = $("#dateAdd").val();
  let stadium = $("#stadiumMatchAdd").val();
  let idSeason = localStorage.getItem("seasonIDSelected");

  const requestData = {
    round: round,
    datetime: combineDateTime(date, hour, minute),
    club1Id: club1,
    club2Id: club2,
    stadium: stadium,
    seasonId: idSeason
  };

  // const formData = new FormData();
  // formData.append("round", round);
  // formData.append("datetime", combineDateTime(date, hour, minute));
  // formData.append("club1Id", club1);
  // formData.append("club2Id", club2);
  // formData.append("stadium", stadium);
  // formData.append("seasonId", idSeason);


  await fetch("http://127.0.0.1:5000/api/match/create", {
    method: "POST",
    body: JSON.stringify(requestData),
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
  })
    .then((result) => { })
    .catch((error) => { });
  // window.location.reload(false);
};

const submitUpdateMatch = async () => {
  let round = $("#roundUpdate").val();
  let club1 = $("#club1Update").val();
  let club2 = $("#club2Update").val();
  let hour = $("#hourUpdate").val();
  let minute = $("#minuteUpdate").val();
  let date = $("#dateUpdate").val();
  let idSeason = localStorage.getItem("seasonIDSelected");
  let idMatch = localStorage.getItem("matchUpdateSelected");
  console.log(idMatch);
  const requestData = {
    round: round,
    datetime: combineDateTime(date, hour, minute),
    club1Id: club1,
    club2Id: club2,
    seasonId: idSeason,
    _id: idMatch
  };

  await fetch("http://127.0.0.1:5000/api/match/update", {
    method: "POST",
    body: JSON.stringify(requestData),
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
  })
    .then((result) => { })
    .catch((error) => { });
  // window.location.reload(false);
};

const deleteMatch = async () => {
  // const id = localStorage.getItem("clubDeleteSelected");
  const id = localStorage.getItem("matchDeleteSelected");
  const requestData = {
    // clubId: id,
    matchId: id
  }


  await fetch("http://127.0.0.1:5000/api/match/delete", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify(requestData),
  })
    .then((result) => {
      window.location.reload(false);
    })
    .catch((error) => { });
};

function AllCalendar() {
  const [round, setRound] = useState("Tất cả");
  const [totalRound, setTotalRound] = useState(1);

  const id = localStorage.getItem("seasonIDSelected");
  const [listRound, setListRound] = useState(null);
  const formatDate = (dateString) => {
    return moment.utc(dateString).format("DD-MM-YYYY");
  };

  const tachNgayGio = (dateTimeString) => {
    const formattedDateTime = moment.utc(dateTimeString).format("HH:mm");
    return formattedDateTime;
  };

  const [listTeam, setListTeam] = useState([]);
  const id1 = localStorage.getItem("seasonIDSelected");
  useEffect(() => {


    axios.get(API1, {
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json',
      },
      params: {
        seasonId: id
      }

    }).
      then(response => {
        setListTeam(response.data.data);
        console.log(response.data.data)

      }).catch(err => {
      })


  }, [])

  const handleRoundChange = (event) => {
    const newRound = event.target.value;
    setRound(newRound);
  };
  useEffect(() => {
    axios
      .get(API, {
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
        params: {
          seasonId: id
        }
      })
      .then((response) => {
        setListRound(response.data.data.matches);
        setTotalRound(response.data.data.numberOfRound);
        console.log(response.data.data);
      })
      .catch((err) => { });
  }, []);
  const [api, contextHolder] = notification.useNotification();

  const roundOptions = Array.from({ length: totalRound }, (_, index) => index + 1);
  const openNotificationWithIcon1 = (type) => {
    api[type]({
      message: type === "success" ? "Thêm thành công" : "Vui lòng điền đủ thông tin",
    });
  };
  const openNotificationWithIcon2 = (type) => {
    api[type]({
      message: "Xóa thành công",
    });
  };

  return (
    <div className="contentUser">
      <Content />
      <div className="main-wrapper">
        <div className="d-flex flex-column gap-4 p-4">
          <h5 className="m-0">Trận đấu</h5>
          <div className="m-auto bg-white shadow-sm rounded-2" style={{ width: 800 }}>
            <div className="p-4">

              <div className="round-select input-group" style={{ width: 180, }} >
                <label className="input-group-text" htmlFor="inputGroupSelect01">Vòng đấu</label>
                <select className="form-select" id="inputGroupSelect01" value={round} onChange={handleRoundChange}>
                  <option value="Tất cả">Tất cả</option>

                  {roundOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                <button className="btn btn-success " data-bs-toggle="modal" style={{ marginTop: "15px" }}
                  data-bs-target="#add-match-modal"><AddIcon></AddIcon> Thêm trận
                  đấu</button>
                <div className="modal fade" id="add-match-modal" tabIndex="-1" aria-hidden="true">
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header px-4">
                        <h1 className="modal-title fs-6" id="exampleModalLabel">Biểu mẫu thêm trận đấu
                        </h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"
                          aria-label="Close"></button>
                      </div>
                      <div className="modal-body px-4">
                        <form>
                          <div className="d-flex flex-column gap-3">
                            <div>
                              <label className="fs-8 mb-1">Vòng</label>
                              <div className="input-group">
                                <input type="number" className="form-control" value="1" id="roundAdd"
                                />
                              </div>
                            </div>
                            <div>
                              <label className="fs-8 mb-1">Đội bóng 1</label>
                              <select className="form-select" aria-label="Default select example" id="club1Add">

                                <option defaultValue="">Chọn đội bóng</option>
                                {listTeam.map((i, index) => (

                                  <option value={i._id} key={`match_club_${index}`}>{i.name}</option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <label className="fs-8 mb-1">Đội bóng 2</label>
                              <select className="form-select" aria-label="Default select example" id="club2Add">
                                <option defaultValue="">Chọn đội bóng</option>
                                {listTeam.map((i, index) => (

                                  <option value={i._id} key={`match_club_${index}`}>{i.name}</option>
                                ))}
                              </select>
                            </div>

                            <div className="d-flex gap-3">
                              <div>
                                <label className="fs-8 mb-1">Giờ</label>
                                <div className="input-group">
                                  <input type="number" className="form-control" defaultValue="1" id="hourAdd" />
                                </div>
                              </div>
                              <div>
                                <label className="fs-8 mb-1">Phút</label>
                                <div className="input-group">
                                  <input type="number" className="form-control" defaultValue="1" id="minuteAdd" />
                                </div>
                              </div>
                              <div>
                                <label className="fs-8 mb-1">Ngày</label>
                                <div className="input-group">
                                  <input type="date" className="form-control" id="dateAdd" />
                                </div>
                              </div>
                            </div>
                            <div>
                              <label className="fs-8 mb-1">Sân đấu</label>
                              <div className="input-group">
                                <input type="text" className="form-control" id="stadiumMatchAdd" />
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                      <div className="modal-footer py-2 px-4">
                        <button type="button" className="btn btn-light"
                          data-bs-dismiss="modal">Hủy</button>
                        {contextHolder}
                        <button type="button" className="btn btn-primary" onClick={() => {
                          let round = $("#roundAdd").val();
                          let club1 = $("#club1Add").val();
                          let club2 = $("#club2Add").val();
                          let hour = $("#hourAdd").val();
                          let minute = $("#minuteAdd").val();
                          let date = $("#dateAdd").val();
                          let stadium = $("#stadiumMatchAdd").val();


                          if (
                            round === "" ||
                            club1 === "" ||
                            club2 === "" ||
                            hour === "" ||
                            minute === "" ||
                            date === "" ||
                            stadium === ""

                          ) {
                            openNotificationWithIcon1("error");

                            return;
                          } else {
                            openNotificationWithIcon1("success");
                            submitAddMatch();
                          }
                        }}>Đăng ký</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr className="m-0" />
            <div className="d-flex flex-column py-4">


              {/* <h6 className="m-0 px-4 py-2 fs-8 text-secondary">Vòng: {i.round}</h6> */}
              <div className="row row-cols-2 g-0 px-4">
                {listRound?.map((i, index) => (
                  i.round.toString() === round && (<div className="round" key={`round_${index}`}>
                    <div className="col">
                      <div className="match d-flex border">
                        <div
                          className="d-flex flex-column justify-content-center gap-2 flex-grow-1 p-3">
                          <div className={i.result?.club1 > i.result?.club2 ? "club-win" : "club-lose"}>
                            <img className="club-logo" alt=""
                              src={`http://localhost:5000${i.club1?.logo}`} />
                            <span>{i.club1.name}</span>
                            {/* <span className="goal float-end">{i.result?.club1}</span> */}
                          </div>
                          <div className={i.result?.club1 < i.result?.club2 ? "club-win" : "club-lose"}>
                            <img className="club-logo" alt=""
                              src={`http://localhost:5000${i.club2?.logo}`} />
                            <span>{i.club2.name}</span>
                            {/* <span className="goal float-end">{i.result?.club2}</span> */}
                          </div>
                        </div>
                        <div
                          className="border-start p-3 d-flex flex-column justify-content-center align-items-center">
                          <div className="fs-8">{formatDate(i.datetime)}</div>
                          <div className="fs-8">{tachNgayGio(i.datetime)}</div>
                        </div>
                        <div className="remove-match p-3 bg-danger">
                          <button className="text-muted" onClick={() => {
                            openNotificationWithIcon2("success");
                            localStorage.setItem("matchDeleteSelected", i._id);
                            deleteMatch();

                          }}><DeleteIcon></DeleteIcon></button>
                        </div>
                      </div>
                    </div>


                  </div>
                  )


                ))}
                {listRound?.map((i, index) => (
                  round === "Tất cả" && (<div className="round" key={`round_${index}`}>
                    <div className="col">
                      <div className="match d-flex border">
                        <div
                          className="d-flex flex-column justify-content-center gap-2 flex-grow-1 p-3">
                          <div className={i.result?.club1 > i.result?.club2 ? "club-win" : "club-lose"}>
                            <img className="club-logo" alt=""
                              src={`http://localhost:5000${i.club1?.logo}`} />
                            <span>{i.club1.name}</span>
                            {/* <span className="goal float-end">{i.result?.club1}</span> */}
                          </div>
                          <div className={i.result?.club1 < i.result?.club2 ? "club-win" : "club-lose"}>
                            <img className="club-logo" alt=""
                              src={`http://localhost:5000${i.club2?.logo}`} />
                            <span>{i.club2.name}</span>
                            {/* <span className="goal float-end">{i.result?.club2}</span> */}
                          </div>
                        </div>
                        <div
                          className="border-start p-3 d-flex flex-column justify-content-center align-items-center">
                          <div className="fs-8">{formatDate(i.datetime)}</div>
                          <div className="fs-8">{tachNgayGio(i.datetime)}</div>
                        </div>
                        <div className="remove-match p-3 bg-danger">
                          <button className="text-muted" onClick={() => {
                            openNotificationWithIcon2("success");
                            localStorage.setItem("matchDeleteSelected", i._id);
                            deleteMatch();

                          }}><DeleteIcon></DeleteIcon></button>
                        </div>
                      </div>
                    </div>


                  </div>
                  )


                ))}
              </div>


            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContentPreview() {
  const [avatar, setAvatar] = useState();

  const handlePreviewAvatar = (e) => {
    const file = e.target.files[0];
    file.preview = URL.createObjectURL(file);

    setAvatar(file);
  };

  return (
    <>
      {/* {!avatar && (
        <img
          style={{
            marginTop: 8,
            marginLeft: "10px",
            height: "290px",
            marginBottom: "10px",
          }}
          src={listAccount.image}
          alt=""
          width="80%"
        />
      )} */}

      {avatar && (
        <img
          style={{
            marginTop: 8,

            height: "140px",
            marginBottom: "10px",
          }}
          src={avatar.preview}
          alt=""
          width="50%"
        />
      )}
      <div>
        <input type="file" onChange={handlePreviewAvatar} id="contentPDF" />
      </div>
    </>
  );
}

function AddMatch() {
  const [round, setRound] = useState("Tất cả");
  const [totalRound, setTotalRound] = useState(1);
  const [api, contextHolder] = notification.useNotification();

  const [listTeam, setListTeam] = useState([]);
  useEffect(() => {


    axios.get(API1, {
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json',
      },
      params: {
        seasonId: id
      }

    }).
      then(response => {
        setListTeam(response.data.data);
        console.log(response.data.data)

      }).catch(err => {
      })


  }, [])

  const openNotificationWithIcon1 = (type) => {
    api[type]({
      message: type === "success" ? "Thêm thành công" : "Vui lòng điền đủ thông tin",
    });
  };
  const openNotificationWithIcon2 = (type) => {
    api[type]({
      message: "Xóa thành công",
    });
  };
  const id = localStorage.getItem("seasonIDSelected");
  const [listRound, setListRound] = useState(null);
  const formatDate = (dateString) => {
    return moment.utc(dateString).format("DD-MM-YYYY");
  };

  const tachNgayGio = (dateTimeString) => {
    const formattedDateTime = moment.utc(dateTimeString).format("HH:mm");
    return formattedDateTime;
  };


  const handleRoundChange = (event) => {
    const newRound = event.target.value;
    setRound(newRound);
  };
  // useEffect(() => {
  //   axios
  //     .get(API, {
  //       headers: {
  //         "content-type": "application/json",
  //         accept: "application/json",
  //       },
  //       params: {
  //         seasonId: id
  //       }
  //     })
  //     .then((response) => {
  //       setListRound(response.data.data.matches);
  //       setTotalRound(response.data.data.numberOfRound);
  //       console.log(response.data.data);
  //     })
  //     .catch((err) => { });
  // }, []);

  useEffect(() => {
    axios
      .get(API, {
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
        params: {
          seasonId: id,
          result: true
        }
      })
      .then((response) => {
        setListRound(response.data.data.matches);
        setTotalRound(response.data.data.numberOfRound);
        console.log(response.data.data);
      })
      .catch((err) => { });
  }, []);

  const roundOptions = Array.from({ length: totalRound }, (_, index) => index + 1);

  const extractDate = (datetime) => {
    const datePart = datetime?.split("T")[0];
    return datePart;
  };

  const extractHour = (datetime) => {
    const timePart = datetime?.split("T")[1];
    const hour = timePart?.split(":")[0];
    return hour;
  };

  const extractMinute = (datetime) => {
    const timePart = datetime?.split("T")[1];
    const minute = timePart?.split(":")[1];
    return minute;
  };

  const navigate = useNavigate();
  const handleOnClick = useCallback(
    () => navigate("../edit", { replace: true }),
    [navigate]
  );
  const handleOnClick1 = useCallback(
    () => navigate("../info", { replace: true }),
    [navigate]
  );
  return (
    <div className="contentUser">
      <Content />
      <div className="main-wrapper">
        <div className="d-flex flex-column gap-4 p-4">
          <h5 className="m-0">Trận đấu</h5>
          <div className="m-auto bg-white shadow-sm rounded-2" style={{ width: 800 }}>
            <div className="p-4">
              <div className="round-select input-group" style={{ width: 180 }}>
                <label className="input-group-text" htmlFor="inputGroupSelect01">Vòng đấu</label>
                <select className="form-select" id="inputGroupSelect01" value={round} onChange={handleRoundChange}>
                  <option value="Tất cả">Tất cả</option>

                  {roundOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>
            <hr className="m-0" />
            <div className="d-flex flex-column py-4">


              {/* <h6 className="m-0 px-4 py-2 fs-8 text-secondary">Vòng: {i.round}</h6> */}
              <div className="row row-cols-2 g-0 px-4">
                {listRound?.map((i, index) => (
                  i.round.toString() === round && (<div className="round" key={`round_${index}`}>
                    <div className="col">
                      <div className="match d-flex border">
                        <div
                          className="d-flex flex-column justify-content-center gap-2 flex-grow-1 p-3">
                          <div className={i.result?.club1 > i.result?.club2 ? "club-win" : "club-lose"}>
                            <img className="club-logo" alt=""
                              src={`http://localhost:5000${i.club1?.logo}`} />
                            <span>{i.club1.name}</span>
                            <span className="goal float-end">{i.result?.club1}</span>
                          </div>
                          <div className={i.result?.club1 < i.result?.club2 ? "club-win" : "club-lose"}>
                            <img className="club-logo" alt=""
                              src={`http://localhost:5000${i.club2?.logo}`} />
                            <span>{i.club2.name}</span>
                            <span className="goal float-end">{i.result?.club2}</span>
                          </div>
                        </div>
                        <div
                          className="border-start p-3 d-flex flex-column justify-content-center align-items-center">
                          <div className="fs-8">{formatDate(i.datetime)}</div>
                          <div className="fs-8">{tachNgayGio(i.datetime)}</div>
                        </div>
                        <div className="update-match p-3 bg-success">
                          <button className="text-light" onClick={() => {
                            // setMatchUpdateSelected(i._id);
                            localStorage.setItem("matchSelected", i._id);

                            handleOnClick1();

                          }}><EditNoteIcon ></EditNoteIcon></button>
                        </div>
                        {/* <div className="modal fade" id="update-match-modal" tabIndex="-1" aria-hidden="true">
                          <div className="modal-dialog">
                            <div className="modal-content">
                              <div className="modal-header px-4">
                                <h1 className="modal-title fs-6" id="exampleModalLabel">Biểu mẫu sửa trận đấu
                                </h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal"
                                  aria-label="Close"></button>
                              </div>
                              <div className="modal-body px-4">
                                <form>
                                  <div className="d-flex flex-column gap-3">
                                    <div>
                                      <label className="fs-8 mb-1">Vòng</label>
                                      <div className="input-group">
                                        <input type="number" className="form-control" defaultValue={match?.round} id="roundUpdate"
                                        />
                                      </div>
                                    </div>
                                    <div>
                                      <label className="fs-8 mb-1">Đội bóng 1</label>
                                      <select className="form-select" aria-label="Default select example" id="club1Update">

                                        <option value={match?.club1?._id}>{match?.club1?.name}</option>
                                        {listTeam.map((i, index) => (

                                          <option value={i._id} key={`match_club_${index}`}>{i.name}</option>
                                        ))}
                                      </select>
                                    </div>
                                    <div>
                                      <label className="fs-8 mb-1">Đội bóng 2</label>
                                      <select className="form-select" aria-label="Default select example" id="club2Update">
                                        <option value={match?.club2?._id}>{match?.club2?.name}</option>
                                        {listTeam.map((i, index) => (

                                          <option value={i._id} key={`match_club_${index}`}>{i.name}</option>
                                        ))}
                                      </select>
                                    </div>

                                    <div className="d-flex gap-3">
                                      <div>
                                        <label className="fs-8 mb-1">Giờ</label>
                                        <div className="input-group">
                                          <input type="number" className="form-control" defaultValue={extractHour(match?.datetime)} id="hourUpdate" />
                                        </div>
                                      </div>
                                      <div>
                                        <label className="fs-8 mb-1">Phút</label>
                                        <div className="input-group">
                                          <input type="number" className="form-control" defaultValue={extractMinute(match?.datetime)} id="minuteUpdate" />
                                        </div>
                                      </div>
                                      <div>
                                        <label className="fs-8 mb-1">Ngày</label>
                                        <div className="input-group">
                                          <input type="date" className="form-control" defaultValue={extractDate(match?.datetime)} id="dateUpdate" />
                                        </div>
                                      </div>
                                    </div>
                                    {/* <div>
                                      <label className="fs-8 mb-1">Sân đấu</label>
                                      <div className="input-group">
                                        <input type="text" className="form-control" id="stadiumMatchUpdate" />
                                      </div>
                                    </div> */}
                        {/* </div> */}
                        {/* </form> */}
                        {/* </div> */}
                        {/* <div className="modal-footer py-2 px-4">
                                <button type="button" className="btn btn-light"
                                  data-bs-dismiss="modal">Hủy</button>
                                {contextHolder}
                                <button type="button" className="btn btn-primary" onClick={() => {

                                  let round = $("#roundUpdate").val();
                                  let club1 = $("#club1Update").val();
                                  let club2 = $("#club2Update").val();
                                  let hour = $("#hourUpdate").val();
                                  let minute = $("#minuteUpdate").val();
                                  let date = $("#dateUpdate").val();
                                  // let stadium = $("#stadiumMatchUpdate").val();


                                  if (
                                    round === "" ||
                                    club1 === "" ||
                                    club2 === "" ||
                                    hour === "" ||
                                    minute === "" ||
                                    date === ""

                                  ) {
                                    openNotificationWithIcon1("error");

                                    return;
                                  } else {
                                    openNotificationWithIcon1("success");
                                    submitUpdateMatch();
                                  }
                                }}>Sửa</button>
                              </div> */}
                        {/* </div> */}
                        {/* </div> */}
                        {/* </div> */}
                      </div>
                    </div>


                  </div>
                  )


                ))}
                {listRound?.map((i, index) => (
                  round === "Tất cả" && (<div className="round" key={`round_${index}`}>
                    <div className="col">
                      <div className="match d-flex border">
                        <div
                          className="d-flex flex-column justify-content-center gap-2 flex-grow-1 p-3">
                          <div className={i.result?.club1 > i.result?.club2 ? "club-win" : "club-lose"}>
                            <img className="club-logo" alt=""
                              src={`http://localhost:5000${i.club1?.logo}`} />
                            <span>{i.club1.name}</span>
                            <span className="goal float-end">{i.result?.club1}</span>
                          </div>
                          <div className={i.result?.club1 < i.result?.club2 ? "club-win" : "club-lose"}>
                            <img className="club-logo" alt=""
                              src={`http://localhost:5000${i.club2?.logo}`} />
                            <span>{i.club2.name}</span>
                            <span className="goal float-end">{i.result?.club2}</span>
                          </div>
                        </div>
                        <div
                          className="border-start p-3 d-flex flex-column justify-content-center align-items-center">
                          <div className="fs-8">{formatDate(i.datetime)}</div>
                          <div className="fs-8">{tachNgayGio(i.datetime)}</div>
                        </div>
                        <div className="update-match p-3 bg-success">
                          <button className="text-light" onClick={() => {
                            // setMatchUpdateSelected(i._id);
                            // console.log(i._id);
                            localStorage.setItem("matchSelected", i._id);

                            handleOnClick1();

                          }}><EditNoteIcon></EditNoteIcon></button>
                        </div>
                        {/* <div className="modal fade" id="update-match-modal" tabIndex="-1" aria-hidden="true">
                          <div className="modal-dialog">
                            <div className="modal-content">
                              <div className="modal-header px-4">
                                <h1 className="modal-title fs-6" id="exampleModalLabel">Biểu mẫu sửa trận đấu
                                </h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal"
                                  aria-label="Close"></button>
                              </div>
                              <div className="modal-body px-4">
                                <form>
                                  <div className="d-flex flex-column gap-3">
                                    <div>
                                      <label className="fs-8 mb-1">Vòng</label>
                                      <div className="input-group">
                                        <input type="number" className="form-control" defaultValue={match?.round} id="roundUpdate"
                                        />
                                      </div>
                                    </div>
                                    <div>
                                      <label className="fs-8 mb-1">Đội bóng 1</label>
                                      <select className="form-select" aria-label="Default select example" id="club1Update">

                                        <option value={match?.club1?._id}>{match?.club1?.name}</option>
                                        {listTeam.map((i, index) => (

                                          <option value={i._id} key={`match_club_${index}`}>{i.name}</option>
                                        ))}
                                      </select>
                                    </div>
                                    <div>
                                      <label className="fs-8 mb-1">Đội bóng 2</label>
                                      <select className="form-select" aria-label="Default select example" id="club2Update">
                                        <option value={match?.club2?._id}>{match?.club2?.name}</option>
                                        {listTeam.map((i, index) => (

                                          <option value={i._id} key={`match_club_${index}`}>{i.name}</option>
                                        ))}
                                      </select>
                                    </div>

                                    <div className="d-flex gap-3">
                                      <div>
                                        <label className="fs-8 mb-1">Giờ</label>
                                        <div className="input-group">
                                          <input type="number" className="form-control" defaultValue={extractHour(match?.datetime)} id="hourUpdate" />
                                        </div>
                                      </div>
                                      <div>
                                        <label className="fs-8 mb-1">Phút</label>
                                        <div className="input-group">
                                          <input type="number" className="form-control" defaultValue={extractMinute(match?.datetime)} id="minuteUpdate" />
                                        </div>
                                      </div>
                                      <div>
                                        <label className="fs-8 mb-1">Ngày</label>
                                        <div className="input-group">
                                          <input type="date" className="form-control" defaultValue={extractDate(match?.datetime)} id="dateUpdate" />
                                        </div>
                                      </div>
                                    </div>
                                    {/* <div>
                                      <label className="fs-8 mb-1">Sân đấu</label>
                                      <div className="input-group">
                                        <input type="text" className="form-control" id="stadiumMatchUpdate" />
                                      </div>
                                    </div> */}
                        {/* </div>
                                </form>
                              </div>
                              <div className="modal-footer py-2 px-4">
                                <button type="button" className="btn btn-light"
                                  data-bs-dismiss="modal">Hủy</button>
                                {contextHolder}
                                <button type="button" className="btn btn-primary" onClick={() => {
                                  let round = $("#roundUpdate").val();
                                  let club1 = $("#club1Update").val();
                                  let club2 = $("#club2Update").val();
                                  let hour = $("#hourUpdate").val();
                                  let minute = $("#minuteUpdate").val();
                                  let date = $("#dateUpdate").val();
                                  // let stadium = $("#stadiumMatchUpdate").val();


                                  if (
                                    round === "" ||
                                    club1 === "" ||
                                    club2 === "" ||
                                    hour === "" ||
                                    minute === "" ||
                                    date === ""

                                  ) {
                                    openNotificationWithIcon1("error");

                                    return;
                                  } else {
                                    openNotificationWithIcon1("success");
                                    submitUpdateMatch();
                                  }
                                }}>Sửa</button>
                              </div>
                            </div>
                          </div> */}
                        {/* </div> */}
                      </div>
                    </div>


                  </div>
                  )


                ))}
              </div>


            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const submitAddGoal = async () => {
  let clubID = localStorage.getItem("clubIDGoal");
  let matchid = localStorage.getItem("matchSelected");
  let idSeason = localStorage.getItem("seasonIDSelected");

  let playerGoal = $("#playerGoal").val();
  let type = $("#typeGoal").val();
  let minute = $("#minuteGoal").val();
  let assistGoal = $("#assistGoal").val();
  const requestData = {
    matchId: matchid,

    goal: {
      assistedPlayerId: assistGoal,
      clubId: clubID,
      scoredPlayerId: playerGoal,
      seasonId: idSeason,
      time: parseInt(minute),
      type: type
    }
  };

  await fetch("http://127.0.0.1:5000/api/match/add-goal", {
    method: "POST",
    body: JSON.stringify(requestData),
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
  })
    .then((result) => { })
    .catch((error) => { });
  // window.location.reload(false);
};

function EditMatch() {
  const navigate = useNavigate();
  const handleOnClick = useCallback(
    () => navigate("../all", { replace: true }),
    [navigate]
  );
  const handleOnClick1 = useCallback(
    () => navigate("../info", { replace: true }),
    [navigate]
  );
  const [match, setMatch] = useState(null);
  const [matchID, setMatchID] = useState(null);

  const matchid = localStorage.getItem("matchSelected");
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type) => {
    api[type]({
      message: "Chọn mùa giải thành công",
    });
  };
  const openNotificationWithIcon1 = (type) => {
    api[type]({
      message: type === "success" ? "Thêm thành công" : "Vui lòng điền đủ thông tin",
    });
  };
  const openNotificationWithIcon2 = (type) => {
    api[type]({
      message: "Xóa thành công",
    });
  };
  useEffect(() => {
    if (matchid !== null) {
      axios
        .get(`${API}/${matchid}`, {
          headers: {
            "content-type": "application/json",
            accept: "application/json",
          },
        })
        .then((response) => {
          console.log(response.data.data);
          setMatch(response.data.data)
        })
        .catch((err) => {
          // Xử lý lỗi khi gọi API
        });
    }
  }, []);
  const [selectedClub, setSelectedClub] = useState(1); // Giá trị ban đầu của selectedClub

  // Hàm xử lý khi radio box thay đổi
  const handleClubChange = (event) => {
    setSelectedClub(Number(event.target.value)); // Chuyển đổi giá trị sang kiểu số
  };

  return (
    <div className="contentUser">
      <Content />
      <div className="main-wrapper">


        <div className="d-flex flex-column gap-4 p-4">
          <h5 className="m-0">Chi tiết trận đấu</h5>
          <div className="m-auto bg-white shadow-sm rounded-2" style={{ width: 800 }}>
            <div className="p-4">
              <h6 className="text-secondary fs-7">
                <button className="back-btn fw-semibold  fs-8" onClick={() => {
                  handleOnClick();
                }}><ArrowCircleLeftSharpIcon></ArrowCircleLeftSharpIcon></button>
                <br />
                <br />
                Vòng: {match?.round}
              </h6>
              <div className="d-flex justify-content-around">
                <div className="match-detail-club order-1">
                  <img alt="" style={{ width: 80, height: 80 }}
                    src={`http://localhost:5000/${match?.club1?.image}`} />
                  <div className="fs-7">{match?.club1?.name}</div>
                </div>
                <div className="match-detail-club order-5">
                  <img alt="" style={{ width: 80, height: 80 }}
                    src={`http://localhost:5000/${match?.club2?.image}`} />
                  <div className="fs-7">{match?.club2?.name}</div>
                </div>
                <div className="club-goal order-2 fs-1">{match?.result?.club1}</div>
                <div className="club-goal order-4 fs-1">{match?.result?.club2}</div>
                <div className="order-3 fs-1">-</div>
              </div>
              <hr />
              <div className="d-flex flex-column gap-2">
                {match?.goals?.map((i, index) => (
                  <div className={`goal border ${i?.club === 1 ? 'club1' : 'club2'}`} aria-label={`club${i?.club}`}>
                    <div className={`d-flex gap-2 align-items-center p-2 ${i?.club === 1 ? '' : 'flex-row-reverse'}`}>
                      <i className="fa-regular fa-futbol"><SportsSoccerIcon /></i>
                      <span className="fs-7">
                        {i.scoredPlayer}({i.type})
                        "{i.time}
                      </span>
                    </div>
                    <button className="remove-btn bg-danger px-2">
                      <i className="fa-solid fa-trash-can"><DeleteIcon /></i>
                    </button>
                  </div>
                ))}

                {match?.cards?.map((i, index) => (

                  <div className={`goal border ${i?.club === 1 ? 'club1' : 'club2'}`} aria-label={`club${i?.club}`}>
                    <div className={`d-flex gap-2 align-items-center p-2 ${i?.club === 1 ? '' : 'flex-row-reverse'}`}>
                      <i className="text-danger fa-solid fa-mobile text-red"><SellIcon></SellIcon></i>
                      <span className="fs-7"> {i.playerName} "{i.time}</span>
                    </div>
                    <button className="remove-btn bg-danger px-2"><i
                      className="fa-solid fa-trash-can"><DeleteIcon></DeleteIcon></i></button>
                  </div>

                ))}

              </div>
              <hr />
              <div className="d-flex flex-row-reverse gap-2">
                <button className="btn btn-primary" data-bs-toggle="modal"
                  data-bs-target="#add-goal-modal">Thêm bàn thắng</button>
                <button className="btn btn-primary" data-bs-toggle="modal"
                  data-bs-target="#add-card-modal">Thêm thẻ đỏ</button>
              </div>
              <div className="modal fade" id="add-goal-modal" tabindex="-1"
                aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1 className="modal-title fs-6">Thêm bàn thắng</h1>
                      <button type="button" className="btn-close" data-bs-dismiss="modal"
                        aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                      <div className="d-flex flex-column px-2 gap-3">
                        <div className="d-flex justify-content-between py-4">
                          <div className="form-check">
                            <input className="form-check-input" type="radio" name="clubId" id="club1Goal"
                              value={1}
                              checked={selectedClub === 1}
                              onChange={handleClubChange} />
                            <label className="form-check-label">
                              Đội bóng 1
                            </label>
                          </div>
                          <div className="form-check">
                            <input className="form-check-input" type="radio" name="clubId" id="club2Goal" value={2}
                              checked={selectedClub === 2}
                              onChange={handleClubChange} />
                            <label className="form-check-label">
                              Đội bóng 2
                            </label>
                          </div>
                        </div>
                        <div>
                          <label className="fs-8 mb-1">Cầu thủ ghi bàn</label>
                          <select className="form-select" aria-label="Default select example" id="playerGoal">
                            <option selected value="">Chọn cầu thủ</option>
                            {selectedClub === 1 &&
                              match?.club1?.players.map((player) => (
                                <option value={player.playerId} key={player.playerId}>
                                  {player.name}
                                </option>
                              ))}
                            {selectedClub === 2 &&
                              match?.club2?.players.map((player) => (
                                <option value={player.playerId} key={player.playerId}>
                                  {player.name}
                                </option>
                              ))}
                          </select>
                        </div>
                        <div className="d-flex gap-3">
                          <div>
                            <label className="fs-8 mb-1">Loại bàn thắng</label>
                            <select className="form-select" aria-label="Default select example" id="typeGoal">
                              <option selected value="">Chọn bàn thắng</option>
                              <option value="N">Thông thường</option>
                              <option value="P">Penalty</option>
                              <option value="O">Phản lưới</option>
                            </select>
                          </div>
                          <div>
                            <label className="fs-8 mb-1">Phút</label>
                            <div className="input-group">
                              <input type="number" className="form-control" defaultValue="0" id="minuteGoal" />
                            </div>
                          </div>
                        </div>
                        <div>
                          <label className="fs-8 mb-1">Cầu thủ kiến tạo</label>
                          <select className="form-select" aria-label="Default select example" id="assistGoal">
                            <option selected value="">Chọn cầu thủ</option>
                            {selectedClub === 1 &&
                              match?.club1?.players.map((player) => (
                                <option value={player.playerId} key={player.playerId}>
                                  {player.name}
                                </option>
                              ))}
                            {selectedClub === 2 &&
                              match?.club2?.players.map((player) => (
                                <option value={player.playerId} key={player.playerId}>
                                  {player.name}
                                </option>
                              ))}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn light fs-7"
                        data-bs-dismiss="modal">Hủy</button>
                      {contextHolder}

                      <button type="button" className="btn btn-primary fs-7" onClick={() => {

                        let playerGoal = $("#playerGoal").val();
                        let type = $("#typeGoal").val();
                        let minute = $("#minuteGoal").val();
                        let assistGoal = $("#assistGoal").val();
                        if (selectedClub === "1") {
                          localStorage.setItem("clubIDGoal", match?.club1?._id);
                        }
                        else {
                          localStorage.setItem("clubIDGoal", match?.club2?._id);

                        }

                        if (

                          playerGoal === "" ||
                          minute === "" ||
                          type === "" ||
                          assistGoal === ""

                        ) {
                          openNotificationWithIcon1("error");

                          return;
                        } else {
                          openNotificationWithIcon1("success");
                          submitAddGoal();
                        }
                      }}>Lưu</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal fade" id="add-card-modal" tabindex="-1"
                aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1 className="modal-title fs-6">Thêm thẻ đỏ</h1>
                      <button type="button" className="btn-close" data-bs-dismiss="modal"
                        aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                      <div className="d-flex flex-column px-2 gap-3">
                        <div className="d-flex justify-content-between py-4">
                          <div className="form-check">
                            <input className="form-check-input" type="radio" name="clubId" id="club1Card"
                              value={1}
                              checked={selectedClub === 1}
                              onChange={handleClubChange} />
                            <label className="form-check-label">
                              Đội bóng 1
                            </label>
                          </div>
                          <div className="form-check">
                            <input className="form-check-input" type="radio" name="clubId" id="club2Card"
                              value={2}
                              checked={selectedClub === 2}
                              onChange={handleClubChange} />
                            <label className="form-check-label">
                              Đội bóng 2
                            </label>
                          </div>
                        </div>
                        <div>
                          <label className="fs-8 mb-1">Cầu thủ nhận thẻ</label>
                          <select className="form-select" aria-label="Default select example" id="playerCard">
                            <option selected>Chọn cầu thủ</option>
                            {selectedClub === 1 &&
                              match?.club1?.players.map((player) => (
                                <option value={player.playerId} key={player.playerId}>
                                  {player.name}
                                </option>
                              ))}
                            {selectedClub === 2 &&
                              match?.club2?.players.map((player) => (
                                <option value={player.playerId} key={player.playerId}>
                                  {player.name}
                                </option>
                              ))}
                          </select>
                        </div>
                        <div>
                          <label className="fs-8 mb-1">phút</label>
                          <div className="input-group">
                            <input type="number" className="form-control" id="minuteCard" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-light fs-7"
                        data-bs-dismiss="modal">Hủy</button>
                      <button type="button" className="btn btn-primary fs-7">Thêm</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Content(props) {
  const [league, setLeague] = useState("");
  const name = localStorage.getItem("seasonNameSelected");
  useEffect(() => {
    setLeague(name);
  }, []);
  return (
    <div>
      <header className="header d-flex flex-column justify-content-center px-4">
        <h5 className="m-0 fw-semibold text-uppercase">{league}</h5>
      </header>
    </div>
  );
}

export default MyCalendar;
