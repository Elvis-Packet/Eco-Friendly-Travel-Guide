import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAppContext } from '../context/AppContext';
import StayCard from '../components/destination/StayCard';
import TipCard from '../components/destination/TipCard';
import JournalForm from '../components/journal/JournalForm';

const PageContainer = styled.div`
  padding: 2rem 0;
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

const DestinationHeader = styled.div`
  margin-bottom: 2rem;
`;

const DestinationTitle = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 0.5rem;
`;

const DestinationRating = styled.div`
  display: flex;
  align-items: center;
  color: #f9a825;
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
`;

const DestinationImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 2rem;
`;

const DestinationDescription = styled.p`
  color: #6c757d;
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  color: #2e7d32;
  margin: 2rem 0 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e9ecef;
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

const DestinationDetail = () => {
  const { id } = useParams();
  const { getDestination } = useAppContext();
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Fetch destination data
    const fetchDestination = async () => {
      try {
        const destinationData = getDestination(id);
        setDestination(destinationData);
      } catch (error) {
        console.error('Error fetching destination:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDestination();
  }, [id, getDestination]);
  
  const handleGoBack = () => {
    window.history.back();
  };
  
  if (loading) {
    return (
      <PageContainer>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading destination details...</p>
        </div>
      </PageContainer>
    );
  }
  
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
      
      <DestinationHeader>
        <DestinationTitle>{destination.name}</DestinationTitle>
        <DestinationRating>
          ★ {destination.rating.toFixed(1)}
        </DestinationRating>
      </DestinationHeader>
      
      <DestinationImage src={destination.image} alt={destination.name} />
      
      <DestinationDescription>{destination.description}</DestinationDescription>
      
      <MapContainer>
        {/* In a real application, this would be a map component using the destination.location coordinates */}
        <p>Map showing {destination.name} location would be displayed here</p>
      </MapContainer>
      
      <SectionTitle>Where to Stay</SectionTitle>
      <TwoColumnGrid>
        {destination.stays.map(stay => (
          <StayCard key={stay.id} stay={stay} />
        ))}
      </TwoColumnGrid>
      
      <SectionTitle>Travel Tips</SectionTitle>
      <TwoColumnGrid>
        {destination.tips.map(tip => (
          <TipCard key={tip.id} tip={tip} />
        ))}
      </TwoColumnGrid>
      
      <JournalSection>
        <SectionTitle>Share Your Experience</SectionTitle>
        <JournalForm destinationId={destination.id} destinationName={destination.name} />
      </JournalSection>
    </PageContainer>
  );
};

export default DestinationDetail;