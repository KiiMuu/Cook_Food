const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcrypt');

const createToken = (user, secret, expiresIn) => {
    const { username, email } = user;

    return jwt.sign({ username, email }, secret, { expiresIn }); 
}

exports.resolvers = {
    Query: {
        getAllRecipes: async (root, args, { Recipe }) => {
            const recipes = await Recipe.find().sort({ createdDate: 'desc' });

            return recipes;
        },
        getRecipe: async (root, { _id }, { Recipe }) => {
            const recipe = await Recipe.findOne({ _id });

            return recipe;
        },
        searchRecipes: async (root, { searchTerm }, { Recipe }) => {
            if (searchTerm) {
                const searchResults = await Recipe.find({
                    $text: {
                        $search: searchTerm
                    }
                }, {
                    score: {
                        $meta: "textScore"
                    }
                }).sort({
                    score: {
                        $meta: "textScore"
                    }
                })

                return searchResults;
            } else {
                const recipes = await Recipe.find().sort({ likes: 'desc', createdDate: 'desc' });

                return recipes;
            }
        },  
        getCurrentUser: async (root, args, { currentUser, User }) => {
            if (!currentUser) {
                return null;
            }

            const user = await User.findOne({ username: currentUser.username }).populate({
                path: 'favourites',
                model: 'Recipe'
            });

            return user;
        },
        getUserRecipes: async(root, { username }, { Recipe }) => {
            const userRecipes = await Recipe.find({ username }).sort({
                createdDate: 'desc'
            });

            return userRecipes;
        }
    },
    Mutation: {
        addRecipe: async (root, { name, imageUrl, description, category, instructions, username }, { Recipe }) => {
            const newRecipe = await new Recipe({
                name,
                imageUrl,
                description,
                category,
                instructions,
                username
            });

            return newRecipe.save();
        },

        likeRecipe: async (root, { _id, username }, { Recipe, User }) => {
            const recipe = await Recipe.findOneAndUpdate({ _id }, {
                $inc: {
                    likes: 1
                }
            }); 

            const user = await User.findOneAndUpdate({ username }, {
                $addToSet: {
                    favourites: _id
                }
            });

            return recipe;
        },

        unlikeRecipe: async (root, { _id, username }, { Recipe, User }) => {
            const recipe = await Recipe.findOneAndUpdate({ _id }, {
                $inc: {
                    likes: -1
                }
            }); 

            const user = await User.findOneAndUpdate({ username }, {
                $pull: {
                    favourites: _id
                }
            });

            return recipe;
        },

        deleteUserRecipe: async(root, { _id }, { Recipe }) => {
            const recipe = await Recipe.findOneAndRemove({ _id });

            return recipe;
        },

        signinuser: async (root, { username, password }, { User }) => {
            const user = await User.findOne({ username });

            if (!user) {
                throw new Error('User does not exist');
            }

            const isValidPassword = await bcrypt.compare(password, user.password);

            if (!isValidPassword) {
                throw new Error('Incorrect password');
            }

            return { token: createToken(user, config.get('secret'), '1h') };
        },

        signupuser: async (root, { username, email, password }, { User }) => {
            const user = await User.findOne({ username });

            if (user) {
                throw new Error('User already exists');
            }

            const newUser = await new User({
                username,
                email,
                password
            }).save();

            return { token: createToken(newUser, config.get('secret'), '1h') };
        }
    }
};