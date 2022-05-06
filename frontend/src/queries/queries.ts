import {
    gql,
  } from "@apollo/client";



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
            user{
                username
            }            
        }
    }
}
`
export const getUser = gql`
query($email: String){
    user(email:$email) {
        id
        username
        email
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
        user{
            username
        }
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
    addReview(userId: $userId, movieId: $movieId, score: $score, comment: $comment ) {
      comment
      score
      user {
        username
      }
    }
  }
`


export const addUser = gql`
mutation AddUser($email: String!, $username: String!) {
    addUser(email: $email, username: $username) {
      id
      email
      username
    }
  }
`