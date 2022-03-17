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
        id
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
    addMovie(name: $name, genre: $genre) {
      id
      name
      genre
    }
  }
`


export const addReview = gql`
mutation AddReview($userId: String!, $movieId: String!, $score: Int!, $comment: String!) {
    addReview(userId: $userId, movieId: $movieId, score: $score, comment: $comment, ) {
      comment
      score
    }
  }
`
