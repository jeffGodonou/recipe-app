/******************************************************************
* Extract from: 
* https://github.com/atherosai/ui/blob/main/loaders-01/index.html
*******************************************************************/
import React from "react";
import "./Loader.scss";

const Loader = () => {
    return (
        <div class="loader-wrapper">
            <div class="cube-wrapper">
                <div class="cube">
                    <div class="sides">
                        <div class="top"></div>
                        <div class="right"></div>
                        <div class="bottom"></div>
                        <div class="left"></div>
                        <div class="front"></div>
                        <div class="back"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Loader;