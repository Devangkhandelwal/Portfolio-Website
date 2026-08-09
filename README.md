# 🚀 Devang Khandelwal — Personal Portfolio

A modern, high-performance interactive developer portfolio built with **React**, **TypeScript**, **Three.js**, **React Three Fiber**, and **GSAP**. Features an interactive 3D avatar, real-time LeetCode problem-solving stats with a GitHub-style heatmap, 3D physics-based tech stack spheres, and smooth scroll animations.

---

## ✨ Features

- 🎭 **Interactive 3D Avatar Scene**: Custom animated 3D character powered by Three.js & GLTF skeletal animations.
- ⚡ **Optimized WebGL Performance**: Viewport-based WebGL pausing using `IntersectionObserver`, capped pixel ratios, and frame-deferred cursor animations for 60+ FPS scrolling.
- 📊 **Real-time LeetCode Statistics**: Live integration with LeetCode's GraphQL API via serverless endpoint (`api/leetcode-stats.ts`), rendering submission heatmaps, streaks, and problem breakdown.
- ⚽ **3D Physics Tech Stack**: Interactive rigid-body 3D spheres using `@react-three/rapier` and custom shader materials.
- 📜 **GSAP Smooth Scrolling**: Fluid section transitions driven by GSAP ScrollTrigger & ScrollSmoother.
- 💻 **Showcase Projects**: Highlighting full-stack FinTech applications, computer vision deep learning research, and algorithmic systems.

---

## 🛠️ Tech Stack

### **Frontend & 3D WebGL**
- **Core**: React 18, TypeScript, Vite
- **3D & Graphics**: Three.js, React Three Fiber (`@react-three/fiber`), React Three Drei, `@react-three/rapier` (Physics), `@react-three/postprocessing`
- **Animations**: GSAP (ScrollTrigger, ScrollSmoother, SplitText)
- **Styling**: Vanilla CSS3 (Custom Responsive System)

### **Backend, ML & Algorithms**
- **Languages**: Python, C++, Java, JavaScript, TypeScript
- **Backend Frameworks**: Django, FastAPI, REST APIs, PostgreSQL
- **Machine Learning & Vision**: TensorFlow, EfficientNet-B0, XGBoost, SHAP, OpenCV, MediaPipe
- **Algorithms**: Min-Heap Workload Routing, Data Structures & Algorithms (200+ LeetCode Solved)

---

## 📂 Project Structure

```text
Portfolio-Website/
├── api/                     # Serverless functions (LeetCode GraphQL API proxy)
│   └── leetcode-stats.ts
├── public/                  # Static assets, images, 3D models & HDR maps
│   ├── images/
│   └── models/
├── src/
│   ├── assets/              # Web assets
│   ├── components/          # React components
│   │   ├── Character/       # 3D Character canvas & skeletal animation logic
│   │   ├── About.tsx
│   │   ├── Career.tsx
│   │   ├── Contact.tsx
│   │   ├── Cursor.tsx
│   │   ├── DSA.tsx
│   │   ├── Landing.tsx
│   │   ├── LeetCodeStats.tsx
│   │   ├── Loading.tsx
│   │   ├── MainContainer.tsx
│   │   ├── Navbar.tsx
│   │   ├── TechStack.tsx    # 3D Physics spheres canvas
│   │   ├── WhatIDo.tsx
│   │   └── Work.tsx
│   ├── context/             # React Context Providers (LoadingProvider)
│   ├── data/                # Static data & bone mappings
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── package.json
├── vite.config.ts
└── tsconfig.json
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v18.x or higher
- **npm**: v9.x or higher

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/MoncyDev/Portfolio-Website.git
   cd Portfolio-Website
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

4. **Build for production**:
   ```bash
   npm run build
   ```

---

## 📬 Contact & Links

- **Name**: Devang Khandelwal
- **Education**: CS Undergraduate @ UPES Dehradun
- **Email**: [devangkh.dk@gmail.com](mailto:devangkh.dk@gmail.com)
- **LinkedIn**: [Devang Khandelwal](https://linkedin.com)
- **GitHub**: [Devang Khandelwal](https://github.com)

---

## 📄 License

This project is licensed under the MIT License / Personal Portfolio License. Feel free to use the code for learning and inspiration.
