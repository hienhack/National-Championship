import React, { useState, useEffect, useCallback } from "react";
import { Navigate, Routes, Route, useNavigate } from "react-router-dom";
import $ from "jquery";
import axios from "axios"
import "../../style/myteam.css";
import { Col, Row } from "antd";
import moment from "moment";
import { notification } from "antd";

import "../../css/style.css";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeleteIcon from '@mui/icons-material/Delete';
import BuildIcon from '@mui/icons-material/Build';
import muImage from "../../assets/imgs/mu.png";
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';

const API = 'http://127.0.0.1:5000/api/player'
const API1 = 'http://127.0.0.1:5000/api/club'

function MyTeam() {
  return (
    <Routes>
      <Route index element={<Navigate to="all" replace />} />
      <Route path="info" element={<InfoPlayer />} />

      <Route path="all" element={<AllPlayer />} />
      <Route path="add" element={<AddPlayer />} />

    </Routes>
  );
}

const deletePlayer = async () => {
  // const id = localStorage.getItem("clubDeleteSelected");
  const id1 = localStorage.getItem("seasonIDSelected");
  const idPlayer = localStorage.getItem("playerDeleteSelected");
  const requestData = {
    // clubId: id,
    seasonId: id1,
    playerId: idPlayer
  }


  await fetch("http://127.0.0.1:5000/api/player/delete", {
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

function AllPlayer() {
  const [listPlayer, setListPlayer] = useState([]);
  const id = localStorage.getItem("seasonIDSelected");
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


    axios.get(API, {
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json',
      },
      params: {
        seasonId: id
      }

    }).
      then(response => {
        setListPlayer(response.data.data)
        console.log(response.data.data)

      }).catch(err => {
      })


  }, [])

  const navigate = useNavigate();
  const handleOnClick = useCallback(
    () => navigate("../add", { replace: true }),
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
          <h5 className="m-0">Danh sách cầu thủ</h5>
          <div className="bg-white rounded-2">
            <div className="d-flex flex-column gap-4 p-4">
              <div className="d-flex justify-content-between">
                <form role="search">
                  <div className="d-flex gap-2" style={{ width: "400px" }}>
                    <div className="input-group">
                      <input type="text" className="form-control" />
                    </div>
                    <button className="text-white p-2 rounded-2 bg-primary">search</button>
                  </div>
                </form>
                <div className="d-flex gap-3 align-items-center">
                  <h6 className="text-secondary m-0">Số dòng</h6>
                  <select className="form-select" style={{ width: "100px" }}>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                  </select>
                </div>
              </div>
              <table className="table table-hover play-list-table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Ảnh</th>
                    <th scope="col">Họ tên</th>
                    <th scope="col">Vị trí</th>
                    <th scope="col">Quốc tịch</th>
                    <th scope="col">Hoạt động</th>
                  </tr>
                </thead>
                <tbody className="table-group-divider">
                  {listPlayer.map((i, index) => (

                    <tr key={`player_${index}`}>
                      <th style={{ verticalAlign: "middle" }} scope="row">{index + 1}</th>
                      <td>
                        <img className="avatar img-thumbnail" alt=""
                          src={`http://localhost:5000${i.image}`}>
                        </img>
                      </td>
                      <td>{i.name}</td>
                      <td>{i.position}</td>
                      <td>{i.nationality}</td>
                      <td>
                        <button className="btn btn-light" title="Xem thông tin" onClick={() => {
                          handleOnClick1();
                          localStorage.setItem("playerSelected", i._id);

                        }}><RemoveRedEyeIcon></RemoveRedEyeIcon></button>
                        {contextHolder}

                        <button className="btn btn-light" title="Xóa" onClick={() => {
                          openNotificationWithIcon2("success");
                          localStorage.setItem("playerDeleteSelected", i._id);
                          deletePlayer();

                        }}><DeleteIcon></DeleteIcon></button>
                        {/* <button className="btn  btn-light" title="Sửa thông tin" ><BuildIcon></BuildIcon></button> */}

                      </td>
                    </tr>
                  ))}

                </tbody>
              </table>
              <nav>
                <ul className="pagination float-end">
                  <li className="page-item">
                    <a className="page-link" href="#" aria-label="Previous">
                      <span aria-hidden="true">&laquo;</span>
                    </a>
                  </li>
                  <li className="page-item"><span className="page-link">1</span></li>
                  <li className="page-item"><span className="page-link">2</span></li>
                  <li className="page-item"><span className="page-link">3</span></li>
                  <li className="page-item">
                    <a className="page-link" href="#" aria-label="Next">
                      <span aria-hidden="true">&raquo;</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
}

function ContentPreviewAdd() {
  const [avatar, setAvatar] = useState();
  // const [club, setClub] = useState(null);
  // const idClub = localStorage.getItem("clubSelected");
  // const idSeason = localStorage.getItem("seasonIDSelected");

  // useEffect(() => {


  //   axios.get(`${API}/${idClub}/${idSeason}`, {
  //     headers: {
  //       'content-type': 'application/json',
  //       'accept': 'application/json',
  //     }
  //   }).
  //     then(response => {
  //       setClub(response.data.data);
  //       console.log(response.data.data)

  //     }).catch(err => {
  //     })


  // }, [])

  useEffect(() => {
    return () => avatar && URL.revokeObjectURL(avatar.preview);
  }, [avatar]);

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
            marginLeft: "70px",
            height: "290px",
            marginBottom: "10px",
          }}
          src="https://upload.wikimedia.org/wikipedia/vi/1/1d/Manchester_City_FC_logo.svg"
          alt=""
          width="80%"
        />
      )} */}

      {avatar && (
        <img
          style={{
            marginLeft: "60px",
            height: "290px",
            marginBottom: "10px",
            objectFit: "contain"
          }}
          src={avatar.preview}
          alt=""
          width="50%"
        />
      )}
      <div >
        <div className="input-group">
          <input type="file" className="form-control" onChange={handlePreviewAvatar} id="contentPDFAdd" />
        </div>
      </div>
    </>
  );
}

const submitAddPlayer = async () => {
  let name = $("#playerAdd").val();
  let dob = $("#dobAdd").val();
  let position = $("#positionAdd").val();
  let nationality = $("#nationalityAdd").val();
  let club = $("#clubAdd").val();
  let idSeason = localStorage.getItem("seasonIDSelected");
  let shirt = $("#shirtAdd").val();

  let content = $("#contentPDFAdd").prop("files")[0];

  console.log(content);
  const formData = new FormData();
  formData.append("name", name);
  formData.append("dob", moment(dob).toISOString());
  formData.append("position", position);
  formData.append("shirtNumber", shirt);
  formData.append("nationality", nationality);
  formData.append("clubId", club);
  formData.append("seasonId", idSeason);
  formData.append("image", content);

  await fetch("http://127.0.0.1:5000/api/player/create", {
    method: "POST",
    body: formData,
    headers: {
      "Accept": "application/json",
    },
  })
    .then((result) => { })
    .catch((error) => { });
  window.location.reload(false);
};

function AddPlayer() {
  const [listTeam, setListTeam] = useState([]);
  const [api, contextHolder] = notification.useNotification();

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

  return (
    <div className="contentUser">
      <Content />
      <div className="main-wrapper">


        <div className="d-flex flex-column gap-4 p-4">
          <h5 className="m-0">Đăng ký cầu thủ</h5>

          <div className="m-auto bg-white shadow rounded-2" style={{ width: 800 }}>
            {/* <div className="d-flex justify-content-between p-4">
              <div className="input-group w-50">
                <i className="fa-solid fa-magnifying-glass input-group-text pt-2"><SearchIcon></SearchIcon> </i>
                <input type="text" className="form-control" placeholder="Tìm cầu thủ các mùa trước..." />
              </div>
              {/* <button id="new-club-btn" className="fs-6 active" style={{ background: "#21e758", paddingRight: 5, borderRadius: 5, color: "white" }}><AddIcon></AddIcon> Đăng
                ký mới</button> */}
            {/* </div> */}
            {/* <hr className="m-0" />  */}
            <form>
              <div className="row g-4 p-4">
                <div className="col-6">
                  <div className="mb-3">
                    <label className="fs-8 mb-1">Ảnh chụp chân dung</label>

                  </div>

                  <ContentPreviewAdd></ContentPreviewAdd>

                </div>
                <div className="col-6">
                  <div className="d-flex flex-column gap-3">
                    <div>
                      <label className="fs-8 mb-1">Tên cầu thủ</label>
                      <div className="input-group">
                        <input type="text" className="form-control" id="playerAdd" />
                      </div>
                    </div>
                    <div>
                      <label className="fs-8 mb-1">Ngày sinh</label>
                      <div className="input-group">
                        <input type="date" className="form-control" id="dobAdd" />
                      </div>
                    </div>
                    <div>
                      <label className="fs-8 mb-1">Quốc tịch</label>
                      <div className="input-group">
                        <input type="text" className="form-control" id="nationalityAdd" />
                      </div>
                    </div>
                    <div>
                      <label className="fs-8 mb-1">Vị trí</label>
                      <select className="form-select" aria-label="Default select example" id="positionAdd">
                        <option defaultValue="">--- Chọn vị trí ---</option>
                        <option value="Hậu vệ">Hậu vệ</option>
                        <option value="Tiền vệ">Tiền vệ</option>
                        <option value="Tiền đạo">Tiền đạo</option>
                        <option value="Thủ môn">Thủ môn</option>

                      </select>
                    </div>
                    <div>
                      <label className="fs-8 mb-1">Số áo</label>
                      <div className="input-group">
                        <input type="number" className="form-control" id="shirtAdd" />
                      </div>
                    </div>
                    <div>
                      <label className="fs-8 mb-1">Đội bóng</label>
                      <select className="form-select" aria-label="Default select example" id="clubAdd">
                        <option defaultValue="">--- Chọn đội bóng ---</option>
                        {listTeam.map((i, index) => (

                          <option value={i._id} key={`player_club_${index}`}>{i.name}</option>
                        ))}

                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <hr className="m-0" />
              <div className="p-4">
                {contextHolder}

                <button className="btn btn-primary float-end d-block mb-4" onClick={() => {
                  let name = $("#playerAdd").val();
                  let dob = $("#dobAdd").val();
                  let position = $("#positionAdd").val();
                  let nationality = $("#nationalityAdd").val();
                  let club = $("#clubAdd").val();
                  let shirt = $("#shirtAdd").val();

                  let content = $("#contentPDFAdd").prop("files")[0];

                  if (
                    name === "" ||
                    dob === "" ||
                    position === "" ||
                    content === undefined ||
                    nationality === "" ||
                    club === "" ||
                    shirt === ""

                  ) {
                    openNotificationWithIcon1("error");

                    return;
                  } else {
                    openNotificationWithIcon1("success");
                    submitAddPlayer();
                  }
                }}>Đăng ký</button>
              </div>
            </form>
          </div>
        </div>
      </div>

    </div>
  );
}

function ContentPreview() {
  const [avatar, setAvatar] = useState();
  const [player, setPLayer] = useState(null);
  const idPlayer = localStorage.getItem("playerSelected");
  // const idSeason = localStorage.getItem("seasonIDSelected");

  useEffect(() => {


    axios.get(`${API}/${idPlayer}`, {
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json',
      }
    }).
      then(response => {
        setPLayer(response.data.data);
        console.log(response.data.data)

      }).catch(err => {
      })


  }, [])

  useEffect(() => {
    return () => avatar && URL.revokeObjectURL(avatar.preview);
  }, [avatar]);

  const handlePreviewAvatar = (e) => {
    const file = e.target.files[0];
    file.preview = URL.createObjectURL(file);

    setAvatar(file);
  };

  return (
    <>
      {!avatar && (
        <img
          style={{
            marginLeft: "70px",
            height: "290px",
            marginBottom: "10px",
            objectFit: "contain",

          }}
          src={`http://localhost:5000/${player?.image}`}
          alt=""
          width="80%"
        />
      )}

      {avatar && (
        <img
          style={{
            marginLeft: "180px",
            height: "290px",
            objectFit: "contain",
            marginBottom: "10px",
          }}
          src={avatar.preview}
          alt=""
          width="50%"
        />
      )}
      <div >
        <div className="input-group">
          <input type="file" className="form-control" onChange={handlePreviewAvatar} id="contentPDFUpdate" />
        </div>
      </div>
    </>
  );
}

const submitUpdatePlayer = async () => {
  let idPlayer = localStorage.getItem("playerSelected");
  let name = $("#playerUpdate").val();
  let dob = $("#dobUpdate").val();
  let nationality = $("#nationalityUpdate").val();
  let position = $("#positionUpdate").val();
  let logo;
  if (!($("#contentPDFUpdate").prop("files") === undefined)) {
    logo = $("#contentPDFUpdate").prop("files")[0];

  }


  const formData = new FormData();
  formData.append("name", name);
  formData.append("dob", moment(dob).toISOString());
  formData.append("_id", idPlayer);
  formData.append("nationality", nationality);
  formData.append("position", position);

  if (!(logo === undefined)) {
    formData.append("image", logo);

  }

  await fetch("http://127.0.0.1:5000/api/player/update", {
    method: "POST",
    body: formData,
    headers: {
      "Accept": "application/json",
    },
  })
    .then((result) => { })
    .catch((error) => { });
  window.location.reload(false);
}

function InfoPlayer() {
  const [player, setPLayer] = useState(null);
  const idPlayer = localStorage.getItem("playerSelected");
  // const idSeason = localStorage.getItem("seasonIDSelected");
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type) => {
    api[type]({
      message: type === "success" ? "Chỉnh sửa thành công" : "Vui lòng điền đủ thông tin",
    });
  };
  useEffect(() => {


    axios.get(`${API}/${idPlayer}`, {
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json',
      }
    }).
      then(response => {
        setPLayer(response.data.data);
        console.log(response.data.data)

      }).catch(err => {
      })


  }, [])

  const formatDate = (dateString) => {
    return moment(dateString).format("DD-MM-YYYY");
  };

  const formatDate1 = (dateString) => {
    return moment(dateString).format("YYYY-MM-DD");
  };

  return (
    <div className="contentUser">
      <Content />
      <div className="main-wrapper">


        <div className="d-flex flex-column gap-4 p-4">
          <h5 className="m-0">Chi tiết cầu thủ</h5>
          <div className="bg-white rounded-2">
            <div className="d-flex flex-column gap-4 p-4">
              <div className="d-flex align-items-end justify-content-between">
                <div className="d-flex gap-4 align-items-end">
                  <img className="player-image img-thumbnail" alt="" style={{ height: 400, width: 400, objectFit: "cover" }}
                    src={`http://localhost:5000${player?.image}`}></img>
                  <div className="d-flex flex-column gap-1">
                    <h1 className="mb-4">{player?.name}</h1>
                    <h5><b>Ngày sinh:</b> {formatDate(player?.dob)}</h5>
                    <h5><b>Quốc tịch:</b> {player?.nationality}</h5>
                    <h5><b>Vị trí:</b> {player?.position}</h5>
                  </div>
                </div>
                <button className="btn btn-light" data-bs-toggle="modal"
                  data-bs-target="#edit-player-modal"><BuildIcon></BuildIcon>&emsp;Chỉnh
                  sửa</button>
                <div className="modal fade" id="edit-player-modal" tabIndex="-1" aria-hidden="true">
                  <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h1 className="modal-title fs-5">Biểu mẫu thông tin cầu thủ</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"
                          aria-label="Close"></button>
                      </div>
                      <div className="modal-body p-4">
                        <form>
                          <div className="row g-4 p-4">
                            {/* <div className="col-6">
                              <div className="mb-3">
                                <label className="fs-8 mb-1">Ảnh chụp chân dung</label>
                                <input className="form-control" type="file" id="formFile" />
                              </div>
                              <div className="image-preview img-thumbnail"
                                style={{ height: 308, width: "auto" }}>
                                <img className="d-block" alt=""
                                  src="https://www.mancity.com/meta/media/vw0b1q45/ruben-dias.png" />
                              </div>
                            </div> */}
                            <label className="fs-8 mb-1">Ảnh đại diện</label>

                            <ContentPreview />

                            <div className="col-6">
                              <div className="d-flex flex-column gap-3">
                                <div>
                                  <label className="fs-8 mb-1">Tên cầu thủ</label>
                                  <div className="input-group">
                                    <input type="text" className="form-control" id="playerUpdate" defaultValue={player?.name} />
                                  </div>
                                </div>
                                <div>
                                  <label className="fs-8 mb-1">Ngày sinh</label>
                                  <div className="input-group">
                                    <input type="date" className="form-control" id="dobUpdate" defaultValue={formatDate1(player?.dob)} />
                                  </div>
                                </div>
                                <div>
                                  <label className="fs-8 mb-1">Quốc tịch</label>
                                  <div className="input-group">
                                    <input type="text" className="form-control" id="nationalityUpdate" defaultValue={player?.nationality} />
                                  </div>
                                </div>
                                <div>
                                  <label className="fs-8 mb-1">Vị trí</label>
                                  <select className="form-select"
                                    aria-label="Default select example" id="positionUpdate">
                                    <option defaultValue={player?.position}>{player?.position}</option>
                                    <option value="Hậu vệ">Hậu vệ</option>
                                    <option value="Tiền vệ">Tiền vệ</option>
                                    <option value="Tiền đạo">Tiền đạo</option>
                                    <option value="Thủ môn">Thủ môn</option>
                                  </select>
                                </div>
                                {/* <div>
                                  <label className="fs-8 mb-1">Đội bóng</label>
                                  <select className="form-select"
                                    aria-label="Default select example" id="playerClubUpdate">
                                    <option defaultValue="">--- Chọn đội bóng ---</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                  </select>
                                </div> */}
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-light"
                          data-bs-dismiss="modal">Hủy</button>
                        {contextHolder}

                        <button type="button" className="btn btn-primary"
                          onClick={() => {
                            let name = $("#playerUpdate").val();
                            let dob = $("#dobUpdate").val();
                            let nationality = $("#nationalityUpdate").val();
                            let position = $("#positionUpdate").val();
                            let playerClub = $("#playerClubUpdate").val();

                            if (
                              name === "" ||
                              dob === "" ||
                              nationality === "" ||
                              position === "" ||
                              playerClub === ""

                            ) {
                              openNotificationWithIcon("error");

                              return;
                            } else {
                              openNotificationWithIcon("success");
                              submitUpdatePlayer();
                            }
                          }}
                        >Lưu</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <h5 className="mt-4 mb-3 text-muted">Lịch sử thi đấu</h5>
              <table className="table table-hover player-club-table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Mùa giải</th>
                    <th scope="col">Đội bóng</th>
                    <th scope="col">Bàn thắng</th>
                    <th scope="col">Kiến tạo</th>
                  </tr>
                </thead>
                <tbody className="table-group-divider">
                  <tr>
                    <th scope="row">1</th>
                    <td>2023</td>
                    <td className="player-club" style={{ display: "flex" }}>

                      <h6 className="m-0">Manchester City</h6>
                    </td>
                    <td>2</td>
                    <td>
                      0</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

// function ContentPreview() {
//   const [avatar, setAvatar] = useState();

//   const handlePreviewAvatar = (e) => {
//     const file = e.target.files[0];
//     file.preview = URL.createObjectURL(file);

//     setAvatar(file);
//   };

//   return (
//     <>
//       {/* {!avatar && (
//         <img
//           style={{
//             marginTop: 8,
//             marginLeft: "10px",
//             height: "290px",
//             marginBottom: "10px",
//           }}
//           src={listAccount.image}
//           alt=""
//           width="80%"
//         />
//       )} */}

//       {avatar && (
//         <img
//           style={{
//             marginTop: 8,

//             height: "140px",
//             marginBottom: "10px",
//           }}
//           src={avatar.preview}
//           alt=""
//           width="50%"
//         />
//       )}
//       <div >
//         <input type="file" onChange={handlePreviewAvatar} id="contentPDF" />
//       </div>
//     </>
//   );
// }

// function AddTeam() {
//   return (
//     <div className="contentUser">
//       <Content />
//       <div className="allTeamTitle">
//         <div style={{ fontWeight: "bold" }}>Đăng ký cầu thủ</div>
//         <div>
//           {/* <button type="button" className="btn btn-danger" style={{ width: 80 }}>
//             Sửa
//           </button> */}

//         </div>
//       </div>
//       <div className="animated fadeIn">
//         <div className="row">
//           <div className="col-lg-2">
//           </div>
//           <div className="col-lg-8">
//             <div className="card">
//               <div className="card-header">
//                 <strong>Form đăng ký</strong>
//               </div>
//               <div className="card-body card-block">
//                 <form id="register" action="/club/add/<%=idSeason%>" method="post" className="form-horizontal">

//                   <div className="row form-group" style={{ marginBottom: 15 }}>
//                     <div className="col col-md-3 " ><label for="tendoibong" className=" form-control-label ">Tên cầu thủ</label>
//                     </div>
//                     <div className="col-12 col-md-9">
//                       <input type="text" id="tendoibong" name="tendoibong" placeholder="Tên cầu thủ"
//                         className="form-control" required />
//                     </div>
//                   </div>
//                   <div className="row form-group" style={{ marginBottom: 15 }}>
//                     <div className="col col-md-3 "><label for="svd" className=" form-control-label ">Loại cầu thủ</label>
//                     </div>
//                     <div className="col-12 col-md-9">
//                       <select id="loaiCauThu" name="loaiCauThu" className="form-control" required="required">
//                         <option value="1" selected>Cầu thủ nội</option>
//                         <option value="0">Cầu thủ ngoại</option>
//                       </select>
//                     </div>
//                   </div>
//                   <div className="row form-group" style={{ marginBottom: 15 }}>

//                     <div className="col col-md-3 "><label for="hlv" className=" form-control-label ">Vị trí thi đấu </label>
//                     </div>
//                     <div className="col-12 col-md-9">
//                       <select id="viTriThiDau" name="viTriThiDau" className="form-control" required="required">
//                         <option value="1" selected>Thủ môn</option>
//                         <option value="2">Hậu vệ</option>
//                         <option value="3">Tiền vệ</option>
//                         <option value="4">Tiền đạo</option>
//                       </select>
//                     </div>
//                   </div>
//                   <div className="row form-group" style={{ marginBottom: 15 }}>
//                     <div className="col col-md-3 " ><label for="tendoibong" className=" form-control-label ">Quốc tịch</label>
//                     </div>
//                     <div className="col-12 col-md-9">
//                       <input type="text" id="tendoibong" name="tendoibong" placeholder="Quốc tịch"
//                         className="form-control" required />
//                     </div>
//                   </div>
//                   <div className="row form-group" style={{ marginBottom: 15 }}>
//                     <div className="col col-md-3 "><label for="svd" className=" form-control-label ">Ngày sinh</label>
//                     </div>
//                     <div className="col-12 col-md-9">
//                       <input type="date" id="svd" name="svd" className="form-control" required />
//                     </div>
//                   </div>
//                   <div className="row form-group" style={{ marginBottom: 15 }}>

//                     <div className="col col-md-3 "><label for="hlv" className=" form-control-label ">Đội tuyển </label>
//                     </div>
//                     <div className="col-12 col-md-9">
//                       <select id="viTriThiDau" name="viTriThiDau" className="form-control" required="required">
//                         <option value="1" selected>MU</option>
//                         <option value="2">MCI</option>

//                       </select>
//                     </div>
//                   </div>
//                   <div className="row form-group" style={{ marginBottom: 15 }}>
//                     <div className="col col-md-3"><label for="logo" className=" form-control-label">Ảnh đại diện</label></div>
//                     <div className="col-12 col-md-9">
//                       <ContentPreview />
//                     </div>
//                     <input type="hidden" id="imgPath" name="imgPath" value="" />
//                   </div>
//                 </form>
//               </div>
//               <div className="card-footer" style={{ display: "flex", justifyContent: "center" }}>
//                 <button form="register" type="submit" className="btn btn-primary btn-sm" style={{ marginRight: 20 }}>
//                   <i className="fa fa-check"></i> Đăng ký
//                 </button>
//                 <button form="register" type="reset" className="btn btn-danger btn-sm">
//                   <i className="fa fa-ban"> </i> Hủy đăng ký
//                 </button>

//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//     </div>
//   );
// }

function Content(props) {
  const [league, setLeague] = useState('')
  const name = localStorage.getItem("seasonNameSelected");
  useEffect(() => {


    setLeague(name);



  }, [])
  return (
    <div >
      <header className="header d-flex flex-column justify-content-center px-4">
        <h5 className="m-0 fw-semibold text-uppercase">{league}</h5>
      </header>




    </div>


  );
}

export default MyTeam;
