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
`

export const getMovieReviewPreviewQuery = gql`
query($id: ID){
    movie(id:$id) {
        averageScore
    }
}
`

export const getMovieReviewPreviewQuery2 = gql`
{
    movie(id:"622bbcf55ff9c65c6763d89e") {
        averageScore
    }
}
`*/

const getReviews = gql`
{
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