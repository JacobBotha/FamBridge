import React, { useState } from 'react';
import './breadcrumb.css';

export default function Breadcrumb(props) {
    const crumbs = ["All", "Friends", "Family", "Calendar"];
    const [current, setCurrent] = useState("All");
    const handleClick = (crumb) => {
        setCurrent(crumb);
        props.handleCrumbChange(crumb);
    }

    return (
        <div className="container">{
            crumbs.map(crumb => {
                let classes = "crumb " + (crumb === current ? "crumb-selected" : "crumb-deselected" );
                return (<button className={classes} onClick={() => handleClick(crumb)}>{crumb}</button>);
            })
            }
        </div>
    );
}