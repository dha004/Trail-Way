import { useEffect, useState } from "react";
import TrailCard from "../components/TrailCard";

export default function Trails() {
    const [trails, setTrails] = useState([]);
    const [selectedPark, setSelectedPark] = useState("");
    const [selectedDifficulty, setSelectedDifficulty] = useState("");
    const [onlyPetFriendly, setOnlyPetFriendly] = useState(false);

    useEffect(() => {
        const fetchTrails = async () => {
            let url = "http://localhost:8000/api/trails?";
            const params = [];

            if (selectedPark) params.push(`park=${encodeURIComponent(selectedPark)}`);
            if (selectedDifficulty) params.push(`difficulty=${encodeURIComponent(selectedDifficulty)}`);
            if (onlyPetFriendly) params.push(`pet_friendly=true`);

            if (params.length > 0) {
                url += params.join("&");
            }

            try {
                const res = await fetch(url);
                const data = await res.json();
                setTrails(data);
            } catch (err) {
                console.error("Failed to fetch trails:", err);
            }
        };

        fetchTrails();
    }, [selectedPark, selectedDifficulty, onlyPetFriendly]);

    return (
        <div
            className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed"
            style={{ backgroundImage: "url('/images/trailphoto.jpeg')" }}
        >
            <div className="absolute inset-0 bg-black bg-opacity-50 z-0 pointer-events-none"></div>
            
            {/* Content wrapper */}
            <div className="relative z-10 px-6 py-20">
                <h1 className="text-2xl font-bold mb-4 text-white text-center drop-shadow">
                    Explore Washington Trails
                </h1>

                {/* Filters */}
                <div className="mb-8 flex flex-wrap gap-4 bg-white bg-opacity-90 p-4 rounded-xl shadow justify-center">
                    <div>
                        <label className="text-sm font-medium mr-2">Park:</label>
                        <select
                            className="border p-2 rounded"
                            value={selectedPark}
                            onChange={(e) => setSelectedPark(e.target.value)}
                        >
                            <option value="">All Parks</option>
                            <option value="Mount Rainier National Park">Mount Rainier</option>
                            <option value="Olympic National Park">Olympic</option>
                            <option value="North Cascades National Park">North Cascades</option>
                        </select>
                    </div>

                    <div>
                        <label className="text-sm font-medium mr-2">Difficulty:</label>
                        <select
                            className="border p-2 rounded"
                            value={selectedDifficulty}
                            onChange={(e) => setSelectedDifficulty(e.target.value)}
                        >
                            <option value="">All Levels</option>
                            <option value="Easy">Easy</option>
                            <option value="Moderate">Moderate</option>
                            <option value="Hard">Hard</option>
                        </select>
                    </div>

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="petFriendly"
                            className="mr-2"
                            checked={onlyPetFriendly}
                            onChange={(e) => setOnlyPetFriendly(e.target.checked)}
                        />
                        <label htmlFor="petFriendly" className="text-sm font-medium text-gray-800">
                            Pet-Friendly Only
                        </label>
                    </div>
                </div>

                {/* Trail Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {trails.map((trail) => (
                        <TrailCard key={trail.id} trail={trail} />
                    ))}
                </div>
            </div>
        </div>
    );


}
