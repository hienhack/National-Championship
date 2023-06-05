import React, { useState, useEffect, useCallback } from "react";
import { Navigate, Routes, Route, useNavigate } from "react-router-dom";
import $ from "jquery";

import "../../style/myteam.css";
import { Col, Row } from "antd";
import muImage from "../../assets/imgs/mu.png";
function MyTeam() {
  return (
    <Routes>
      <Route index element={<Navigate to="rank" replace />} />

      <Route path="rank" element={<AllRank />} />
      <Route path="goal" element={<AllGoal />} />
      <Route path="assist" element={<AllAssist />} />

    </Routes>
  );
}



function AllRank() {
  const navigate = useNavigate();
  const handleOnClick = useCallback(
    () => navigate("../goal", { replace: true }),
    [navigate]
  );
  const handleOnClick1 = useCallback(
    () => navigate("../assist", { replace: true }),
    [navigate]
  );
  return (
    <div className="contentUser">
      <Content />
      <div className="allTeamTitle">
        <div style={{ fontWeight: "bold" }}>Báo cáo &gt; Bảng xếp hạng</div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <button type="button"
            className="btn btn-danger"
            style={{ marginLeft: "15px", width: 120 }}
            onClick={() => {
              handleOnClick();
            }} >
            Top ghi bàn
          </button>
          <button type="button"
            className="btn btn-danger"
            style={{ marginLeft: "15px", width: 120 }}
            onClick={() => {
              handleOnClick();
            }} >
            Top kiến tạo
          </button>
        </div>
      </div>
      <div className="animated fadeIn" style={{ margin: "0px 20px", marginTop: 20 }}>
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <strong className="card-title">Bảng xếp hạng</strong>
              </div>
              <div className="card-body">
                <table id="bootstrap-data-table-export" className="table table-striped table-bordered">
                  <thead className="thead-dark">
                    <tr>
                      <th>TT</th>
                      <th>CLB</th>
                      <th>Số trận</th>
                      <th>Thắng</th>
                      <th>Hòa</th>
                      <th>Thua</th>
                      <th>Bàn thắng</th>
                      <th>Bàn thua</th>
                      <th>Hệ số</th>
                      <th>Điểm</th>
                    </tr>
                  </thead>
                  <tbody>

                    <tr>
                      <td>1</td>
                      <td>MU</td>
                      <td>3</td>
                      <td>1</td>
                      <td>1</td>
                      <td>1</td>
                      <td>7</td>
                      <td>4</td>
                      <td>2</td>
                      <td>4</td>
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
      <div >
        <input type="file" onChange={handlePreviewAvatar} id="contentPDF" />
      </div>
    </>
  );
}

function AllGoal() {
  const navigate = useNavigate();
  const handleOnClick = useCallback(
    () => navigate("../rank", { replace: true }),
    [navigate]
  );
  const handleOnClick1 = useCallback(
    () => navigate("../assist", { replace: true }),
    [navigate]
  );
  return (
    <div className="contentUser">
      <Content />
      <div className="allTeamTitle">
        <div style={{ fontWeight: "bold" }}>Báo cáo &gt; Bàn thắng</div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <button type="button"
            className="btn btn-danger"
            style={{ marginLeft: "15px", width: 140 }}
            onClick={() => {
              handleOnClick();
            }} >
            Bảng xếp hạng
          </button>
          <button type="button"
            className="btn btn-danger"
            style={{ marginLeft: "15px", width: 120 }}
            onClick={() => {
              handleOnClick1();
            }} >
            Top kiến tạo
          </button>
        </div>
      </div>
      <div className="animated fadeIn" style={{ margin: "0px 20px", marginTop: 20 }}>
        <div className="row">

          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <strong className="card-title">Top ghi bàn</strong>
              </div>
              <div className="card-body">
                <table id="bootstrap-data-table-export" className="table table-striped table-bordered">
                  <thead className="thead-dark">
                    <tr>
                      <th>TT</th>
                      <th><i className="fa fa-running"></i> Cầu thủ</th>
                      <th><i className="fa fa-users"></i> Đội bóng</th>
                      <th><i className="fa fa-futbol"></i> Số bàn</th>

                    </tr>
                  </thead>
                  <tbody>

                    <tr>
                      <td>1</td>
                      <td><strong>Messi</strong></td>
                      <td>PSG</td>
                      <td><strong>31</strong></td>
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

function AllAssist() {
  const navigate = useNavigate();
  const handleOnClick = useCallback(
    () => navigate("../goal", { replace: true }),
    [navigate]
  );
  const handleOnClick1 = useCallback(
    () => navigate("../rank", { replace: true }),
    [navigate]
  );
  return (
    <div className="contentUser">
      <Content />
      <div className="allTeamTitle">
        <div style={{ fontWeight: "bold" }}>Báo cáo &gt; Kiến tạo</div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <button type="button"
            className="btn btn-danger"
            style={{ marginLeft: "15px", width: 120 }}
            onClick={() => {
              handleOnClick();
            }} >
            Top ghi bàn
          </button>
          <button type="button"
            className="btn btn-danger"
            style={{ marginLeft: "15px", width: 140 }}
            onClick={() => {
              handleOnClick1();
            }} >
            Bảng xếp hạng
          </button>
        </div>
      </div>
      <div className="animated fadeIn" style={{ margin: "0px 20px", marginTop: 20 }}>
        <div className="row">

          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <strong className="card-title">Top kiến tạo</strong>
              </div>
              <div className="card-body">
                <table id="bootstrap-data-table-export" className="table table-striped table-bordered">
                  <thead className="thead-dark">
                    <tr>
                      <th>TT</th>
                      <th><i className="fa fa-running"></i> Cầu thủ</th>
                      <th><i className="fa fa-users"></i> Đội bóng</th>
                      <th><i className="fa fa-shoe-prints"></i> Số kiến tạo</th>

                    </tr>
                  </thead>
                  <tbody>

                    <tr>
                      <td>1</td>
                      <td><strong>Neymar</strong></td>
                      <td>PSG</td>
                      <td><strong>13</strong></td>
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
