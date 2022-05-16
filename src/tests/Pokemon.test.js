import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import Pokemon from '../components/Pokemon';

const poke = {
  id: 25,
  name: 'Pikachu',
  type: 'Electric',
  averageWeight: {
    value: '6.0',
    measurementUnit: 'kg',
  },
  image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
  foundAt: [
    {
      location: 'Kanto Viridian Forest',
      map: 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
    },
    {
      location: 'Kanto Power Plant',
      map: 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
    },
  ],
};

describe('Verifica se o componente "Pokemon.js" funciona corretamente', () => {
  it('Verifica se um card é renderizado corretamente (nome, tipo, peso, imagem)', () => {
    renderWithRouter(<Pokemon
      isFavorite
      pokemon={ poke }
    />);
    const name = screen.getAllByTestId('pokemon-name');
    const type = screen.getByTestId('pokemon-type');
    const weight = screen.getByTestId('pokemon-weight');
    const img = screen.getByAltText('Pikachu sprite');
    expect(name[0]).toHaveTextContent('Pikachu');
    expect(type).toHaveTextContent('Electric');
    expect(weight).toHaveTextContent('Average weight: 6.0 kg');
    expect(img).toContainHTML('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it('Verifica se existe um link de navegação para exibir os detalhes do pokemon', () => {
    renderWithRouter(<Pokemon
      isFavorite
      pokemon={ poke }
    />);
    const details = screen.getByRole('link', { to: 'pokemons/25' });
    expect(details).toBeInTheDocument();
  });

  it('Verifica se existe direcionamento para a página detalhada do Pokémon', () => {
    const { history } = renderWithRouter(<Pokemon
      isFavorite
      pokemon={ poke }
    />);
    const details = screen.getByRole('link', { to: 'pokemons/25' });
    userEvent.click(details);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  it('Verifica se existe um ícone de estrela nos pokémons favoritados', () => {
    renderWithRouter(<Pokemon
      isFavorite
      pokemon={ poke }
    />);
    const favstar = screen.getByAltText('Pikachu is marked as favorite');
    expect(favstar).toContainHTML('/star-icon.svg');
  });
});
