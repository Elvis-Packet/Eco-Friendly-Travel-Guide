import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import { useAppContext } from '../../context/AppContext';



const FormContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
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

const SuccessMessage = styled.div`
  background-color: rgba(46, 125, 50, 0.1);
  color: #2e7d32;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;

  &::before {
    content: '✓';
    margin-right: 0.5rem;
    font-weight: bold;
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
    .required('Please share your experience')
    .test('not-empty', 'Please share your experience', value => {
      console.log('--- VALIDATION DEBUG ---');
      console.log('Input value:', JSON.stringify(value));
      console.log('Type:', typeof value);
      const isValid = value && value.trim().length > 0;
      console.log('Is valid:', isValid);
      return isValid;
    })
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

const JournalForm = ({ destinationId, destinationName }) => {
  const { addJournal, isAuthenticated } = useAppContext();
  const [submitted, setSubmitted] = useState(false);

  const initialValues = {
    title: '',
    content: '',
    rating: 0,
    visitDate: '',
    sustainabilityTips: '',
  };

  const handleSubmit = (values, { resetForm }) => {
    console.log('Form values:', values); // Debug log
    console.log('Content length:', values.content.length); // Debug log
    
    // Create journal entry with destination info
    const journalEntry = {
      ...values,
      destinationId,
      destinationName,
      createdAt: new Date().toISOString(),
    };

    console.log('Journal entry:', journalEntry); // Debug log
    // Add journal entry to context
    addJournal(journalEntry);

    // Reset form and show success message
    resetForm();
    setSubmitted(true);

    // Hide success message after 5 seconds
    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  return (
    <FormContainer>
      {submitted && (
        <SuccessMessage>
          Your journal entry has been successfully submitted!
        </SuccessMessage>
      )}

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue, isSubmitting, errors, touched }) => (
          <Form>
            <FormGroup>
              <Label htmlFor="title">Title</Label>
              <Input type="text" id="title" name="title" placeholder="Give your journal entry a title" />
              <ErrorMessage name="title" component={ErrorText} />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="content">Your Experience</Label>
              <TextArea
                component="textarea"
                id="content"
                name="content"
                placeholder="Share your experience at this destination..."
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
                placeholder="Share any eco-friendly tips for future travelers..."
              />
              <ErrorMessage name="sustainabilityTips" component={ErrorText} />
            </FormGroup>

            <SubmitButton type="submit" disabled={isSubmitting || !isAuthenticated}>
              {isAuthenticated ? 'Submit Journal Entry' : 'Login to Submit'}
            </SubmitButton>

            {!isAuthenticated && (
              <ErrorText style={{ marginTop: '1rem' }}>
                You need to be logged in to submit a journal entry.
              </ErrorText>
            )}
          </Form>
        )}
      </Formik>
    </FormContainer>
  );
};

export default JournalForm;