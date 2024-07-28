import {
  createContext,
  useEffect,
  useContext,
  useReducer,
  useCallback,
} from "react";

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";

/* eslint-disable react/prop-types */
// const BASE_URL =  "https://word-wise-five.vercel.app:8000";
// const BASE_URL = "http://localhost:8000";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAy3Hn5i5e9w4MpVr__R8G1UGcAWwZWwpo",
  authDomain: "worldwise-6e045.firebaseapp.com",
  projectId: "worldwise-6e045",
  storageBucket: "worldwise-6e045.appspot.com",
  messagingSenderId: "869575787510",
  appId: "1:869575787510:web:a3e5f583232ce8cd09bdd7",
  measurementId: "G-6QXX2Q1MXK",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

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
        const querySnapshot = await getDocs(collection(db, "cities"));
        // const data = await res.json();
        const data = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        dispatch({ type: "cities/loaded", payload: data });
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
        const docRef = doc(db, "cities", id);
        // const data = await res.json();
        const docSnap = await getDoc(docRef);
        // dispatch({ type: "city/loaded", payload: data });
        if (docSnap.exists()) {
          dispatch({
            type: "city/loaded",
            payload: { ...docSnap.data(), id: docSnap.id },
          });
        } else {
          throw new Error("No such document!");
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
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      dispatch({ type: "city/created", payload: data });
    } catch {
      dispatch({ type: "rejected", payload: "Error for Creating City..." });
    }
  }

  async function deleteCity(id) {
    dispatch({ type: "loading" });
    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
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
