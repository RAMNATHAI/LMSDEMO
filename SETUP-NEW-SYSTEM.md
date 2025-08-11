# 🚀 LMS Prototype - Setup on New System

## 📋 **System Requirements**
- **Node.js** 18 or higher
- **npm** (comes with Node.js)
- **Git** (optional, for cloning)

## 🎯 **Quick Setup Options**

### **Option 1: GitHub Clone (Recommended)**
```bash
# Clone repository
git clone https://github.com/RAMNATHAI/LMSDEMO.git
cd LMSDEMO

# Install dependencies
npm install

# Start development server
npm run dev
```

### **Option 2: Download & Extract**
1. Download: https://github.com/RAMNATHAI/LMSDEMO/archive/refs/heads/main.zip
2. Extract ZIP file
3. Open terminal in extracted folder
4. Run:
```bash
npm install
npm run dev
```

### **Option 3: Copy Files**
1. Copy entire project folder to new system
2. Open terminal in project folder
3. Run:
```bash
npm install
npm run dev
```

## 🌐 **Access the LMS**
- **URL:** http://localhost:5173/
- **Demo Credentials:** 
  - Email: demo@lms.com
  - Password: demo123

## ✨ **What You'll Get**
- ✅ Advanced Course Catalog with 3-tier filtering
- ✅ AI-powered recommendations and analytics
- ✅ Leaderboards and achievement system
- ✅ Social features and community tools
- ✅ Professional UI/UX with responsive design
- ✅ 12 diverse courses across multiple domains

## 🔧 **Troubleshooting**

### **If npm install fails:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### **If port 5173 is busy:**
```bash
# Use different port
npm run dev -- --port 3000
```

### **For Windows users:**
- Use PowerShell or Command Prompt
- Ensure Node.js is in PATH

### **For Mac/Linux users:**
- Use Terminal
- May need to use `sudo` for global installations

## 📦 **Build for Production**
```bash
# Build optimized version
npm run build

# Preview production build
npm run preview
```

## 🐳 **Docker Option (Future)**
```bash
# Will be available soon
docker build -t lms-demo .
docker run -p 3000:3000 lms-demo
```

## 📱 **Mobile Testing**
- Access from mobile: http://[your-ip]:5173/
- Responsive design works on all devices

## 🎯 **Demo Features to Test**
1. **Login** with demo credentials
2. **Browse courses** with filtering
3. **Check leaderboards** (Daily/Weekly/Monthly)
4. **View recommendations** and analytics
5. **Explore achievements** and badges
6. **Test social features** and profiles

## 🌟 **Sharing with Others**
- Share GitHub repository: https://github.com/RAMNATHAI/LMSDEMO
- Share live demo: https://ramnathai.github.io/LMSDEMO/
- Copy project folder directly

---

**Your LMS prototype is now ready to run on any system! 🎉**
