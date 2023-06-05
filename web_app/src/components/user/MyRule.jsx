import React, { useState, useEffect, useCallback } from "react";
import { Navigate, Routes, Route, useNavigate } from "react-router-dom";
import $ from "jquery";

import "../../style/myteam.css";
import { Col, Row } from "antd";
import muImage from "../../assets/imgs/mu.png";
function MyRule() {
  return (
    <Routes>
      <Route index element={<Navigate to="all" replace />} />

      <Route path="all" element={<AllRule />} />
      <Route path="edit" element={<EditRule />} />

    </Routes>
  );
}




function AllRule() {
  const navigate = useNavigate();
  const handleOnClick = useCallback(
    () => navigate("../edit", { replace: true }),
    [navigate]
  );
  return (
    <div className="contentUser">
      <Content />
      <div className="allTeamTitle">
        <div style={{ fontWeight: "bold" }}>Điều lệ giải đấu</div>
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
            Sửa

          </button>
        </div>
      </div>


      <div className="animated fadeIn">
        <div className="row">
          <div className="col-lg-2">
          </div>
          <div className="col-lg-8">
            <div className="card">
              <div className="card-header">
                <strong>Bảng thông số</strong>
              </div>

              <div className="card-body card-block">
                <form action="/dieule/update/<%=idSeason%>" method="post" className="form-horizontal" id="frmDieule">

                  <div className="row form-group" style={{ marginBottom: 15 }}>

                    <div className="col col-md-4 "><label for="diemthang" className=" form-control-label ">Điểm số
                      thắng</label>
                    </div>
                    <div className="col-12 col-md-2">
                      <input type="number" name="diemthang" id="diemthang"
                        className="form-control-sm form-control" value="1"
                      />

                    </div>
                    <div className="col col-md-4 "><label for="diemhoa" className=" form-control-label ">Điểm số
                      hòa</label>
                    </div>
                    <div className="col-12 col-md-2">
                      <input type="number" name="diemhoa" id="diemhoa" className="form-control-sm form-control"
                        value="1" />

                    </div>

                  </div>


                  <div className="row form-group" style={{ marginBottom: 15 }}>
                    <div className="col col-md-4 "><label for="diemthua" className=" form-control-label ">Điểm số
                      thua</label>
                    </div>
                    <div className="col-12 col-md-2">
                      <input type="number" name="diemthua" id="diemthua" className="form-control-sm form-control"
                        value="1" />

                    </div>
                    <div className="col col-md-4 "><label for="sodoixuonghang" className=" form-control-label ">Số đội
                      xuống hạng</label>
                    </div>
                    <div className="col-12 col-md-2">
                      <input type="number" name="sodoixuonghang" id="sodoixuonghang" className="form-control-sm form-control"
                        value="1" />

                    </div>


                  </div>

                  <div className="row form-group" style={{ marginBottom: 15 }}>

                    <div className="col col-md-4 "><label for="soDoiThamDu" className=" form-control-label ">Số đội tham dự</label>
                    </div>
                    <div className="col-12 col-md-2">
                      <input type="number" min="2" step="2" name="soDoiThamDu" id="soDoiThamDu" className="form-control-sm form-control"
                        value="1" />
                    </div>
                  </div>

                  <div className="row form-group" style={{ marginBottom: 15 }}>

                    <div className="col col-md-4 "><label for="sodoiduC1" className=" form-control-label ">Số đội dự
                      C1</label>
                    </div>
                    <div className="col-12 col-md-2">
                      <input type="number" name="sodoiduC1" id="sodoiduC1" className="form-control-sm form-control"
                        value="1" />

                    </div>
                    <div className="col col-md-4 "><label for="sodoiduC2" className=" form-control-label ">Số đội dự
                      C2</label>
                    </div>

                    <div className="col-12 col-md-2">
                      <input type="number" name="sodoiduC2" id="sodoiduC2" className="form-control-sm form-control"
                        value="1" />

                    </div>
                  </div>

                  <div className="row form-group" style={{ marginBottom: 15 }}>
                    <div className="col col-md-4 ">
                      <label for="ngoaibinhMax" className=" form-control-label ">Số cầu
                        thủ ngoại tối đa</label>
                    </div>
                    <div className="col-12 col-md-2">
                      <input type="number" name="ngoaibinhMax" id="ngoaibinhMax" className="form-control-sm form-control"
                        value="1" />

                    </div>
                    <div className="col col-md-4 "><label for="bugioMax" className=" form-control-label ">Số phút
                      bù giờ tối đa</label>
                    </div>
                    <div className="col-12 col-md-2">
                      <input type="number" name="bugioMax" id="bugioMax" className="form-control-sm form-control"
                        value="1" />

                    </div>
                  </div>
                  <div className="row form-group" style={{ marginBottom: 15 }}>
                    <div className="col col-md-2"><label for="#" className=" form-control-label">Tuổi cầu
                      thủ</label>
                    </div>
                    <div className="col-12 col-md-2">
                      <input type="number" name="tuoiMin" id="tuoiMin" className="form-control-sm form-control"
                        value="1" />

                    </div>
                    <div className="col-12 col-md-2">
                      <input type="number" name="tuoiMax" id="tuoiMax" className="form-control-sm form-control"
                        value="1" />
                    </div>


                    <div className="col col-md-2"><label for="#" className=" form-control-label">Số cầu
                      thủ</label>
                    </div>
                    <div className="col-12 col-md-2">
                      <input type="number" name="cauthuMin" id="cauthuMin" className="form-control-sm form-control"
                        value="1" />
                    </div>

                    <div className="col-12 col-md-2">
                      <input type="number" name="cauthuMax" id="cauthuMax" className="form-control-sm form-control"
                        value="1" />
                    </div>
                  </div>

                  <div className="row form-group" style={{ marginBottom: 15 }}>
                    <div className="col col-md-4 "><label for="#" className=" form-control-label ">Thứ tự ưu
                      tiên</label>
                    </div>
                    <div className="col-12 col-md-8">
                      <input type="text" name="sodoixuonghang" id="sodoixuonghang" className="form-control-sm form-control"
                        value="Điểm - Hệ số - Bàn thắng" />
                      {/* <select id="thutu" name="thutu" className="form-control" required="required"
                      >
                        <option value="1" selected>Điểm - Hệ số - Bàn thắng</option>
                        <option value="2" >Điểm - Bàn thắng - Hệ số</option>
                        <option value="3" >Hệ số - Điểm - Bàn thắng</option>
                        <option value="4" >Hệ số - Bàn thắng - Điểm</option>
                        <option value="5" >Bàn thắng - Điểm - Hệ số</option>
                        <option value="6" >Bàn thắng - Hệ số - Điểm </option>
                      </select> */}
                    </div>
                  </div>


                </form>
              </div>

            </div>
          </div>
        </div>
      </div>
      {/* <script>
    function checkmyinput () {
    // Get inputfield
    var inputfield = document.getElementById("myinput");

    // Get value from inputfield
    var inputval = inputfield.value;

    // Remove non numeric input
    var numeric = inputval.replace(/[^0-9]+/,"");

    // Check if input is numeric and even, if not empty field
    if (numeric.length != inputval.length || numeric%2 != 0) {
        inputfield.value = '';
    }
}
</script> */}

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

function EditRule() {
  return (
    <div className="contentUser">
      <Content />
      <div className="allTeamTitle">
        <div style={{ fontWeight: "bold" }}>Sửa điều lệ</div>
        <div>
          {/* <button type="button" className="btn btn-danger" style={{ width: 80 }}>
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
                <strong>Bảng thông số</strong>
              </div>

              <div className="card-body card-block">
                <form action="/dieule/update/<%=idSeason%>" method="post" className="form-horizontal" id="frmDieule">

                  <div className="row form-group" style={{ marginBottom: 15 }}>

                    <div className="col col-md-4 "><label for="diemthang" className=" form-control-label ">Điểm số
                      thắng</label>
                    </div>
                    <div className="col-12 col-md-2">
                      <input type="number" name="diemthang" id="diemthang"
                        className="form-control-sm form-control" defaultValue="1"
                      />

                    </div>
                    <div className="col col-md-4 "><label for="diemhoa" className=" form-control-label ">Điểm số
                      hòa</label>
                    </div>
                    <div className="col-12 col-md-2">
                      <input type="number" name="diemhoa" id="diemhoa" className="form-control-sm form-control"
                        defaultValue="1" />

                    </div>

                  </div>


                  <div className="row form-group" style={{ marginBottom: 15 }}>
                    <div className="col col-md-4 "><label for="diemthua" className=" form-control-label ">Điểm số
                      thua</label>
                    </div>
                    <div className="col-12 col-md-2">
                      <input type="number" name="diemthua" id="diemthua" className="form-control-sm form-control"
                        defaultValue="1" />

                    </div>
                    <div className="col col-md-4 "><label for="sodoixuonghang" className=" form-control-label ">Số đội
                      xuống hạng</label>
                    </div>
                    <div className="col-12 col-md-2">
                      <input type="number" name="sodoixuonghang" id="sodoixuonghang" className="form-control-sm form-control"
                        defaultValue="1" />

                    </div>


                  </div>

                  <div className="row form-group" style={{ marginBottom: 15 }}>

                    <div className="col col-md-4 "><label for="soDoiThamDu" className=" form-control-label ">Số đội tham dự</label>
                    </div>
                    <div className="col-12 col-md-2">
                      <input type="number" min="2" step="2" name="soDoiThamDu" id="soDoiThamDu" className="form-control-sm form-control"
                        defaultValue="1" />
                    </div>
                  </div>

                  <div className="row form-group" style={{ marginBottom: 15 }}>

                    <div className="col col-md-4 "><label for="sodoiduC1" className=" form-control-label ">Số đội dự
                      C1</label>
                    </div>
                    <div className="col-12 col-md-2">
                      <input type="number" name="sodoiduC1" id="sodoiduC1" className="form-control-sm form-control"
                        defaultValue="1" />

                    </div>
                    <div className="col col-md-4 "><label for="sodoiduC2" className=" form-control-label ">Số đội dự
                      C2</label>
                    </div>

                    <div className="col-12 col-md-2">
                      <input type="number" name="sodoiduC2" id="sodoiduC2" className="form-control-sm form-control"
                        defaultValue="1" />

                    </div>
                  </div>

                  <div className="row form-group" style={{ marginBottom: 15 }}>
                    <div className="col col-md-4 ">
                      <label for="ngoaibinhMax" className=" form-control-label ">Số cầu
                        thủ ngoại tối đa</label>
                    </div>
                    <div className="col-12 col-md-2">
                      <input type="number" name="ngoaibinhMax" id="ngoaibinhMax" className="form-control-sm form-control"
                        defaultValue="1" />

                    </div>
                    <div className="col col-md-4 "><label for="bugioMax" className=" form-control-label ">Số phút
                      bù giờ tối đa</label>
                    </div>
                    <div className="col-12 col-md-2">
                      <input type="number" name="bugioMax" id="bugioMax" className="form-control-sm form-control"
                        defaultValue="1" />

                    </div>
                  </div>
                  <div className="row form-group" style={{ marginBottom: 15 }}>
                    <div className="col col-md-2"><label for="#" className=" form-control-label">Tuổi cầu
                      thủ</label>
                    </div>
                    <div className="col-12 col-md-2">
                      <input type="number" name="tuoiMin" id="tuoiMin" className="form-control-sm form-control"
                        defaultValue="1" />

                    </div>
                    <div className="col-12 col-md-2">
                      <input type="number" name="tuoiMax" id="tuoiMax" className="form-control-sm form-control"
                        defaultValue="1" />
                    </div>


                    <div className="col col-md-2"><label for="#" className=" form-control-label">Số cầu
                      thủ</label>
                    </div>
                    <div className="col-12 col-md-2">
                      <input type="number" name="cauthuMin" id="cauthuMin" className="form-control-sm form-control"
                        defaultValue="1" />
                    </div>

                    <div className="col-12 col-md-2">
                      <input type="number" name="cauthuMax" id="cauthuMax" className="form-control-sm form-control"
                        defaultValue="1" />
                    </div>
                  </div>

                  <div className="row form-group" style={{ marginBottom: 15 }}>
                    <div className="col col-md-4 "><label for="#" className=" form-control-label ">Thứ tự ưu
                      tiên</label>
                    </div>
                    <div className="col-12 col-md-8">

                      <select id="thutu" name="thutu" className="form-control" required="required"
                      >
                        <option value="1" selected>Điểm - Hệ số - Bàn thắng</option>
                        <option value="2" >Điểm - Bàn thắng - Hệ số</option>
                        <option value="3" >Hệ số - Điểm - Bàn thắng</option>
                        <option value="4" >Hệ số - Bàn thắng - Điểm</option>
                        <option value="5" >Bàn thắng - Điểm - Hệ số</option>
                        <option value="6" >Bàn thắng - Hệ số - Điểm </option>
                      </select>
                    </div>
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

export default MyRule;
