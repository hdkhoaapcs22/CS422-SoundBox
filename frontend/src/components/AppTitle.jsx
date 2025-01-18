import React from "react";

const AppTitle = ({ iconSize = 22, textSize = 18 }) => {
    const gapItem = iconSize * 0.6;
    const innerIcon = iconSize * 0.5;

    return (
        <div className="flex items-center" style={{ gap: `${gapItem}px` }}>
            <div
                className="relative flex items-center justify-center bg-lime-400 rounded-full"
                style={{ width: `${iconSize}px`, height: `${iconSize}px` }}
            >
                <div
                    className="bg-blue-600 clip-triangle"
                    style={{
                        width: `${innerIcon}px`,
                        height: `${innerIcon}px`,
                    }}
                ></div>
            </div>
            <p
                className="text-white font-bold"
                style={{ fontSize: `${textSize}px` }}
            >
                Soundbox
            </p>
        </div>
    );
};

export default AppTitle;
