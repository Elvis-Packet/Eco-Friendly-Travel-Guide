
import styled from 'styled-components';

const LoadingContainer = styled.div`
  display: flex;

import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import styled from 'styled-components';

const MainContainer = styled.divwidth: 100%;
  max-width: 100%;
  margin: 0 auto;
  padding: 0;
  box-sizing: border-box;;

const Layout = () => {
  return (
    <>
      <Navbar />
      <MainContainer>
        <Outlet />
      </MainContainer>
      <Footer />
    </>
  );
};

export default Layout;



import styled from 'styled-components';

const LoadingContainer = styled.divdisplay: flex;

  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;

  height: 200px;
`;

  


const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid rgba(46, 125, 50, 0.1);
  border-radius: 50%;
  border-top-color: #2e7d32;
  animation: spin 1s ease-in-out infinite;
  margin-bottom: 1rem;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;


const LoadingText = styled.p`
  color: #6c757d;
  font-size: 1rem;
`;




const Loading = () => {
  return (
    <LoadingContainer>
      <Spinner />
      <LoadingText>Loading...</LoadingText>
    </LoadingContainer>
  );
};

export default Loading;