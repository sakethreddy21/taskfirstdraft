import React from 'react'
import TodoComponent from './taskmanager/todocomponent'
import UnderReviewComponent from './taskmanager/underreview'
import InProgressComponent from './taskmanager/inprogresscomponent'
import FinishedComponent from './taskmanager/finished'
import KabanBoard from '../shared/KabanBoard'

const taskmanager = () => {
  return (
    <div className='flex flex-row text-black justify-between '>
     <KabanBoard />
    </div>
  )
}

export default taskmanager