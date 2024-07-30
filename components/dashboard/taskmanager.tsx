import React from 'react'
import TodoComponent from './taskmanager/todocomponent'
import UnderReviewComponent from './taskmanager/underreview'
import InProgressComponent from './taskmanager/inprogresscomponent'
import FinishedComponent from './taskmanager/finished'

const taskmanager = () => {
  return (
    <div className='flex flex-row text-black justify-between p-4 '>
        <TodoComponent/>
        <InProgressComponent/>
        <UnderReviewComponent/>
        <FinishedComponent/>
    </div>
  )
}

export default taskmanager