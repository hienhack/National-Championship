import React, { useState, useEffect, useCallback } from "react";
import { Select } from 'antd';

import { Navigate, Routes, Route, useNavigate } from "react-router-dom";
import "../../style/myteam.css";
import { Col, Row } from "antd";
import muImage from "../../assets/imgs/mu.png";
function MyProfile() {
  return (
    <Routes>
      <Route index element={<Navigate to="all" replace />} />

      <Route path="all" element={<AllLeague />} />
      <Route path="add" element={<AddLeague />} />
      <Route path="info" element={<InfoLeague />} />
      <Route path="edit" element={<EditLeague />} />

    </Routes>
  );
}

const alleague = [
  {
    image: muImage,
    name: "Manchester United",
  },
  {
    image: muImage,
    name: "Manchester United",
  },
  {
    image: muImage,
    name: "Manchester United",
  },
  {
    image: muImage,
    name: "Manchester United",
  },
  {
    image: muImage,
    name: "Manchester United",
  },
  {
    image: muImage,
    name: "Manchester United",
  },
  {
    image: muImage,
    name: "Manchester United",
  },
  {
    image: muImage,
    name: "Manchester United",
  },
];

function AllLeague() {
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
      <div className="allTeamTitle">
        <div style={{ fontWeight: "bold" }}>Danh sách giải đấu</div>
        <div>
          {/* <button type="button" className="btn btn-danger" style={{ width: 80 }}>
            Sửa
          </button> */}
          <button
            type="button"
            className="btn btn-danger"
            style={{ marginLeft: "15px", width: 80 }}
            onClick={() => {
              handleOnClick();
            }}
          >
            Thêm
          </button>
        </div>
      </div>
      <div className="myTeamContainer">
        <Row gutter={[36, 36]} style={{ padding: "0px 20px" }}>
          {alleague.map((i, index) => (
            <Col md={{ span: 6 }} xs={24} key={`analytic_${index}`}>
              <div
                style={{
                  border: "1px solid black",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "10px 0px",
                  background: "white",
                }}
              >
                <div style={{ fontSize: 20, fontWeight: "bold" }}>{i.name}</div>
                <img
                  src={i.image}
                  style={{ margin: "10px 0px" }}
                  alt=""
                  height={80}
                  width={80}
                ></img>
                <button
                  type="button"
                  className="btn btn-danger"
                  style={{ width: 140 }}
                  onClick={() => {
                    handleOnClick1();
                  }}
                >
                  Xem thông tin
                </button>
              </div>
            </Col>
          ))}
        </Row>
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

function AddLeague() {
  return (
    <div className="contentUser">
      <Content />
      <div className="allTeamTitle">
        <div style={{ fontWeight: "bold" }}>Đăng ký giải đấu</div>
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
                <strong>Form đăng ký</strong>
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
                        className="form-control"
                        required
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
                  <i className="fa fa-check"></i> Đăng ký
                </button>
                <button
                  form="register"
                  type="reset"
                  className="btn btn-danger btn-sm"
                >
                  <i className="fa fa-ban"> </i> Hủy đăng ký
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoLeague() {
  const navigate = useNavigate();
  const handleOnClick = useCallback(
    () => navigate("../edit", { replace: true }),
    [navigate]
  );
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
        <div style={{ fontWeight: "bold" }}>Mùa giải</div>
        <div>
          <button type="button" className="btn btn-danger" style={{ width: 80 }} onClick={() => {
            handleOnClick();
          }}>
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
                        disabled="disabled"
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
                        disabled="disabled"
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
                        disabled="disabled"
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
                        disabled="disabled"

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

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function EditLeague() {
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
      </div>
    </div>
  );
}

function Content(props) {
  return (
    <>
      <div>
        <div id="right-panel" className="right-panel">
          <header id="header" className="header bg-light text-dark">
            <div className="header-menu ">
              <div
                className="col-sm-24 "
                style={{
                  marginTop: "30px",
                  borderBottom: "1px solid black",
                  width: "100%",
                  textAlign: "center",
                  paddingBottom: 24,
                }}
              >
                <h3 className="">GIẢI BÓNG ĐÁ VÔ ĐỊCH QUỐC GIA</h3>
              </div>
            </div>
          </header>
        </div>
        <div className="animated fadeIn">
          {/* <div className="row">
            <div className="col-lg-2">
            </div>
            <div className="col-lg-8">
              <div className="card">
                <div className="card-header">
                  <strong>Form đăng ký</strong>
                </div>
                <div className="card-body card-block">
                  <form id="register" action="/club/add/<%=idSeason%>" method="post" className="form-horizontal">

                    <div className="row form-group">
                      <div className="col col-md-3 "><label for="tendoibong" className=" form-control-label ">Tên đội
                        bóng</label>
                      </div>
                      <div className="col-12 col-md-9">
                        <input type="text" id="tendoibong" name="tendoibong" placeholder="Tên đội bóng"
                          className="form-control" required />
                      </div>
                    </div>
                    <div className="row form-group">
                      <div className="col col-md-3 "><label for="svd" className=" form-control-label ">Sân vận
                        động</label>
                      </div>
                      <div className="col-12 col-md-9">
                        <input type="text" id="svd" name="svd" placeholder="Sân vận động" className="form-control" required />
                      </div>
                    </div>
                    <div className="row form-group">

                      <div className="col col-md-3 "><label for="hlv" className=" form-control-label ">Huấn luyện
                        viên </label>
                      </div>
                      <div className="col-12 col-md-9">
                        <input type="text" id="hlv" name="hlv" placeholder="Huấn luyện viên"
                          className="form-control" required />
                      </div>
                    </div>
                    <div className="row form-group">
                      <div className="col col-md-3"><label for="logo" className=" form-control-label">Logo</label></div>
                      <div className="col-12 col-md-9">
                        <div className="file-loading">
                          <input value="" id="logo" name="logo" type="file" multiple />
                        </div>
                      </div>
                      <input type="hidden" id="imgPath" name="imgPath" value="" />
                    </div>
                  </form>
                </div>
                <div className="card-footer">
                  <button form="register" type="submit" className="btn btn-primary btn-sm">
                    <i className="fa fa-check"></i> Đăng ký
                  </button>
                  <button form="register" type="reset" className="btn btn-danger btn-sm">
                    <i className="fa fa-ban"> </i> Hủy đăng ký
                  </button>

                </div>
              </div>
            </div> */}
          {/* </div> */}
        </div>
      </div>
    </>
  );
}

export default MyProfile;
