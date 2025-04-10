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

const TipTitle = styled.h3`
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  
  &::before {
    content: '💡';
    margin-right: 0.5rem;
  }
`;

const TipContent = styled.p`
  color: #6c757d;
  margin: 0;
  line-height: 1.6;
`;

const TipCard = ({ tip }) => {
  const { title, content } = tip;
  
  return (
    <CardContainer>
      <TipTitle>{title}</TipTitle>
      <TipContent>{content}</TipContent>
    </CardContainer>
  );
};

export default TipCard;