import React, { useState, useEffect, useCallback } from "react";
import { Navigate, Routes, Route, useNavigate, Link } from "react-router-dom";
import $ from "jquery";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowCircleLeftSharpIcon from '@mui/icons-material/ArrowCircleLeftSharp';

import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { notification } from "antd";

import "../../style/myteam.css";
import "../../css/content.css";
import "../../css/style.css"
import axios from "axios"

const API = 'http://127.0.0.1:5000/api/club';

function MyTeam() {
  return (
    <Routes>
      <Route index element={<Navigate to="all" replace />} />

      <Route path="all" element={<AllTeam />} />
      <Route path="add" element={<AddTeam />} />
      <Route path="info" element={<InfoTeam />} />
      {/* <Route path="edit-player" element={<EditPlayer />} /> */}


    </Routes>
  );
}


function AllTeam() {
  const [listTeam, setListTeam] = useState([]);
  const id = localStorage.getItem("seasonIDSelected");
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
        setListTeam(response.data.data);

      }).catch(err => {
      })


  }, [])

  const deleteClub = async () => {
    const id = localStorage.getItem("clubDeleteSelected");
    const id1 = localStorage.getItem("seasonIDSelected")
    const requestData = {
      clubId: id,
      seasonId: id1,

    }


    await fetch("http://127.0.0.1:5000/api/club/delete", {
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


  const navigate = useNavigate();
  const handleOnClick = useCallback(
    () => navigate("../add", { replace: true }),
    [navigate]
  );
  const handleOnClick1 = useCallback(
    () => navigate("../info", { replace: true }),
    [navigate]
  );

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
  return (
    <div className="contentUser">
      <Content />
      <div className="main-wrapper">

        <div className="main">
          <div className="d-flex flex-column gap-4 p-4">
            <h5 className="m-0">Danh sách đội bóng</h5>
            <div className="row row-cols-4 g-4">
              {listTeam.map((i, index) => (

                <div className="col-4 col-xl-3" key={`club_${index}`}>
                  <div className="club-card" >
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <img
                        src={`http://localhost:5000/${i.image}`}
                        alt=""
                        className="club-logo"></img>
                      {contextHolder}

                      <button className="btn btn-danger" title="Xóa" style={{ height: 50, width: 50 }} onClick={() => {
                        openNotificationWithIcon2("success");
                        localStorage.setItem("clubDeleteSelected", i._id);
                        deleteClub();
                      }}>
                        <DeleteIcon></DeleteIcon>
                      </button>
                    </div>

                    <div className="club-card-body" style={{ cursor: "pointer" }} onClick={() => {
                      handleOnClick1();
                      localStorage.setItem("clubSelected", i._id);

                    }}>
                      <h6 className="club-name">{i.name}</h6>
                      <ArrowForwardIcon></ArrowForwardIcon>
                    </div>
                  </div>
                </div>
              ))}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContentPreview() {
  const [avatar, setAvatar] = useState();
  const [club, setClub] = useState(null);
  const idClub = localStorage.getItem("clubSelected");
  const idSeason = localStorage.getItem("seasonIDSelected");

  useEffect(() => {


    axios.get(`${API}/${idClub}/${idSeason}`, {
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json',
      }
    }).
      then(response => {
        setClub(response.data.data);

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
          src={`http://localhost:5000/${club?.image}`}
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
            marginLeft: "180px",
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

const submitAddClub = async () => {
  let name = $("#clubAdd").val();
  let stadium = $("#stadiumAdd").val();
  let mentor = $("#mentorAdd").val();

  let content = $("#contentPDFAdd").prop("files")[0];
  let idSeason = localStorage.getItem("seasonIDSelected");

  const formData = new FormData();
  formData.append("name", name);
  formData.append("stadium", stadium);
  formData.append("image", content);
  formData.append("coachName", mentor);

  formData.append("seasonId", idSeason);

  await fetch("http://127.0.0.1:5000/api/club/create", {
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


function AddTeam() {
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
  return (
    <div className="contentUser">
      <Content />
      <div className="main-wrapper">
        <div className="d-flex flex-column gap-4 p-4">
          <h5 className="m-0">Đăng ký đội bóng</h5>

          <div className="m-auto bg-white shadow rounded-2" style={{ width: "800px" }}>
            {/* <div className="d-flex justify-content-between p-4">
              <div className="input-group w-50">
                <i className="fa-solid fa-magnifying-glass input-group-text pt-2"><SearchIcon></SearchIcon></i>
                <input type="text" className="form-control" placeholder="Tìm đội bóng các mùa trước..." />
              </div>

              {/* <button id="new-club-btn" className="fs-6 active" style={{ background: "#21e758", paddingRight: 5, borderRadius: 5, color: "white" }} onClick={() => {
                let name = $("#clubAdd").val();
                let stadium = $("#stadiumAdd").val();
                let mentor = $("#mentorAdd").val();
                let content = $("#contentPDFAdd").prop("files")[0];

                if (
                  name === "" ||
                  stadium === "" ||
                  mentor === "" ||
                  content === undefined

                ) {
                  openNotificationWithIcon1("error");

                  return;
                } else {
                  openNotificationWithIcon1("success");
                  submitAddClub();
                }
              }}><AddIcon></AddIcon> Đăng
                ký mới</button> */}
            {/* </div>  */}
            {/* <hr className="m-0" /> */}
            <form>
              <div className="p-4 d-flex flex-column gap-3">

                <div>
                  <label className="fs-8 mb-1">Logo đội bóng</label>

                  <ContentPreviewAdd></ContentPreviewAdd>

                </div>
                <div>
                  <label className="fs-8 mb-1">Tên câu lạc bộ</label>
                  <div className="input-group">
                    <input type="text" className="form-control" id="clubAdd" />
                  </div>
                </div>
                <div>
                  <label className="fs-8 mb-1">Sân nhà</label>
                  <div className="input-group">
                    <input type="text" className="form-control" id="stadiumAdd" />
                  </div>
                </div>
                <div>
                  <label className="fs-8 mb-1">Huấn luyện viên</label>
                  <div className="input-group">
                    <input type="text" className="form-control" id="mentorAdd" />
                  </div>
                </div>
              </div>
              <hr className="m-0" />
              <div className="p-4">
                {contextHolder}
                <button className="btn btn-primary float-end d-block mb-4" onClick={() => {
                  let name = $("#clubAdd").val();
                  let stadium = $("#stadiumAdd").val();
                  let content = $("#contentPDFAdd").prop("files")[0];
                  let mentor = $("#mentorAdd").val();

                  if (
                    name === "" ||
                    stadium === "" ||
                    mentor === "" ||
                    content === undefined

                  ) {
                    openNotificationWithIcon1("error");

                    return;
                  } else {
                    openNotificationWithIcon1("success");
                    submitAddClub();
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

const submitUpdateClub = async () => {
  let id = localStorage.getItem("clubSelected");
  let name = $("#clubUpdate").val();
  let mentor = $("#mentorAdd").val();
  let stadium = $("#stadiumUpdate").val();
  let logo;
  if (!($("#contentPDFUpdate").prop("files") === undefined)) {
    logo = $("#contentPDFUpdate").prop("files")[0];

  }


  const formData = new FormData();
  formData.append("name", name);
  formData.append("stadium", stadium);
  formData.append("_id", id);
  formData.append("coachName", mentor);
  if (!(logo === undefined)) {
    formData.append("image", logo);

  }

  await fetch("http://127.0.0.1:5000/api/club/update", {
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

function InfoTeam() {
  const [club, setClub] = useState(null);
  const idClub = localStorage.getItem("clubSelected");
  const idSeason = localStorage.getItem("seasonIDSelected");
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type) => {
    api[type]({
      message: type === "success" ? "Chỉnh sửa thành công" : "Vui lòng điền đủ thông tin",
    });
  };
  useEffect(() => {


    axios.get(`${API}/${idClub}/${idSeason}`, {
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json',
      }
    }).
      then(response => {
        setClub(response.data.data);

      }).catch(err => {
      })


  }, [])
  const navigate = useNavigate();
  const handleOnClick = useCallback(
    () => navigate("../all", { replace: true }),
    [navigate]
  );
  const handleOnClick1 = useCallback(
    () => navigate("../edit-team", { replace: true }),
    [navigate]
  );
  const handleOnClick2 = useCallback(
    () => navigate("../edit-player", { replace: true }),
    [navigate]
  );
  return (
    <div className="contentUser">
      <Content />
      <div className="main-wrapper">
        <div className="d-flex flex-column gap-4 p-4">
          <h5 className="m-0">Thông tin đội bóng</h5>
          <div className="bg-white rounded-1">
            <img className="club-cover-img rounded-top-1" alt=""
              src="https://media.istockphoto.com/id/472347896/photo/striped-soccer-field.jpg?s=612x612&w=0&k=20&c=wgeavCCOimF1b5mrv9QNQuuJqs1ERX67pDjPT3yv8j8=">
            </img>
            <div className="p-4 m" style={{ marginTop: "-200px" }}>
              <button className="back-btn fw-semibold text-white fs-8" onClick={() => {
                handleOnClick();
              }}><ArrowCircleLeftSharpIcon></ArrowCircleLeftSharpIcon>&emsp;Trở
                lại</button>
              <div className="d-flex align-items-end justify-content-between w-100" style={{ marginTop: "65px" }}>
                <div className="d-flex gap-4 align-items-end">
                  <div style={{ width: "50px" }}></div>
                  <img className="club-logo" alt=""
                    src={`http://localhost:5000/${club?.image}`}>
                  </img>
                  <div>
                    <h2 className="text-light mb-4">{club?.name}</h2>
                    <h6>Sân nhà: {club?.stadium}</h6>
                    <h6>Huấn luyện viên: {club?.season?.coachName}</h6>

                  </div>
                </div>
                <button className="btn btn-light" data-bs-toggle="modal"
                  data-bs-target="#edit-club-modal"><EditNoteIcon></EditNoteIcon>&emsp;Chỉnh
                  sửa</button>
                <div className="modal fade" id="edit-club-modal" tabIndex="-1" aria-hidden="true">
                  <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h1 className="modal-title fs-5">Biểu mẫu thông tin đội bóng</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"
                          aria-label="Close"></button>
                      </div>
                      <div className="modal-body p-4">
                        <form>
                          <div className="d-flex flex-column gap-3">
                            <div>
                              {/* <img className="d-block mb-3 m-auto" alt=""
                                style={{ maxHeight: 250, maxWidth: 250, objectFit: "cover" }}
                                src="https://upload.wikimedia.org/wikipedia/vi/1/1d/Manchester_City_FC_logo.svg">

                              </img> */}
                              <ContentPreview />


                            </div>
                            <div>
                              <label className="fs-8 mb-1">Tên câu lạc bộ</label>
                              <div className="input-group">
                                <input type="text" className="form-control" defaultValue={club?.name} id="clubUpdate" />
                              </div>
                            </div>
                            <div>
                              <label className="fs-8 mb-1">Sân nhà</label>
                              <div className="input-group">
                                <input type="text" className="form-control" defaultValue={club?.stadium} id="stadiumUpdate" />
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
                            let name = $("#clubUpdate").val();
                            let stadium = $("#stadiumUpdate").val();

                            if (
                              name === "" ||
                              stadium === ""

                            ) {
                              openNotificationWithIcon("error");

                              return;
                            } else {
                              openNotificationWithIcon("success");
                              submitUpdateClub();
                            }
                          }}
                        >Lưu</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <h5 className="mt-5 mb-3 text-muted">Danh sách cầu thủ</h5>
              <table className="table table-hover club-player-table">
                <thead>
                  <tr>
                    <th scope="col">Số áo</th>
                    <th scope="col">Ảnh</th>
                    <th scope="col">Họ tên</th>
                    <th scope="col">Vị trí</th>
                  </tr>
                </thead>
                <tbody className="table-group-divider">
                  {club?.season?.playerList?.map((i, index) => (

                    <tr key={`club_player_${index}`}>
                      <th style={{ verticalAlign: "middle" }} scope="row">{i?.shirt_number}</th>
                      <td>
                        <img className="avatar img-thumbnail"
                          alt=""
                          src={`http://localhost:5000${i?.image}`}>
                        </img>
                      </td>
                      <td>{i.name}</td>
                      <td>{i.position}</td>

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
