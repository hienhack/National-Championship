import React, { useState, useEffect, useCallback } from "react";
import { notification } from "antd";
import axios from "axios";
import "../../css/content.css";
import { Navigate, Routes, Route, useNavigate } from "react-router-dom";
import "../../style/myteam.css";
import "../../css/style.css"
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteIcon from "@mui/icons-material/Delete";
import BuildIcon from "@mui/icons-material/Build";
import EditNoteIcon from '@mui/icons-material/EditNote';
import $ from "jquery";
import moment from "moment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
const API = "http://127.0.0.1:5000/api/season";

function MyProfile() {
  return (
    <Routes>
      <Route index element={<Navigate to="all" replace />} />

      <Route path="all" element={<AllLeague />} />
      <Route path="info" element={<InfoLeague />} />
      <Route path="edit" element={<EditLeague />} />
    </Routes>
  );
}

const deleteSeason = async () => {
  const id = localStorage.getItem("seasonDeleteSelected");
  let idBook = { _id: id };

  await fetch("http://127.0.0.1:5000/api/season/delete", {
    method: "POST",
    headers: {

    },
    body: JSON.stringify(idBook),
  })
    .then((result) => {
      // window.location.reload(false);
    })
    .catch((error) => { });
};

const submitNewSeason = async () => {
  let name = $("#seasonName").val();
  let year = $("#seasonYear").val();
  let start = $("#seasonStart").val();
  let end = $("#seasonEnd").val();
  let totalClub = $("#seasonClub").val();
  let totalForeigner = $("#seasonForeigner").val();
  let demotedPosition = $("#seasonDemotedPosition").val();
  let redCard = $("#seasonRedCard").val();
  let minAge = $("#seasonMinAge").val();

  const formData = new FormData();
  const ruleData = {
    demotedPosition: parseInt(demotedPosition),
    maxForeginPlayer: parseInt(totalForeigner),
    minAge: parseInt(minAge),
    redCardBanned: parseInt(redCard),
    totalClubs: parseInt(totalClub)
  };

  formData.append("seasonName", name);
  formData.append("year", year);
  formData.append("start", moment(start).toISOString());
  formData.append("end", moment(end).toISOString());
  formData.append("rule", JSON.stringify(ruleData));

  await fetch("http://127.0.0.1:5000/api/season/create", {
    method: "POST",
    body: formData,
    headers: {
      // Các header mà bạn muốn bổ sung (nếu có)
    },
  })
    .then((result) => { })
    .catch((error) => { });
};

function AllLeague() {
  const [listAccount, setList] = useState([]);
  useEffect(() => {
    axios
      .get(API, {
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
      })
      .then((response) => {
        setList(response.data.data);
        console.log(response.data.data);
      })
      .catch((err) => { });
  }, []);

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

  const formatDate = (dateString) => {
    return moment(dateString).format("DD-MM-YYYY");
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
          <h5 className="m-0">Danh sách mùa giải</h5>
          <ol className="list-group list-group-numbered gap-2">
            {listAccount.map((i, index) => (
              <li
                className="list-group-item rounded-2 d-flex justify-content-between align-items-center"
                key={`season_${index}`}
              >
                <div className="ms-4 ps-4 me-auto border-start">
                  <div className=" fw-bold">{i.seasonName}</div>
                  <div>
                    <small>Năm: {i.year}</small>&emsp;&emsp;
                    <small>Bắt đầu: {formatDate(i.start)}</small>&emsp;&emsp;
                    <small>Kết thúc: {formatDate(i.end)}</small>&emsp;&emsp;
                  </div>
                </div>
                <div className="d-flex gap-1">
                  <button
                    className="btn btn-light"
                    title="Xem chi tiết"
                    onClick={() => {
                      handleOnClick1();
                      localStorage.setItem("seasonSelected", i.year);
                    }}
                  >
                    <RemoveRedEyeIcon></RemoveRedEyeIcon>
                  </button>
                  <button className="btn btn-light" title="Xóa" onClick={() => {
                    openNotificationWithIcon2("success");
                    localStorage.setItem("seasonDeleteSelected", i._id);
                    deleteSeason();
                  }}>
                    <DeleteIcon></DeleteIcon>
                  </button>

                </div>
                {contextHolder}
                <button
                  className="btn btn-light"
                  title="Chọn mùa giải"
                  onClick={() => {
                    openNotificationWithIcon("success");
                    localStorage.setItem("seasonIDSelected", i._id);
                    localStorage.setItem("seasonNameSelected", i.seasonName);
                    setTimeout(() => {
                      window.location.reload();
                    }, 500);
                  }}
                >
                  <CheckCircleIcon></CheckCircleIcon>
                </button>
              </li>
            ))}
          </ol>
          <div
            className="btn btn-light w-100 m-auto text-secondary"
            data-bs-toggle="modal"
            data-bs-target="#add-season-modal"
          >
            <AddCircleOutlineIcon></AddCircleOutlineIcon>Thêm mùa giải
          </div>
          <div
            className="modal fade"
            id="add-season-modal"
            tabIndex="-1"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5">Biểu mẫu thêm mùa giải</h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body p-4">
                  <form>
                    <div className="d-flex flex-column gap-3">
                      <h6 className="fw-bold text-secondary mb-1">
                        Thông tin mùa giải
                      </h6>
                      <div>
                        <label className="fs-8 mb-1">Tên mùa giải</label>
                        <div className="input-group">
                          <input type="text" className="form-control" id="seasonName" />
                        </div>
                      </div>
                      <div className="row row-cols-3 gx-3">
                        <div className="col">
                          <label className="fs-8 mb-1">Năm</label>
                          <div className="input-group">
                            <input type="number" className="form-control" id="seasonYear" />
                          </div>
                        </div>
                        <div className="col">
                          <label className="fs-8 mb-1">Ngày bắt đầu</label>
                          <div className="input-group">
                            <input type="date" className="form-control" id="seasonStart" />
                          </div>
                        </div>
                        <div className="col">
                          <label className="fs-8 mb-1">Ngày kết thúc</label>
                          <div className="input-group">
                            <input type="date" className="form-control" id="seasonEnd" />
                          </div>
                        </div>
                      </div>
                      <hr className="mb-1" />
                      <h6 className="fw-bold text-secondary mb-1">
                        Điều lệ giải
                      </h6>
                      <div className="row row-cols-3 g-3">
                        <div className="col">
                          <label className="fs-8 mb-1">Số đội bóng</label>
                          <div className="input-group">
                            <input type="number" className="form-control" id="seasonClub" />
                          </div>
                        </div>

                        <div className="col">
                          <label className="fs-8 mb-1">
                            Số ngoại binh tối đa/đội
                          </label>
                          <div className="input-group">
                            <input type="number" className="form-control" id="seasonForeigner" />
                          </div>
                        </div>
                        <div className="col">
                          <label className="fs-8 mb-1">Vị trí xuống hạng</label>
                          <div className="input-group">
                            <input type="number" className="form-control" id="seasonDemotedPosition" />
                          </div>
                        </div>
                        <div className="col">
                          <label className="fs-8 mb-1">
                            Số trận treo giò/thẻ đỏ
                          </label>
                          <div className="input-group">
                            <input type="number" className="form-control" id="seasonRedCard" />
                          </div>
                        </div>
                        <div className="col">
                          <label className="fs-8 mb-1">
                            Tuổi cầu thủ nhỏ nhất
                          </label>
                          <div className="input-group">
                            <input type="number" className="form-control" id="seasonMinAge" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-light"
                    data-bs-dismiss="modal"
                  >
                    Hủy
                  </button>
                  <button type="button" className="btn btn-primary" onClick={() => {
                    let name = $("#seasonName").val();
                    let year = $("#seasonYear").val();
                    let start = $("#seasonStart").val();
                    let end = $("#seasonEnd").val();
                    let totalClub = $("#seasonClub").val();
                    let totalForeigner = $("#seasonForeigner").val();
                    let demotedPosition = $("#seasonDemotedPosition").val();
                    let redCard = $("#seasonRedCard").val();
                    let minAge = $("#seasonMinAge").val();

                    if (
                      name === "" ||
                      year === "" ||
                      start === "" ||
                      end === "" ||
                      totalClub === "" ||
                      totalForeigner === "" ||
                      demotedPosition === "" ||
                      redCard === "" ||
                      minAge === ""
                    ) {
                      openNotificationWithIcon1("error");

                      return;
                    } else {
                      openNotificationWithIcon1("success");
                      submitNewSeason();
                    }
                  }}>
                    Lưu
                  </button>
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

function EditLeague() {
  const [season, setSeason] = useState(null);
  const id = localStorage.getItem("seasonSelected");
  const formatDate = (dateString) => {
    return moment(dateString).format("YYYY-MM-DD");
  };
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type) => {
    api[type]({
      message: type === "success" ? "Chỉnh sửa thành công" : "Vui lòng điền đủ thông tin",
    });
  };
  useEffect(() => {
    axios
      .get(`${API}/${id}`, {
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
      })
      .then((response) => {
        setSeason(response.data.data);
        console.log(response.data.data);
      })
      .catch((err) => { });
  }, []);

  const navigate = useNavigate();
  const handleOnClick = useCallback(
    () => navigate("../edit", { replace: true }),
    [navigate]
  );
  return (
    <>
      <div className="contentUser">
        <Content />
        <div className="main-wrapper">
          <div className="d-flex flex-column gap-4 p-4">
            <h5 className="m-0">Chi tiết mùa giải</h5>
            <div className="bg-white shadow-sm p-4">
              <form id="season-edit-form">
                <div className="d-flex flex-column gap-3">
                  <h6 className="fw-bold text-secondary mb-1">
                    Thông tin mùa giải
                  </h6>
                  <div>
                    <label className="fs-8 mb-1">Tên mùa giải</label>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        defaultValue={season?.seasonName}
                        id="name"
                      />
                    </div>
                  </div>
                  <div className="row row-cols-3 gx-3">
                    <div className="col">
                      <label className="fs-8 mb-1">Năm</label>
                      <div className="input-group">
                        <input
                          type="number"
                          className="form-control"
                          defaultValue={season?.year}
                          id="year"
                        />
                      </div>
                    </div>
                    <div className="col">
                      <label className="fs-8 mb-1">Ngày bắt đầu</label>
                      <div className="input-group">
                        <input
                          type="date"
                          className="form-control"
                          defaultValue={formatDate(season?.start)}
                          id="start"
                        />
                      </div>
                    </div>
                    <div className="col">
                      <label className="fs-8 mb-1">Ngày kết thúc</label>
                      <div className="input-group">
                        <input
                          type="date"
                          className="form-control"
                          defaultValue={formatDate(season?.end)}
                          id="end"
                        />
                      </div>
                    </div>
                  </div>
                  <hr className="mb-1" />
                  <h6 className="fw-bold text-secondary mb-1">Điều lệ giải</h6>
                  <div className="row row-cols-3 g-3">
                    <div className="col">
                      <label className="fs-8 mb-1">Số đội bóng</label>
                      <div className="input-group">
                        <input
                          type="number"
                          className="form-control"
                          defaultValue={season?.rule.totalClubs}
                          id="totalClub"
                        />
                      </div>
                    </div>

                    <div className="col">
                      <label className="fs-8 mb-1">
                        Số ngoại binh tối đa/đội
                      </label>
                      <div className="input-group">
                        <input
                          type="number"
                          className="form-control"
                          defaultValue={season?.rule.maxForeignPlayer}
                          id="totalForeigner"
                        />
                      </div>
                    </div>
                    <div className="col">
                      <label className="fs-8 mb-1">Vị trí xuống hạng</label>
                      <div className="input-group">
                        <input
                          type="number"
                          className="form-control"
                          defaultValue={season?.rule.demotedPosition}
                          id="demotedPosition"
                        />
                      </div>
                    </div>
                    <div className="col">
                      <label className="fs-8 mb-1">
                        Số trận treo giò/thẻ đỏ
                      </label>
                      <div className="input-group">
                        <input
                          type="number"
                          className="form-control"
                          defaultValue={season?.rule.redCardBanned}
                          id="redCard"
                        />
                      </div>
                    </div>
                    <div className="col">
                      <label className="fs-8 mb-1">Tuổi cầu thủ nhỏ nhất</label>
                      <div className="input-group">
                        <input
                          type="number"
                          className="form-control"
                          defaultValue={season?.rule.minAge}
                          id="minAge"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-5 mb-2 d-flex flex-row-reverse gap-2">
                  {contextHolder}

                  <button
                    type="button"
                    id="modify-season-btn"
                    className="btn btn-success fload-end"
                    onClick={() => {
                      let name = $("#name").val();
                      let year = $("#year").val();
                      let start = $("#start").val();
                      let end = $("#end").val();
                      let totalClub = $("#totalClub").val();
                      let totalPlayer = $("#totalPlayer").val();
                      let totalForeigner = $("#totalForeigner").val();
                      let demotedPosition = $("#demotedPosition").val();
                      let redCard = $("#redCard").val();
                      let minAge = $("#minAge").val();

                      if (
                        name === "" ||
                        year === "" ||
                        start === "" ||
                        end === "" ||
                        totalClub === "" ||
                        totalPlayer === "" ||
                        totalForeigner === "" ||
                        demotedPosition === "" ||
                        redCard === "" ||
                        minAge === ""
                      ) {
                        openNotificationWithIcon("error");

                        return;
                      } else {
                        openNotificationWithIcon("success");

                      }
                    }}
                  >
                    Lưu
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function InfoLeague() {
  const [season, setSeason] = useState(null);
  const id = localStorage.getItem("seasonSelected");
  const formatDate = (dateString) => {
    return moment(dateString).format("YYYY-MM-DD");
  };

  useEffect(() => {
    axios
      .get(`${API}/${id}`, {
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
      })
      .then((response) => {
        setSeason(response.data.data);
        console.log(response.data.data);
      })
      .catch((err) => { });
  }, []);

  const navigate = useNavigate();
  const handleOnClick = useCallback(
    () => navigate("../edit", { replace: true }),
    [navigate]
  );
  return (
    <>
      <div className="contentUser">
        <Content />
        <div className="main-wrapper">
          <div className="d-flex flex-column gap-4 p-4">
            <h5 className="m-0">Chi tiết mùa giải</h5>
            <div className="bg-white shadow-sm p-4">
              <form id="season-edit-form">
                <div className="d-flex flex-column gap-3">
                  <h6 className="fw-bold text-secondary mb-1">
                    Thông tin mùa giải
                  </h6>
                  <div>
                    <label className="fs-8 mb-1">Tên mùa giải</label>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        disabled
                        defaultValue={season?.seasonName}
                      />
                    </div>
                  </div>
                  <div className="row row-cols-3 gx-3">
                    <div className="col">
                      <label className="fs-8 mb-1">Năm</label>
                      <div className="input-group">
                        <input
                          type="number"
                          className="form-control"
                          disabled
                          defaultValue={season?.year}
                        />
                      </div>
                    </div>
                    <div className="col">
                      <label className="fs-8 mb-1">Ngày bắt đầu</label>
                      <div className="input-group">
                        <input
                          type="date"
                          className="form-control"
                          disabled
                          defaultValue={formatDate(season?.start)}
                        />
                      </div>
                    </div>
                    <div className="col">
                      <label className="fs-8 mb-1">Ngày kết thúc</label>
                      <div className="input-group">
                        <input
                          type="date"
                          className="form-control"
                          disabled
                          defaultValue={formatDate(season?.end)}
                        />
                      </div>
                    </div>
                  </div>
                  <hr className="mb-1" />
                  <h6 className="fw-bold text-secondary mb-1">Điều lệ giải</h6>
                  <div className="row row-cols-3 g-3">
                    <div className="col">
                      <label className="fs-8 mb-1">Số đội bóng</label>
                      <div className="input-group">
                        <input
                          type="number"
                          className="form-control"
                          disabled
                          defaultValue={season?.rule.totalClubs}
                        />
                      </div>
                    </div>

                    <div className="col">
                      <label className="fs-8 mb-1">
                        Số ngoại binh tối đa/đội
                      </label>
                      <div className="input-group">
                        <input
                          type="number"
                          className="form-control"
                          disabled
                          defaultValue={season?.rule.maxForeignPlayer}
                        />
                      </div>
                    </div>
                    <div className="col">
                      <label className="fs-8 mb-1">Vị trí xuống hạng</label>
                      <div className="input-group">
                        <input
                          type="number"
                          className="form-control"
                          disabled
                          defaultValue={season?.rule.demotedPosition}
                        />
                      </div>
                    </div>
                    <div className="col">
                      <label className="fs-8 mb-1">
                        Số trận treo giò/thẻ đỏ
                      </label>
                      <div className="input-group">
                        <input
                          type="number"
                          className="form-control"
                          disabled
                          defaultValue={season?.rule.redCardBanned}
                        />
                      </div>
                    </div>
                    <div className="col">
                      <label className="fs-8 mb-1">Tuổi cầu thủ nhỏ nhất</label>
                      <div className="input-group">
                        <input
                          type="number"
                          className="form-control"
                          disabled
                          defaultValue={season?.rule.minAge}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-5 mb-2 d-flex flex-row-reverse gap-2">
                  <button
                    type="button"
                    id="modify-season-btn"
                    className="btn btn-success fload-end"
                    onClick={() => {
                      handleOnClick();
                    }}
                  >
                    Chỉnh sửa
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* <div className="allTeamTitle">
        <div style={{ fontWeight: "bold" }}>Mùa giải</div>
        <div>
          <button type="button" className="btn btn-danger" style={{ width: 80 }}>
            Sửa
          </button>
        </div>
      </div>
      <div className="animated fadeIn">
        <div className="row">
          <div className="col-lg-2"></div>
          <div className="col-lg-8">
            <div className="card">
              <div className="card-header">
                <strong>Hồ sơ giải đấu</strong>
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
                      <label for="tendoibong" className=" form-control-label ">
                        Tên giải đấu
                      </label>
                    </div>
                    <div className="col-12 col-md-9">
                      <input
                        type="text"
                        id="tendoibong"
                        name="tendoibong"
                        placeholder="Tên đội bóng"
                        className="form-control"
                        defaultValue={"Manchester United"}
                        required
                      />
                    </div>
                  </div>
                  <div className="row form-group" style={{ marginBottom: 15 }}>
                    <div className="col col-md-3 ">
                      <label for="svd" className=" form-control-label ">
                        Ngày bắt đầu
                      </label>
                    </div>
                    <div className="col-12 col-md-9">
                      <input
                        type="date"
                        id="svd"
                        name="svd"
                        placeholder="Sân vận động"
                        className="form-control"
                        defaultValue={"2023-06-01"}
                        required
                      />
                    </div>
                  </div>
                  <div className="row form-group" style={{ marginBottom: 15 }}>
                    <div className="col col-md-3 ">
                      <label for="hlv" className=" form-control-label ">
                        Ngày kết thúc{" "}
                      </label>
                    </div>
                    <div className="col-12 col-md-9">
                      <input
                        type="date"
                        id="hlv"
                        name="hlv"
                        placeholder="Huấn luyện viên"
                        defaultValue={"2023-06-01"}
                        className="form-control"
                        required
                      />

                    </div>
                  </div>
                  <div className="row form-group" style={{ marginBottom: 15 }}>
                    <div className="col col-md-3 ">
                      <label for="hlv" className=" form-control-label ">
                        Đội bóng tham gia{" "}
                      </label>
                    </div>
                    <div className="col-12 col-md-9">
                      <Select

                        mode="tags"
                        size="large"
                        placeholder="Please select"
                        defaultValue={['MU', 'MCI']}
                        style={{
                          width: '100%',
                        }}
                        options={options}
                      />
                    </div>
                  </div>

                  <div className="row form-group" style={{ marginBottom: 15 }}>
                    <div className="col col-md-3">
                      <label for="logo" className=" form-control-label">
                        Logo
                      </label>
                    </div>
                    <div className="col-12 col-md-9">
                      <ContentPreview />
                    </div>
                    <input type="hidden" id="imgPath" name="imgPath" value="" />
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
      </div> */}
      </div>
    </>
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

export default MyProfile;
