import { useSearch } from "./components/Context/Search";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useState,useEffect,useContext} from "react"
import { useNavigate } from "react-router-dom";
// import { API } from "./Global";
import { useGetUserID } from "./hooks/useGetUserID";
import { useCookies } from "react-cookie";
import axios from "axios";
import "./pages/styles/card.css"
 
function SearchData(){
    const [values, setValues] = useSearch();
    console.log(values)
    const navigate = useNavigate()

    const [recipes, setRecipes] = useState([]);
    const [savedRecipes, setSavedRecipes] = useState([]);
    const [cookies, _] = useCookies(["access_token"]);
    
    const userID = useGetUserID();

    const saveRecipe = async (recipeID) => {
        try {
          const response = await axios.put("https://recipe-book-back-end.vercel.app/recipes", {
            userID,
            recipeID,
          }, {
            headers: {authorization : cookies.access_token}
          });
          setSavedRecipes(response.data.savedRecipes)
        } catch (error) {
          console.error(error);
        }
      };

      const viewRecipeButtonClick = (recipeID) => {
        navigate(`/viewRecipe/${recipeID}`);
      }
    
      const deleteRecipe = async (recipeID) => {
    
        console.log(recipeID)
        try {
          const response = await axios.delete(`http://localhost:5000/recipes/${recipeID}`, {
            headers: {authorization : cookies.access_token}
          })
          
          console.log(response.data)
    
          setRecipes(response.data)
           
        } catch (error) {
          console.error(error);
        }
    
         
      };

    return(
    //  <div className="container">
      
    //   <div className="card-container"></div>
       
    //     { values.results && values.results.length > 0 ? 
    //         values.results.map((recipe, index) => {
    //             return (
    //                 <div key={recipe._id}>
    //                 <div className="card">
    //                   <div className="card-body">
    //                     <img
    //                       className="card-image"
    //                       src={recipe.imageurl}
    //                       alt={recipe.alt}
    //                     />
    //                     <h2 className="card-title">{recipe.name}</h2>
                   
                        
    //                     {cookies.access_token && savedRecipes?.includes(recipe.id) ? (
    //                       <h6 className="saved-heading">
    //                         Saved <i className="fa-solid fa-check fa-fade"></i>
    //                       </h6>
    //                     ) : cookies.access_token? (
    //                       <button
    //                         className="card-button-save"
    //                         onClick={() => saveRecipe(recipe.id)}
    //                       >
    //                         Save
    //                       </button>
    //                     ) : null}
        
    //                     <div className="card-description">{recipe.description}</div>
    //                     <div className="cooking-time">
    //                       Cooking time : {recipe.cookingtime} Minutes
    //                     </div>
    //                   </div>
    //                   {/* <button className="card-button" onClick={ () => viewRecipeButtonClick(recipe._id)}>View Recipe</button> */}
    //                   <div className="btns">
    //                   <button type="button" class="btn btn-primary" onClick={()=>navigate(`/update-recipes/${recipe.id}`)}>Edit</button>
    //                     <button type="button" class="btn btn-danger" onClick={()=>deleteRecipe(`${recipe.id}`)}>Delete</button>
    //                   </div>
                      
    //                   <button type="button" class="btn btn-dark" className="card-button" onClick={ () => viewRecipeButtonClick(recipe.id)}>View Recipe</button>
    //                 </div>
    //               </div>
    //             );
    //         }) 
    //         : <div className="msg">"No Property Found..!" </div>
    //     }
    //     </div>
   
   <div className="container">
   <h2 className="page-heading">Home</h2>
   <div className="card-container">
     { values.results?.map((recipe) => (
       <div key={recipe._id}>
         <div className="card">
           <div className="card-body">
             <img
               className="card-image"
               src={recipe.imageUrl}
               alt={recipe.alt}
             />
             <h2 className="card-title">{recipe.name}</h2>
        
             
             {cookies.access_token && savedRecipes?.includes(recipe._id) ? (
               <h6 className="saved-heading">
                 Saved <i className="fa-solid fa-check fa-fade"></i>
               </h6>
             ) : cookies.access_token? (
               <button
                 className="card-button-save"
                 onClick={() => saveRecipe(recipe._id)}
               >
                 Save
               </button>
             ) : null}

             <div className="card-description">{recipe.description}</div>
             <div className="cooking-time">
               Cooking time : {recipe.cookingtime} Minutes
             </div>
           </div>
           {/* <button className="card-button" onClick={ () => viewRecipeButtonClick(recipe._id)}>View Recipe</button> */}
           <div className="btns">
           <button type="button" class="btn btn-primary" onClick={()=>navigate(`/update-recipes/${recipe.id}`)}>Edit</button>
             <button type="button" class="btn btn-danger" onClick={()=>deleteRecipe(`${recipe.id}`)}>Delete</button>
           </div>
           
           <button type="button" class="btn btn-dark" className="card-button" onClick={ () => viewRecipeButtonClick(recipe.id)}>View Recipe</button>
         </div>
       </div>
     ))}
   </div>
 </div>
    
    )
 }
 export default SearchData;