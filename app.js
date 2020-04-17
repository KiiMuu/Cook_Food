const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const config = require('config');
const { ApolloServer, gql } = require('apollo-server-express');
const connectToDB = require('./config/db');

// get models
const Recipe = require('./models/Recipe');
const User = require('./models/User');

// get graphql
const { typeDefs } = require('./graphql/schema');
const { resolvers } = require('./graphql/resolvers');

// connects to mongodb
connectToDB();

// initializes app
const app = express();

// middleware to prevent Cross Origin error
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
}
app.use(cors(corsOptions));

// set up JWT authentication middleware
app.use(async (req, res, next) => {
    const token = req.headers['authorization'];
    
    if (token !== null) {
        try {
            const currentUser = await jwt.verify(token, config.get('secret'));
            req.currentUser = currentUser;
        } catch (err) {
            console.error(err);
        }
    }

    next();
});

// GraphQL: Schema
const SERVER = new ApolloServer({
    typeDefs,
    resolvers,
    playground: {
      endpoint: `http://localhost:1234/graphql`,
      settings: {
        'editor.theme': 'dark'
      }
    },
    cors: corsOptions,
    // context: {
    //     Recipe,
    //     User,
    // },
    context: ({ req }) => {
        return {
            Recipe,
            User,
            currentUser: req.currentUser
        }
    }
});

// Middleware: GraphQL
SERVER.applyMiddleware({ app });

// run app
const PORT = process.env.PORT || 1234;
app.listen(PORT, () => {
    console.log(`APP is up on port ${PORT}`);
    console.log(`http://localhost:${PORT}/graphql`);   
});