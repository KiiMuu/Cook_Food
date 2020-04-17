import { gql } from 'apollo-boost';

// Recipes Queries
export const GET_ALL_RECIPES = gql`
    query {
        getAllRecipes {
            name
            description
            category
            likes
            instructions
            createdDate
        }
    }
`;

// Recipes Mutations

// User Queries
export const GET_CURRENT_USER = gql`
    query {
        getCurrentUser {
            username
            email
            joinDate
        }
    }
`;

// User Mutations
export const SIGNIN_USER = gql`
    mutation($username: String!, $password: String!) {
        signinuser(
            username: $username,
            password: $password
        ) {
            token
        }
    }
`;

export const SIGNUP_USER = gql`
    mutation($username: String!, $email: String!, $password: String!) {
        signupuser(
            username: $username, 
            email: $email, 
            password: $password
        ) {
            token
        }
    }
`;