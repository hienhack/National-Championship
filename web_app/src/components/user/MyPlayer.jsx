import React, { useState, useEffect, useCallback } from "react";
import { Navigate, Routes, Route, useNavigate } from "react-router-dom";
import $ from "jquery";
import axios from "axios"
import "../../style/myteam.css";
import { Col, Row } from "antd";
import "../../css/style.css";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeleteIcon from '@mui/icons-material/Delete';
import BuildIcon from '@mui/icons-material/Build';
import muImage from "../../assets/imgs/mu.png";
const API = 'http://127.0.0.1:5000/api/player'

function MyTeam() {
  return (
    <Routes>
      <Route index element={<Navigate to="all" replace />} />

      <Route path="all" element={<AllPlayer />} />
      <Route path="add" element={<AddPlayer />} />

    </Routes>
  );
}



function AllPlayer() {
  const [listPlayer, setListPlayer] = useState([]);

  useEffect(() => {


    axios.get(API, {
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json',
      }
    }).
      then(response => {
        setListPlayer(response.data.data)
        console.log(response.data.data)

      }).catch(err => {
      })


  }, [])

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
          <h5 className="m-0">Danh sách cầu thủ</h5>
          <div className="bg-white rounded-2">
            <div className="d-flex flex-column gap-4 p-4">
              <div className="d-flex justify-content-between">
                <form role="search">
                  <div className="d-flex gap-2" style={{ width: "400px" }}>
                    <div className="input-group">
                      <input type="text" className="form-control" />
                    </div>
                    <button className="text-white p-2 rounded-2 bg-primary">search</button>
                  </div>
                </form>
                <div className="d-flex gap-3 align-items-center">
                  <h6 className="text-secondary m-0">Số dòng</h6>
                  <select className="form-select" style={{ width: "100px" }}>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                  </select>
                </div>
              </div>
              <table className="table table-hover play-list-table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Ảnh</th>
                    <th scope="col">Họ tên</th>
                    <th scope="col">Vị trí</th>
                    <th scope="col">Đội bóng</th>
                    <th scope="col">Hoạt động</th>
                  </tr>
                </thead>
                <tbody className="table-group-divider">
                  {listPlayer.map((i, index) => (

                    <tr key={`player_${index}`}>
                      <th style={{ verticalAlign: "middle" }} scope="row">{index + 1}</th>
                      <td>
                        <img className="avatar img-thumbnail"
                          src={i.image}>
                        </img>
                      </td>
                      <td>{i.name}</td>
                      <td>{i.position}</td>
                      <td>Manchester City</td>
                      <td>
                        <button className="btn btn-light" title="Xem thông tin"><RemoveRedEyeIcon></RemoveRedEyeIcon></button>
                        <button className="btn btn-light" title="Xóa"><DeleteIcon></DeleteIcon></button>
                        <button className="btn  btn-light" title="Sửa thông tin" ><BuildIcon></BuildIcon></button>

                      </td>
                    </tr>
                  ))}

                </tbody>
              </table>
              <nav>
                <ul className="pagination float-end">
                  <li className="page-item">
                    <a className="page-link" href="#" aria-label="Previous">
                      <span aria-hidden="true">&laquo;</span>
                    </a>
                  </li>
                  <li className="page-item"><span className="page-link">1</span></li>
                  <li className="page-item"><span className="page-link">2</span></li>
                  <li className="page-item"><span className="page-link">3</span></li>
                  <li className="page-item">
                    <a className="page-link" href="#" aria-label="Next">
                      <span aria-hidden="true">&raquo;</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
}

function AddPlayer() {
  return (
    <div className="contentUser">
      <Content />
      <div className="main">


        <div className="d-flex flex-column gap-4 p-4">
          <h5 className="m-0">Đăng ký cầu thủ</h5>

          <div className="m-auto bg-white shadow rounded-2" style={{ width: 800 }}>
            <div className="d-flex justify-content-between p-4">
              <div className="input-group w-50">
                <i className="fa-solid fa-magnifying-glass input-group-text pt-2"></i>
                <input type="text" className="form-control" placeholder="Tìm cầu thủ các mùa trước..." />
              </div>
              <button id="new-player-btn" className="fs-6 active"><i className="fa-solid fa-circle-check"></i>
                Đăng
                ký mới</button>
            </div>
            <hr className="m-0" />
            <form>
              <div className="row g-4 p-4">
                <div className="col-6">
                  <div className="mb-3">
                    <label className="fs-8 mb-1">Ảnh chụp chân dung</label>
                    <input className="form-control" type="file" id="formFile" />
                  </div>
                  <div className="image-preview img-thumbnail" >
                    <img className="d-block" style={{ objectFit: "cover", width: "100%", height: "100%" }}
                      src="https://www.mancity.com/meta/media/vw0b1q45/ruben-dias.png"></img>
                  </div>
                </div>
                <div className="col-6">
                  <div className="d-flex flex-column gap-3">
                    <div>
                      <label className="fs-8 mb-1">Tên cầu thủ</label>
                      <div className="input-group">
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div>
                      <label className="fs-8 mb-1">Ngày sinh</label>
                      <div className="input-group">
                        <input type="date" className="form-control" />
                      </div>
                    </div>
                    <div>
                      <label className="fs-8 mb-1">Quốc tịch</label>
                      <div className="input-group">
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div>
                      <label className="fs-8 mb-1">Vị trí</label>
                      <select className="form-select" aria-label="Default select example">
                        <option selected>--- Chọn vị trí ---</option>
                        <option value="1">Hậu vệ</option>
                        <option value="2">Tiền vệ</option>
                        <option value="3">Tiền đạo</option>
                      </select>
                    </div>
                    <div>
                      <label className="fs-8 mb-1">Đội bóng</label>
                      <select className="form-select" aria-label="Default select example">
                        <option selected>--- Chọn đội bóng ---</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <hr className="m-0" />
              <div className="p-4">
                <button className="btn btn-primary float-end d-block mb-4">Đăng ký</button>
              </div>
            </form>
          </div>
        </div>
      </div>

    </div>
  );
}

// function ContentPreview() {
//   const [avatar, setAvatar] = useState();

//   const handlePreviewAvatar = (e) => {
//     const file = e.target.files[0];
//     file.preview = URL.createObjectURL(file);

//     setAvatar(file);
//   };

//   return (
//     <>
//       {/* {!avatar && (
//         <img
//           style={{
//             marginTop: 8,
//             marginLeft: "10px",
//             height: "290px",
//             marginBottom: "10px",
//           }}
//           src={listAccount.image}
//           alt=""
//           width="80%"
//         />
//       )} */}

//       {avatar && (
//         <img
//           style={{
//             marginTop: 8,

//             height: "140px",
//             marginBottom: "10px",
//           }}
//           src={avatar.preview}
//           alt=""
//           width="50%"
//         />
//       )}
//       <div >
//         <input type="file" onChange={handlePreviewAvatar} id="contentPDF" />
//       </div>
//     </>
//   );
// }

// function AddTeam() {
//   return (
//     <div className="contentUser">
//       <Content />
//       <div className="allTeamTitle">
//         <div style={{ fontWeight: "bold" }}>Đăng ký cầu thủ</div>
//         <div>
//           {/* <button type="button" className="btn btn-danger" style={{ width: 80 }}>
//             Sửa
//           </button> */}

//         </div>
//       </div>
//       <div className="animated fadeIn">
//         <div className="row">
//           <div className="col-lg-2">
//           </div>
//           <div className="col-lg-8">
//             <div className="card">
//               <div className="card-header">
//                 <strong>Form đăng ký</strong>
//               </div>
//               <div className="card-body card-block">
//                 <form id="register" action="/club/add/<%=idSeason%>" method="post" className="form-horizontal">

//                   <div className="row form-group" style={{ marginBottom: 15 }}>
//                     <div className="col col-md-3 " ><label for="tendoibong" className=" form-control-label ">Tên cầu thủ</label>
//                     </div>
//                     <div className="col-12 col-md-9">
//                       <input type="text" id="tendoibong" name="tendoibong" placeholder="Tên cầu thủ"
//                         className="form-control" required />
//                     </div>
//                   </div>
//                   <div className="row form-group" style={{ marginBottom: 15 }}>
//                     <div className="col col-md-3 "><label for="svd" className=" form-control-label ">Loại cầu thủ</label>
//                     </div>
//                     <div className="col-12 col-md-9">
//                       <select id="loaiCauThu" name="loaiCauThu" className="form-control" required="required">
//                         <option value="1" selected>Cầu thủ nội</option>
//                         <option value="0">Cầu thủ ngoại</option>
//                       </select>
//                     </div>
//                   </div>
//                   <div className="row form-group" style={{ marginBottom: 15 }}>

//                     <div className="col col-md-3 "><label for="hlv" className=" form-control-label ">Vị trí thi đấu </label>
//                     </div>
//                     <div className="col-12 col-md-9">
//                       <select id="viTriThiDau" name="viTriThiDau" className="form-control" required="required">
//                         <option value="1" selected>Thủ môn</option>
//                         <option value="2">Hậu vệ</option>
//                         <option value="3">Tiền vệ</option>
//                         <option value="4">Tiền đạo</option>
//                       </select>
//                     </div>
//                   </div>
//                   <div className="row form-group" style={{ marginBottom: 15 }}>
//                     <div className="col col-md-3 " ><label for="tendoibong" className=" form-control-label ">Quốc tịch</label>
//                     </div>
//                     <div className="col-12 col-md-9">
//                       <input type="text" id="tendoibong" name="tendoibong" placeholder="Quốc tịch"
//                         className="form-control" required />
//                     </div>
//                   </div>
//                   <div className="row form-group" style={{ marginBottom: 15 }}>
//                     <div className="col col-md-3 "><label for="svd" className=" form-control-label ">Ngày sinh</label>
//                     </div>
//                     <div className="col-12 col-md-9">
//                       <input type="date" id="svd" name="svd" className="form-control" required />
//                     </div>
//                   </div>
//                   <div className="row form-group" style={{ marginBottom: 15 }}>

//                     <div className="col col-md-3 "><label for="hlv" className=" form-control-label ">Đội tuyển </label>
//                     </div>
//                     <div className="col-12 col-md-9">
//                       <select id="viTriThiDau" name="viTriThiDau" className="form-control" required="required">
//                         <option value="1" selected>MU</option>
//                         <option value="2">MCI</option>

//                       </select>
//                     </div>
//                   </div>
//                   <div className="row form-group" style={{ marginBottom: 15 }}>
//                     <div className="col col-md-3"><label for="logo" className=" form-control-label">Ảnh đại diện</label></div>
//                     <div className="col-12 col-md-9">
//                       <ContentPreview />
//                     </div>
//                     <input type="hidden" id="imgPath" name="imgPath" value="" />
//                   </div>
//                 </form>
//               </div>
//               <div className="card-footer" style={{ display: "flex", justifyContent: "center" }}>
//                 <button form="register" type="submit" className="btn btn-primary btn-sm" style={{ marginRight: 20 }}>
//                   <i className="fa fa-check"></i> Đăng ký
//                 </button>
//                 <button form="register" type="reset" className="btn btn-danger btn-sm">
//                   <i className="fa fa-ban"> </i> Hủy đăng ký
//                 </button>

//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//     </div>
//   );
// }

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
