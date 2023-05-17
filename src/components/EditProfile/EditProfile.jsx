import { useEffect, useRef, useState } from "react";
import styles from "./EditProfile.module.css";
import { interestsList } from "../../assests/data.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "../../store/auth/auth-slice";
import Loader from "react-js-loader";
import Swal from "sweetalert2";
import { MapContainer, TileLayer, useMapEvents, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import MarkerIcon from "../../assests/icons/location-pin.png";

function EditProfile({ user }) {
  const userInfo = useSelector((state) => state.userInfo);
  const [name, setName] = useState("");
  const [interests, setInterests] = useState([]);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [long, setLong] = useState(0);
  const [lat, setLat] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [markerPosition, setMarkerPosition] = useState([lat, long]);

  const dispatch = useDispatch();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
    }

    const fetchLocation = async () => {
      try {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            function (position) {
              setLat(position.coords.latitude);
              setLong(position.coords.longitude);
              setZoom(1);
              setMarkerPosition([position.coords.latitude, position.coords.longitude]);
            },
            function (error) {
              console.error(`Error getting user's location: ${error.message}`);
            }
          );
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchLocation();
  }, [user]);

  const handleInterestChange = (event) => {
    const selectedInterest = event.target.value;
    if (!interests.includes(selectedInterest)) {
      setInterests([...interests, selectedInterest]);
    }
  };

  const handleRemoveInterest = (interest) => {
    setInterests(interests.filter((i) => i !== interest));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Name: ", name);
    console.log("Interests: ", interests);
  };

  const markerIcon = L.icon({
    iconUrl: MarkerIcon,
    iconSize: [40, 40],
    iconAnchor: [12, 12],
    popupAnchor: [1, 1],
    shadowSize: [41, 41],
    shadowAnchor: [12, 12],
  });

  function MapEvent() {
    const map = useMapEvents({
      contextmenu(e) {
        setMarkerPosition([e.latlng.lat, e.latlng.lng]);
      },
    });

    const markerRef = useRef(null);

    useEffect(() => {
      if (markerRef.current) {
        markerRef.current.on("dragend", (e) => {
          const marker = e.target;
          const position = marker.getLatLng();
          setMarkerPosition([position.lat, position.lng]);
        });
      }
    }, []);

    return (
      <Marker
        draggable
        eventHandlers={{
          dragstart: (e) => {
            map.dragging.disable();
          },
          dragend: (e) => {
            map.dragging.enable();
          },
        }}
        position={markerPosition}
        ref={markerRef}
        icon={markerIcon}
      />
    );
  }

  const handleLocationUpdate = async () => {
    setLoading2(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          setLat(position.coords.latitude);
          setLong(position.coords.longitude);
          setMarkerPosition([position.coords.latitude, position.coords.longitude]);
          setLocation(position.coords.latitude, position.coords.longitude);
        },
        function (error) {
          console.error(`Error getting user's location: ${error.message}`);
        }
      );
    }
    setLoading2(false);
  };

  const setLocation = async (latitude, longitude) => {
    try {
      console.log("Setting up your location ........");
      if (lat === 0 && long === 0) {
        console.log("Location not found, using previous location ..........");
        return;
      }
      console.log(lat, long);
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL +
          "users/setlocation/" +
          userInfo._id,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            longitude: longitude,
            latitude: latitude,
          }),
        }
      );
      const data = await response.json();
      dispatch(setUser(data.data.user));
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async () => {
    setLoading1(true);
    try {
      const res = await fetch(
        process.env.REACT_APP_BACKEND_URL + "users/editprofile/" + user._id,
        {
          method: "PATCH",
          body: JSON.stringify({
            name: name,
            interest: interests,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();
      setLoading1(false);
      console.log(data);
      dispatch(setUser(data.data.user));
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (err) {
      console.log(err);
      setLoading1(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.message,
      });
    }
  };

  return (
    <div className={styles.editProfileContainer}>
      <h2>Edit Profile</h2>
      <div className={styles.divider}></div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <div>Name:</div>
          <input
            className={styles.input}
            value={name}
            onChange={handleNameChange}
          />
        </div>

        <div className={styles.field}>
          <div>Interests:</div>
          <select className={styles.select} onChange={handleInterestChange}>
            {interestsList.map((interest) => (
              <option key={interest} value={interest}>
                {interest}
              </option>
            ))}
          </select>

          <div className={styles.interestTags}>
            {interests.map((interest) => (
              <div key={interest} className={styles.interestTag}>
                {interest}
                <button
                  className={styles.removeButton}
                  onClick={() => handleRemoveInterest(interest)}
                  >
                  <FontAwesomeIcon
                    icon={faXmark}
                    className={styles.removeIcon}
                    />
                </button>
              </div>
            ))}
          </div>
        </div>
        {loading1 ? (
          <Loader type="bubble-loop" color={"#FFFFFF"} size={20} />
        ) : (
          <button
            className={styles.updateButton}
            type="submit"
            onClick={handleUpdate}
          >
            Update details
          </button>
        )}

        <div className={styles.field}>
          <div>Location:</div>
              <button
                className={styles.locationButton}
                onClick={handleLocationUpdate}
                disabled={loading2}
              >
                {loading2 ? (
                  <Loader type="spinner-default" size={20} />
                ) : (
                  "Update Location"
                )}
              </button>
          <MapContainer
            center={[lat, long]}
            zoom={zoom}
            scrollWheelZoom={false}
            style={{ height: "300px", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">
              OpenStreetMap</a> contributors'
            />
            <MapEvent />
          </MapContainer>
        </div>

        <div className={styles.buttonContainer}>

        </div>
      </form>
    </div>
  );
}

export default EditProfile;
