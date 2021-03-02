import React from 'react'
import './style.css';

export default function Index(props) {
    return (
        <>
        {/* https://res.cloudinary.com/demo/image/upload/w_400,h_400,c_crop,g_face,r_max/w_200/lady.jpg */}
            <img src={`https://res.cloudinary.com/drantho/image/upload/w_400,h_400,c_crop,g_face,r_max/w_200/${props.portrait}.jpg`}/>
        </>
    )
}
