import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import { useEffect, useState } from 'react';

const AvailableMeals = () => {
  const [meals , setMeals] = useState([]);
  const [isLoading , setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        'https://turing-outrider-223810-default-rtdb.firebaseio.com/meals.json'
      );

      if(!response.ok){
        throw new Error('Something went wrong!');
      }
      const responseData = await response.json();
      debugger;

      const loadMeals = [];

      for (const key in responseData) {
        loadMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price
        });
      }

      setMeals(loadMeals);
      setIsLoading(false);
    };

    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.messages);
    })
  }, [])


  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>isLoading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={classes.MealsError}>
        <p>{httpError}</p>
      </section>
    )
  }
  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <ul>
        <Card>
          <ul>{mealsList}</ul>
        </Card>
      </ul>
    </section>
  );
};

export default AvailableMeals;
