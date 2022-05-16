import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

describe('Verifica se a página contém as informações da Pokédex', () => {
  it('A página deve possuir "h2" com o texto "About Pokédex"', () => {
    renderWithRouter(<About />);
    const title = screen.getByRole('heading', { level: 2, name: 'About Pokédex' });
    expect(title).toBeInTheDocument();
  });

  it('A página deve conter dois parágrafos com o texto sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const p1 = screen.getByText(/This application/i);
    const p2 = screen.getByText(/One can/i);
    expect(p1).toBeInTheDocument();
    expect(p2).toBeInTheDocument();
  });

  it('A página deve conter a imagem de uma Pokédex', () => {
    renderWithRouter(<About />);
    const image = screen.getByRole('img');
    expect(image.src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
