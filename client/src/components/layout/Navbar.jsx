import { Link } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import { useState } from 'react';
import AuthModal from '../auth/AuthModal';

const GlobalFontStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&display=swap');
`;

const NavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 5%;
  width: 100%;
  box-sizing: border-box;
  background-color: #f8f9fa;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 1rem;
  }
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  font-family: 'Quicksand', sans-serif;
  color: #2e7d32; /* Green color for eco-friendly theme */
  text-decoration: none;
  display: flex;
  align-items: center;
  letter-spacing: 0.5px;

  &:hover {
    color: #1b5e20;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    margin-top: 1rem;
    gap: 1rem;
    flex-direction: column;
  }
`;

const NavLink = styled(Link)`
  color: #333;
  text-decoration: none;
  font-weight: 500;
  font-family: 'Quicksand', sans-serif;
  padding: 0.5rem;
  border-radius: 4px;
  transition: all 0.3s ease;

  &:hover, &.active {
    color: #2e7d32;
    background-color: rgba(46, 125, 50, 0.1);
  }
`;

const LoginButton = styled.button`
  background-color: #2e7d32;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #1b5e20;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

// Add logout button style
const LogoutButton = styled.button`
  background-color: #d32f2f; /* Red color */
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #b71c1c; /* Darker red on hover */
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isAuthenticated, logout } = useAppContext();

  return (
    <>
      <GlobalFontStyle />
      <NavContainer>
        <Logo to="/">
          <span role="img" aria-label="leaf">🍃</span> Eco Wanderer
        </Logo>
        <NavLinks>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/destinations">Destinations</NavLink>
          <NavLink to="/my-journals">My Journals</NavLink>
          {isAuthenticated ? (
            <LogoutButton onClick={logout}>
              Sign Out
            </LogoutButton>
          ) : (
            <LoginButton onClick={() => setIsModalOpen(true)}>
              Login
            </LoginButton>
          )}
        </NavLinks>
      </NavContainer>
      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Navbar;