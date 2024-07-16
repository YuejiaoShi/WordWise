/* eslint-disable */
import { useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";

function Map() {
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  // eslint-disable-next-line no-console
  console.log(lat);

  return (
    <div className={styles.mapContainer}>
      <h1>Map</h1>
      <h6>
        {lat},{lng}
      </h6>
      <button onClick={() => setSearchParams({ lat: 20, lng: 20 })}>
        Change position to 20,20
      </button>
    </div>
  );
}

export default Map;
