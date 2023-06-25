import React, { useState, useEffect, useCallback } from "react";
import { Navigate, Routes, Route, useNavigate, Link } from "react-router-dom";
import $ from "jquery";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowCircleLeftSharpIcon from '@mui/icons-material/ArrowCircleLeftSharp';
import BuildIcon from '@mui/icons-material/Build';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeleteIcon from '@mui/icons-material/Delete';
import "../../style/myteam.css";
import "../../css/content.css";
import { Col, Row, Select } from "antd";
import muImage from "../../assets/imgs/mu.png";
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
        <header className="header d-flex flex-column justify-content-center px-4">
          <h5 className="m-0 fw-semibold">QUẢN LÝ GIẢI VÔ ĐỊCH QUỐC GIA</h5>
          <h6 className="m-0">Vô địch quốc gia Night Wolf 2023</h6>
        </header>

        <div className="main">
          <div className="d-flex flex-column gap-4 p-4">
            <h5 className="m-0">Danh sách đội bóng</h5>
            <div className="row row-cols-4 g-4">
              <div className="col-4 col-xl-3">
                <div className="club-card" onClick={() => {
                  handleOnClick1();
                }}>
                  <img
                    src="https://upload.wikimedia.org/wikipedia/vi/thumb/1/1d/Manchester_City_FC_logo.svg/1200px-Manchester_City_FC_logo.svg.png"
                    className="club-logo"></img>
                  <div className="club-card-body">
                    <h6 className="club-name">Manchester City</h6>
                    <ArrowForwardIcon></ArrowForwardIcon>
                  </div>
                </div>
              </div>
              <div className="col-4 col-xl-3">
                <div className="club-card">
                  <a href="#">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/vi/thumb/1/1d/Manchester_City_FC_logo.svg/1200px-Manchester_City_FC_logo.svg.png"
                      className="club-logo"></img>
                    <div className="club-card-body">
                      <h6 className="club-name">Manchester City</h6>
                      <ArrowForwardIcon></ArrowForwardIcon>
                    </div>
                  </a>
                </div>
              </div>
              <div className="col-4 col-xl-3">
                <div className="club-card">
                  <a href="#">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/vi/thumb/1/1d/Manchester_City_FC_logo.svg/1200px-Manchester_City_FC_logo.svg.png"
                      className="club-logo"></img>
                    <div className="club-card-body">
                      <h6 className="club-name">Manchester City</h6>
                      <ArrowForwardIcon></ArrowForwardIcon>
                    </div>
                  </a>
                </div>
              </div>
              <div className="col-4 col-xl-3">
                <div className="club-card">
                  <a href="#">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/vi/thumb/1/1d/Manchester_City_FC_logo.svg/1200px-Manchester_City_FC_logo.svg.png"
                      className="club-logo"></img>
                    <div className="club-card-body">
                      <h6 className="club-name">Manchester City</h6>
                      <ArrowForwardIcon></ArrowForwardIcon>
                    </div>
                  </a>
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
      <div >
        <input type="file" onChange={handlePreviewAvatar} id="contentPDF" />
      </div>
    </>
  );
}



function AddTeam() {
  return (
    <div className="contentUser">
      <Content />
      <div className="main-wrapper">
        <div class="d-flex flex-column gap-4 p-4">
          <h5 class="m-0">Đăng ký đội bóng</h5>

          <div class="m-auto bg-white shadow rounded-2" style={{ width: "800px;" }}>
            <div class="d-flex justify-content-between p-4">
              <div class="input-group w-50">
                <i class="fa-solid fa-magnifying-glass input-group-text pt-2"></i>
                <input type="text" class="form-control" placeholder="Tìm đội bóng các mùa trước..." />
              </div>
              <button id="new-club-btn" class="fs-6 active"><i class="fa-solid fa-circle-check"></i> Đăng
                ký mới</button>
            </div>
            <hr class="m-0" />
            <form>
              <div class="p-4 d-flex flex-column gap-3">
                <div>
                  <img class="d-block mb-3 m-auto"
                    style={{ maxHeight: "250px", maxWidth: "250px", objectFit: "cover," }}
                    src="https://upload.wikimedia.org/wikipedia/vi/1/1d/Manchester_City_FC_logo.svg">
                  </img>
                  <div class="input-group">
                    <input type="file" class="form-control" />
                  </div>
                </div>
                <div>
                  <label class="fs-8 mb-1">Tên câu lạc bộ</label>
                  <div class="input-group">
                    <input type="text" class="form-control" />
                  </div>
                </div>
                <div>
                  <label class="fs-8 mb-1">Sân nhà</label>
                  <div class="input-group">
                    <input type="text" class="form-control" />
                  </div>
                </div>
                <div>
                  <label class="fs-8 mb-1">Huấn luyện viên</label>
                  <div class="input-group">
                    <input type="text" class="form-control" />
                  </div>
                </div>
              </div>
              <hr class="m-0" />
              <div class="p-4">
                <button class="btn btn-primary float-end d-block mb-4">Đăng ký</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoTeam() {
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
            <img className="club-cover-img rounded-top-1"
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
                  <img className="club-logo"
                    src="https://upload.wikimedia.org/wikipedia/vi/1/1d/Manchester_City_FC_logo.svg">
                  </img>
                  <div>
                    <h2 className="text-light mb-4">Sông Lam Nghệ An</h2>
                    <h6>Sân nhà: Etihad</h6>
                    <h6>Huấn luyện viên: Pep Guardiola</h6>
                  </div>
                </div>
                <button className="btn btn-light" data-bs-toggle="modal"
                  data-bs-target="#edit-club-modal"><BuildIcon></BuildIcon>&emsp;Chỉnh
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
                              <img className="d-block mb-3 m-auto"
                                style={{ maxHeight: 250, maxWidth: 250, objectFit: "cover" }}
                                src="https://upload.wikimedia.org/wikipedia/vi/1/1d/Manchester_City_FC_logo.svg">

                              </img>
                              <div className="input-group">
                                <input type="file" className="form-control" />
                              </div>
                            </div>
                            <div>
                              <label className="fs-8 mb-1">Tên câu lạc bộ</label>
                              <div className="input-group">
                                <input type="text" className="form-control" />
                              </div>
                            </div>
                            <div>
                              <label className="fs-8 mb-1">Sân nhà</label>
                              <div className="input-group">
                                <input type="text" className="form-control" />
                              </div>
                            </div>
                            <div>
                              <label className="fs-8 mb-1">Huấn luyện viên</label>
                              <div className="input-group">
                                <input type="text" className="form-control" />
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-light"
                          data-bs-dismiss="modal">Hủy</button>
                        <button type="button" className="btn btn-primary">Lưu</button>
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
                    <th scope="col">Hoạt động</th>
                  </tr>
                </thead>
                <tbody className="table-group-divider">
                  <tr>
                    <th style={{ verticalAlign: "middle" }} scope="row">03</th>
                    <td>
                      <img className="avatar img-thumbnail"
                        src="https://www.mancity.com/meta/media/vw0b1q45/ruben-dias.png">
                      </img>
                    </td>
                    <td>Ruben Dias</td>
                    <td>Hậu vệ</td>
                    <td>
                      <div className="actions">
                        <button><RemoveRedEyeIcon></RemoveRedEyeIcon></button>
                        <button><DeleteIcon></DeleteIcon></button>
                      </div>
                    </td>
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



function EditPlayer() {
  const options = [{
    value: "MU",
    label: "MU",
  },
  {
    value: "MCI",
    label: "MCI"
  }];
  return (
    <div className="contentUser">
      <Content />
      <div className="allTeamTitle">
        <div style={{ fontWeight: "bold" }}>Đội bóng</div>
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
                <strong>Hồ sơ đội bóng</strong>
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
                        Tên đội bóng
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
                        Sân vận động
                      </label>
                    </div>
                    <div className="col-12 col-md-9">
                      <input
                        type="text"
                        id="svd"
                        name="svd"
                        placeholder="Sân vận động"
                        className="form-control"
                        defaultValue={"Anfield"}
                        required
                      />
                    </div>
                  </div>
                  <div className="row form-group" style={{ marginBottom: 15 }}>
                    <div className="col col-md-3 ">
                      <label for="hlv" className=" form-control-label ">
                        Huấn luyện viên{" "}
                      </label>
                    </div>
                    <div className="col-12 col-md-9">
                      <input
                        type="text"
                        id="hlv"
                        name="hlv"
                        placeholder="Huấn luyện viên"
                        defaultValue={"Park Hang Seo"}
                        className="form-control"
                        required
                      />

                    </div>
                  </div>
                  <div className="row form-group" style={{ marginBottom: 15 }}>
                    <div className="col col-md-3 ">
                      <label for="hlv" className=" form-control-label ">
                        Cầu thủ tham gia{" "}
                      </label>
                    </div>
                    <div className="col-12 col-md-9">
                      <Select

                        mode="tags"
                        size="large"
                        placeholder="Please select"
                        defaultValue={['Foden', 'Neymar']}
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
              <div className="card-footer" style={{ display: "flex", justifyContent: "center" }}>
                <button form="register" type="submit" className="btn btn-primary btn-sm" style={{ marginRight: 20 }}>
                  <i className="fa fa-check"></i> Thay đổi
                </button>
                <button form="register" type="reset" className="btn btn-danger btn-sm">
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
  return (
    <>
      <div >
        <header className="header d-flex flex-column justify-content-center px-4">
          <h5 className="m-0 fw-semibold text-uppercase">Vô địch quốc gia Night Wolf 2023</h5>
        </header>




      </div>
    </>
  );
}

export default MyTeam;
