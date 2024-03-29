const graphql = require('graphql');
const _=require('lodash');
const Review = require('../models/review');
const Movie = require('../models/movie');
const User = require('../models/user');


const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLSchema,
    GraphQLNonNull
} = graphql;


//Field definitions
const MovieType = new GraphQLObjectType({
    name: 'Movie',
    fields: () => ({
        id: {type: GraphQLID},
        name: { type: GraphQLString},
        genre: {type: GraphQLString},
        averageScore: {type: GraphQLInt},
        reviews: {
            type:  new GraphQLList(ReviewType),
            resolve(parent, args){
                return Review.find({movieId: parent.id})
            }
        },
         
     })
});

const ReviewType = new GraphQLObjectType({
    name: 'Review',
    fields: () => ({
        id: {type: GraphQLID},
        comment: {type: GraphQLString},
        score:{type: GraphQLInt},
        user: {
            type: UserType,
            resolve(parent, args){
                return User.findById(parent.userId);
            }
        },
        movie: {
            type: MovieType,
            resolve(parent, args){
                return Movie.findById(parent.movieId);
            }
        }
    })
});

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: {type: GraphQLID},
        email: {type: GraphQLString},
        username: {type: GraphQLString},
        reviews: {
            type: new GraphQLList(ReviewType),
            resolve(parent, args){
                return Review.find({userId: parent.id});
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields:{
        movie: {
            type:MovieType,
            args: {name:{type: GraphQLString}},
            resolve(parent, args){
                console.log("Getting ", args.name);
                return Movie.findOne({name: args.name});
                let movie = Movie.findOne({name: args.name});

                //Calculate average score of movie
                let totalScore =0;
                console.log(movie.reviews);
                if (movie.reviews)
                {
                movie.reviews.forEach(review => {
                    totalScore+= review.score;
                });
                movie.averageScore = totalScore / movie.reviews.length;
                }
                else {console.log("No reviews")}
                console.log("Getting ", movie.name, " arg:", args.name);
            }
        },
        user: {
            type:UserType,
            args: {email:{type: GraphQLString}},
            resolve(parent, args){
                return User.findOne({email: args.email});
            }
        },
        movies: {
            type: new GraphQLList(MovieType),
            resolve(parent,args){
                return Movie.find(averageScore > 0);
            }            
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parent,args){
                return User.find({});
            }
        },
        reviews: {
            type: new GraphQLList(ReviewType),
            resolve(parent,args){
                return Review.find({});
            }            
        }
    }
})


const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addMovie: { // Add a new movie if the movie from the API hasn't been reviewed
            type: MovieType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                genre: {type: GraphQLString}
            },
            resolve(parent, args){
                //let existingMovieCheck = Movie.find({name: args.name});
                //console.log(existingMovieCheck);
                //if (existingMovieCheck) {console.log("Movie already exists."); return existingMovieCheck;}
                console.log("Adding movie", args.name);
                let movie = new Movie({
                    name: args.name,
                    genre: args.genre,
                    averageScore: 0,
                });
                return movie.save();
        }
        },
        addReview: { // Add a user's review to an existing movie
            type: ReviewType,
            args: {
                userId: {type: new GraphQLNonNull(GraphQLString)},
                movieId: {type: new GraphQLNonNull(GraphQLString)},
                comment: {type: new GraphQLNonNull(GraphQLString)},
                score: {type: new GraphQLNonNull(GraphQLInt)},
            },
            resolve(parent, args){
                let review = new Review({
                    userId: args.userId,
                    movieId: args.movieId,
                    comment: args.comment,
                    score: args.score,
                });
                return review.save();
        }
        },
        addUser: {
            type: UserType,
            args: {
                email: {type: new GraphQLNonNull(GraphQLString)},
                username: {type: new GraphQLNonNull(GraphQLString)},
            },
            resolve(parent, args){
                let user = new User({
                    email: args.email,
                    username: args.username,
                });
                return user.save();
        }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})