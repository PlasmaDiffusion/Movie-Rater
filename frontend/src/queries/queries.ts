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
query($name: String){
    movie(name:$name) {
        averageScore
        reviews {
            score
        }
    }
}
`

export const getMovieReviewsQuery = gql`
query($name: String){
    movie(name:$name) {
        averageScore
        reviews {
            score
            comment            
        }
    }
}
`

export const getReviews = gql`
query{
    reviews {
        text
        score
    }
}
`


export const addMovie = gql`
mutation AddMovie($name: String!, $genre: String) {
    addBook(name: $name, genre: $genre) {
      id
      name
    }
  }
`


export const addReview = gql`
mutation AddReview($userId: String!, $movieId: String!, $score: Int!, $text: String!) {
    addMovie(userId: $userId, movieId: $movieId, score: $score, text: $text, ) {
      text
      score
    }
  }
`
