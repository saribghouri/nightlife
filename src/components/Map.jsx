import React, { useRef, useEffect, useState } from "react";
import { GoogleMap, Marker, Autocomplete, LoadScript } from "@react-google-maps/api";

const containerStyle = {
    width: "100%",
    height: "400px",
};

const center = {
    lat: -3.745,
    lng: -38.523,
};

const Map = ({ onEndLocationSelect }) => {
    const mapRef = useRef(null);
    const [startLocation, setStartLocation] = useState(null);
    const [endLocation, setEndLocation] = useState(null);
    const [startAutocomplete, setStartAutocomplete] = useState(null);
    const [endAutocomplete, setEndAutocomplete] = useState(null);

    const handleStartPlaceSelect = () => {
        if (startAutocomplete !== null) {
            const place = startAutocomplete.getPlace();
            if (place.geometry) {
                const lat = place.geometry.location.lat();
                const lng = place.geometry.location.lng();
                setStartLocation({ lat, lng });
            }
        }
    };

    const handleEndPlaceSelect = () => {
        if (endAutocomplete !== null) {
            const place = endAutocomplete.getPlace();
            if (place.geometry) {
                const lat = place.geometry.location.lat();
                const lng = place.geometry.location.lng();
                setEndLocation({ lat, lng });
                onEndLocationSelect({ lat, lng });
            }
        }
    };

    const handleMapClick = (event) => {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();
        if (!startLocation) {
            setStartLocation({ lat, lng });
        } else if (!endLocation) {
            setEndLocation({ lat, lng });
            onEndLocationSelect({ lat, lng });
        }
    };

    useEffect(() => {
        if (mapRef.current && endLocation) {
            mapRef.current.panTo(endLocation);
        }
    }, [endLocation]);

    return (
        <LoadScript googleMapsApiKey="AIzaSyBgpkKPx4JWpnW2iaEUm3ccAWL4qEMs-O0" libraries={["places"]}>
            <div className="flex justify-between pb-2 w-full">
                <div className="w-[48%]">
                    <Autocomplete
                        onLoad={(autocomplete) => setStartAutocomplete(autocomplete)}
                        onPlaceChanged={handleStartPlaceSelect}
                    >
                        <input className="text-black w-[100%] outline-none text-sm px-2 py-2 rounded-3xl" type="text" placeholder="Start location" />
                    </Autocomplete>
                </div>
                <div className="w-[48%]">
                    <Autocomplete
                        onLoad={(autocomplete) => setEndAutocomplete(autocomplete)}
                        onPlaceChanged={handleEndPlaceSelect}
                    >
                        <input className="text-black w-[100%] outline-none text-sm px-2 py-2 rounded-3xl" type="text" placeholder="End location" />
                    </Autocomplete>
                </div>
            </div>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={endLocation || center}
                zoom={10}
                onClick={handleMapClick}
                onLoad={(map) => (mapRef.current = map)}
            >
                {startLocation && <Marker position={startLocation} />}
                {endLocation && <Marker position={endLocation} />}
            </GoogleMap>
        </LoadScript>
    );
};

export default Map;
