import React, { useState } from "react";

import { Link } from "react-router-dom";
import TourIcon from '@mui/icons-material/Tour';
// import { Component } from "react";
import style1 from "./style1.module.css";
import "./style1.module.css";
import "../../css/style.css"

import logo from "../../assets/imgs/logo.png";
import PersonIcon from '@mui/icons-material/Person';
import GroupsIcon from '@mui/icons-material/Groups';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
function UserPage() {
  // const [listAccount, setList] = useState([]);
  const [activeMenuItem, setActiveMenuItem] = useState('season');

  const handleMenuClick = (menuItem) => {
    setActiveMenuItem(menuItem);
  };
  return (
    <>
      <link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet' />

      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM"
        crossOrigin="anonymous"
      />
      <link rel="stylesheet" href="web_app\src\font-awesome-4.7.0\css\font-awesome.min.css" />

      <script
        src="https://code.jquery.com/jquery-3.7.0.slim.min.js"
        integrity="sha256-tG5mcZUtJsZvyKAxYLVXrmjKBVLd6VpVccqz/r4ypFE="
        crossOrigin="anonymous"
      ></script>

      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.min.js"
        integrity="sha384-fbbOQedDUMZZ5KreZpsbe1LCZPVmfTnH7ois6mU1QK+m14rQ1l2bGBq41eYeM/fS"
        crossOrigin="anonymous"
      ></script>
      <script src="https://kit.fontawesome.com/8a19b96b6e.js" crossOrigin="anonymous"></script>
      <div className="wrapper">

        <div className="sidebar d-flex flex-column">
          <div className="sidebar-header ps-4">
            <img alt="" src={logo} className="app-logo"></img>
          </div>
          <hr className="mt-0 mx-4 text-secondary" />
          <div className="menu flex-fill px-4">
            <div className="submenu">
              <div className="submenu-btn active" data-bs-toggle="collapse" data-bs-target="#home-menu"
                aria-expanded="true">
                <i className="fa-solid fa-flag"><TourIcon></TourIcon></i>&emsp;Mùa giải
                <i className="fa-solid fa-angle-right float-end menu-arrow"></i>
              </div>
              <ul className="collapse show" id="home-menu">
                <li className={`menu-item ${activeMenuItem === 'season' ? 'active' : ''}`} onClick={() => handleMenuClick('season')}><Link to="/season">Danh sách mùa giải</Link></li>
              </ul>
            </div>
            <h6 className="text-secondary mt-3">Hồ sơ mùa giải</h6>
            <hr className="text-secondary" />
            <div className="d-flex flex-column gap-2">
              <div className="submenu">
                <div className="submenu-btn collapsed" data-bs-toggle="collapse" data-bs-target="#club-menu"
                  aria-expanded="false">
                  <i className="fa-solid fa-users"><GroupsIcon></GroupsIcon></i>&emsp;Đội bóng
                  <i className="fa-solid fa-angle-right float-end menu-arrow"></i>
                </div>
                <ul className="collapse" id="club-menu">
                  <li className={`menu-item ${activeMenuItem === 'club' ? 'active' : ''}`} onClick={() => handleMenuClick('club')}><Link to="/club">Danh sách đội bóng</Link></li>
                  <li className={`menu-item ${activeMenuItem === 'club/add' ? 'active' : ''}`} onClick={() => handleMenuClick('club/add')}><Link to="/club/add">Đăng ký đội bóng</Link></li>
                </ul>
              </div>
              <div className="submenu">
                <div className="submenu-btn collapsed" data-bs-toggle="collapse" data-bs-target="#player-menu"
                  aria-expanded="false">
                  <i className="fa-solid fa-user"><PersonIcon></PersonIcon></i>&emsp;Cầu thủ
                  <i className="fa-solid fa-angle-right float-end menu-arrow"></i>
                </div>
                <ul className="collapse" id="player-menu">
                  <li className={`menu-item ${activeMenuItem === 'player' ? 'active' : ''}`} onClick={() => handleMenuClick('player')}><Link to="/player">Danh sách cầu thủ</Link></li>
                  <li className={`menu-item ${activeMenuItem === 'player/add' ? 'active' : ''}`} onClick={() => handleMenuClick('player/add')}><Link to="/player/add">Đăng ký cầu thủ</Link></li>
                </ul>
              </div>
              <div className="submenu">
                <div className="submenu-btn collapsed" data-bs-toggle="collapse" data-bs-target="#schedule-menu"
                  aria-expanded="false">
                  <i className="fa-solid fa-calendar"><CalendarMonthIcon></CalendarMonthIcon></i>&emsp;Lịch thi đấu
                  <i className="fa-solid fa-angle-right float-end menu-arrow"></i>
                </div>
                <ul className="collapse" id="schedule-menu">
                  <li className={`menu-item ${activeMenuItem === 'schedule/add' ? 'active' : ''}`} onClick={() => handleMenuClick('schedule/add')}><Link to="/schedule/add">Tạo lịch thi đấu</Link></li>
                  <li className={`menu-item ${activeMenuItem === 'schedule/all' ? 'active' : ''}`} onClick={() => handleMenuClick('schedule/all')}><Link to="/schedule/all">Trận đấu</Link></li>

                </ul>
              </div>
              <div className="submenu">
                <div className="submenu-btn collapsed" data-bs-toggle="collapse" data-bs-target="#report-menu"
                  aria-expanded="false">
                  <i className="fa-solid fa-paste"><ContentPasteSearchIcon></ContentPasteSearchIcon></i>&emsp;Báo cáo
                  <i className="fa-solid fa-angle-right float-end menu-arrow"></i>
                </div>
                <ul className="collapse" id="report-menu">
                  <li className={`menu-item ${activeMenuItem === 'report/rank' ? 'active' : ''}`} onClick={() => handleMenuClick('report/rank')}><Link to="/report/rank">Bảng xếp hạng</Link></li>
                  <li className={`menu-item ${activeMenuItem === 'report/goal' ? 'active' : ''}`} onClick={() => handleMenuClick('report/goal')}><Link to="/report/goal">Danh sách ghi bàn</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>



  );
}

export default UserPage;
