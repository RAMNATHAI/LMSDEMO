# 🐳 LMS Prototype - Docker Demo

## 🚀 Quick Start

### Prerequisites
- Docker Desktop installed and running
- 4GB+ RAM available
- Port 3000 available

### Option 1: Automated Setup (Recommended)

**Windows:**
```bash
start-demo.bat
```

**Linux/Mac:**
```bash
chmod +x start-demo.sh
./start-demo.sh
```

### Option 2: Manual Setup

```bash
# Build the container
docker-compose build

# Start the demo
docker-compose up -d

# Open browser: http://localhost:3000
```

## 🌐 Accessing the Demo

- **Local:** http://localhost:3000
- **Network sharing:** http://YOUR_IP_ADDRESS:3000
- **Demo credentials:** demo@lms.com / demo123

## 📱 Features Included

✅ **Course Catalog** with advanced filtering
✅ **Leaderboard** system (Daily/Weekly/Monthly)
✅ **Course Recommendations** with AI suggestions
✅ **Achievement System** with badges and trophies
✅ **Social Features** and user profiles
✅ **Skills Tracking** and progress monitoring

## 🛠️ Management Commands

```bash
# Stop the demo
docker-compose down

# View logs
docker-compose logs -f

# Restart
docker-compose restart

# Rebuild after changes
docker-compose build --no-cache
```

## 📦 Sharing the Demo

### Method 1: Share Docker Image
```bash
# Save image to file
docker save lms-demo > lms-prototype.tar

# On target machine
docker load < lms-prototype.tar
docker run -p 3000:3000 lms-demo
```

### Method 2: Share Project Folder
1. Copy entire project folder
2. Run `start-demo.bat` or `start-demo.sh`
3. Demo will build and start automatically

## 🔧 Troubleshooting

**Port 3000 in use:**
```bash
# Change port in docker-compose.yml
ports:
  - "3001:3000"  # Use port 3001 instead
```

**Container won't start:**
```bash
# Check logs
docker-compose logs

# Rebuild
docker-compose build --no-cache
```

**Performance issues:**
- Ensure Docker has 4GB+ RAM allocated
- Close other applications
- Check Docker Desktop settings

## 📊 System Requirements

- **RAM:** 4GB minimum, 8GB recommended
- **Storage:** 2GB free space
- **OS:** Windows 10+, macOS 10.14+, Linux
- **Docker:** Latest version recommended
