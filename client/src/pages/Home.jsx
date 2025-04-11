import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAppContext } from '../context/AppContext';

const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 4rem 1rem;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
              url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3') center/cover no-repeat;
  color: white;
  border-radius: 8px;
  margin: 2rem 0;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  max-width: 800px;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const CTAButton = styled(Link)`
  background-color: #2e7d32;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #1b5e20;
  }
`;

const FeaturesSection = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem 0;
`;

const FeatureCard = styled.div`
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const FeatureIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #2e7d32;
`;

const FeatureDescription = styled.p`
  color: #6c757d;
`;

const DestinationPreview = styled.section`
  margin: 3rem 0;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 2rem;
  color: #2e7d32;

  &::after {
    content: '';
    display: block;
    width: 50px;
    height: 3px;
    background-color: #2e7d32;
    margin: 0.5rem auto;
  }
`;

const DestinationGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 0 2rem;
  justify-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const DestinationCard = styled.div`
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const DestinationImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const DestinationInfo = styled.div`
  padding: 1.5rem;
`;

const DestinationName = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #333;
`;

const DestinationRating = styled.div`
  display: flex;
  align-items: center;
  color: #f9a825;
  margin-bottom: 1rem;
`;

const ViewMoreLink = styled(Link)`
  display: block;
  text-align: center;
  margin-top: 2rem;
  color: #2e7d32;
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

const Home = () => {
  const { destinations, loading, error } = useAppContext();

  // Display only the first 3 destinations as a preview
  const previewDestinations = destinations.slice(0, 3);

  return (
    <>
      <HeroSection>
        <HeroTitle>Discover Sustainable Travel Destinations</HeroTitle>
        <HeroSubtitle>
          Explore eco-friendly destinations around the world while minimizing your environmental footprint.
          Our curated travel guide helps you make responsible choices for a greener planet.
        </HeroSubtitle>
        <CTAButton to="/destinations">Explore Destinations</CTAButton>
      </HeroSection>

      <FeaturesSection>
        <FeatureCard>
          <FeatureIcon>🌿</FeatureIcon>
          <FeatureTitle>Eco-Friendly Destinations</FeatureTitle>
          <FeatureDescription>
            Discover destinations committed to sustainability and environmental conservation.
          </FeatureDescription>
        </FeatureCard>

        <FeatureCard>
          <FeatureIcon>🏡</FeatureIcon>
          <FeatureTitle>Sustainable Accommodations</FeatureTitle>
          <FeatureDescription>
            Find eco-conscious stays that minimize environmental impact while maximizing comfort.
          </FeatureDescription>
        </FeatureCard>

        <FeatureCard>
          <FeatureIcon>📝</FeatureIcon>
          <FeatureTitle>Travel Journals</FeatureTitle>
          <FeatureDescription>
            Share your experiences and tips with other eco-conscious travelers.
          </FeatureDescription>
        </FeatureCard>
      </FeaturesSection>

      <DestinationPreview>
        <SectionTitle>Featured Destinations</SectionTitle>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <div className="loading-spinner"></div>
            <p>Loading destinations...</p>
          </div>
        ) : error ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#d32f2f' }}>
            <p>{error}</p>
          </div>
        ) : previewDestinations.length > 0 ? (
          <>
            <DestinationGrid>
              {previewDestinations.map(destination => (
                <DestinationCard key={destination.id}>
                  <Link to={`/destinations/${destination.id}`}>
                    <DestinationImage src={destination.image_url || destination.image} alt={destination.name} />
                  </Link>
                  <DestinationInfo>
                    <DestinationName>{destination.name}</DestinationName>
                    <DestinationRating>
                      ★ {destination.rating ? destination.rating.toFixed(1) : '4.5'}
                    </DestinationRating>
                    <Link to={`/destinations/${destination.id}`}>View Details</Link>
                  </DestinationInfo>
                </DestinationCard>
              ))}
            </DestinationGrid>
            <ViewMoreLink to="/destinations">View All Destinations</ViewMoreLink>
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <p>No destinations available at the moment. Please check back later.</p>
          </div>
        )}
      </DestinationPreview>
    </>
  );
};

export default Home;