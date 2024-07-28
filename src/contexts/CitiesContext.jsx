import {
  createContext,
  useEffect,
  useContext,
  useReducer,
  useCallback,
} from "react";

import { database } from "./firebaseConfig";
import { ref, get, set, push, remove } from "firebase/database";

/* eslint-disable react/prop-types */
// const BASE_URL =  "https://word-wise-five.vercel.app:8000";
// const BASE_URL = "http://localhost:8000";

const firebaseConfig = {
  apiKey: "AIzaSyAy3Hn5i5e9w4MpVr__R8G1UGcAWwZWwpo",
  authDomain: "worldwise-6e045.firebaseapp.com",
  projectId: "worldwise-6e045",
  storageBucket: "worldwise-6e045.appspot.com",
  messagingSenderId: "869575787510",
  appId: "1:869575787510:web:a3e5f583232ce8cd09bdd7",
  measurementId: "G-6QXX2Q1MXK",
};

const CitiesContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };

    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };

    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.payload };

    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };

    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };

    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      throw new Error("Unknown action type");
  }
}

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );
  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [currentCity, setCurrentCity] = useState({});

  useEffect(function () {
    async function fetchCities() {
      dispatch({ type: "loading" });
      try {
        // const res = await fetch(`${BASE_URL}/cities`);
        // const data = await res.json();
        // dispatch({ type: "cities/loaded", payload: data });
        const citiesRef = ref(database, "cities");
        const snapshot = await get(citiesRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          const cities = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          dispatch({ type: "cities/loaded", payload: cities });
        } else {
          dispatch({ type: "cities/loaded", payload: [] });
        }
      } catch {
        dispatch({ type: "rejected", payload: "Error for Loading Data..." });
      }
    }
    fetchCities();
  }, []);

  const getCity = useCallback(
    async function getCity(id) {
      if (Number(id) === currentCity.id) return;

      dispatch({ type: "loading" });
      try {
        // const res = await fetch(`${BASE_URL}/cities/${id}`);
        // const data = await res.json();
        // dispatch({ type: "city/loaded", payload: data });
        const cityRef = ref(database, `cities/${id}`);
        const snapshot = await get(cityRef);
        if (snapshot.exists()) {
          dispatch({ type: "city/loaded", payload: { id, ...snapshot.val() } });
        } else {
          dispatch({ type: "rejected", payload: "City not found..." });
        }
      } catch {
        dispatch({ type: "rejected", payload: "Error for Loading Data..." });
      }
    },
    [currentCity.id]
  );

  async function createCity(newCity) {
    dispatch({ type: "loading" });
    try {
      // const res = await fetch(`${BASE_URL}/cities`, {
      //   method: "POST",
      //   body: JSON.stringify(newCity),
      //   headers: { "Content-Type": "application/json" },
      // });
      // const data = await res.json();
      // dispatch({ type: "city/created", payload: data });
      const citiesRef = ref(database, "cities");
      const newCityWithIdAndDate = {
        ...newCity,
        id: `${new Date().getTime()}`, // Generate a unique ID
        date: new Date().toISOString(), // Set the current date
      };
      await push(citiesRef, newCityWithIdAndDate);
      dispatch({ type: "city/created", payload: newCityWithIdAndDate });
    } catch {
      dispatch({ type: "rejected", payload: "Error for Creating City..." });
    }
  }

  async function deleteCity(id) {
    dispatch({ type: "loading" });
    try {
      // await fetch(`${BASE_URL}/cities/${id}`, {
      //   method: "DELETE",
      // });
      // dispatch({ type: "city/deleted", payload: id });
      const citiesRef = ref(database, "cities");
      const snapshot = await get(citiesRef);
      const currentCities = snapshot.val();
      const cityKey = Object.keys(currentCities).find(
        (key) => currentCities[key].id === id
      );

      if (!cityKey) {
        throw new Error("City not found");
      }
      await remove(ref(database, `cities/${cityKey}`));

      dispatch({ type: "city/deleted", payload: id });
    } catch {
      dispatch({ type: "rejected", payload: "Error for Deleting City..." });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext was used outside the CitiesProvider");
  return context;
}

export { CitiesProvider, useCities };
