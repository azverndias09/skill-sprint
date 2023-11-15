import React, { useState } from 'react';

const LocationComponent = () => {
    const [location, setLocation] = useState(null);

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setLocation({ latitude, longitude });
                },
                (error) => {
                    console.error('Error getting location:', error.message);
                    setLocation(null);
                }
            );
        } else {
            console.log('Geolocation is not supported by this browser.');
        }
    };

    return (
        <div>
            <button onClick={getLocation}>Get Location</button>
            {location ? (
                <div>
                    <h3>Coordinates:</h3>
                    <p>Latitude: {location.latitude}</p>
                    <p>Longitude: {location.longitude}</p>
                </div>
            ) : (
                <p>Click "Get Location" to enable location access.</p>
            )}
        </div>
    );
};

export default LocationComponent;
