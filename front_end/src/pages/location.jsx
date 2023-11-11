import React, { useState } from 'react';

function LocationPrompt() {
    const [locationPermission, setLocationPermission] = useState(false);
    const [state, setState] = useState('');
    const [city, setCity] = useState('');

    const handleLocationButtonClick = async () => {
        // Check if device supports geolocation
        if (!navigator.geolocation) {
            alert('Your device does not support geolocation.');
            return;
        }

        // Prompt user for location permission
        const permission = await requestPermissions();

        // Handle permission response
        if (permission) {
            // Get user's location
            const position = await getCurrentPosition();

            // Retrieve state and city using OpenCage geocoding API
            const url = `https://api.opencagedata.com/geocode?q=${position.coords.latitude},${position.coords.longitude}&key=beb5c896b764449dab227590b9f6205c`;
            const response = await fetch(url);
            const data = await response.json();

            // Update state and city fields
            setState(data.results[0].address_components.find(component => component.types.includes('administrative')).short_name);
            setCity(data.results[0].address_components.find(component => component.types.includes('locality')).short_name);
        } else {
            alert('You denied the request for your location.');
        }
    };

    const requestPermissions = async () => {
        return new Promise((resolve, reject) => {
            navigator.permissions.query('geolocation')
                .then(permission => resolve(permission.state === 'granted'))
                .catch(() => reject());
        });
    };

    const getCurrentPosition = async () => {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
    };

    return (
        <div>
            <button onClick={handleLocationButtonClick}>Retrieve My Location</button>
            <p>{state}</p>
            <p>{city}</p>
        </div>
    );
}

export default LocationPrompt;