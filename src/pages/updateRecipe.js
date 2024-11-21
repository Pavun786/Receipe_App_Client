// import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import { SavedRecipes } from './saved-recipes';
// import { useGetUserID } from '../hooks/useGetUserID'; 
// import axios from 'axios';
// import "./styles/create-recipe.css";
// import { useCookies } from 'react-cookie';
// import { useNavigate } from 'react-router-dom';
// import { TextField, Button,MenuItem, Select} from '@mui/material';
// import { useFormik, FieldArray, FormikProvider } from 'formik';
// import * as Yup from 'yup';
// import {API} from "../config.js"



// export function EditRecipe(){
//     const {recipeID} = useParams();
//     console.log(recipeID)
    
//     const [savedRecipes, setSavedRecipes] = useState(null);

    


//     useEffect(() => {
//         const fetchRecipes = async () => {
//         //   try {
//             const response = await axios.get(
//               `http://localhost:5000/recipes/${recipeID}`, {
               
//               }
//             );

//             console.log("response",response.data)

//             setSavedRecipes(response.data);
           
//         //   } catch (error) {
//         //     console.error(error);
//         //   }
//         };
    
//         fetchRecipes();
//       }, []); 
  
//       console.log(savedRecipes)
//       return(
//         <div>
//             {savedRecipes ? <UpdateRecipe savedRecipes={savedRecipes} setSavedRecipes={setSavedRecipes}/> : "Loading..."}
//         </div>
//       )

// }


// export default function UpdateRecipe({ savedRecipes, setSavedRecipes }) {
//     const userID = useGetUserID();
//     const navigate = useNavigate();
//     const [cookies, _] = useCookies(["access_token"]);

//     // Define validation schema with Yup
//     const validationSchema = Yup.object({
//         name: Yup.string().required("Recipe name is required"),
//         ingredients: Yup.array().of(Yup.string().required("Ingredient is required")),
//         description: Yup.string().required("Description is required"),
//         instructions: Yup.array().of(Yup.string().required("Each instruction is required")),
//         imageUrl: Yup.string().url("Invalid URL format").required("Image URL is required"),
//         cookingTime: Yup.number().positive("Must be a positive number").required("Cooking time is required"),
//         cuisine: Yup.string().required("Cuisine is required"),
//         difficultyLevel: Yup.string().required("Difficulty level is required")
//     });

//     // Set up Formik
//     const formik = useFormik({
//         initialValues: {
//             name: savedRecipes.name || "",
//             ingredients: savedRecipes.ingredients || [""],
//             description: savedRecipes.description || "",
//             instructions: savedRecipes.instructions || [""],
//             imageUrl: savedRecipes.imageurl || "",
//             cookingTime: savedRecipes.cookingtime || "",
//             cuisine: savedRecipes.cuisine || "",
//             difficultyLevel: savedRecipes.difficultylevel || "",
//             userOwner: userID
//         },
//         validationSchema,
//         onSubmit: async (values) => {

//             console.log("val",values)
//             // let ingredients = values.ingredients
//             try {
//                 await axios.put(`http://localhost:5000/recipes/${savedRecipes.id}`, values, {
//                     headers: { authorization: cookies.access_token }
//                 });
//                 alert("Recipe Updated");
//                 navigate("/home");
//             } catch (error) {
//                 console.log(error);
//             }
//         }
//     });

//     return (
//         <div className="container">
//             <h2 className="page-heading">Edit Recipe</h2>

//             <form className='create-recipe-form' onSubmit={formik.handleSubmit}>
//                 <TextField 
//                     label="Recipe Name"
//                     name="name"
//                     variant="outlined"
//                     fullWidth
//                     margin="normal"
//                     value={formik.values.name}
//                     onChange={formik.handleChange}
//                     error={formik.touched.name && Boolean(formik.errors.name)}
//                     helperText={formik.touched.name && formik.errors.name}
//                 />

//                 <FormikProvider value={formik}>
//                     <FieldArray
//                         name="ingredients"
//                         render={arrayHelpers => (
//                             <div className="input-box">
//                                 <span className="details">Ingredients</span>
//                                 {formik.values.ingredients.map((ingredient, index) => (
//                                     <TextField 
//                                         key={index}
//                                         label={`Ingredient ${index + 1}`}
//                                         variant="outlined"
//                                         fullWidth
//                                         margin="normal"
//                                         value={ingredient}
//                                         onChange={formik.handleChange}
//                                         name={`ingredients.${index}`}
//                                         error={formik.touched.ingredients?.[index] && Boolean(formik.errors.ingredients?.[index])}
//                                         helperText={formik.touched.ingredients?.[index] && formik.errors.ingredients?.[index]}
//                                     />
//                                 ))}
//                                 <Button variant="contained" color="primary" onClick={() => arrayHelpers.push('')}>
//                                     Add Ingredient
//                                 </Button>
//                             </div>
//                         )}
//                     />
//                 </FormikProvider>

//                 <TextField 
//                     label="Mini Description"
//                     name="description"
//                     variant="outlined"
//                     fullWidth
//                     margin="normal"
//                     value={formik.values.description}
//                     onChange={formik.handleChange}
//                     error={formik.touched.description && Boolean(formik.errors.description)}
//                     helperText={formik.touched.description && formik.errors.description}
//                 />

//                 <TextField 
//                     label="Instructions"
//                     name="instructions"
//                     variant="outlined"
//                     fullWidth
//                     multiline
//                     rows={4}
//                     margin="normal"
//                     value={formik.values.instructions}
//                     onChange={formik.handleChange}
//                     error={formik.touched.instructions && Boolean(formik.errors.instructions)}
//                     helperText={formik.touched.instructions && formik.errors.instructions}
//                 />

//                 <TextField 
//                     label="Image URL"
//                     name="imageUrl"
//                     variant="outlined"
//                     fullWidth
//                     margin="normal"
//                     value={formik.values.imageUrl}
//                     onChange={formik.handleChange}
//                     error={formik.touched.imageUrl && Boolean(formik.errors.imageUrl)}
//                     helperText={formik.touched.imageUrl && formik.errors.imageUrl}
//                 />

//                 <TextField 
//                     label="Cooking Time (minutes)"
//                     name="cookingTime"
//                     type="number"
//                     variant="outlined"
//                     fullWidth
//                     margin="normal"
//                     value={formik.values.cookingTime}
//                     onChange={formik.handleChange}
//                     error={formik.touched.cookingTime && Boolean(formik.errors.cookingTime)}
//                     helperText={formik.touched.cookingTime && formik.errors.cookingTime}
//                 />

//                 <TextField 
//                     label="Cuisine"
//                     name="cuisine"
//                     variant="outlined"
//                     fullWidth
//                     margin="normal"
//                     value={formik.values.cuisine}
//                     onChange={formik.handleChange}
//                     error={formik.touched.cuisine && Boolean(formik.errors.cuisine)}
//                     helperText={formik.touched.cuisine && formik.errors.cuisine}
//                 />

//                  <Select
//                     label="Difficulty Level"
//                     name="difficultyLevel"
//                     variant="outlined"
//                     fullWidth
//                     margin="normal"
//                     value={formik.values.difficultyLevel}
//                     onChange={formik.handleChange}
//                     displayEmpty
//                     error={formik.touched.difficultyLevel && Boolean(formik.errors.difficultyLevel)}
//                 >
//                     <MenuItem value="" disabled>
//                         Select Difficulty Level
//                     </MenuItem>
//                     <MenuItem value="Easy">Easy</MenuItem>
//                     <MenuItem value="Medium">Medium</MenuItem>
//                     <MenuItem value="Hard">Hard</MenuItem>
//                 </Select>
//                 {formik.touched.difficultyLevel && formik.errors.difficultyLevel && (
//                     <div style={{ color: 'red', fontSize: '0.8em' }}>
//                         {formik.errors.difficultyLevel}
//                     </div>
//                 )}

//                 <Button type="submit" variant="contained" color="primary">
//                     Update Recipe
//                 </Button>
//             </form>
//             <div className='spacer'>Space to the footer</div>
//         </div>
//     );
// }


import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetUserID } from '../hooks/useGetUserID'; 
import axios from 'axios';
import "./styles/create-recipe.css";
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, MenuItem, Select } from '@mui/material';
import { useFormik, FieldArray, FormikProvider } from 'formik';
import * as Yup from 'yup';

export function EditRecipe() {
    const { recipeID } = useParams();
    const [savedRecipes, setSavedRecipes] = useState(null);

    useEffect(() => {
        const fetchRecipes = async () => {
            const response = await axios.get(`http://localhost:5000/recipes/${recipeID}`);
            setSavedRecipes(response.data);
        };
        fetchRecipes();
    }, [recipeID]);

    return (
        <div>
            {savedRecipes ? <UpdateRecipe savedRecipes={savedRecipes} setSavedRecipes={setSavedRecipes}/> : "Loading..."}
        </div>
    );
}

export default function UpdateRecipe({ savedRecipes, setSavedRecipes }) {
    const userID = useGetUserID();
    const navigate = useNavigate();
    const [cookies] = useCookies(["access_token"]);

    const validationSchema = Yup.object({
        name: Yup.string().required("Recipe name is required"),
        ingredients: Yup.array().of(Yup.string().required("Ingredient is required")),
        description: Yup.string().required("Description is required"),
        instructions: Yup.array().of(Yup.string().required("Each instruction is required")),
        imageUrl: Yup.string().url("Invalid URL format").required("Image URL is required"),
        cookingTime: Yup.number().positive("Must be a positive number").required("Cooking time is required"),
        cuisine: Yup.string().required("Cuisine is required"),
        difficultyLevel: Yup.string().required("Difficulty level is required")
    });

    const formik = useFormik({
        initialValues: {
            name: savedRecipes.name || "",
            ingredients: savedRecipes.ingredients || [""],
            description: savedRecipes.description || "",
            instructions: savedRecipes.instructions || [""],
            imageUrl: savedRecipes.imageurl || "",
            cookingTime: savedRecipes.cookingtime || "",
            cuisine: savedRecipes.cuisine || "",
            difficultyLevel: savedRecipes.difficultylevel || "",
            userOwner: userID
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                await axios.put(`http://localhost:5000/recipes/${savedRecipes.id}`, values, {
                    headers: { authorization: cookies.access_token }
                });
                alert("Recipe Updated");
                navigate("/home");
            } catch (error) {
                console.log(error);
            }
        }
    });

    return (
        <div className="container">
            <h2 className="page-heading">Edit Recipe</h2>

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
                    Update Recipe
                </Button>
            </form>
            <div className='spacer'>Space to the footer</div>
        </div>
    );
}
