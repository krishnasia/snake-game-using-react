import React from "react";
export default (props)=>{
    let length = props.snakeDots.length;
    console.log(props);
    console.log(props.snakeDots);
    console.log(props.snakeDots.length);
    return(
        <div>
            {props.snakeDots &&
                props.snakeDots.map((dot,i)=>{
                    const style = {
                        left:`${dot[0]}%`,
                        top:`${dot[1]}%`,
                        backgroundColor: i == length-1 ? 'rgb(170, 7, 7)':'rgb(241, 147, 69)'
                    }

                    return(
                        <div className="snake-dot" key={i} style={style}></div>
                    )
                })
            }
        </div>
    )

}