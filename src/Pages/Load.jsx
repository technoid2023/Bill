import React from 'react';
import ReactLoading from 'react-loading';

const Load = ({ type, color }) => (
    <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '25vh', // Optionally, adjust the height to fill the viewport
    }}>
        <ReactLoading type={type} color={color} height={'15%'} width={'20%'} />
    </div>
);

export default Load;
