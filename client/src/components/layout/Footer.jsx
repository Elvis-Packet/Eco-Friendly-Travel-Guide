import { Link } from 'react-router-dom';
import styled from 'styled-components';

const FooterContainer = styled.footerbackground-color: #f8f9fa;
  padding: 3rem 5%;
  margin-top: 4rem;
  border-top: 1px solid #e9ecef;;

const FooterContent = styled.divmax-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;;

const FooterSection = styled.divh3 {
    color: #2e7d32;
    font-size: 1.2rem;
    margin-bottom: 1rem;
    font-weight: 600;
  };

const FooterLink = styled(Link)`
  display: block;
  color: #6c757d;
  text-decoration: none;
  margin-bottom: 0.5rem;
  transition: color 0.3s ease;

  &:hover {
    color: #2e7d32;
  }
`;

const SocialLinks = styled.divdisplay: flex;
  gap: 1rem;
  margin-top: 1rem;;

const SocialLink = styled.a`
  color: #6c757d;
  font-size: 1.5rem;
  transition: color 0.3s ease;

  &:hover {
    color: #2e7d32;
  }
`;

const Copyright = styled.divtext-align: center;
  color: #6c757d;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #e9ecef;;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <h3>Quick Links</h3>
          <FooterLink to="/">Home</FooterLink>
          <FooterLink to="/destinations">Destinations</FooterLink>
          <FooterLink to="/my-journals">My Journals</FooterLink>
        </FooterSection>

    <FooterSection>
      <h3>About Us</h3>
      <FooterLink to="#">Our Mission</FooterLink>
      <FooterLink to="#">Sustainability</FooterLink>
      <FooterLink to="#">Contact Us</FooterLink>
    </FooterSection>

    <FooterSection>
      <h3>Connect With Us</h3>
      <p style={{ color: '#6c757d', marginBottom: '1rem' }}>
        Follow us on social media for eco-friendly travel tips and updates.
      </p>
      <SocialLinks>
        <SocialLink href="#" target="_blank" rel="noopener noreferrer">📱</SocialLink>
        <SocialLink href="#" target="_blank" rel="noopener noreferrer">📸</SocialLink>
        <SocialLink href="#" target="_blank" rel="noopener noreferrer">🐦</SocialLink>
      </SocialLinks>
    </FooterSection>
  </FooterContent>

  <Copyright>
    <p>© {new Date().getFullYear()} Eco Wanderer. All rights reserved.</p>
  </Copyright>
</FooterContainer>
  );
};

export default Footer;