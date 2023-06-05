import React, { useState, useEffect, useCallback } from "react";
import { Navigate, Routes, Route, useNavigate } from "react-router-dom";
import $ from "jquery";

import "../../style/myteam.css";
import { Col, Row } from "antd";
import muImage from "../../assets/imgs/mu.png";
function MyTeam() {
  return (
    <Routes>
      <Route index element={<Navigate to="all" replace />} />

      <Route path="all" element={<AllTeam />} />
      <Route path="add" element={<AddTeam />} />

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
    () => navigate("../edit", { replace: true }),
    [navigate]
  );
  return (
    <div className="contentUser">
      <Content />
      <div className="allTeamTitle">
        <div style={{ fontWeight: "bold" }}>Danh sách cầu thủ</div>
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* <button type="button" class="btn btn-danger" style={{ width: 80 }}>
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
          <input type="text" placeholder="Search.." style={{ marginLeft: "15px", height: 37, }} className="search" />
          <button type="button"
            className="btn btn-danger" style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }} >Search</button>{" "}
        </div>
      </div>
      <div className="card-body" style={{ margin: "0px 20px", marginTop: 20 }}>
        <table id="bootstrap-data-table-export" className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th><i className="fa fa-user"></i> Cầu thủ</th>
              <th><i className="fa fa-users"></i> Đội bóng</th>
              <th><i className="fa fa-calendar-alt"></i> Ngày sinh</th>
              <th ><i className="fa fa-flag"></i> Quốc tịch</th>
              <th ><i className="fa fa-futbol" />Bàn thắng</th>
              <th><i className="fa fa-shoe-prints" />Kiến tạo</th>
              <th><i className="fa fa-file fa-file-yellow" />Thẻ vàng</th>
              <th><i className="fa fa-file fa-file-red" />Thẻ đỏ</th>
              <th> Cập nhật</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <a data-toggle="modal" data-target="#largeModal"><strong> Trần Văn Thật
                </strong></a>
                <br></br>
                Tiền đạo
              </td>
              <td>CTT3</td>
              <td>20/04/2002</td>
              <td>Việt Nam</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
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
      <div className="allTeamTitle">
        <div style={{ fontWeight: "bold" }}>Đăng ký cầu thủ</div>
        <div>
          {/* <button type="button" class="btn btn-danger" style={{ width: 80 }}>
            Sửa
          </button> */}

        </div>
      </div>
      <div className="animated fadeIn">
        <div className="row">
          <div className="col-lg-2">
          </div>
          <div className="col-lg-8">
            <div className="card">
              <div className="card-header">
                <strong>Form đăng ký</strong>
              </div>
              <div className="card-body card-block">
                <form id="register" action="/club/add/<%=idSeason%>" method="post" className="form-horizontal">

                  <div className="row form-group" style={{ marginBottom: 15 }}>
                    <div className="col col-md-3 " ><label for="tendoibong" className=" form-control-label ">Tên cầu thủ</label>
                    </div>
                    <div className="col-12 col-md-9">
                      <input type="text" id="tendoibong" name="tendoibong" placeholder="Tên cầu thủ"
                        className="form-control" required />
                    </div>
                  </div>
                  <div className="row form-group" style={{ marginBottom: 15 }}>
                    <div className="col col-md-3 "><label for="svd" className=" form-control-label ">Loại cầu thủ</label>
                    </div>
                    <div className="col-12 col-md-9">
                      <select id="loaiCauThu" name="loaiCauThu" className="form-control" required="required">
                        <option value="1" selected>Cầu thủ nội</option>
                        <option value="0">Cầu thủ ngoại</option>
                      </select>
                    </div>
                  </div>
                  <div className="row form-group" style={{ marginBottom: 15 }}>

                    <div className="col col-md-3 "><label for="hlv" className=" form-control-label ">Vị trí thi đấu </label>
                    </div>
                    <div className="col-12 col-md-9">
                      <select id="viTriThiDau" name="viTriThiDau" className="form-control" required="required">
                        <option value="1" selected>Thủ môn</option>
                        <option value="2">Hậu vệ</option>
                        <option value="3">Tiền vệ</option>
                        <option value="4">Tiền đạo</option>
                      </select>
                    </div>
                  </div>
                  <div className="row form-group" style={{ marginBottom: 15 }}>
                    <div className="col col-md-3 " ><label for="tendoibong" className=" form-control-label ">Quốc tịch</label>
                    </div>
                    <div className="col-12 col-md-9">
                      <input type="text" id="tendoibong" name="tendoibong" placeholder="Quốc tịch"
                        className="form-control" required />
                    </div>
                  </div>
                  <div className="row form-group" style={{ marginBottom: 15 }}>
                    <div className="col col-md-3 "><label for="svd" className=" form-control-label ">Ngày sinh</label>
                    </div>
                    <div className="col-12 col-md-9">
                      <input type="date" id="svd" name="svd" className="form-control" required />
                    </div>
                  </div>
                  <div className="row form-group" style={{ marginBottom: 15 }}>

                    <div className="col col-md-3 "><label for="hlv" className=" form-control-label ">Đội tuyển </label>
                    </div>
                    <div className="col-12 col-md-9">
                      <select id="viTriThiDau" name="viTriThiDau" className="form-control" required="required">
                        <option value="1" selected>MU</option>
                        <option value="2">MCI</option>

                      </select>
                    </div>
                  </div>
                  <div className="row form-group" style={{ marginBottom: 15 }}>
                    <div className="col col-md-3"><label for="logo" className=" form-control-label">Ảnh đại diện</label></div>
                    <div className="col-12 col-md-9">
                      <ContentPreview />
                    </div>
                    <input type="hidden" id="imgPath" name="imgPath" value="" />
                  </div>
                </form>
              </div>
              <div className="card-footer" style={{ display: "flex", justifyContent: "center" }}>
                <button form="register" type="submit" className="btn btn-primary btn-sm" style={{ marginRight: 20 }}>
                  <i className="fa fa-check"></i> Đăng ký
                </button>
                <button form="register" type="reset" className="btn btn-danger btn-sm">
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

export default MyTeam;
