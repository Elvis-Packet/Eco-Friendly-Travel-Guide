import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAppContext } from '../context/AppContext';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

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

const JournalGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-top: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const JournalCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const JournalHeader = styled.div`
  background-color: #f8f9fa;
  padding: 1.5rem;
  border-bottom: 1px solid #e9ecef;
`;

const JournalTitle = styled.h3`
  font-size: 1.3rem;
  color: #333;
  margin: 0 0 0.5rem;
`;

const JournalMeta = styled.div`
  display: flex;
  justify-content: space-between;
  color: #6c757d;
  font-size: 0.9rem;
`;

const JournalDestination = styled.span`
  font-weight: 500;
`;

const JournalDate = styled.span`
  font-style: italic;
`;

const JournalContent = styled.div`
  padding: 1.5rem;
`;

const JournalText = styled.p`
  color: #6c757d;
  margin-bottom: 1rem;
  line-height: 1.6;
`;

const JournalRating = styled.div`
  display: flex;
  align-items: center;
  color: #f9a825;
  margin-bottom: 1rem;

  span {
    margin-left: 0.5rem;
    color: #6c757d;
  }
`;

const JournalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding: 0 1.5rem 1.5rem;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.delete ? '#dc3545' : '#2e7d32'};
  cursor: pointer;
  font-weight: 500;
  padding: 0.5rem;
  border-radius: 4px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${props => props.delete ? 'rgba(220, 53, 69, 0.1)' : 'rgba(46, 125, 50, 0.1)'};
  }
`;

const EmptyState = styled.div`
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
    margin-bottom: 2rem;
  }
`;

const ExploreButton = styled(Link)`
  display: inline-block;
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

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;

  h2 {
    margin: 0;
    color: #333;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #6c757d;

  &:hover {
    color: #333;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #333;
`;

const Input = styled(Field)`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #2e7d32;
    box-shadow: 0 0 0 2px rgba(46, 125, 50, 0.2);
  }
`;

const TextArea = styled(Field)`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #2e7d32;
    box-shadow: 0 0 0 2px rgba(46, 125, 50, 0.2);
  }
`;

const ErrorText = styled.div`
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

const SubmitButton = styled.button`
  background-color: #2e7d32;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #1b5e20;
  }

  &:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
  }
`;

const RatingContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const RatingButton = styled.button`
  background-color: ${props => props.selected ? '#2e7d32' : 'white'};
  color: ${props => props.selected ? 'white' : '#333'};
  border: 1px solid ${props => props.selected ? '#2e7d32' : '#ced4da'};
  border-radius: 4px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #2e7d32;
  }
`;

// Validation schema using Yup
const validationSchema = Yup.object({
  title: Yup.string()
    .required('Title is required')
    .min(5, 'Title must be at least 5 characters')
    .max(100, 'Title must be less than 100 characters'),
  content: Yup.string()
    .required('Content is required')
    .min(20, 'Please share more details (minimum 20 characters)')
    .max(1000, 'Content must be less than 1000 characters'),
  rating: Yup.number()
    .required('Please select a rating')
    .min(1, 'Rating must be at least 1')
    .max(5, 'Rating must be at most 5'),
  visitDate: Yup.date()
    .required('Visit date is required')
    .max(new Date(), 'Visit date cannot be in the future'),
  sustainabilityTips: Yup.string()
    .min(10, 'Tips must be at least 10 characters')
    .max(500, 'Tips must be less than 500 characters'),
});

const MyJournals = () => {
  const { journals, updateJournal, deleteJournal, addJournal } = useAppContext();
  const [editingJournal, setEditingJournal] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Handle edit journal
  const handleEdit = (journal) => {
    setEditingJournal(journal);
    setShowModal(true);
  };

  // Handle delete journal
  const handleDelete = (journalId) => {
    setConfirmDelete(journalId);
  };

  // Confirm delete
  const confirmDeleteJournal = () => {
    if (confirmDelete) {
      deleteJournal(confirmDelete);
      setConfirmDelete(null);
    }
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setEditingJournal(null);
  };

  // Submit edited journal
  const handleSubmit = (values) => {
    if (editingJournal) {
      updateJournal(editingJournal.id, values);
      closeModal();
    } else {
      addJournal(values);
      closeModal();
    }
  };

  return (
    <PageContainer>
      <PageHeader>
        <Title>Travel Journals</Title>
        <Subtitle>
          Share and explore eco-friendly travel experiences and sustainability tips from our community.
        </Subtitle>
      </PageHeader>

      {journals.length > 0 ? (
        <JournalGrid>
          {journals.map(journal => (
            <JournalCard key={journal.id}>
              <JournalHeader>
                <JournalTitle>{journal.title}</JournalTitle>
                <JournalMeta>
                  <JournalDestination>{journal.destinationName}</JournalDestination>
                  <JournalDate>Visited: {formatDate(journal.visitDate)}</JournalDate>
                </JournalMeta>
              </JournalHeader>

              <JournalContent>
                <JournalRating>
                  {'★'.repeat(journal.rating)}
                  {'☆'.repeat(5 - journal.rating)}
                  <span>{journal.rating}/5</span>
                </JournalRating>

                <JournalText>{journal.content}</JournalText>

                {journal.sustainabilityTips && (
                  <>
                    <h4>Sustainability Tips:</h4>
                    <JournalText>{journal.sustainabilityTips}</JournalText>
                  </>
                )}
              </JournalContent>

              <JournalActions>
                <ActionButton onClick={() => handleEdit(journal)}>
                  Edit
                </ActionButton>
                <ActionButton delete onClick={() => handleDelete(journal.id)}>
                  Delete
                </ActionButton>
              </JournalActions>
            </JournalCard>
          ))}
        </JournalGrid>
      ) : (
        <EmptyState>
          <h3>No Journal Entries Yet</h3>
          <p>Start by exploring destinations and sharing your experiences</p>
          <ExploreButton to="/destinations">Explore Destinations</ExploreButton>
        </EmptyState>
      )}

      {/* Edit Journal Modal */}
      {showModal && (
        <Modal>
          <ModalContent>
            <ModalHeader>
              <h2>{editingJournal ? 'Edit Journal Entry' : 'New Journal Entry'}</h2>
              <CloseButton onClick={closeModal}>&times;</CloseButton>
            </ModalHeader>

            <Formik
              initialValues={editingJournal || {
                title: '',
                content: '',
                rating: 0,
                visitDate: '',
                sustainabilityTips: '',
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ values, setFieldValue, isSubmitting }) => (
                <Form>
                  <FormGroup>
                    <Label htmlFor="title">Title</Label>
                    <Input type="text" id="title" name="title" />
                    <ErrorMessage name="title" component={ErrorText} />
                  </FormGroup>

                  <FormGroup>
                    <Label htmlFor="content">Your Experience</Label>
                    <TextArea
                      as="textarea"
                      id="content"
                      name="content"
                    />
                    <ErrorMessage name="content" component={ErrorText} />
                  </FormGroup>

                  <FormGroup>
                    <Label>Rating</Label>
                    <RatingContainer>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <RatingButton
                          key={star}
                          type="button"
                          selected={values.rating >= star}
                          onClick={() => setFieldValue('rating', star)}
                        >
                          {star}
                        </RatingButton>
                      ))}
                    </RatingContainer>
                    <ErrorMessage name="rating" component={ErrorText} />
                  </FormGroup>

                  <FormGroup>
                    <Label htmlFor="visitDate">Visit Date</Label>
                    <Input type="date" id="visitDate" name="visitDate" />
                    <ErrorMessage name="visitDate" component={ErrorText} />
                  </FormGroup>

                  <FormGroup>
                    <Label htmlFor="sustainabilityTips">Sustainability Tips (Optional)</Label>
                    <TextArea
                      as="textarea"
                      id="sustainabilityTips"
                      name="sustainabilityTips"
                    />
                    <ErrorMessage name="sustainabilityTips" component={ErrorText} />
                  </FormGroup>

                  <SubmitButton type="submit" disabled={isSubmitting}>
                    {editingJournal ? 'Update Journal Entry' : 'Add Journal Entry'}
                  </SubmitButton>
                </Form>
              )}
            </Formik>
          </ModalContent>
        </Modal>
      )}

      {/* Delete Confirmation Modal */}
      {confirmDelete && (
        <Modal>
          <ModalContent style={{ maxWidth: '400px' }}>
            <ModalHeader>
              <h2>Confirm Delete</h2>
              <CloseButton onClick={() => setConfirmDelete(null)}>&times;</CloseButton>
            </ModalHeader>

            <p>Are you sure you want to delete this journal entry? This action cannot be undone.</p>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem' }}>
              <ActionButton onClick={() => setConfirmDelete(null)}>Cancel</ActionButton>
              <ActionButton delete onClick={confirmDeleteJournal}>Delete</ActionButton>
            </div>
          </ModalContent>
        </Modal>
      )}
    </PageContainer>
  );
};

export default MyJournals;