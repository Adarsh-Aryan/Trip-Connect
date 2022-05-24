import { useEffect, useState } from "react";
import { getAllCatgory, getAllCity } from "../../helper/trip-util";
import Spinner from "../ui/Spinner";
import TripCategory from "./TripCategory";
import TripSearch from "./TripSearch";
import "./TripHero.css";

function TripHero() {
  const [city, setCity] = useState();

  const [category, setCategory] = useState();

  const fectchData = async () => {
    const allCity = await getAllCity();

    const allCategory = await getAllCatgory();

    setCategory(allCategory);

    setCity(allCity);
  };

  useEffect(() => {
    fectchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!city || !category) {
    return <Spinner />;
  }

  return (
    <section className="hero">
      <TripSearch city={city} />
      <TripCategory category={category} />
    </section>
  );
}

export default TripHero;
