import React from 'react';
import ReactLoading from 'react-loading';

const Load = ({ type, color }) => (
    <div style={{marginLeft:'25rem',marginTop:'8rem'}}>
        <ReactLoading type={type} color={color} height={'15%'} width={'20%'}/>
    </div>
);

export default Load;
