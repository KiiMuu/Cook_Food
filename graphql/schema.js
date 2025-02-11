const { gql } = require('apollo-server-express');

exports.typeDefs = gql`
    type Recipe {
        _id: ID
        name: String!
        imageUrl: String
        category: String!
        description: String!
        instructions: String!
        createdDate: String
        likes: Int
        username: String
    }

    type User {
        _id: ID
        username: String!
        password: String!
        email: String!
        joinDate: String
        favourites: [Recipe]
    }

    type Query {
        getAllRecipes: [Recipe]
        getRecipe(_id: ID!): Recipe
        searchRecipes(searchTerm: String): [Recipe]
        getCurrentUser: User
        getUserRecipes(username: String!): [Recipe]
    }

    type Token {
        token: String!
    }

    type Mutation {
        addRecipe(
            name: String!, 
            imageUrl: String!,
            description: String!, 
            category: String!, 
            instructions: String!, 
            username: String
        ): Recipe

        deleteUserRecipe(_id: ID): Recipe

        likeRecipe(_id: ID!, username: String!): Recipe

        unlikeRecipe(_id: ID!, username: String!): Recipe

        signinuser(
            username: String!
            password: String!
        ): Token

        signupuser(
            username: String!
            email: String!
            password: String!
        ): Token
    }
`;