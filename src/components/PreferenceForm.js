import React, { useState } from 'react';

const PreferenceForm = ({ preferences, onSubmit }) => {
  const [localPreferences, setLocalPreferences] = useState(preferences);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === 'checkbox' ? checked : value;
    setLocalPreferences((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleIngredientChange = (event) => {
    const ingredients = event.target.value.split(',').map(ingredient => ingredient.trim());
    setLocalPreferences((prev) => ({ ...prev, ingredients }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(localPreferences);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        재료 (쉼표로 구분):
        <input
          type="text"
          name="ingredients"
          value={localPreferences.ingredients.join(', ')}
          onChange={handleIngredientChange}
        />
      </label>
      <br />
      <label>매운 정도:</label><br />
      <label>
        <input
          type="radio"
          name="spiciness"
          value="notSpicy"
          checked={localPreferences.spiciness === 'notSpicy'}
          onChange={handleChange}
        />
        안 매움
      </label><br />
      <label>
        <input
          type="radio"
          name="spiciness"
          value="barelySpicy"
          checked={localPreferences.spiciness === 'barelySpicy'}
          onChange={handleChange}
        />
        약간 매움
      </label><br />
      <label>
        <input
          type="radio"
          name="spiciness"
          value="mild"
          checked={localPreferences.spiciness === 'mild'}
          onChange={handleChange}
        />
        약간
      </label><br />
      <label>
        <input
          type="radio"
          name="spiciness"
          value="medium"
          checked={localPreferences.spiciness === 'medium'}
          onChange={handleChange}
        />
        보통
      </label><br />
      <label>
        <input
          type="radio"
          name="spiciness"
          value="spicy"
          checked={localPreferences.spiciness === 'spicy'}
          onChange={handleChange}
        />
        매움
      </label><br />
      <label>
        <input
          type="radio"
          name="spiciness"
          value="verySpicy"
          checked={localPreferences.spiciness === 'verySpicy'}
          onChange={handleChange}
        />
        매우 매움
      </label>
      <br />
      <label>채식주의자용:</label><br />
      <label>
        <input
          type="radio"
          name="vegan"
          value={true}
          checked={localPreferences.vegan === true}
          onChange={handleChange}
        />
        예
      </label><br />
      <label>
        <input
          type="radio"
          name="vegan"
          value={false}
          checked={localPreferences.vegan === false}
          onChange={handleChange}
        />
        아니오
      </label>
      <br />
      <label>육류 포함:</label><br />
      <label>
        <input
          type="radio"
          name="meat"
          value={true}
          checked={localPreferences.meat === true}
          onChange={handleChange}
        />
        예
      </label><br />
      <label>
        <input
          type="radio"
          name="meat"
          value={false}
          checked={localPreferences.meat === false}
          onChange={handleChange}
        />
        아니오
      </label>
      <br />
      <label>칼로리:</label><br />
      <label>
        <input
          type="radio"
          name="calories"
          value="low"
          checked={localPreferences.calories === 'low'}
          onChange={handleChange}
        />
        낮음
      </label><br />
      <label>
        <input
          type="radio"
          name="calories"
          value="medium"
          checked={localPreferences.calories === 'medium'}
          onChange={handleChange}
        />
        중간
      </label><br />
      <label>
        <input
          type="radio"
          name="calories"
          value="high"
          checked={localPreferences.calories === 'high'}
          onChange={handleChange}
        />
        높음
      </label>
      <br />
      <label>조리 시간:</label><br />
      <label>
        <input
          type="radio"
          name="cookingTime"
          value="veryShort"
          checked={localPreferences.cookingTime === 'veryShort'}
          onChange={handleChange}
        />
        15분 이하
      </label><br />
      <label>
        <input
          type="radio"
          name="cookingTime"
          value="short"
          checked={localPreferences.cookingTime === 'short'}
          onChange={handleChange}
        />
        15-30분
      </label><br />
      <label>
        <input
          type="radio"
          name="cookingTime"
          value="medium"
          checked={localPreferences.cookingTime === 'medium'}
          onChange={handleChange}
        />
        31-45분
      </label><br />
      <label>
        <input
          type="radio"
          name="cookingTime"
          value="long"
          checked={localPreferences.cookingTime === 'long'}
          onChange={handleChange}
        />
        46-120분
      </label><br />
      <label>
        <input
          type="radio"
          name="cookingTime"
          value="veryLong"
          checked={localPreferences.cookingTime === 'veryLong'}
          onChange={handleChange}
        />
        120분 이상
      </label>
      <br />
      <button type="submit">제출</button>
    </form>
  );
};

export default PreferenceForm;