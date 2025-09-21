import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TrailCard from "../components/TrailCard";

export default function Home() {
    const [featuredTrails, setFeaturedTrails] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTrails = async () => {
            const res = await fetch("http://localhost:8000/api/trails");
            const data = await res.json();
            const shuffled = [...data].sort(() => 0.5 - Math.random());
            setFeaturedTrails(shuffled.slice(0, 3));
        };

        fetchTrails();
    }, []);

    return (
        <div className="pt-0">
            {/* Hero Section */}
            <section
                id="home"
                className="relative h-screen bg-cover bg-center bg-no-repeat flex items-center justify-start"
                style={{ backgroundImage: "url('/images/hero.jpeg')" }}
            >
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-50 z-0 pointer-events-none"></div>

                {/* Left-aligned text content */}
                <div className="relative z-10 text-white pl-12 md:pl-24 max-w-4xl">
                    <h1 className="text-5xl md:text-6xl font-extrabold drop-shadow-md mb-4 whitespace-nowrap leading-tight">
                        TrailWay
                    </h1>
                    <p className="text-xl md:text-2xl drop-shadow mb-6 whitespace-nowrap">
                        Discover your next adventure in Washington's National Parks
                    </p>
                    <button
                        onClick={() => navigate("/trails")}
                        className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-full transition"
                    >
                        Explore Trails
                    </button>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="bg-white h-screen">
                <div className="flex flex-col md:flex-row w-full h-full">

                    {/* Text Section */}
                    <div className="w-full md:w-1/2 px-6 md:pl-20 py-16 flex flex-col justify-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Explore Washington’s Best Trails</h2>
                        <p className="text-gray-700 text-lg mb-4 leading-relaxed">
                            TrailWay connects you with over 150 hiking trails in Mount Rainier, Olympic, and North Cascades National Parks.
                            Use our filters, difficulty guides, trail descriptions, and weather data to find your perfect hike.
                        </p>
                        <p className="text-gray-500">Plan smarter. Hike safer. Discover more.</p>
                    </div>

                    {/* Image Section */}
                    <div className="w-full md:w-1/2 h-full">
                        <img
                            src="/images/about.jpeg"
                            alt="About TrailWay"
                            className="w-full h-full object-cover block"
                        />
                    </div>

                </div>
            </section>


            {/* Services Section */}
            <section id="services" className="min-h-screen bg-gray-50 py-20 px-6">
                <div className="max-w-6xl mx-auto">

                    {/* Main Heading */}
                    <h2 className="text-3xl font-bold mb-12 text-center">What TrailWay Offers</h2>

                    {/* Top 3 Services */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                        <div className="bg-white p-6 rounded-lg shadow-md text-center">
                            <img src="/icons/discover.svg" alt="Trail Discovery" className="w-10 h-10 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Trail Discovery</h3>
                            <p className="text-gray-600">Search and explore over 150 curated trails by difficulty, length, or region.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md text-center">
                            <img src="/icons/map.svg" alt="Park Guides" className="w-10 h-10 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Park Guides</h3>
                            <p className="text-gray-600">Access detailed info and tips for Washington's top national parks.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md text-center">
                            <img src="/icons/weather.svg" alt="Live Weather" className="w-10 h-10 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Live Weather</h3>
                            <p className="text-gray-600">See current trail conditions and forecasts before you hit the trail.</p>
                        </div>
                    </div>

                    {/* Featured Trails */}
                    <h3 className="text-3xl font-bold mb-12 text-center">Featured Trails</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {featuredTrails.map((trail) => (
                            <TrailCard key={trail.id} trail={trail} />
                        ))}
                    </div>

                </div>
            </section>
        </div>
    );
}
