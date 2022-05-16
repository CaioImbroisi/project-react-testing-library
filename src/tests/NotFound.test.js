import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

describe('Verifica se o componente "NotFound" funciona corretamente', () => {
  it('A página deve conter um heading(h2) com o texto "Page requested not found', () => {
    renderWithRouter(<NotFound />);
    const title = screen.getByRole('heading',
      { level: 2, name: 'Page requested not found Crying emoji' });
    expect(title).toBeInTheDocument();
  });

  it('A página deve mostrar a imagem de acordo com o esperado', () => {
    renderWithRouter(<NotFound />);
    const image = screen.getByAltText(
      'Pikachu crying because the page requested was not found',
    );
    expect(image.src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
