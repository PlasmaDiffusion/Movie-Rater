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
            type: ReviewType,
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
        name: {type: GraphQLString},
        score:{type: GraphQLInt},
        user: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return User.findById(args.id);
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
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return Review.find({userId: parent.id});
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields:{
    }
})


const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})