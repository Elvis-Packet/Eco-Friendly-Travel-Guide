import styled from 'styled-components';

const CardContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const StayHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const StayName = styled.h3`
  font-size: 1.2rem;
  color: #333;
  margin: 0;
`;

const StayPrice = styled.span`
  font-weight: 500;
  color: #2e7d32;
`;

const StayDescription = styled.p`
  color: #6c757d;
  margin-bottom: 1rem;
`;

const SustainableBadge = styled.div`
  display: inline-block;
  background-color: rgba(46, 125, 50, 0.1);
  color: #2e7d32;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
`;

const StayCard = ({ stay }) => {
  const { name, description, price, sustainable } = stay;

  return (
    <CardContainer>
      <StayHeader>
        <StayName>{name}</StayName>
        <StayPrice>{price}</StayPrice>
      </StayHeader>
      <StayDescription>{description}</StayDescription>
      {sustainable && (
        <SustainableBadge>
          <span role="img" aria-label="eco-friendly">🌿</span> Eco-Friendly
        </SustainableBadge>
      )}
    </CardContainer>
  );
};

export default StayCard;