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
        <div className="uk-margin-medium-top">
            <div className="uk-container">
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
                            <form className="uk-grid-small" data-uk-grid onSubmit={(e) => handleSubmit(e, addRecipe)}>
                                <div class="uk-width-1-2@s">
                                    <input
                                        className="uk-input"
                                        type="text"
                                        name="name"
                                        placeholder="Recipe Name"
                                        onChange={handleChange}
                                        value={name}
                                    />
                                </div>
                                <div class="uk-width-1-2@s">
                                    <input
                                        className="uk-input"
                                        type="text"
                                        name="imageUrl" 
                                        placeholder="Recipe image source"
                                        onChange={handleChange}
                                        value={imageUrl}
                                    />
                                </div>
                                <div class="uk-width-1-2@s">
                                    <div className="uk-form-controls" name="category" onChange={handleChange} value={category}>
                                        <select className="uk-select">
                                            <option value="Breakfast" >Breakfast</option>
                                            <option value="Lunch">Lunch</option>
                                            <option value="Dinner">Dinner</option>
                                            <option value="Snack">Snack</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="uk-width-1-2@s">
                                    <input
                                        className="uk-input"
                                        type="text"
                                        name="description"
                                        placeholder="Recipe Description"
                                        onChange={handleChange}
                                        value={description}
                                    />
                                </div>
                                <div class="uk-width-1-1@s">
                                    <textarea 
                                        className="uk-textarea"
                                        rows="5"
                                        name="instructions"
                                        placeholder="Add Instructions"
                                        onChange={handleChange}
                                        value={instructions}
                                    ></textarea>
                                </div>
                                <div class="uk-width-1-1@s">
                                    <button disabled={ loading || validateRecipe() } type="submit" className="uk-button uk-button-primary">Add</button>
                                </div>
                                { error && <Error error={error} /> }
                            </form>
                        )
                    }}
                </Mutation>
            </div>
        </div>
    )
}

export default withAuth(session => session && session.getCurrentUser)(AddRecipe);

