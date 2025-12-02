import { useState } from "react"

export default function Recipe()
{
    const [recipename, setRecipeName]=useState("");
    const[Ingredients,setIngredients]=useState("");
    const[Instruction,setInstruction]=useState("");
    const [recipes,setRecipes]=useState([]);

// save recipes to localstorage
const saveRecipes=(updatedRecipes)=>{
    localStorage.setItem("recipes",JSON.stringify(updatedRecipes));
}
// Load recipes


// Add recipes
const handleSubmit=(e)=>{
    e.preventDefault();
    if(!recipename ||!Ingredients || !Instruction)
    {
        alert("please fill all fields");
        return;
    }
    else{
        const newRecipe={
            id:Date.now(),
            name:recipename,
            Ingredients,
            Instruction
        }
        saveRecipes([...recipes,newRecipe]);
    }
    setRecipeName("")
    setIngredients("")
    setInstruction("")
}

    return(
        <>
        <div style={{maxWidth:"600px",margin:"20px auto",border:"1px solid #ccc",padding:"30px"}}>
            <h1 style={{marginBottom:"20px",border:"1px solid #ccc",padding:"20px"}}>Recipe Book</h1>
            <form onSubmit={handleSubmit}>
            <div style={{marginBottom:"10px"}}>
                <label>Name:</label> <br />
                <input type="text" style={{width:"100%",padding:"5px"}} value={recipename} onChange={(e)=>setRecipeName(e.target.value)} />
            </div>
              
               <div style={{marginBottom:"10px"}}>
                <label>Ingredients:</label> <br />
                <input type="text" style={{width:"100%",padding:"5px"}} value={Ingredients} onChange={(e)=>setIngredients(e.target.value)}/>
            </div>

             <div style={{marginBottom:"10px"}}>
                <label>Instruction:</label> <br />
                <input type="text" style={{width:"100%",padding:"5px"}}value={Instruction} onChange={(e)=>setInstruction(e.target.value)} />
            </div>

            <button style={{padding:"5px 10px"}} type="submit">Add Recipe </button>

          </form>
        </div>
        
        </>
    )
}