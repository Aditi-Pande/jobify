import React from 'react'
import Wrapper from '../assets/wrappers/StatItem'

const StatItems = ({count, title, icon, color, bgc}) => {
  return (
    <Wrapper color={color} bgc={bcg}>
        <header>
            <span className='count'>{count}</span>
            <span className='icon'>{icon}</span>
        </header>
        <h5 className='title'>{title}</h5>
    </Wrapper>
  )
}

export default StatItems
