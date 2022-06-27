import React from 'react';
import { render, screen } from '@testing-library/react';

import MovieList from './movieList';

//Search bar
describe('MoveList', function () {
  it('should render a heading, star ratings and movie titles', async function () {
    render(<MovieList id={3} category={'DC'} />);

    expect(await screen.findByText('DC')).toBeInTheDocument();
    // expect(await screen.findByText('☆')).toBeInTheDocument();
    expect(await screen.findByText('Wonder Woman')).toBeInTheDocument();


  });
});
