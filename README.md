# 🚀 Devang Khandelwal — Personal Portfolio

[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue.svg)](https://www.typescriptlang.org/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL-black.svg)](https://threejs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.1-purple.svg)](https://vitejs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A modern, high-performance interactive 3D developer portfolio built with **React**, **TypeScript**, **Three.js**, **React Three Fiber**, **Rapier 3D Physics**, and **GSAP**. Features an interactive 3D avatar, real-time LeetCode problem-solving statistics with a submission heatmap, 3D physics-based tech stack spheres, and fluid scroll animations.

---

## ✨ Key Features

- 🎭 **Interactive 3D Avatar Scene**: Custom animated 3D character powered by Three.js & GLTF skeletal animations.
- ⚡ **Optimized WebGL Performance**: Viewport-based WebGL pausing using `IntersectionObserver`, capped pixel ratios, and frame-deferred cursor animations for 60+ FPS scrolling.
- 📊 **Real-Time LeetCode Statistics**: Live integration with LeetCode's GraphQL API via serverless endpoint (`api/leetcode-stats.ts`), rendering submission heatmaps, streaks, and problem breakdown.
- ⚽ **3D Physics Tech Stack**: Interactive rigid-body 3D spheres using `@react-three/rapier` and custom shader materials.
- 📜 **GSAP Smooth Scrolling**: Fluid section transitions driven by GSAP ScrollTrigger & ScrollSmoother.
- 💻 **Showcase Projects**: Highlighting full-stack FinTech applications, computer vision deep learning research, and algorithmic systems.

---

## 🛠️ Tech Stack

### **Frontend & 3D WebGL**
- **Core**: React 18, TypeScript, Vite
- **3D & Graphics**: Three.js, React Three Fiber (`@react-three/fiber`), React Three Drei, `@react-three/rapier` (Physics), `@react-three/postprocessing`
- **Animations**: GSAP (ScrollTrigger, ScrollSmoother, SplitText)
- **Styling**: Custom Responsive CSS Design System

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
│   ├── draco/               # Draco 3D mesh compression decoders
│   ├── images/              # Tech icons & project showcase screenshots
│   └── models/              # Character 3D GLB model & environment maps
├── src/
│   ├── assets/              # Static web assets
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
├── tsconfig.json
├── LICENSE
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v18.x or higher
- **npm**: v9.x or higher

### Installation & Local Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Devangkhandelwal/Portfolio-Website.git
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
- **Email**: [devangkh.dk@gmail.com](mailto:devangkh.dk@gmail.com)
- **GitHub**: [@Devangkhandelwal](https://github.com/Devangkhandelwal)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE) - see the file for details.
