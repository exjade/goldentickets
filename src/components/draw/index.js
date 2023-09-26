import React from 'react'
import Tickets from './buytickets/tickets'
import DisplayDraw from './show-draw/draw'

const DrawTimeline = () => {
  return (
    <>
      <DisplayDraw />
      <Tickets />
    </>
  )
}

export default DrawTimeline