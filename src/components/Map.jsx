/* eslint-disable */
import { useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";

function Map() {
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  // eslint-disable-next-line no-console
  console.log(lat);
  // setSearchParams();

  return (
    <div className={styles.mapContainer}>
      <h1>Map</h1>
      <h6>
        {lat},{lng}
      </h6>
    </div>
  );
}

export default Map;
