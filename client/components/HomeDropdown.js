import React, { useState } from "react";

const HomeDropdown = ({selected, setSelected}) => {
    const [isActive, setIsActive] = useState(false)
    const options = ['Search By Ingredients!', 'Search For Meals!']

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