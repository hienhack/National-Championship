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
      "Content-Type": "application/json"
    },
    body: JSON.stringify(idBook),
  })
    .then((result) => {
      window.location.reload(false);
    })
    .catch((error) => { });
};

const submitNewSeason = async () => {
  let name = $("#seasonName").val();
  let year = $("#seasonYear").val();
  let start = $("#seasonStart").val();
  let end = $("#seasonEnd").val();
  let totalClub = $("#seasonClub").val();
  let totalPlayer = $("#seasonPlayer").val();
  let totalForeigner = $("#seasonForeigner").val();
  let demotedPosition = $("#seasonDemotedPosition").val();
  let redCard = $("#seasonRedCard").val();
  let minAge = $("#seasonMinAge").val();

  const requestData = {
    seasonName: name,
    year: parseInt(year),
    start: moment(start).toISOString(),
    end: moment(end).toISOString(),
    rule: {
      demotedPosition: parseInt(demotedPosition),
      minAge: parseInt(minAge),
      redCardBanned: parseInt(redCard),
      totalClubs: parseInt(totalClub),
      maxForeignPlayer: parseInt(totalForeigner),
      maxClubPlayer: parseInt(totalPlayer)
    }
  };

  await fetch("http://127.0.0.1:5000/api/season/create", {
    method: "POST",
    body: JSON.stringify(requestData),
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
  })
    .then((result) => { })
    .catch((error) => { });
  window.location.reload(false);

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
                      localStorage.setItem("seasonIDSelected", i._id);

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
                          <label className="fs-8 mb-1">Số cầu thủ tối đa/đội</label>
                          <div className="input-group">
                            <input type="number" className="form-control" id="seasonPlayer" />
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

const submitUpdateSeason = async () => {
  let id = localStorage.getItem("seasonIDSelected");
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

  const requestData = {
    _id: id,
    seasonName: name,
    year: parseInt(year),
    start: moment(start).toISOString(),
    end: moment(end).toISOString(),
    rule: {
      demotedPosition: parseInt(demotedPosition),
      minAge: parseInt(minAge),
      redCardBanned: parseInt(redCard),
      totalClubs: parseInt(totalClub),
      maxForeignPlayer: parseInt(totalForeigner),
      maxClubPlayer: parseInt(totalPlayer)
    }
  };
  await fetch("http://127.0.0.1:5000/api/season/update", {
    method: "POST",
    body: JSON.stringify(requestData),
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
  })
    .then((result) => { })
    .catch((error) => { });
  window.location.reload(false);
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
                      <label className="fs-8 mb-1">Số cầu thủ tối đa/đội</label>
                      <div className="input-group">
                        <input
                          type="number"
                          className="form-control"
                          defaultValue={season?.rule.maxClubPlayer}
                          id="totalPlayer"

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
                      // let totalPlayer = $("#totalPlayer").val();
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
                        // totalPlayer === "" ||
                        totalForeigner === "" ||
                        demotedPosition === "" ||
                        redCard === "" ||
                        minAge === ""
                      ) {
                        openNotificationWithIcon("error");

                        return;
                      } else {
                        openNotificationWithIcon("success");
                        submitUpdateSeason();
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
                      <label className="fs-8 mb-1">Số cầu thủ tối đa/đội</label>
                      <div className="input-group">
                        <input
                          type="number"
                          className="form-control"
                          disabled
                          defaultValue={season?.rule.maxClubPlayer}
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
