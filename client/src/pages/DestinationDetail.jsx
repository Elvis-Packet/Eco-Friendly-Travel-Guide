import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAppContext } from '../context/AppContext';
import Loading from '../components/common/Loading';
import StayCard from '../components/destination/StayCard';
import TipCard from '../components/destination/TipCard';
import JournalForm from '../components/journal/JournalForm';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: #2e7d32;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  padding: 0;

  &:hover {
    text-decoration: underline;
  }

  &::before {
    content: '←';
    margin-right: 0.5rem;
  }
`;

const HeroSection = styled.div`
  position: relative;
  height: 400px;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 2rem;
`;

const HeroImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const HeroOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 2rem;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  color: white;
`;

const DestinationName = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const DestinationLocation = styled.p`
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;

const SustainabilityScore = styled.div`
  display: inline-flex;
  align-items: center;
  background: rgba(46, 125, 50, 0.9);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 500;

  span {
    margin-right: 0.5rem;
  }
`;

const DestinationDescription = styled.p`
  color: #6c757d;
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const TabContainer = styled.div`
  margin-top: 2rem;
`;

const TabList = styled.div`
  display: flex;
  gap: 1rem;
  border-bottom: 2px solid #e0e0e0;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    overflow-x: auto;
    padding-bottom: 0.5rem;
  }
`;

const Tab = styled.button`
  background: none;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  color: ${props => props.active ? '#2e7d32' : '#6c757d'};
  border-bottom: 2px solid ${props => props.active ? '#2e7d32' : 'transparent'};
  margin-bottom: -2px;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;

  &:hover {
    color: #2e7d32;
  }
`;

const TabContent = styled.div`
  min-height: 300px;
`;

const TwoColumnGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const MapContainer = styled.div`
  height: 300px;
  background-color: #f8f9fa;
  border-radius: 8px;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6c757d;
`;

const JournalSection = styled.div`
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 2rem;
  margin-top: 3rem;
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

const DestinationDetail = () => {
  const { id } = useParams();
  const { getDestination } = useAppContext();
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchDestinationDetails = async () => {
      setLoading(true);
      try {
        const destinationData = await getDestination(id);
        setDestination(destinationData);
      } catch (err) {
        setError('Failed to load destination details');
      } finally {
        setLoading(false);
      }
    };

    fetchDestinationDetails();
  }, [id, getDestination]);

  const handleGoBack = () => {
    window.history.back();
  };

  if (loading) return <Loading />;

  if (!destination) {
    return (
      <PageContainer>
        <BackButton onClick={handleGoBack}>Back to Destinations</BackButton>
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <h2>Destination Not Found</h2>
          <p>The destination you're looking for doesn't exist or has been removed.</p>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <BackButton onClick={handleGoBack}>Back to Destinations</BackButton>

      <HeroSection>
        <HeroImage src={destination.image_url || destination.image} alt={destination.name} />
        <HeroOverlay>
          <DestinationName>{destination.name}</DestinationName>
          <DestinationLocation>{destination.location}</DestinationLocation>
          <SustainabilityScore>
            <span>🌿</span>
            Sustainability Score: {destination.sustainability_score || destination.rating}/10
          </SustainabilityScore>
        </HeroOverlay>
      </HeroSection>

      <TabContainer>
        <TabList>
          <Tab
            active={activeTab === 'overview'}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </Tab>
          <Tab
            active={activeTab === 'stays'}
            onClick={() => setActiveTab('stays')}
          >
            Stays
          </Tab>
          <Tab
            active={activeTab === 'tips'}
            onClick={() => setActiveTab('tips')}
          >
            Tips
          </Tab>
          <Tab
            active={activeTab === 'journal'}
            onClick={() => setActiveTab('journal')}
          >
            Journal
          </Tab>
        </TabList>

        <TabContent>
          {activeTab === 'overview' && (
            <>
              <DestinationDescription>{destination.description}</DestinationDescription>
              <div style={{ padding: '1.5rem', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
                <h3 style={{ color: '#2e7d32', marginBottom: '1rem' }}>Eco Highlights</h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {destination.eco_highlights?.map((highlight, index) => (
                    <li key={index} style={{ marginBottom: '0.5rem' }}>🌿 {highlight}</li>
                  )) || [
                    '♻️ Zero-waste facilities and recycling programs',
                    '🌱 Use of renewable energy sources',
                    '💧 Water conservation initiatives',
                    '🏡 Eco-friendly accommodation options'
                  ].map((highlight, index) => (
                    <li key={index} style={{ marginBottom: '0.5rem' }}>{highlight}</li>
                  ))}
                </ul>
              </div>
            </>
          )}

          {activeTab === 'stays' && (
            <div>
              {destination.stays?.map(stay => (
                <StayCard key={stay.id} stay={stay} />
              )) || (
                <p>No eco-friendly stays available at this time.</p>
              )}
            </div>
          )}

          {activeTab === 'tips' && (
            <div>
              {destination.tips?.map(tip => (
                <TipCard key={tip.id} tip={tip} />
              )) || (
                <p>No local sustainability tips available at this time.</p>
              )}
            </div>
          )}

          {activeTab === 'journal' && (
            <JournalForm destinationId={destination.id} />
          )}
        </TabContent>
      </TabContainer>

      <SectionTitle>Eco-Friendly Activities</SectionTitle>
      <TwoColumnGrid>
        <div style={{ padding: '1.5rem', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <h3 style={{ color: '#2e7d32', marginBottom: '1rem' }}>Nature & Adventure</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '0.75rem' }}>🥾 Guided eco-trails and nature walks</li>
            <li style={{ marginBottom: '0.75rem' }}>🦋 Responsible wildlife observation</li>
            <li style={{ marginBottom: '0.75rem' }}>🌺 Native plant identification tours</li>
            <li style={{ marginBottom: '0.75rem' }}>🚲 Carbon-free cycling expeditions</li>
            <li style={{ marginBottom: '0.75rem' }}>🛶 Sustainable water activities</li>
            <li style={{ marginBottom: '0.75rem' }}>🏞️ Conservation area visits</li>
          </ul>
        </div>
        <div style={{ padding: '1.5rem', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <h3 style={{ color: '#2e7d32', marginBottom: '1rem' }}>Cultural & Educational</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '0.75rem' }}>🏺 Sustainable craft workshops</li>
            <li style={{ marginBottom: '0.75rem' }}>🌱 Organic farming experiences</li>
            <li style={{ marginBottom: '0.75rem' }}>🍳 Local cuisine cooking classes</li>
            <li style={{ marginBottom: '0.75rem' }}>🎭 Environmental education programs</li>
            <li style={{ marginBottom: '0.75rem' }}>🏘️ Eco-community tours</li>
            <li style={{ marginBottom: '0.75rem' }}>🌿 Traditional medicine walks</li>
          </ul>
        </div>
      </TwoColumnGrid>

      <SectionTitle>Sustainable Accommodations</SectionTitle>
      <TwoColumnGrid>
        <div style={{ padding: '1.5rem', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <h3 style={{ color: '#2e7d32', marginBottom: '1rem' }}>Eco-Lodges</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '0.75rem' }}>🏡 Solar-powered cabins</li>
            <li style={{ marginBottom: '0.75rem' }}>🌿 Green-certified hotels</li>
            <li style={{ marginBottom: '0.75rem' }}>🏕️ Sustainable camping sites</li>
            <li style={{ marginBottom: '0.75rem' }}>♻️ Zero-waste facilities</li>
          </ul>
        </div>
        <div style={{ padding: '1.5rem', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <h3 style={{ color: '#2e7d32', marginBottom: '1rem' }}>Local Homestays</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '0.75rem' }}>👥 Community-run accommodations</li>
            <li style={{ marginBottom: '0.75rem' }}>🌱 Farm stays and eco-retreats</li>
            <li style={{ marginBottom: '0.75rem' }}>🏠 Traditional housing experiences</li>
            <li style={{ marginBottom: '0.75rem' }}>🤝 Fair-trade certified stays</li>
          </ul>
        </div>
      </TwoColumnGrid>

      <SectionTitle>Conservation Initiatives</SectionTitle>
      <TwoColumnGrid>
        <div style={{ padding: '1.5rem', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <h3 style={{ color: '#2e7d32', marginBottom: '1rem' }}>Environmental Projects</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '0.75rem' }}>🌳 Reforestation programs</li>
            <li style={{ marginBottom: '0.75rem' }}>🐢 Wildlife conservation</li>
            <li style={{ marginBottom: '0.75rem' }}>🌊 Marine protection</li>
            <li style={{ marginBottom: '0.75rem' }}>♻️ Waste management initiatives</li>
          </ul>
        </div>
        <div style={{ padding: '1.5rem', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <h3 style={{ color: '#2e7d32', marginBottom: '1rem' }}>Community Programs</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '0.75rem' }}>📚 Environmental education</li>
            <li style={{ marginBottom: '0.75rem' }}>🌱 Sustainable agriculture</li>
            <li style={{ marginBottom: '0.75rem' }}>💪 Local empowerment projects</li>
            <li style={{ marginBottom: '0.75rem' }}>🤝 Cultural preservation</li>
          </ul>
        </div>
      </TwoColumnGrid>

      <SectionTitle>Travel Tips</SectionTitle>
      <TwoColumnGrid>
        <div style={{ padding: '1.5rem', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <h3 style={{ color: '#2e7d32', marginBottom: '1rem' }}>Best Time to Visit</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '0.75rem' }}>🌞 Peak Season: Spring (March-May)</li>
            <li style={{ marginBottom: '0.75rem' }}>🍂 Alternative: Fall (Sept-Nov)</li>
            <li style={{ marginBottom: '0.75rem' }}>🌡️ Mild temperatures ideal for outdoor activities</li>
            <li style={{ marginBottom: '0.75rem' }}>🌺 Best time for flora and fauna observation</li>
          </ul>
        </div>
        <div style={{ padding: '1.5rem', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <h3 style={{ color: '#2e7d32', marginBottom: '1rem' }}>Eco-friendly Tips</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '0.75rem' }}>♻️ Bring reusable water bottles and bags</li>
            <li style={{ marginBottom: '0.75rem' }}>🚲 Use eco-friendly transportation options</li>
            <li style={{ marginBottom: '0.75rem' }}>🗑️ Practice "Leave No Trace" principles</li>
            <li style={{ marginBottom: '0.75rem' }}>🌱 Support local eco-friendly businesses</li>
            <li style={{ marginBottom: '0.75rem' }}>📸 Respect wildlife photography guidelines</li>
            <li style={{ marginBottom: '0.75rem' }}>💚 Follow local conservation rules</li>
          </ul>
        </div>
      </TwoColumnGrid>

      <JournalSection>
        <SectionTitle>Share Your Experience</SectionTitle>
        <JournalForm destinationId={destination.id} destinationName={destination.name} />
      </JournalSection>
    </PageContainer>
  );
};

export default DestinationDetail;