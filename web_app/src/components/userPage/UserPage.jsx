import React, { useState, useEffect } from "react";
// import ContentUser from "../content/ContentUser";
// import DescribeContentUser from "../content/DescribeContentUser";
import { Link } from "react-router-dom";

// import { Component } from "react";
import style1 from "./style1.module.css";
import "./style1.module.css";
// import "../../style/styleGlobal.js/index.js"
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import ContentPasteOutlinedIcon from "@mui/icons-material/ContentPasteOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import vnImage from "../../assets/imgs/vn.png";


function UserPage() {
  const [listAccount, setList] = useState([]);

  return (
    <>
      <div className={style1.App}>
        <div className={style1.Sidebar}>
          <img src={vnImage} style={{ marginLeft: "90px" }} alt="" height={86} width={86}></img>

          <ul className={style1.SidebarList} style={{ borderTop: "1px solid black" }}>

            <Link to="/user/home">
              <li className={style1.row}>
                <div id={style1.icon}>
                  <HomeOutlinedIcon />
                </div>
                {""}
                <div id={style1.title}>Giải đấu</div>
              </li>
            </Link>
            <Link to="/user/team">
              <li className={style1.row}>
                <div id={style1.icon}>
                  <GroupsOutlinedIcon />
                </div>
                {""}
                <div id={style1.title}>Đội bóng</div>
              </li>
            </Link>
            <Link to="/user/player">
              <li className={style1.row}>
                <div id={style1.icon}>
                  <PersonOutlineOutlinedIcon />
                </div>
                {""}
                <div id={style1.title}>Cầu thủ</div>
              </li>
            </Link>
            <Link to="/user/calendar">
              <li className={style1.row}>
                <div id={style1.icon}>
                  <CalendarMonthOutlinedIcon />
                </div>
                {""}
                <div id={style1.title}>Lịch thi đấu</div>
              </li>
            </Link>
            <Link to="/user/result">
              <li className={style1.row}>
                <div id={style1.icon}>
                  <DescriptionOutlinedIcon />
                </div>
                {""}
                <div id={style1.title}>Kết quả trận đấu</div>
              </li>
            </Link>
            <Link to="/user/report">
              <li className={style1.row}>
                <div id={style1.icon}>
                  <AssignmentTurnedInOutlinedIcon />
                </div>
                {""}
                <div id={style1.title}>Báo cáo</div>
              </li>
            </Link>
            <Link to="/user/rule">
              <li className={style1.row}>
                <div id={style1.icon}>
                  <ContentPasteOutlinedIcon />
                </div>
                {""}
                <div id={style1.title}>Điều lệ giải</div>
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </>
  );
}

export default UserPage;
