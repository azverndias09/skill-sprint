import React, { useEffect, useState } from "react";

const Location = () => {
    const [location, setLocation] = useState(null);

    useEffect(() => {
        // Fetch location data from your backend
        fetch("/api/location")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                setLocation(data);
            })
            .catch((error) => {
                console.error("Error fetching location data:", error);
            });
    }, []);

    return (
        <div>
            <h2>Location Details</h2>
            {location ? (
                <div>
                    <p>Country: {location.country}</p>
                    <p>City: {location.city}</p>
                    <p>Latitude: {location.latitude}</p>
                    <p>Longitude: {location.longitude}</p>
                </div>
            ) : (
                <p>Loading location data...</p>
            )}
        </div>
    );
};

export default Location;
