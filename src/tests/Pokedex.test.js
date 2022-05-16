import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import Pokedex from '../components/Pokedex';

const pokes = [{
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
},
{
  id: 4,
  name: 'Charmander',
  type: 'Fire',
  averageWeight: {
    value: '8.5',
    measurementUnit: 'kg',
  },
  image: 'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Charmander_(Pok%C3%A9mon)',
  foundAt: [
    {
      location: 'Alola Route 3',
      map: 'https://cdn2.bulbagarden.net/upload/9/93/Alola_Route_3_Map.png',
    },
    {
      location: 'Kanto Route 3',
      map: 'https://cdn2.bulbagarden.net/upload/4/4a/Kanto_Route_3_Map.png',
    },
    {
      location: 'Kanto Route 4',
      map: 'https://cdn2.bulbagarden.net/upload/2/24/Kanto_Route_4_Map.png',
    },
    {
      location: 'Kanto Rock Tunnel',
      map: 'https://cdn2.bulbagarden.net/upload/6/6f/Kanto_Rock_Tunnel_Map.png',
    },
  ],
},
{
  id: 10,
  name: 'Caterpie',
  type: 'Bug',
  averageWeight: {
    value: '2.9',
    measurementUnit: 'kg',
  },
  image: 'https://cdn2.bulbagarden.net/upload/8/83/Spr_5b_010.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Caterpie_(Pok%C3%A9mon)',
  foundAt: [
    {
      location: 'Johto Route 30',
      map: 'https://cdn2.bulbagarden.net/upload/7/76/Johto_Route_30_Map.png',
    },
  ],
}];

const id = { 25: false, 4: true, 10: false };

describe('Teste de comportamento da Pokédex', () => {
  it('A página deve conter um heading(h2) com o texto "Encountered pokémons"', () => {
    renderWithRouter(<Pokedex
      isPokemonFavoriteById={ id }
      pokemons={ pokes }
    />);
    const title = screen.getByRole('heading', { level: 2, name: 'Encountered pokémons' });
    expect(title).toBeInTheDocument();
  });

  it('Ao clicar no botão "Próximo pokémon" deve ser exibido o próximo Pokemon', () => {
    renderWithRouter(<Pokedex
      isPokemonFavoriteById={ id }
      pokemons={ pokes }
    />);
    const btnAll = screen.getByRole('button', { name: 'All' });
    expect(btnAll).toBeInTheDocument();
    const btnType = screen.getAllByTestId('pokemon-type-button');
    expect(btnType[0]).toHaveTextContent('Electric');
    expect(btnType[2]).toHaveTextContent('Bug');
    userEvent.click(btnType[0]);

    const toBePoke = screen.getByTestId('pokemon-name');
    expect(toBePoke).toHaveTextContent('Pikachu');
  });

  it('A Pokédex deve conter o botão para resetar o filtro', () => {
    renderWithRouter(<Pokedex
      isPokemonFavoriteById={ id }
      pokemons={ pokes }
    />);
    const btnAll = screen.getByRole('button', { name: 'All' });
    expect(btnAll).toBeInTheDocument();
    userEvent.click(btnAll);
    const btnNext = screen.getByTestId('next-pokemon', { name: 'Próximo pokémon' });
    expect(btnNext).toBeEnabled();
  });
});
