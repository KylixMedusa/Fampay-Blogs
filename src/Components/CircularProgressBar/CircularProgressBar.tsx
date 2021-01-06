import React from 'react';
import './CircularProgressBar.scss';

type Props = {
    percent:number;
}


const CircularProgressBar: React.FC<Props> = (props)=>{

    const percent = 153.5893333326 - ((props.percent/100) * 153.5893333326);
    return(
        <svg
        className="progress-ring"
        width="50"
        height="50">
        <circle
            className="progress-ring__circle"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray = "153.5893333326 153.5893333326"
            strokeDashoffset ={percent}
            fill="transparent"
            r="22"
            cx="25"
            cy="25"/>
        </svg>
    );
}

export default CircularProgressBar;