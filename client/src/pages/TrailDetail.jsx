import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function TrailDetail() {
    const { id } = useParams();
    const [trail, setTrail] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:8000/api/trails`)
            .then((res) => res.json())
            .then((data) => {
                const selected = data.find((t) => t.id === parseInt(id));
                setTrail(selected);
            })
            .catch((err) => console.error("Failed to load trail:", err));
    }, [id]);

    if (!trail) return <div className="p-6 text-lg">Loading trail info...</div>;

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold text-green-700 mb-2">{trail.name}</h2>
            <p className="text-gray-600">{trail.location}</p>
            <p className="mt-2 text-sm">
                <strong>Length:</strong> {trail.length_km} km <br />
                <strong>Difficulty:</strong> {trail.difficulty} <br />
                <strong>Elevation Gain:</strong> {trail.elevation_gain} m
            </p>
        </div>
    );
}
