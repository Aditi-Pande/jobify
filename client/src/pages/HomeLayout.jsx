import React from 'react'
import { Outlet } from 'react-router-dom';
import Wrapper from '../assets/wrappers/LandingPage';

const homeLayout = () => {
  return <Wrapper>
    <nav></nav>
    <Outlet/>
  </Wrapper>
}

export default homeLayout;
