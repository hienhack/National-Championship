import React, { useState, useEffect, useCallback } from "react";
import { Navigate, Routes, Route, useNavigate } from "react-router-dom";
import $ from "jquery";
import axios from "axios"
import "../../style/myteam.css";
import moment from "moment";
import { notification } from "antd";

import "../../css/style.css";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeleteIcon from '@mui/icons-material/Delete';
import BuildIcon from '@mui/icons-material/Build';


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
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [totalPages, setTotalPages] = useState(1); // Tổng số trang
  const [rowsPerPage, setRowsPerPage] = useState(10); // Số dòng hiển thị trên mỗi trang

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

  const [nameSearch, setNameSearch] = useState("");


  useEffect(() => {


    axios.get(API, {
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json',
      },
      params: {
        seasonId: id,
        key: nameSearch
      }

    }).
      then(response => {
        const totalPlayers = response.data.data.length;
        const totalPages = Math.ceil(totalPlayers / rowsPerPage);
        setTotalPages(totalPages);

        // Cắt `response.data.data` thành các trang nhỏ hơn
        const start = (currentPage - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        const playerData = response.data.data.slice(start, end);

        setListPlayer(playerData);
      }).catch(err => {
      })


  }, [nameSearch, rowsPerPage, currentPage])

  const goToPage = (page) => {
    setCurrentPage(page);
    // Gọi API để lấy danh sách cầu thủ trên trang mới
    // Sử dụng tham số `page` để xác định vị trí bắt đầu và kết thúc trong danh sách dữ liệu
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

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
                <div >
                  <div className="d-flex gap-2" style={{ width: "400px" }}>
                    <div className="input-group">
                      <input type="text" className="form-control" id="searchName" />
                    </div>
                    <button className="text-white p-2 rounded-2 bg-primary" onClick={() => {
                      setNameSearch($("#searchName").val());
                    }}>Search</button>
                  </div>
                </div>
                <div className="d-flex gap-3 align-items-center">
                  <h6 className="text-secondary m-0">Số dòng</h6>
                  <select
                    className="form-select"
                    style={{ width: "100px" }}
                    value={rowsPerPage}
                    onChange={(e) => setRowsPerPage(Number(e.target.value))}
                  >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
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

                      </td>
                    </tr>
                  ))}

                </tbody>
              </table>
              <nav>
                <ul className="pagination float-end">
                  <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <a className="page-link" href="#" aria-label="Previous" onClick={goToPreviousPage}>
                      <span aria-hidden="true">&laquo;</span>
                    </a>
                  </li>
                  {Array.from({ length: totalPages }, (_, index) => (
                    <li className={`page-item ${currentPage === index + 1 ? 'active' : ''}`} key={index}>
                      <a className="page-link" href="#" onClick={() => goToPage(index + 1)}>
                        {index + 1}
                      </a>
                    </li>
                  ))}
                  <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <a className="page-link" href="#" aria-label="Next" onClick={goToNextPage}>
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

  useEffect(() => {


    axios.get(`${API}/${idPlayer}`, {
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json',
      }
    }).
      then(response => {
        setPLayer(response.data.data);

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
                  {player?.seasons?.map((i, index) => (

                    <tr>
                      <th scope="row">{index + 1}</th>
                      <td>{i.year}</td>
                      <td >

                        {i.club?.name}
                      </td>
                      <td>{i.goal}</td>
                      <td>
                        {i.assist}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}



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
