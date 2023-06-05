import React, { useState, useEffect } from 'react'
import UserPage from '../userPage/UserPage';

import "./homeUser.css"

import { Outlet } from 'react-router-dom'


function Content(props) {
  const [listAccount, setList] = useState([]);

  useEffect(() => {

    setList(props.data)

  }, [props.data])

  return (
    <>
      <div>
        <div className="cardInfo">
          <div className="mainContentUser"  >
            <p className="text-sm mb-0 text-capitalize font-weight-bold text-center " style={{ marginLeft: "10px", fontSize: "30px", fontWeight: "bold" }}>
              My Profile
            </p>
            <div className="contentUserMain">
              <div>
                <img src={listAccount.Avatar} alt="" height="250" width="200" style={{ marginTop: "5px", marginLeft: "50px", marginRight: "100px" }} />
              </div>
              <div>
                <h5 className="font-weight-bolder mb-0" style={{ paddingBottom: "30px" }}>
                  <span className=" text-sm font-weight-bolder .text-dark" >
                    Username: {listAccount.Username}
                  </span>
                  <br />

                </h5>
                <h5 className="font-weight-bolder mb-0" style={{ paddingBottom: "30px" }}>
                  <span className=" text-sm font-weight-bolder .text-dark">
                    Name: {listAccount.Name}
                  </span>
                  <br />

                </h5>
                <h5 className="font-weight-bolder mb-0" style={{ paddingBottom: "30px" }} >
                  <span className=" text-sm font-weight-bolder .text-dark">
                    Email: {listAccount.Email}
                  </span>
                  <br />

                </h5>
                <h5 className="font-weight-bolder mb-0" style={{ paddingBottom: "30px" }}>
                  <span className=" text-sm font-weight-bolder .text-dark">
                    Type of user: {listAccount.TypeOfUser}
                  </span>
                  <br />

                </h5>
                <h5 className="font-weight-bolder mb-0" >
                  <span className=" text-sm font-weight-bolder .text-dark">
                    Date of birth: {listAccount.DateOfBirth}
                  </span>
                  <br />

                </h5>
              </div>
            </div>


          </div>
        </div>
      </div>
    </>
  )
}

function HomeUser() {
  return (
    <div className='homeUserAll'>
      <div className='homeUser'>

        <div className='sidebarUser' >
          <UserPage />

        </div>
        <div className="contentUser">
          <Outlet />

        </div>

      </div>
    </div>
  )
}

export default HomeUser
