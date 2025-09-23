<h1>TrailWay 🌲</h1>

<p>
TrailWay is a full-stack web application inspired by AllTrails that helps hikers discover, track, and explore trails. 
Built with a modern tech stack, TrailWay integrates live weather data and emphasizes usability and accessibility.
</p>

<h2>🚀 Features</h2>
<ul>
  <li>🔍 <strong>Trail Search &amp; Browse</strong> – Explore hiking trails with details and difficulty levels</li>
  <li>🌤 <strong>Live Weather Integration</strong> – Real-time weather conditions via OpenWeatherMap API</li>
  <li>📍 <strong>Trail Details</strong> – Information on distance, elevation, and location</li>
  <li>🎨 <strong>Responsive UI</strong> – Built with React + Tailwind CSS for a clean, accessible design</li>
  <li>📊 <strong>Database-backed</strong> – Trails and user data stored in PostgreSQL with SQLAlchemy</li>
  <li>⚡ <strong>FastAPI Backend</strong> – Lightweight and high-performance API layer</li>
</ul>

<h2>🛠 Tech Stack</h2>
<ul>
  <li><strong>Frontend</strong>: React, Tailwind CSS, Vite</li>
  <li><strong>Backend</strong>: FastAPI (Python), Uvicorn</li>
  <li><strong>Database</strong>: PostgreSQL, SQLAlchemy</li>
  <li><strong>APIs</strong>: OpenWeatherMap API</li>
  <li><strong>Tools</strong>: Figma (UI design), GitHub, Vercel</li>
</ul>

<h2>📂 Project Structure</h2>
<pre>
trailway/
├── frontend/        # React + Tailwind app
├── backend/         # FastAPI app
└── README.md
</pre>

<h2>⚙️ Setup Instructions</h2>

<h3>Prerequisites</h3>
<ul>
  <li>Node.js &amp; npm</li>
  <li>Python 3.10+</li>
  <li>PostgreSQL</li>
</ul>

<h3>Frontend (React)</h3>
<pre>
cd frontend
npm install
npm run dev
</pre>

<h3>Backend (FastAPI)</h3>
<pre>
cd backend
python -m venv .venv
source .venv/bin/activate   # On Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
</pre>

<h2>📸 Screenshots (optional)</h2>
<p><em>Add screenshots of your homepage, trail details page, etc.</em></p>

<h2>🎯 Learning Highlights</h2>
<ul>
  <li>Implemented <strong>React with Tailwind CSS</strong> for modern, responsive UI design</li>
  <li>Designed RESTful APIs with <strong>FastAPI</strong> and integrated external APIs (OpenWeatherMap)</li>
  <li>Gained experience in <strong>database design</strong> using PostgreSQL + SQLAlchemy</li>
  <li>Applied accessibility and usability principles from <strong>HCI coursework</strong></li>
</ul>

<h2>📄 License</h2>
<p>This project is licensed under the MIT License.</p>
