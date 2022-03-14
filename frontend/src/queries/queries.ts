import {
    gql,
  } from "@apollo/client";

/*export const getMovieQuery = gql`
{
    movie($id: ID) {
        averageScore
        reviews {
            text,
            score,
            user {
                username,
                email
            }
        }
    }
}
`*/

export const getMovieReviewPreviewQuery = gql`
query($id: ID){
    movie(id:$id) {
        averageScore
    }
}
`


const getReviews = gql`
query{
    reviews {
        text
        score
    }
}
`


const addMovie = gql`
mutation AddMovie($name: String!, $genre: String!) {
    addBook(name: $name, genre: $genre) {
      id
      name
    }
  }
`

const getBooksQuery = gql`
{
    books {
        name
        id
    }
}
`

export {getReviews, getBooksQuery};