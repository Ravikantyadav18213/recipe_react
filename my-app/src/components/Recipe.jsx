import { useEffect, useState } from "react"

export default function Recipe()
{
    const [recipename, setRecipeName]=useState("");
    const[Ingredients,setIngredients]=useState("");
    const[Instruction,setInstruction]=useState("");
    const [recipes,setRecipes]=useState([]);
    const [editingId,setEditingId]=useState(null);

// save recipes to localstorage
const saveRecipes=(updatedRecipes)=>{
    localStorage.setItem("recipes",JSON.stringify(updatedRecipes));
    setRecipes(updatedRecipes);
}
// Load recipes
useEffect(()=>{
    const storedRecipes=JSON.parse(localStorage.getItem("recipes"))||[]
    setRecipes(storedRecipes);
},[])


// Add recipes
const handleSubmit=(e)=>{
    e.preventDefault();
    if(!recipename ||!Ingredients || !Instruction)
    {
        alert("please fill all fields");
        return;
    }
    if(editingId)
    {
        const updatedRecipes=recipes.map((r)=>
        r.id===editingId?{...r,name:recipename,Ingredients,Instruction}:r
    )
    saveRecipes(updatedRecipes);
    setEditingId(null)
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
// Delete Recipe
const handleDelete=(id)=>{
    const updatedRecipes=recipes.filter((r)=>r.id!==id)
    saveRecipes(updatedRecipes);
}

// edit recipe

const handleEdit=(r)=>{
    setRecipeName(r.name);
    setIngredients(r.Ingredients);
    setInstruction(r.Ingredients);
    setEditingId(r.id)
}


    return(
        <>
        <div style={{maxWidth:"600px",margin:"20px auto",border:"1px solid #ccc",padding:"30px", background:"yellow"}}>
            <h1 style={{marginBottom:"20px",border:"1px solid #ccc",padding:"20px",background:"lightgreen"}}>Recipe Book</h1>
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

            <button style={{padding:"5px 10px"}} type="submit">
                {editingId ?"Update Recipe":"Add Recipe"} </button>

          </form>
        </div>
         <div style={{maxWidth:"600px",margin:"20px auto",border:"1px solid #ccc",padding:"30px", background:"orange"}}>
            <h3>All Recipes</h3>
            {recipes.length===0 && <p>no recipas added yet</p>}
            {recipes.map((r)=>(
               <div key={r.id} style={{border:"1px solid #ccc",padding:"10px",marginBottom:"10px",color:"white"}}>
               <h4>Recipe Name:{r.name}</h4>
               <p><strong>Ingredients</strong></p>
               <ul>{r.Ingredients}</ul>
               <p><strong>Instruction:{r.Instruction}</strong></p>
               <button style={{padding:"3px 8px",marginRight:"5px"}} onClick={()=>handleEdit(r)}>Edit</button>
               <button style={{padding:"3px 8px"}} onClick={()=>handleDelete(r.id)}>Delete</button>

               </div>

            ))}
         </div>
        
        </>
    )
}