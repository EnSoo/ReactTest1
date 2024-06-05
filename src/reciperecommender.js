import React, { useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as knnClassifier from '@tensorflow-models/knn-classifier';

function RecipeRecommender() {
  const [knn, setKnn] = useState(null);
  const [recommendedRecipes, setRecommendedRecipes] = useState([]);
  const [ingredients, setIngredients] = useState('');
  const [isVegan, setIsVegan] = useState(false);
  const [currentTemperature, setCurrentTemperature] = useState(null);

  const recipes = [
    { recipe: '김치찌개', weather: '비', cuisine: '한식', temperature: '쌀쌀함', vegan: 0 },
    { recipe: '된장찌개', weather: '맑음', cuisine: '한식', temperature: '따뜻함', vegan: 0 },
    { recipe: '파스타', weather: '맑음', cuisine: '양식', temperature: '더움', vegan: 0 },
    { recipe: '샐러드', weather: '맑음', cuisine: '양식', temperature: '더움', vegan: 1 },
    { recipe: '스테이크', weather: '맑음', cuisine: '양식', temperature: '쌀쌀함', vegan: 0 },
    { recipe: '팥빙수', weather: '맑음', cuisine: '한식', temperature: '더움', vegan: 0 },
    { recipe: '핫초코', weather: '비', cuisine: '양식', temperature: '추움', vegan: 0 },
    { recipe: '냉면', weather: '맑음', cuisine: '한식', temperature: '더움', vegan: 0 },
    { recipe: '콩국수', weather: '맑음', cuisine: '한식', temperature: '더움', vegan: 1 },
    { recipe: '메밀소바', weather: '맑음', cuisine: '일식', temperature: '더움', vegan: 0 }
  ];

  useEffect(() => {
    async function loadModelAndTrain() {
      const classifier = knnClassifier.create();
      setKnn(classifier);

      const trainingData = recipes.map(recipe => {
        const features = [
          ['한식', '양식', '일식'].indexOf(recipe.cuisine),
          ['추움', '중간', '더움'].indexOf(recipe.temperature),
          recipe.vegan
        ];
        return { features, label: recipe.recipe };
      });
      trainingData.forEach(({ features, label }) => {
        classifier.addExample(tf.tensor(features), label);
      });

      // OpenWeatherMap API 호출 (API 키는 실제 키로 변경해야 합니다)
      const apiKey = "YOUR_API_KEY";
      const city = "Seoul";
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
        );
        const data = await response.json();
        setCurrentTemperature(data.main.temp - 273.15);

        // 현재 기온 정보를 가져온 후에 getRecommendations 함수 호출
        getRecommendations();
      } catch (error) {
        console.error("날씨 정보를 가져오는 중 오류 발생:", error);
        // 오류 처리 (예: 기본값 설정 또는 에러 메시지 표시)
        setCurrentTemperature(20); // 예시로 기본값 20도 설정
      }
    }

    loadModelAndTrain();
  }, []); // 빈 배열을 넣어 컴포넌트가 처음 마운트될 때만 실행

  const classifyTemperature = (temperature) => {
    if (temperature < 15) return '추움';
    if (temperature < 28) return '중간';
    return '더움';
  };

  const getRecommendations = async () => {
    if (!knn || currentTemperature === null) return;

    const inputData = tf.tensor([
      ['한식', '양식', '일식'].indexOf(ingredients),
      ['추움', '중간', '더움'].indexOf(classifyTemperature(currentTemperature)),
      isVegan ? 1 : 0
    ]);

    const result = await knn.predictClass(inputData);
    const confidence = result.confidences[result.label];

    const filteredRecipes = recipes.filter(recipe => recipe.recipe === result.label && confidence > 0.5);
    setRecommendedRecipes(filteredRecipes.map(recipe => recipe.recipe));
  };

  return (
    <div>
      <input
        type="text"
        placeholder="재료 입력 (쉼표로 구분)"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
      />
      <label>
        <input
          type="checkbox"
          checked={isVegan}
          onChange={(e) => setIsVegan(e.target.checked)}
        />
        비건
      </label>
      <button onClick={getRecommendations}>레시피 추천</button>

      <h2>오늘 날씨에 딱! 추천 레시피:</h2>
      <ul>
        {recommendedRecipes.map((recipe, index) => (
          <li key={index}>{recipe}</li>
        ))}
      </ul>
    </div>
  );
}

export default RecipeRecommender;