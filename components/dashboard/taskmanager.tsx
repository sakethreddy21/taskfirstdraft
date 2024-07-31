import React from 'react'
import KabanBoard from '../shared/KabanBoard'

const taskmanager = () => {
  return (
    <div className='flex flex-row text-black justify-between '>
     <KabanBoard />
    </div>
  )
}

export default taskmanager