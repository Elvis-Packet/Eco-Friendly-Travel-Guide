import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAppContext } from '../context/AppContext';

const PageContainer = styled.div`
  padding: 2rem 0;
`;

const PageHeader = styled.div`
  margin-bottom: 2rem;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #2e7d32;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: #6c757d;
  max-width: 800px;
  margin: 0 auto;
`;

const SearchContainer = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const SearchInput = styled.input`
  padding: 0.75rem 1rem;
  border: 1px solid #ced4da;
  border-radius: 4px;
  flex-grow: 1;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #2e7d32;
    box-shadow: 0 0 0 2px rgba(46, 125, 50, 0.2);
  }
`;

const FilterSelect = styled.select`
  padding: 0.75rem 1rem;
  border: 1px solid #ced4da;
  border-radius: 4px;
  background-color: white;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #2e7d32;
    box-shadow: 0 0 0 2px rgba(46, 125, 50, 0.2);
  }
`;

const DestinationsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin: 2rem auto;
  max-width: 1200px;
  padding: 0 2rem;
  justify-content: center;
`;

const DestinationCard = styled.div`
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  background-color: white;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
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
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  color: #333;
`;

const DestinationRating = styled.div`
  display: flex;
  align-items: center;
  color: #f9a825;
  margin-bottom: 1rem;
  font-weight: 500;
`;

const DestinationDescription = styled.p`
  color: #6c757d;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ViewButton = styled(Link)`
  display: inline-block;
  background-color: #2e7d32;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #1b5e20;
  }
`;

const NoResults = styled.div`
  text-align: center;
  padding: 3rem;
  background-color: #f8f9fa;
  border-radius: 8px;
  margin-top: 2rem;

  h3 {
    color: #6c757d;
    margin-bottom: 1rem;
  }

  p {
    color: #adb5bd;
  }
`;

const DestinationList = () => {
  const { destinations, loading, error } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');

  // Filter destinations based on search term and rating filter
  const filteredDestinations = destinations.filter(destination => {
    const matchesSearch = destination.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         destination.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRating = ratingFilter === '' || destination.rating >= parseFloat(ratingFilter);

    return matchesSearch && matchesRating;
  });

  return (
    <PageContainer>
      <PageHeader>
        <Title>Eco-Friendly Destinations</Title>
        <Subtitle>
          Discover sustainable travel destinations that prioritize environmental conservation and responsible tourism.
        </Subtitle>
      </PageHeader>

      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Search destinations..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FilterSelect
          value={ratingFilter}
          onChange={(e) => setRatingFilter(e.target.value)}
        >
          <option value="">All Ratings</option>
          <option value="4.5">4.5+ Stars</option>
          <option value="4">4+ Stars</option>
          <option value="3.5">3.5+ Stars</option>
        </FilterSelect>
      </SearchContainer>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <div className="loading-spinner"></div>
          <p>Loading destinations...</p>
        </div>
      ) : error ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#d32f2f' }}>
          <p>{error}</p>
        </div>
      ) : filteredDestinations.length > 0 ? (
        <DestinationsGrid>
          {filteredDestinations.map(destination => (
            <DestinationCard key={destination.id}>
              <DestinationImage src={destination.image_url || destination.image} alt={destination.name} />
              <DestinationInfo>
                <DestinationName>{destination.name}</DestinationName>
                <DestinationRating>
                  ★ {destination.rating ? destination.rating.toFixed(1) : '4.5'}
                </DestinationRating>
                <DestinationDescription>
                  {destination.description}
                </DestinationDescription>
                <ViewButton to={`/destinations/${destination.id}`}>View Details</ViewButton>
              </DestinationInfo>
            </DestinationCard>
          ))}
        </DestinationsGrid>
      ) : (
        <NoResults>
          <h3>No destinations found</h3>
          <p>Try adjusting your search criteria</p>
        </NoResults>
      )}
    </PageContainer>
  );
};

export default DestinationList;