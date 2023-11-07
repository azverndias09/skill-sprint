import { Map } from '@googlemaps/react-wrapper';
import React from 'react';


const location = {
    lat: 37.7749,
    lng: -122.4194
};

export default function GoogleMap() {
    return (
        <div style={{ height: '80vh', width: '100vw' }}>
            <Map
                center={location}
                zoomControl={false}
                styles={{
                    container: {
                        height: '100%',
                        width: '100%',
                        borderRadius: '0.5rem',
                        boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.1)',
                    },
                }}
            >
            </Map>
        </div>
    );
}