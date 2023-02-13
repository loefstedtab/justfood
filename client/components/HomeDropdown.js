import React, { useState } from "react";

const HomeDropdown = ({selected, setSelected}) => {
    const [isActive, setIsActive] = useState(false)
    const options = ['Search for a Meal by Ingredients!', 'Search Directly for a Meal!']

    return (
        <div className="DropdownContainer">
            <div className="DropdownButton" onClick={(e) => setIsActive(!isActive)}>
                {selected} 
                <span className="fas fa-caret-down"></span>
            </div>

            {isActive && (
                <div className="DropdownOptions">
                    {options.map((option) => (
                        <div 
                            key={option}
                            onClick={(e) => {
                            setSelected(option)
                            setIsActive(false)
                        }} 
                            className='DropdownItem'>
                            {option}
                        </div>    
                    ))}
                </div>
            )}
        </div>
    )
}

export default HomeDropdown;