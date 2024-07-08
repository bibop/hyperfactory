import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import axios from 'axios';

jest.mock('axios');

describe('App component tests', () => {
  test('renders project management component', () => {
    render(<App />);
    const projectManagementElement = screen.getByText(/project management/i);
    expect(projectManagementElement).toBeInTheDocument();
  });

  test('renders feedback form component', () => {
    render(<App />);
    const feedbackFormElement = screen.getByLabelText(/your feedback/i);
    expect(feedbackFormElement).toBeInTheDocument();
  });

  test('submits feedback form', async () => {
    axios.post.mockResolvedValue({ data: { message: 'Feedback submitted successfully' } });

    render(<App />);
    const feedbackFormElement = screen.getByLabelText(/your feedback/i);
    const submitButton = screen.getByRole('button', { name: /submit feedback/i });

    fireEvent.change(feedbackFormElement, { target: { value: 'Great job!' } });
    fireEvent.click(submitButton);

    const feedbackSubmittedMessage = await screen.findByText(/feedback submitted successfully/i);
    expect(feedbackSubmittedMessage).toBeInTheDocument();
  });

  test('creates a new project', async () => {
    axios.post.mockResolvedValue({
      data: {
        name: 'New Project',
        description: 'New project description',
        status: 'Active',
      },
    });

    render(<App />);
    const projectNameInput = screen.getByPlaceholderText(/project name/i);
    const projectDescriptionInput = screen.getByPlaceholderText(/project description/i);
    const projectStatusSelect = screen.getByRole('combobox');
    const createProjectButton = screen.getByRole('button', { name: /create project/i });

    fireEvent.change(projectNameInput, { target: { value: 'New Project' } });
    fireEvent.change(projectDescriptionInput, { target: { value: 'New project description' } });
    fireEvent.change(projectStatusSelect, { target: { value: 'Active' } });
    fireEvent.click(createProjectButton);

    const newProjectName = await screen.findByText(/new project/i);
    expect(newProjectName).toBeInTheDocument();
  });
});