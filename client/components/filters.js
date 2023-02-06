import React, { useState } from 'react';
import { connect } from 'react-redux';

const Filter = ({}) => {
  const [tagInput, setTagInput] = useState('');
const [tags, setTags] = useState([]);

  const handleTagInputChange = (e) => {
    setTagInput(e.target.value);
  };

  const handleAddTag = (e) => {
    e.preventDefault();
    setTagInput('');
  };

  const handleFilterChange = (filter) => {
  };

  const handleRemoveTag = (tagToRemove) => {
   
  };

  return (
    <div>
      <form onSubmit={handleAddTag}>
        <input type="text" value={tagInput} onChange={handleTagInputChange} />
        <button type="submit">Add Tag</button>
      </form>
      <ul>
        {tags.map((tag) => (
          <li key={tag}>
            {tag}
            <button onClick={() => handleRemoveTag(tag)}>Remove</button>
          </li>
        ))}
      </ul>
      <button>Clear All</button>
      <div>
        <label>
          <input type="checkbox" onChange={() => handleFilterChange('dairyFree')} />
          Dairy-Free
        </label>
        <label>
          <input type="checkbox" onChange={() => handleFilterChange('soyFree')} />
          Soy-Free
        </label>
        <label>
            <input type="checkbox" onChange={() => handleFilterChange('glutenFree')} />
            Gluten-Free
        </label>
        <label>
            <input type="checkbox" onChange={() => handleFilterChange('vegan')} />
            Vegan
        </label>
        <label>
            <input type="checkbox" onChange={() => handleFilterChange('vegetarian')} />
            Vegetarian
        </label>
        
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  tags: state.tags,
});

const mapDispatchToProps = (dispatch) => ({
  addTag: (tag) => dispatch(addTag(tag)),
  removeTag: (tag) => dispatch(removeTag(tag)),
  clearTags: () => dispatch(clearTags()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
