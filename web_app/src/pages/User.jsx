import React from 'react'

import { BrowserRouter, Navigate, Route, Routes, useRoutes } from 'react-router-dom'
import HomeUser from '../components/sidebar/HomeUser'
import MyProfile from '../components/user/MyProfile'
import MyTeam from '../components/user/MyTeam'
import MyPlayer from '../components/user/MyPlayer'
import MyRule from '../components/user/MyRule'
import MyReport from '../components/user/MyReport'
import MyCalendar from '../components/user/MyCalendar'


function User() {

  return (

    <Routes>

      <Route path='/' element={<HomeUser />}>
        <Route index element={<Navigate to="season" replace />} />
        <Route path="season/*" element={<MyProfile />} />
        <Route path="team/*" element={<MyTeam />} />
        <Route path="player/*" element={<MyPlayer />} />
        <Route path="rule/*" element={<MyRule />} />
        <Route path="report/*" element={<MyReport />} />
        <Route path="calendar/*" element={<MyCalendar />} />

      </Route>

    </Routes>
  )
}

export default User
