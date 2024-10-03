import React from 'react';
import Wrapper from "../assets/wrappers/LandingPage"
import main from "../assets/images/main.svg"
import { Link } from 'react-router-dom';
import {Logo} from "../components"

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo/>
      </nav>

      <div className="container page">
        <div className="info">
          <h1>Job Tracking App</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Natus dolore error quam adipisci praesentium fuga veritatis 
            voluptatibus delectus, hic consequatur nesciunt fugit rerum 
            eligendi nostrum incidunt, ipsam accusantium quasi temporibus.
          </p>
          <Link to="/register" className='btn register-link'>
            Register
          </Link>
          <Link to="/login" className='btn login-link'>
            Login/ Demo user
          </Link>
        </div>
        <img src={main} alt="jon hunt" className='img main-img'/>
      </div>
    </Wrapper>
  );
};

export default Landing;