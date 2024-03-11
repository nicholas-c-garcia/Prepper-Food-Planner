import React, { useEffect, useState } from "react";
import "./RecipeViewing.css";
import { MdAccountBox, MdHourglassTop, MdModeEdit } from "react-icons/md";
import { FaBicycle } from "react-icons/fa";

function RecipeViewing({ aRecipe }) {    
    const [amounts, setAmounts] = useState([]);
    const [recipeIngredients, setIngredients] = useState([]);

    useEffect(() => {
        const recipeIngredients = aRecipe.ingredients.split(",");
        const recipeMeasuremnents = aRecipe.measuremnents.split(",");
        setAmounts(recipeMeasuremnents)
        setIngredients(recipeIngredients)
    }, [aRecipe])

    
    return (
        <div className="recipe-grid">
            <div>
                <h1 className="align-icons-text">{aRecipe?.title} </h1>
                <div className="align-icons-text"><MdAccountBox /> Author: {aRecipe?.author}</div>
                <div className="cooktime-calories-container">
                    <div className="align-icons-text"><MdHourglassTop className="icon-background"/>{aRecipe?.duration} Minutes</div>
                    <div className="align-icons-text"><FaBicycle className="icon-background"/>{aRecipe?.calories} Calories</div>
                </div>
            </div>
            <img className="recipe-image" src={aRecipe?.image}></img>
            <div className="recipe-instructions-container">{aRecipe?.steps}</div>
            <div className="ingredients-container" >
                <div className="ingredients-header">Ingredients</div>
                <div className="ingredients-list">{recipeIngredients.map((ingredient, index) => (<div key={index}>{(" null" !== amounts[index]) ? amounts[index] : ""} {ingredient}</div>))}</div>
            </div>
        </div>
    );
}

export default RecipeViewing;