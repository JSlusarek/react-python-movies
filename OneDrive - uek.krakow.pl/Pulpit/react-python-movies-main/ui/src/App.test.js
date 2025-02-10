import { render, screen } from '@testing-library/react';
import App from './App';

test('renders header and initial message', () => {
  render(<App />);
  
  // Sprawdzamy, czy nagłówek się wyświetla
  const headingElement = screen.getByText(/My favourite movies to watch/i);
  expect(headingElement).toBeInTheDocument();

  // Sprawdzamy, czy wiadomość o braku filmów się wyświetla
  const noMoviesMessage = screen.getByText(/No movies yet. Maybe add something?/i);
  expect(noMoviesMessage).toBeInTheDocument();

  // Sprawdzamy, czy jest przycisk "Add a movie"
  const addMovieButton = screen.getByText(/Add a movie/i);
  expect(addMovieButton).toBeInTheDocument();
});
