import React from 'react'
import AdminTimeline from '../components/admin/index'
//hooks
import useUser from '../hooks/use-user'

import '../styles/header/header.module.css'

const DashboardAdmin = () => {
  const { user } = useUser()

  return (
    <>
      {
        user?.rol === 'admin' ? (
          <>
            <AdminTimeline />
          </>

        ) : null
      }

    </>
  )
}

export default DashboardAdmin