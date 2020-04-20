import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import './AddRecipe.scss';

import { Mutation } from 'react-apollo';
import { ADD_RECIPE, GET_ALL_RECIPES, GET_USER_RECIPES } from '../../../queries/index';
import Error from '../../error/Error';
import withAuth from '../../../middleware/withAuth';

const AddRecipe = ({ session }) => {

    const history = useHistory();

    const [addRecipe, setAddRecipe] = useState({
        name: '',
        imageUrl: '',
        category: 'Breakfast',
        description: '',
        instructions: '',
        username: ''
    });

    const { name, imageUrl, category, description, instructions, username } = addRecipe;

    const handleChange = e => setAddRecipe({
        ...addRecipe,
        [e.target.name]: e.target.value
    });

    // update state of username after componentDidMount
    useEffect(() => {
        setAddRecipe({
            ...addRecipe,
            username: session.getCurrentUser.username
        });
        return () => setAddRecipe(false);
    }, []);
     
    if (!addRecipe) {
       return null;
    }

    const handleSubmit = (e, addRecipe) => {
        e.preventDefault();

        addRecipe().then(({ data }) => {
            // console.log(data);
            setAddRecipe({
                name: '',
                category: 'Breakfast',
                description: '',
                instructions: '',
                username: ''
            });
            history.push('/');
        });
    }

    const validateRecipe = () => {
        const isInvalid = !name || !imageUrl || !category || !description || !instructions;

        return isInvalid;
    }

    // implement optimstic UI
    const updateCache = (cache, { 
        data: { 
            addRecipe 
        } 
    }) => {
        const { getAllRecipes } = cache.readQuery({ query: GET_ALL_RECIPES });

        cache.writeQuery({
            query: GET_ALL_RECIPES,
            data: {
                getAllRecipes: [addRecipe, ...getAllRecipes]
            }
        });
    }

    return (
        <Mutation 
            mutation={ADD_RECIPE} 
            variables={{ name, imageUrl, category, description, instructions, username }}
            refetchQueries={() => [
                {
                    query: GET_USER_RECIPES,
                    variables: {
                        username
                    }
                }
            ]}
            update={updateCache}
        >
            {(addRecipe, { data, loading, error }) => {
                return (
                    <div className="add-recipe">
                        <form onSubmit={(e) => handleSubmit(e, addRecipe)}>
                            <input
                                type="text"
                                name="name"
                                placeholder="Recipe Name"
                                onChange={handleChange}
                                value={name}
                            />
                            <input
                                type="text"
                                name="imageUrl" 
                                placeholder="Recipe Image"
                                onChange={handleChange}
                                value={imageUrl}
                            />
                            <select name="category" onChange={handleChange} value={category}>
                                <option value="Breakfast" >Breakfast</option>
                                <option value="Lunch">Lunch</option>
                                <option value="Dinner">Dinner</option>
                                <option value="Snack">Snack</option>
                            </select>
                            <input
                                type="text"
                                name="description"
                                placeholder="Recipe Description"
                                onChange={handleChange}
                                value={description}
                            />
                            <textarea 
                                name="instructions"
                                placeholder="Add Instructions"
                                onChange={handleChange}
                                value={instructions}
                            ></textarea>
                            <button disabled={ loading || validateRecipe() } type="submit">Add</button>
                            { error && <Error error={error} /> }
                        </form>
                    </div>
                )
            }}
        </Mutation>
    )
}

export default withAuth(session => session && session.getCurrentUser)(AddRecipe);

