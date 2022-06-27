import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';

//Api mocks
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { render, screen, act } from '@testing-library/react';

//Mock request tests
const server = setupServer(
  rest.get(
    'https://api.themoviedb.org/3/list/3?api_key=cedfb13c7a702ab65870f31a8b84ae6b',
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json([
          {
            adult: false,
            backdrop_path: '/yzpCv8CCWondN7O5au1KGiqnC3A.jpg',
            genre_ids: [28, 12, 14],
            id: 464052,
            media_type: 'movie',
            original_language: 'en',
            original_title: 'Wonder Woman 1984',
            overview:
              'A botched store robbery places Wonder Woman in a global battle against a powerful and mysterious ancient force that puts her powers in jeopardy.',
            popularity: 247.816,
            poster_path: '/8UlWHLMpgZm9bx6QYh0NFoq67TZ.jpg',
            release_date: '2020-12-16',
            title: 'Wonder Woman 1984',
            video: false,
            vote_average: 6.6,
            vote_count: 6876,
          },
        ])
      );
    }
  )
);

beforeAll(() => {
  console.log('before');
  server.listen();
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
