# 🎓 LMS Prototype - Learning Management System Demo

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Click_Here-brightgreen)](https://ramnathai.github.io/LMS-PROTYPE-DEMO/)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue)](https://www.docker.com/)
[![React](https://img.shields.io/badge/React-18-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)

> **CHECKPOINT 50** - Advanced Course Catalog with Filtering System

A comprehensive Learning Management System prototype featuring course catalog with advanced filtering, leaderboards, recommendations, achievements, and social features.

## 🌐 **[🚀 LIVE DEMO - Click Here!](https://ramnathai.github.io/LMS-PROTYPE-DEMO/)**
**Demo Credentials:** demo@lms.com / demo123

## 🚀 Quick Start

### Option 1: Live Demo (No Installation Required)
**🌐 [Access Live Demo](https://ramnathai.github.io/LMS-PROTYPE-DEMO/)**
- No download or installation needed
- Works directly in your browser
- Demo credentials: demo@lms.com / demo123

### Option 2: Docker (Recommended for Local)
```bash
# Clone repository
git clone https://github.com/RAMNATHAI/LMS-PROTYPE-DEMO.git
cd LMS-PROTYPE-DEMO

# Start with Docker
./start-demo.sh    # Linux/Mac
start-demo.bat     # Windows

# Open: http://localhost:3000
```

### Option 3: Local Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open: http://localhost:5173
```

## 🎯 Demo Credentials
- **Email:** demo@lms.com
- **Password:** demo123

## ✨ Features

### 📚 Course Catalog with Advanced Filtering
- **12 diverse courses** across multiple domains
- **3-tier filtering system:**
  - Course Type: Technical, Business, Creative, Soft Skills
  - Difficulty Level: Beginner, Intermediate, Advanced
  - Department: Engineering, Data & Analytics, Design, Management, Marketing, HR & Development, Finance
- **Real-time filtering** with instant results
- **Filter summary** and active filter badges
- **Enhanced course cards** with visual indicators

### 🏆 Leaderboard System
- **Daily, Weekly, Monthly** rankings
- **Trophy and badge rewards** (no monetary references)
- **User statistics** and achievement tracking
- **Platform analytics** and recent awards

### 🤖 AI-Powered Recommendations
- **Personalized course suggestions**
- **Trending courses** and popular picks
- **Collaborative filtering** based on user behavior
- **Content-based matching** with detailed analytics

### 🎖️ Achievement System
- **Badge collection** and progress tracking
- **Skill profiles** and competency mapping
- **Learning streaks** and milestones
- **Social recognition** and sharing

### 👥 Social Features
- **User profiles** and activity feeds
- **Discussion forums** and study groups
- **Peer connections** and mentoring
- **Collaborative learning** tools

## 🛠️ Technology Stack

- **Frontend:** React 18 + TypeScript
- **Styling:** Inline styles (no external dependencies)
- **Build Tool:** Vite
- **Containerization:** Docker + Docker Compose
- **State Management:** React Hooks

## 📱 Screenshots

### Course Catalog with Filtering
![Course Catalog](https://via.placeholder.com/800x400?text=Course+Catalog+with+Filtering)

### Leaderboard System
![Leaderboard](https://via.placeholder.com/800x400?text=Leaderboard+System)

### Course Recommendations
![Recommendations](https://via.placeholder.com/800x400?text=AI+Recommendations)

## 🐳 Docker Deployment

### Build and Run
```bash
# Build container
docker-compose build

# Start demo
docker-compose up -d

# Stop demo
docker-compose down
```

### Share Demo
```bash
# Save image
docker save lms-demo > lms-prototype.tar

# Load on target machine
docker load < lms-prototype.tar
docker run -p 3000:3000 lms-demo
```

## 🔧 Development

### Prerequisites
- Node.js 18+
- npm or yarn
- Docker (for containerization)

### Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📊 Project Structure
```
lms-prototype/
├── src/
│   ├── App.tsx              # Main application component
│   ├── LMSComponents.tsx    # All LMS feature components
│   └── main.tsx            # Application entry point
├── public/                  # Static assets
├── Dockerfile              # Container configuration
├── docker-compose.yml      # Docker orchestration
├── start-demo.bat          # Windows quick start
├── start-demo.sh           # Linux/Mac quick start
└── README.md               # This file
```

## 🎯 Roadmap

- [ ] User authentication and authorization
- [ ] Real backend integration
- [ ] Mobile responsive design
- [ ] Advanced analytics dashboard
- [ ] Video content support
- [ ] Assessment and quiz system
- [ ] Certificate generation
- [ ] Multi-language support

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with React and TypeScript
- Containerized with Docker
- Designed for educational purposes
- Open source and free to use

---

**🎉 Ready to explore the future of learning management systems!**
