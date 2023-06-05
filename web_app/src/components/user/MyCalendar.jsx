import React, { useState, useEffect, useCallback } from "react";
import { Navigate, Routes, Route, useNavigate } from "react-router-dom";
import $ from "jquery";

import "../../style/myteam.css";
import { Col, Row } from "antd";
import muImage from "../../assets/imgs/mu.png";
function MyCalendar() {
  return (
    <Routes>
      <Route index element={<Navigate to="all" replace />} />

      <Route path="all" element={<AllCalendar />} />
      <Route path="add" element={<AddMatch />} />
      <Route path="edit" element={<EditMatch />} />

    </Routes>
  );
}

function AllCalendar() {
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
      <div className="allTeamTitle">
        <div style={{ fontWeight: "bold" }}>Lịch thi đấu</div>
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* <button type="button" className="btn btn-danger" style={{ width: 80 }}>
            Sửa
          </button> */}
          <button
            type="button"
            className="btn btn-danger"
            style={{ marginLeft: "15px", width: 140 }}
            onClick={() => {
              handleOnClick();
            }}
          >
            Tạo lịch đấu
          </button>


        </div>
      </div>
      <div class="animated fadeIn" style={{ margin: "0px 20px", marginTop: 20 }}>
        <div class="row">
          <div class="col-md-12">
            <div class="card">
              <div class="card-header">
                <strong class="card-title">Thông tin trận đấu - Vòng </strong>
              </div>
              <div class="card-body">
                <table
                  id="bootstrap-data-table-export"
                  class="table table-striped table-bordered"
                >
                  <thead class="thead-dark">
                    <tr>
                      <th>
                        <select id="round" class="form-control">
                          <option selected>Vòng 1</option>
                          <option>Vòng 2</option>
                          <option>Vòng 3</option>
                          <option>Vòng 4</option>
                          <option>Vòng 5</option>
                        </select>{" "}
                      </th>
                      <th>
                        <i className="fa fa-users"></i> Đội nhà
                      </th>

                      <th>
                        <i className="fa fa-users"></i> Đội khách
                      </th>

                      <th>
                        <i className="fa fa-users"></i> Địa điểm
                      </th>

                      <th>
                        <i className="fa fa-users"></i> Thời gian
                      </th>
                      <th>
                        <i className="fa fa-users"></i> Cập nhật
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>MU</td>
                      <td>MCI</td>
                      <td>Old Trafford</td>
                      <td></td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-danger"

                          onClick={() => {
                            handleOnClick1();
                          }}
                        >
                          Sửa

                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
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
  return (
    <div className="contentUser">
      <Content />
      <div className="allTeamTitle">
        <div style={{ fontWeight: "bold" }}>Tạo trận đấu</div>
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
                        <option value="1" selected>
                          1
                        </option>
                        <option value="2" selected>
                          2
                        </option>
                        <option value="3" selected>
                          3
                        </option>
                      </select>
                    </div>
                  </div>
                  <div className="row form-group" style={{ marginBottom: 15 }}>
                    <div className="col col-md-3 ">
                      <label for="svd" className=" form-control-label ">
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
                        <option value="1" selected>
                          MU
                        </option>
                        <option value="0">MCI</option>
                      </select>
                    </div>
                  </div>
                  <div className="row form-group" style={{ marginBottom: 15 }}>
                    <div className="col col-md-3 ">
                      <label for="svd" className=" form-control-label ">
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
                        <option value="1" selected>
                          MU
                        </option>
                        <option value="0">MCI</option>
                      </select>
                    </div>
                  </div>
                  <div className="row form-group" style={{ marginBottom: 15 }}>
                    <div className="col col-md-3 ">
                      <label for="hlv" className=" form-control-label ">
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
                      >

                      </input>
                    </div>
                  </div>
                  <div className="row form-group" style={{ marginBottom: 15 }}>
                    <div className="col col-md-3 ">
                      <label for="tendoibong" className=" form-control-label ">
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
                      <label for="tendoibong" className=" form-control-label ">
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
                        <option value="1" selected>
                          1
                        </option>
                        <option value="2" selected>
                          2
                        </option>
                        <option value="3" selected>
                          3
                        </option>
                      </select>
                    </div>
                  </div>
                  <div className="row form-group" style={{ marginBottom: 15 }}>
                    <div className="col col-md-3 ">
                      <label for="svd" className=" form-control-label ">
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
                        <option value="1" selected>
                          MU
                        </option>
                        <option value="0">MCI</option>
                      </select>
                    </div>
                  </div>
                  <div className="row form-group" style={{ marginBottom: 15 }}>
                    <div className="col col-md-3 ">
                      <label for="svd" className=" form-control-label ">
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
                        <option value="1" selected>
                          MU
                        </option>
                        <option value="0">MCI</option>
                      </select>
                    </div>
                  </div>
                  <div className="row form-group" style={{ marginBottom: 15 }}>
                    <div className="col col-md-3 ">
                      <label for="hlv" className=" form-control-label ">
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
                      >

                      </input>
                    </div>
                  </div>
                  <div className="row form-group" style={{ marginBottom: 15 }}>
                    <div className="col col-md-3 ">
                      <label for="tendoibong" className=" form-control-label ">
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

export default MyCalendar;
