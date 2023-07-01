import React from 'react'

import { BrowserRouter, Navigate, Route, Routes, useRoutes } from 'react-router-dom'
import HomeUser from '../components/sidebar/HomeUser'
import MyProfile from '../components/user/Season'
import MyTeam from '../components/user/Team'
import MyPlayer from '../components/user/Player'
import MyReport from '../components/user/Report'
import MyCalendar from '../components/user/Match'


function User() {

  return (

    <Routes>

      <Route path='/' element={<HomeUser />}>
        <Route index element={<Navigate to="season" replace />} />
        <Route path="season/*" element={<MyProfile />} />
        <Route path="club/*" element={<MyTeam />} />
        <Route path="player/*" element={<MyPlayer />} />
        <Route path="report/*" element={<MyReport />} />
        <Route path="schedule/*" element={<MyCalendar />} />

      </Route>

    </Routes>
  )
}

export default User
