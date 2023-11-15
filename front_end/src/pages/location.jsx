import React, { useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

const LocationComponent = () => {
    const [location, setLocation] = useState(null);

    useEffect(() => {
        mapboxgl.accessToken = 'pk.eyJ1IjoianNvbndhdiIsImEiOiJjbHAwOHoyenkwNm96Mm9xdWZmdDBocGRqIn0.9NmSwTcFEXlTGwv2jeCucw';

        if (location) {
            const { latitude, longitude } = location;

            const map = new mapboxgl.Map({
                container: 'map', // Specify the HTML element ID where you want to render the map
                style: 'mapbox://styles/mapbox/streets-v11', // Choose the map style
                center: [longitude, latitude], // Set the initial map center using obtained coordinates
                zoom: 12 // Set the initial zoom level
            });

            // Add marker to the map at the specified coordinates
            new mapboxgl.Marker().setLngLat([longitude, latitude]).addTo(map);
        }
    }, [location]);

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
            <div id="map" style={{ width: '100%', height: '400px' }}></div>
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
