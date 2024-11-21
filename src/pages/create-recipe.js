// import { useState } from 'react';
// import { useGetUserID } from '../hooks/useGetUserID'; 
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import "./styles/create-recipe.css";
// import { useCookies } from 'react-cookie';
// import {API} from "../config.js"

// export const CreateRecipe = () => {
//     const userID = useGetUserID();
//     const navigate = useNavigate();

//     const [cookies, _] = useCookies(["access_token"]);

//     const [recipe, setRecipe] = useState({
//         name: "",
//         ingredients: [],
//         description: "",
//         instructions: "",
//         imageUrl: "",
//         cookingTime: 0,
//         userOwner: userID
//     });

//     const handleChange = (event) => {
//         const {name, value} = event.target;
//         setRecipe({ ...recipe, [name]: value });
//     }

//     // function to add ingredient
//     const addIngredient = () => {
//         setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] });
//     }

//     const handleIngredientChange = (event, index) => {
//         const { value } = event.target;
//         const ingredients = recipe.ingredients;
//         ingredients[index] = value;
//         setRecipe({ ...recipe, ingredients });
//     }

//     const onSubmit = async (event) => {
//         event.preventDefault();

//         try {
//             await axios.post("http://localhost:5000/recipes/", recipe, {
//                 headers: { authorization: cookies.access_token }
//             })
//             alert("Recipe Created");
//             navigate("/home")

//         } catch (error) {
//             console.log(error);
//         }
//     }

//     return (
//         <div className="container">
//             <h2 className="page-heading">Create Recipe</h2>

//             <form className='create-recipe-form' onSubmit={onSubmit}>
//                 <div className="input-details">
//                     <div className="input-box">
//                         <span className="details">Recipe Name</span>
//                         <input 
//                             id="name" 
//                             name="name" 
//                             type="text" 
//                             placeholder="Enter recipe name" 
//                             onChange={handleChange}
//                         />
//                     </div>

//                     <div className="input-box">
//                         <span className="details">Ingredients</span>

//                         {recipe.ingredients.map((ingredient, index) => (
//                             <div className='details' key={index}>
//                             <input 
//                                 type='text' 
//                                 name='ingredient' 
//                                 value={ingredient}
//                                 placeholder= {"Ingredient " + (index + 1)}
//                                 onChange={(event) => handleIngredientChange(event, index)}
//                             />
//                             </div>
//                         ))}

//                         <div className="button">
//                         <button type='button' onClick={addIngredient}>Add Ingredient</button>
//                         </div>
//                     </div>

//                     <div className="input-box">
//                         <span className="details">Mini Description</span>
//                         <input 
//                             id="description" 
//                             name="description" 
//                             type="text" 
//                             placeholder="Enter a mini description" 
//                             onChange={handleChange}
//                         />
//                     </div>

//                     <div className="input-box">
//                         <span className="details">Instructions</span>
//                         <textarea 
//                             name="instructions" 
//                             id="instructions" 
//                             cols="30" 
//                             rows="10" 
//                             placeholder="Enter the steps" 
//                             onChange={handleChange}>
//                         </textarea>
//                     </div>

//                     <div className="input-box">
//                         <span className="details">Image URL</span>
//                         <input 
//                             id="imageUrl" 
//                             name="imageUrl" 
//                             type="text" 
//                             placeholder="Copy paste the image url" 
//                             onChange={handleChange}
//                         />
//                     </div>

//                     <div className="input-box">
//                         <span className="details">Cooking Time (minutes)</span>
//                         <input 
//                             id="cookingTime" 
//                             name="cookingTime" 
//                             type="text" placeholder="Enter cooking time in minutes" 
//                             onChange={handleChange}
//                         />
//                     </div>
//                 </div>
//                 <div className="button">
//                     <button type='submit'>Create Recipe</button>
//                 </div>
//             </form>
//             <div className='spacer'>Space to the footer </div>
//         </div>
        
//     );
// }


import { useGetUserID } from '../hooks/useGetUserID'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./styles/create-recipe.css";
import { useCookies } from 'react-cookie';
import { TextField, Button,MenuItem, Select} from '@mui/material';
import { API } from "../config.js";
import { useFormik, FieldArray, FormikProvider } from 'formik';
import * as Yup from 'yup';

export const CreateRecipe = () => {
    const userID = useGetUserID();
    const navigate = useNavigate();
    const [cookies, _] = useCookies(["access_token"]);

    // Define validation schema with Yup
    const validationSchema = Yup.object({
        name: Yup.string().required("Recipe name is required"),
        ingredients: Yup.array().of(Yup.string().required("Ingredient is required")),
        description: Yup.string().required("Description is required"),
        instructions: Yup.string().required("Instruction is required"),
        imageUrl: Yup.string().url("Invalid URL format").required("Image URL is required"),
        cookingTime: Yup.number().positive("Must be a positive number").required("Cooking time is required"),
        cuisine: Yup.string().required("Cuisine is required"),
        difficultyLevel: Yup.string().required("Difficulty level is required")
    });

    // Set up Formik
    const formik = useFormik({
        initialValues: {
            name: "",
            ingredients: [""],
            description: "",
            instructions: "",
            imageUrl: "",
            cookingTime: "",
            cuisine: "",
            difficultyLevel: "",
            userOwner: userID
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                await axios.post("http://localhost:5000/recipes/", values, {
                    headers: { authorization: cookies.access_token }
                });
                alert("Recipe Created");
                navigate("/home");
            } catch (error) {
                console.log(error);
            }
        }
    });

    return (
        <div className="container">
            <h2 className="page-heading">Create Recipe</h2>

            <form className='create-recipe-form' onSubmit={formik.handleSubmit}>
                <TextField 
                    label="Recipe Name"
                    name="name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                />

                {/* <FormikProvider value={formik}>
                    <FieldArray
                        name="ingredients"
                        render={arrayHelpers => (
                            <div className="input-box">
                                <span className="details">Ingredients</span>
                                {formik.values.ingredients.map((ingredient, index) => (
                                    <TextField 
                                        key={index}
                                        label={`Ingredient ${index + 1}`}
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        value={ingredient}
                                        onChange={formik.handleChange}
                                        name={`ingredients.${index}`}
                                        error={formik.touched.ingredients?.[index] && Boolean(formik.errors.ingredients?.[index])}
                                        helperText={formik.touched.ingredients?.[index] && formik.errors.ingredients?.[index]}
                                    />
                                ))}
                                <Button variant="contained" color="primary" onClick={() => arrayHelpers.push('')}>
                                    Add Ingredient
                                </Button>
                            </div>
                        )}
                    />
                </FormikProvider> */}

             <FormikProvider value={formik}>
                    <FieldArray
                        name="ingredients"
                        render={arrayHelpers => (
                            <div className="input-box">
                                <span className="details">Ingredients</span>
                                {formik.values.ingredients.map((ingredient, index) => (
                                    <div key={index} className="ingredient-row">
                                        <TextField 
                                            label={`Ingredient ${index + 1}`}
                                            variant="outlined"
                                            fullWidth
                                            margin="normal"
                                            value={ingredient}
                                            onChange={formik.handleChange}
                                            name={`ingredients.${index}`}
                                            error={formik.touched.ingredients?.[index] && Boolean(formik.errors.ingredients?.[index])}
                                            helperText={formik.touched.ingredients?.[index] && formik.errors.ingredients?.[index]}
                                        />
                                        <Button 
                                            variant="contained" 
                                            color="error"
                                            onClick={() => arrayHelpers.remove(index)} 
                                            disabled={formik.values.ingredients.length === 1}
                                            style={{ marginLeft: '8px' }}
                                        >
                                            Remove
                                        </Button>
                                    </div>
                                ))}
                                <Button variant="contained" color="primary" onClick={() => arrayHelpers.push('')}>
                                    Add Ingredient
                                </Button>
                            </div>
                        )}
                    />
                </FormikProvider>


                <TextField 
                    label="Mini Description"
                    name="description"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    error={formik.touched.description && Boolean(formik.errors.description)}
                    helperText={formik.touched.description && formik.errors.description}
                />

                <TextField 
                    label="Instructions"
                    name="instructions"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    margin="normal"
                    value={formik.values.instructions}
                    onChange={formik.handleChange}
                    error={formik.touched.instructions && Boolean(formik.errors.instructions)}
                    helperText={formik.touched.instructions && formik.errors.instructions}
                />

                <TextField 
                    label="Image URL"
                    name="imageUrl"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={formik.values.imageUrl}
                    onChange={formik.handleChange}
                    error={formik.touched.imageUrl && Boolean(formik.errors.imageUrl)}
                    helperText={formik.touched.imageUrl && formik.errors.imageUrl}
                />

                <TextField 
                    label="Cooking Time (minutes)"
                    name="cookingTime"
                    type="number"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={formik.values.cookingTime}
                    onChange={formik.handleChange}
                    error={formik.touched.cookingTime && Boolean(formik.errors.cookingTime)}
                    helperText={formik.touched.cookingTime && formik.errors.cookingTime}
                />
                   <TextField 
                    label="Cuisine"
                    name="cuisine"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={formik.values.cuisine}
                    onChange={formik.handleChange}
                    error={formik.touched.cuisine && Boolean(formik.errors.cuisine)}
                    helperText={formik.touched.cuisine && formik.errors.cuisine}
                />

                 <Select
                    label="Difficulty Level"
                    name="difficultyLevel"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={formik.values.difficultyLevel}
                    onChange={formik.handleChange}
                    displayEmpty
                    error={formik.touched.difficultyLevel && Boolean(formik.errors.difficultyLevel)}
                >
                    <MenuItem value="" disabled>
                        Select Difficulty Level
                    </MenuItem>
                    <MenuItem value="Easy">Easy</MenuItem>
                    <MenuItem value="Medium">Medium</MenuItem>
                    <MenuItem value="Hard">Hard</MenuItem>
                </Select>
                {formik.touched.difficultyLevel && formik.errors.difficultyLevel && (
                    <div style={{ color: 'red', fontSize: '0.8em' }}>
                        {formik.errors.difficultyLevel}
                    </div>
                )}

                <Button type="submit" variant="contained" color="primary">
                    Create Recipe
                </Button>
            </form>
            <div className='spacer'>Space to the footer</div>
        </div>
    );
};
