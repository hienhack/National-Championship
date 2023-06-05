import React from 'react'

import "../../style/header.css"
import { Link } from 'react-router-dom';

function header() {
  return (
    <>

      <div className='headerNew'>
        <div className='headerItemHome'>
          <a
            className="navbar-brand"
            href="/"
          >
            Home
          </a> </div>
        <div className='headerItemProfile'>
          <a
            className="nav-link mx-2 active"
            aria-current="page"
            style={{ cursor: "pointer" }}
          >
            Profile
          </a></div>
        {/* <div className='headerItemAbout'> AboutUs</div> */}
        <div className='headerItemAccount'>
          <div className="dropdown">

            <div className="dropdown__trigger">
              Account

            </div>


          </div>
        </div>


      </div>
      <div className={"background"} style={{ "zIndex": "2" }}>
        <img src="https://storyshares.blob.core.windows.net/media/staff_pick/biddyweb.jpg" alt="book" />
      </div>
    </>
  )
}

export default header
