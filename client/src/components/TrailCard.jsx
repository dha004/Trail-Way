import React, { useState } from "react";

const TrailCard = ({ trail }) => {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [hovered, setHovered] = useState(false);
    const [flipped, setFlipped] = useState(false);

    const fetchWeather = async () => {
        if (!weather && !loading) {
            setLoading(true);
            try {
                const res = await fetch(
                    `http://localhost:8000/api/weather?lat=${trail.latitude}&lon=${trail.longitude}`
                );
                const data = await res.json();
                setWeather({
                    temperature: data?.main?.temp,
                    description: data?.weather?.[0]?.description,
                });
            } catch (err) {
                console.error("Error fetching weather:", err);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleMouseEnter = () => {
        setHovered(true);
        fetchWeather();
    };

    const handleMouseLeave = () => setHovered(false);

    const calculateEstimatedTime = (lengthMiles) => {
        if (!lengthMiles) return null;
        const totalMiles = lengthMiles * 2;
        const hours = totalMiles / 2;
        const fullHours = Math.floor(hours);
        const minutes = Math.round((hours - fullHours) * 60);
        return { fullHours, minutes };
    };

    const estimatedTime = calculateEstimatedTime(trail.length_miles);

    const getDifficultyColor = (difficulty) => {
        if (!difficulty) return "text-gray-700";
        switch (difficulty.toLowerCase()) {
            case "easy":
                return "text-green-600 font-semibold";
            case "moderate":
                return "text-yellow-600 font-semibold";
            case "hard":
                return "text-red-600 font-semibold";
            default:
                return "text-gray-700";
        }
    };

    return (
        <div
            className="group [perspective:1000px] w-full h-[300px]"
            onClick={() => setFlipped(!flipped)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div
                className={`relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] ${flipped ? "[transform:rotateY(180deg)]" : ""}`}
            >
                {/* Front Side */}
                <div className="absolute inset-0 backface-hidden bg-white border border-gray-200 rounded-2xl p-6 shadow-md flex flex-col justify-between">
                    {trail.pet_friendly && (
                        <div className="absolute top-3 right-3 bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1 shadow">
                            🐾 Pet-Friendly
                        </div>
                    )}

                    <div>
                        <h2 className="text-lg font-bold text-gray-800 mb-1">{trail.name}</h2>
                        <p className="text-sm text-gray-500 mb-3">{trail.park}</p>
                        <div className="space-y-1 text-sm text-gray-700">
                            <p>📏 {trail.length_miles} mi</p>
                            <p>🧗 {trail.elevation_gain} ft</p>
                            <p className={getDifficultyColor(trail.difficulty)}>🥾 {trail.difficulty}</p>
                            {estimatedTime && (
                                <p>⏱ {estimatedTime.fullHours}h {estimatedTime.minutes}m (roundtrip)</p>
                            )}
                        </div>
                    </div>

                    <p className="text-xs text-gray-400 text-left mt-3 group-hover:opacity-100 transition-opacity">
                        Click to flip
                    </p>

                    {hovered && (
                        <div className="absolute bottom-3 right-3 bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-xs shadow-md w-[150px] text-center z-10">
                            {loading ? "Loading..." : weather?.temperature ? (
                                <>
                                    🌡 {weather.temperature}°F
                                    <br />
                                    {weather.description}
                                </>
                            ) : "No weather"}
                        </div>
                    )}
                </div>

                {/* Back Side */}
                <div className="absolute inset-0 backface-hidden [transform:rotateY(180deg)] bg-white border border-gray-200 rounded-2xl p-6 shadow-md flex flex-col justify-center">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">Trail Description</h3>
                    <p className="text-sm text-gray-600">
                        {trail.description || "No description available."}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TrailCard;







