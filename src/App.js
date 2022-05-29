import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import TripHero from "./components/homepage/TripHero";
import HotelDetailsPage from "./components/hotels/HotelDetails";
import ListingSection from "./components/listing/ListingSection";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Allbookings from "./components/AllBookings/AllBookings";
import PageNotFound from "./components/ui/PageNotFound";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <TripHero />
        </Route>
        <Route exact path="/hotels/:hotelId">
          <HotelDetailsPage />
        </Route>
        <Route exact path="/hotels/listing/:category">
          <ListingSection />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/allbookings">
          <Allbookings />
        </Route>
        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
