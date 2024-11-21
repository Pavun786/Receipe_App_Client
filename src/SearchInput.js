import React from "react";
import { useSearch } from "./components/Context/Search";
import { useNavigate } from "react-router-dom";
// import { API } from "./Global";


function SearchInput(){
  const [values, setValues] = useSearch();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId")

  const handleSubmit = async (e) => {
    e.preventDefault();
   
     try{
        const data = await fetch(`http://localhost:5000/recipes/search/${values.keyword}`,{
            method : "GET",
            headers:{
               "Auth": localStorage.getItem("token")
            }
        })
    
        const res = await data.json()
        
        if(data.status == 200){
            setValues({ ...values, results: res });
            navigate("/search")
        }
     }catch(err){
        console.log(err)
     }
  };
  return (
    <div>
      <form
        className="d-flex search-form"
        role="search"
        onSubmit={handleSubmit}
      >
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
        />
        <button className="btn btn-outline-warning" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchInput;