import React from 'react';
import {GoogleMap, LoadScript, Marker} from '@react-google-maps/api';

const Map = (props) => {
    const containerStyle={
        width: "80vw",
        height: "70vh"
    }

    const center = {
        // + - convert string to number
        lat: +props.coords.lat,
        lng: +props.coords.lng
    }

    return (
        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLEMAP_API}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={14}>
                <Marker position={center}/>
            </GoogleMap>
        </LoadScript>
    )
}

export default Map;
