import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './TutorNavbar.css';
import { Button } from '../Button';

function TutorNavbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const navigate = useNavigate();

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  const handleLogout = () => {
    // Clear user session (update based on your implementation)
    localStorage.removeItem('email');

    // Redirect to the login page
    navigate('/classtutorlogin');
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  return (
    <>
      <nav className='tutor-navbar'>
        <div className='navbar-container'>
          <Link to='/thome' className='navbar-logo' onClick={closeMobileMenu}>
            HOME
            <i className='fas fa-home fa-sm' />
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/thome' className='nav-links' onClick={closeMobileMenu}>
                Internal Marks
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/thome' className='nav-links' onClick={closeMobileMenu}>
                Attendance
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/thome' className='nav-links' onClick={closeMobileMenu}>
                Performance
              </Link>
            </li>
          </ul>
        </div>
        <div className='nav-out'>
          <li>
            <Link to='/classtutorlogin' className='nav-links-mobile' onClick={handleLogout}>
              Log Out
            </Link>
          </li>
          {button && (
            <Button buttonStyle='btn--outline' onClick={handleLogout}>
              LOG OUT
            </Button>
          )}
        </div>
      </nav>
    </>
  );
}

export default TutorNavbar;
