import React, { useState, useEffect, useCallback } from "react";
import { Navigate, Routes, Route, useNavigate } from "react-router-dom";
import $ from "jquery";
import axios from "axios";
import "../../css/style.css";

import "../../style/myteam.css";
import BuildIcon from "@mui/icons-material/Build";

import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
const API = "http://127.0.0.1:5000/api/match";

function MyCalendar() {
  return (
    <Routes>
      <Route index element={<Navigate to="all" replace />} />

      <Route path="all" element={<AddMatch />} />
      <Route path="add" element={<AllCalendar />} />
      <Route path="edit" element={<EditMatch />} />
    </Routes>
  );
}

function AllCalendar() {
  const [listMatch, setListMatch] = useState([]);
  // const [round, setRound] = useState("Tất cả");
  // useEffect(() => {
  //   axios
  //     .get(API, {
  //       headers: {
  //         "content-type": "application/json",
  //         accept: "application/json",
  //       },
  //     })
  //     .then((response) => {
  //       // setListMatch(response.data.data);
  //       console.log(response.data.data);
  //     })
  //     .catch((err) => { });
  // }, []);

  function convertToLocalDate(utcDateTime) {
    var utcDate = new Date(utcDateTime);
    var localDate = utcDate.toLocaleString();
    return localDate;
  }
  const navigate = useNavigate();
  const handleOnClick = useCallback(
    () => navigate("../add", { replace: true }),
    [navigate]
  );
  const handleOnClick1 = useCallback(
    () => navigate("../edit", { replace: true }),
    [navigate]
  );
  return (
    <div className="contentUser">
      <Content />
      <div className="main-wrapper">


        <div className="d-flex flex-column gap-4 p-4">
          <h5 className="m-0">Tạo lịch thi đấu</h5>

          <div className="m-auto bg-white shadow rounded-2" style={{ width: 800 }}>
            <div className="d-flex justify-content-between p-4">
              <div className="round-select input-group" style={{ width: 180 }}>
                <label className="input-group-text" htmlFor="inputGroupSelect01">Vòng đấu</label>
                <select className="form-select" id="inputGroupSelect01">
                  <option defaultValue="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </div>
              <button className="btn btn-success fs-7" data-bs-toggle="modal"
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
                              <input type="number" className="form-control" value="1"
                                readOnly />
                            </div>
                          </div>
                          <div>
                            <label className="fs-8 mb-1">Đội bóng 1</label>
                            <select className="form-select" aria-label="Default select example">
                              <option defaultValue="">Chọn đội bóng</option>
                              <option value="1">Manchester City</option>
                              <option value="2">Manchester United</option>
                              <option value="3">Liverpool</option>
                            </select>
                          </div>
                          <div>
                            <label className="fs-8 mb-1">Đội bóng 1</label>
                            <select className="form-select" aria-label="Default select example">
                              <option defaultValue="">Chọn đội bóng</option>
                              <option value="1">Manchester City</option>
                              <option value="2">Manchester United</option>
                              <option value="3">Liverpool</option>
                            </select>
                          </div>

                          <div className="d-flex gap-3">
                            <div>
                              <label className="fs-8 mb-1">Giờ</label>
                              <div className="input-group">
                                <input type="number" className="form-control" value="1" />
                              </div>
                            </div>
                            <div>
                              <label className="fs-8 mb-1">Phút</label>
                              <div className="input-group">
                                <input type="number" className="form-control" value="1" />
                              </div>
                            </div>
                            <div>
                              <label className="fs-8 mb-1">Ngày</label>
                              <div className="input-group">
                                <input type="date" className="form-control" />
                              </div>
                            </div>
                          </div>
                          <div>
                            <label className="fs-8 mb-1">Sân đấu</label>
                            <div className="input-group">
                              <input type="text" className="form-control" />
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                    <div className="modal-footer py-2 px-4">
                      <button type="button" className="btn btn-light"
                        data-bs-dismiss="modal">Hủy</button>
                      <button type="button" className="btn btn-primary">Lưu</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr className="m-0" />
            <div className="row row-cols-2 g-0 p-4">
              <div className="col">
                <div className="match d-flex border">
                  <div className="d-flex flex-column justify-content-center gap-2 flex-grow-1 p-3">
                    <div>
                      <img className="club-logo" alt="" style={{ height: 25, width: 25 }}
                        src="https://upload.wikimedia.org/wikipedia/vi/1/1d/Manchester_City_FC_logo.svg" />
                      <span>Manchester City</span>
                    </div>
                    <div>
                      <img className="club-logo" alt="" style={{ height: 25, width: 25 }}
                        src="https://upload.wikimedia.org/wikipedia/vi/1/1d/Manchester_City_FC_logo.svg" />
                      <span>Manchester City</span>
                    </div>
                  </div>
                  <div
                    className="border-start p-3 d-flex flex-column justify-content-center align-items-center">
                    <span className="fs-8 text-secondary">20/01</span>
                    <span className="fs-8 text-secondary">19:00</span>
                    <span className="fs-8 text-secondary">Sân Hàng Đẫy</span>
                  </div>
                  <div className="remove-match p-3 bg-danger">
                    <button className="text-muted"><DeleteIcon></DeleteIcon></button>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="match d-flex border">
                  <div className="d-flex flex-column justify-content-center gap-2 flex-grow-1 p-3">
                    <div>
                      <img className="club-logo" alt="" style={{ height: 25, width: 25 }}
                        src="https://upload.wikimedia.org/wikipedia/vi/1/1d/Manchester_City_FC_logo.svg" />
                      <span>Manchester City</span>
                    </div>
                    <div>
                      <img className="club-logo" alt="" style={{ height: 25, width: 25 }}
                        src="https://upload.wikimedia.org/wikipedia/vi/1/1d/Manchester_City_FC_logo.svg" />
                      <span>Manchester City</span>
                    </div>
                  </div>
                  <div
                    className="border-start p-3 d-flex flex-column justify-content-center align-items-center">
                    <span className="fs-8 text-secondary">20/01</span>
                    <span className="fs-8 text-secondary">19:00</span>
                    <span className="fs-8 text-secondary">Sân Hàng Đẫy</span>
                  </div>
                  <div className="remove-match p-3 bg-danger">
                    <button className="text-muted"><DeleteIcon></DeleteIcon></button>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="match d-flex border">
                  <div className="d-flex flex-column justify-content-center gap-2 flex-grow-1 p-3">
                    <div>
                      <img className="club-logo" alt="" style={{ height: 25, width: 25 }}
                        src="https://upload.wikimedia.org/wikipedia/vi/1/1d/Manchester_City_FC_logo.svg" />
                      <span>Manchester City</span>
                    </div>
                    <div>
                      <img className="club-logo" alt="" style={{ height: 25, width: 25 }}
                        src="https://upload.wikimedia.org/wikipedia/vi/1/1d/Manchester_City_FC_logo.svg" />
                      <span>Manchester City</span>
                    </div>
                  </div>
                  <div
                    className="border-start p-3 d-flex flex-column justify-content-center align-items-center">
                    <span className="fs-8 text-secondary">20/01</span>
                    <span className="fs-8 text-secondary">19:00</span>
                    <span className="fs-8 text-secondary">Sân Hàng Đẫy</span>
                  </div>
                  <div className="remove-match p-3 bg-danger">
                    <button className="text-muted"><DeleteIcon></DeleteIcon></button>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="match d-flex border">
                  <div className="d-flex flex-column justify-content-center gap-2 flex-grow-1 p-3">
                    <div>
                      <img className="club-logo" alt="" style={{ height: 25, width: 25 }}
                        src="https://upload.wikimedia.org/wikipedia/vi/1/1d/Manchester_City_FC_logo.svg" />
                      <span>Manchester City</span>
                    </div>
                    <div>
                      <img className="club-logo" alt="" style={{ height: 25, width: 25 }}
                        src="https://upload.wikimedia.org/wikipedia/vi/1/1d/Manchester_City_FC_logo.svg" />
                      <span>Manchester City</span>
                    </div>
                  </div>
                  <div
                    className="border-start p-3 d-flex flex-column justify-content-center align-items-center">
                    <span className="fs-8 text-secondary">20/01</span>
                    <span className="fs-8 text-secondary">19:00</span>
                    <span className="fs-8 text-secondary">Sân Hàng Đẫy</span>
                  </div>
                  <div className="remove-match p-3 bg-danger">
                    <button className="text-muted"><DeleteIcon></DeleteIcon></button>
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
  const [round, setRound] = useState("1");
  const id = localStorage.getItem("seasonIDSelected");
  const [listRound, setListRound] = useState(null);
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
        setListRound(response.data.data);
        console.log(response.data.data);
      })
      .catch((err) => { });
  }, []);
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
                <select className="form-select" id="inputGroupSelect01">
                  <option defaultValue="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
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
                          <div className="club-win">
                            <img className="club-logo" alt=""
                              src="https://upload.wikimedia.org/wikipedia/vi/1/1d/Manchester_City_FC_logo.svg" />
                            <span>{i.club1.name}</span>
                            <span className="goal float-end">{i.result.club1}</span>
                          </div>
                          <div className="club-lose">
                            <img className="club-logo" alt=""
                              src="https://upload.wikimedia.org/wikipedia/vi/1/1d/Manchester_City_FC_logo.svg" />
                            <span>{i.club2.name}</span>
                            <span className="goal float-end">{i.result.club2}</span>
                          </div>
                        </div>
                        <div
                          className="border-start p-3 d-flex flex-column justify-content-center align-items-center">
                          <div className="fs-8">20/01</div>
                          <div className="fs-8">19:00</div>
                        </div>
                        <div className="update-match p-3 bg-success">
                          <button className="text-light"><BuildIcon></BuildIcon></button>
                        </div>
                      </div>
                    </div>
                    <div className="col">
                      <div className="match d-flex border">
                        <div
                          className="d-flex flex-column justify-content-center gap-2 flex-grow-1 p-3">
                          <div>
                            <img className="club-logo" alt=""
                              src="https://upload.wikimedia.org/wikipedia/vi/1/1d/Manchester_City_FC_logo.svg" />
                            <span>Manchester City</span>
                          </div>
                          <div>
                            <img className="club-logo" alt=""
                              src="https://upload.wikimedia.org/wikipedia/vi/1/1d/Manchester_City_FC_logo.svg" />
                            <span>Manchester City</span>
                          </div>
                        </div>
                        <div
                          className="border-start p-3 d-flex flex-column justify-content-center align-items-center">
                          <small>CD</small>
                          <div className="fs-8">20/01</div>
                          <div className="fs-8">19:00</div>
                        </div>
                        <div className="update-match p-3 bg-success">
                          <button className="text-light"><BuildIcon></BuildIcon></button>
                        </div>
                      </div>
                    </div>
                    <div className="col">
                      <div className="match d-flex border">
                        <div
                          className="d-flex flex-column justify-content-center gap-2 flex-grow-1 p-3">
                          <div>
                            <img className="club-logo" alt=""
                              src="https://upload.wikimedia.org/wikipedia/vi/1/1d/Manchester_City_FC_logo.svg" />
                            <span>Manchester City</span>
                          </div>
                          <div>
                            <img className="club-logo" alt=""
                              src="https://upload.wikimedia.org/wikipedia/vi/1/1d/Manchester_City_FC_logo.svg" />
                            <span>Manchester City</span>
                          </div>
                        </div>
                        <div
                          className="border-start p-3 d-flex flex-column justify-content-center align-items-center">
                          <div className="fs-8">20/01</div>
                          <div className="fs-8">19:00</div>
                        </div>
                        <div className="update-match p-3 bg-success">
                          <button className="text-light"><BuildIcon></BuildIcon></button>
                        </div>
                      </div>
                    </div>
                    <div className="col">
                      <div className="match d-flex border">
                        <div
                          className="d-flex flex-column justify-content-center gap-2 flex-grow-1 p-3">
                          <div>
                            <img className="club-logo" alt=""
                              src="https://upload.wikimedia.org/wikipedia/vi/1/1d/Manchester_City_FC_logo.svg" />
                            <span>Manchester City</span>
                          </div>
                          <div>
                            <img className="club-logo" alt=""
                              src="https://upload.wikimedia.org/wikipedia/vi/1/1d/Manchester_City_FC_logo.svg" />
                            <span>Manchester City</span>
                          </div>
                        </div>
                        <div
                          className="border-start p-3 d-flex flex-column justify-content-center align-items-center">
                          <div className="fs-8">20/01</div>
                          <div className="fs-8">19:00</div>
                        </div>
                        <div className="update-match p-3 bg-success">
                          <button className="text-light"><BuildIcon></BuildIcon></button>
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

function EditMatch() {
  return (
    <div className="contentUser">
      <Content />
      <div className="allTeamTitle">
        <div style={{ fontWeight: "bold" }}>Cập nhật trận đấu</div>
        <div>
          {/* <button type="button" className="btn btn-danger" style={{ width: 80 }}>
            Sửa
          </button> */}
        </div>
      </div>
      <div className="animated fadeIn">
        <div className="row">
          <div className="col-lg-2"></div>
          <div className="col-lg-8">
            <div className="card">
              <div className="card-header">
                <strong>Thông tin trận đấu</strong>
              </div>
              <div className="card-body card-block">
                <form
                  id="register"
                  action="/club/add/<%=idSeason%>"
                  method="post"
                  className="form-horizontal"
                >
                  <div className="row form-group" style={{ marginBottom: 15 }}>
                    <div className="col col-md-3 ">
                      <label htmlFor="tendoibong" className=" form-control-label ">
                        Vòng
                      </label>
                    </div>
                    <div className="col-12 col-md-9">
                      <select
                        id="loaiCauThu"
                        name="loaiCauThu"
                        className="form-control"
                        required="required"
                      >
                        <option defaultValue="1">
                          1
                        </option>
                        <option value="2" >
                          2
                        </option>
                        <option value="3" >
                          3
                        </option>
                      </select>
                    </div>
                  </div>
                  <div className="row form-group" style={{ marginBottom: 15 }}>
                    <div className="col col-md-3 ">
                      <label htmlFor="svd" className=" form-control-label ">
                        Đội nhà
                      </label>
                    </div>
                    <div className="col-12 col-md-9">
                      <select
                        id="loaiCauThu"
                        name="loaiCauThu"
                        className="form-control"
                        required="required"
                      >
                        <option defaultValue="1" >
                          MU
                        </option>
                        <option value="0">MCI</option>
                      </select>
                    </div>
                  </div>
                  <div className="row form-group" style={{ marginBottom: 15 }}>
                    <div className="col col-md-3 ">
                      <label htmlFor="svd" className=" form-control-label ">
                        Đội khách
                      </label>
                    </div>
                    <div className="col-12 col-md-9">
                      <select
                        id="loaiCauThu"
                        name="loaiCauThu"
                        className="form-control"
                        required="required"
                      >
                        <option value="1" >
                          MU
                        </option>
                        <option value="0">MCI</option>
                      </select>
                    </div>
                  </div>
                  <div className="row form-group" style={{ marginBottom: 15 }}>
                    <div className="col col-md-3 ">
                      <label htmlFor="hlv" className=" form-control-label ">
                        Địa điểm{" "}
                      </label>
                    </div>
                    <div className="col-12 col-md-9">
                      <input
                        type="text"
                        id="viTriThiDau"
                        name="viTriThiDau"
                        className="form-control"
                        required="required"
                      ></input>
                    </div>
                  </div>
                  <div className="row form-group" style={{ marginBottom: 15 }}>
                    <div className="col col-md-3 ">
                      <label htmlFor="tendoibong" className=" form-control-label ">
                        Thời gian
                      </label>
                    </div>
                    <div className="col-12 col-md-9">
                      <input
                        type="date"
                        id="tendoibong"
                        name="tendoibong"
                        className="form-control"
                        required
                      />
                    </div>
                  </div>
                </form>
              </div>
              <div
                className="card-footer"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <button
                  form="register"
                  type="submit"
                  className="btn btn-primary btn-sm"
                  style={{ marginRight: 20 }}
                >
                  <i className="fa fa-check"></i> Thay đổi
                </button>
                <button
                  form="register"
                  type="reset"
                  className="btn btn-danger btn-sm"
                >
                  <i className="fa fa-ban"> </i> Hủy thay đổi
                </button>
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
