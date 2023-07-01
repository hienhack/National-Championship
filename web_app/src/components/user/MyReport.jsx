import React, { useState, useEffect, useCallback } from "react";
import { Navigate, Routes, Route, useNavigate } from "react-router-dom";
import $ from "jquery";
import axios from "axios"

import "../../style/myteam.css";
import { Col, Row } from "antd";
import muImage from "../../assets/imgs/mu.png";
const API = "http://127.0.0.1:5000/api/report";

function MyTeam() {
  return (
    <Routes>
      <Route index element={<Navigate to="rank" replace />} />

      <Route path="rank" element={<AllRank />} />
      <Route path="goal" element={<AllGoal />} />
      {/* <Route path="assist" element={<AllAssist />} /> */}

    </Routes>
  );
}



function AllRank() {
  const [listTeam, setListTeam] = useState([]);
  const id = localStorage.getItem("seasonIDSelected");
  useEffect(() => {


    axios.get(`${API}/${id}/standings`, {
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json',
      },


    }).
      then(response => {
        setListTeam(response.data.data);
        console.log(response.data.data)

      }).catch(err => {
      })


  }, [])

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
      <div className="main-wrapper">
        <div className="d-flex flex-column gap-4 p-4">
          <h5 className="m-0">Bảng xếp hạng</h5>

          <div className="bg-white rounded-2 p-4">
            <table className="standings table table-hover club-player-table">
              <thead>
                <tr style={{ textAlign: "center" }}>
                  <th scope="col">STT</th>
                  <th scope="col">Đội bóng</th>
                  <th scope="col">Đã đấu</th>
                  <th scope="col">Thắng</th>
                  <th scope="col">Thua</th>
                  <th scope="col">Hòa</th>
                  <th scope="col">Bàn thắng</th>
                  <th scope="col">Bàn thua</th>
                  <th scope="col">Hiệu số</th>
                  <th scope="col">Điểm</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {listTeam.map((i, index) => (

                  <tr style={{ textAlign: "center" }} key={`rank_${index}`}>
                    <th scope="row">{index}</th>

                    {/* <img alt="" style={{ height: 30, width: 30, marginRight: 5 }}
                      src="https://upload.wikimedia.org/wikipedia/vi/thumb/1/1d/Manchester_City_FC_logo.svg/1200px-Manchester_City_FC_logo.svg.png" /> */}
                    <td>{i.name}</td>
                    <td>{i.Played}</td>
                    <td>{i.won}</td>
                    <td>{i.lost}</td>
                    <td>{i.drawn}</td>
                    <td>{i.scored}</td>
                    <td>{i.conceded}</td>
                    <td>{i.goalDifference}</td>
                    <td>{i.points}</td>
                  </tr>
                ))}


              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div >
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
  const [listTeam, setListTeam] = useState([]);
  const id = localStorage.getItem("seasonIDSelected");
  useEffect(() => {


    axios.get(`${API}/${id}/goals`, {
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json',
      },
      params: {
        seasonId: id
      }

    }).
      then(response => {
        setListTeam(response.data.data);
        console.log(response.data.data)

      }).catch(err => {
      })


  }, [])
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
      <div className="main-wrapper">
        <div className="d-flex flex-column gap-4 p-4">
          <h5 className="m-0">Danh sách cầu thủ ghi bàn</h5>

          <div className="bg-white rounded-2 p-4">
            <table className="scored-players table table-hover club-player-table">
              <thead>
                <tr>
                  <th scope="col">STT</th>
                  <th scope="col">Cầu thủ</th>
                  <th scope="col">Đội bóng</th>
                  <th scope="col">Số bàn thắng</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {listTeam.map((i, index) => (

                  <tr>
                    <td scope="row">{index}</td>
                    <td>{i.player}</td>
                    <td>{i.club}</td>
                    <td>{i.goals}</td>
                  </tr>
                ))}

              </tbody>
            </table>
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

export default MyTeam;
