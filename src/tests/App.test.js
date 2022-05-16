import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Verifica os links de navegação', () => {
  it('O link deve possuir o texto "Home", e redirecionar para URL "/"', () => {
    renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: 'Home' });
    expect(home).toBeInTheDocument();
  });

  it('O link deve receber o texto "About" e redirecionar para URL "/about"', () => {
    renderWithRouter(<App />);
    const about = screen.getByRole('link', { name: 'About' });
    expect(about).toBeInTheDocument();
  });

  it(`O link deve receber o texto "Favorite Pokémons"
   e redirecionar para URL "/favorites"`, () => {
    renderWithRouter(<App />);
    const favorites = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(favorites).toBeInTheDocument();
  });
});
