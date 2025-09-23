
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Chat from '../Chat';

describe('Chat component', () => {
  it('renders without crashing', () => {
    render(<Chat />);
  });

  it('sends a message when the user types and clicks send', () => {
    render(<Chat />);
    const input = screen.getByPlaceholderText('Type your message...');
    const sendButton = screen.getByText('Send');

    fireEvent.change(input, { target: { value: 'Hello' } });
    fireEvent.click(sendButton);

    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
