import React from 'react';
import { screen } from '@testing-library/react';
import { FavoritePokemons } from '../components';
import renderWithRouter from '../renderWithRouter';

const favoritePokes = [{
  id: 25,
  image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
  name: 'Pikachu',
  summary: `This intelligent Pokémon roasts hard berries with electricity
   to make them tender enough to eat.`,
  type: 'Electric',
  averageWeight: '6.0',
}];

describe('Verifica se a página de favoritos corresponde ao esperado', () => {
  it(`A página deve exibir a mensagem 
    "No favorite pokemon found" caso não exista Pokemons favoritos`, () => {
    renderWithRouter(<FavoritePokemons />);
    const empty = screen.getByText(/No favorite pokemon found/i);
    expect(empty).toBeInTheDocument();
  });

  it('A página deve exibir os Pokemons favoritos, caso existam', () => {
    renderWithRouter(<FavoritePokemons pokemons={ favoritePokes } />);
    const favorites = screen.getAllByTestId('pokemon-name');
    expect(favorites.length).toBe(1);
  });
});
