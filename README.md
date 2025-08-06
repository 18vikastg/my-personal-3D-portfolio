# 🚀 Interactive 3D Portfolio

<div align="center">

![Portfolio Banner](WhatsApp%20Image%202025-07-09%20at%202.20.34%20PM.jpeg)

*A cutting-edge 3D portfolio showcasing modern web development skills*

[![React](https://img.shields.io/badge/React-18.0+-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Three.js](https://img.shields.io/badge/Three.js-r144+-000000?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0+-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/GSAP-3.0+-88CE02?style=for-the-badge&logo=greensock&logoColor=white)](https://greensock.com/gsap/)

</div>

## 🌟 Overview

An immersive, fully animated 3D portfolio website that pushes the boundaries of web development. Built with modern technologies to create an unforgettable user experience that showcases skills, projects, and personality in a unique three-dimensional environment.

**🎯 Perfect for:** Developers, Designers, Creative Professionals, and anyone looking to make a lasting impression

---

## ✨ Key Features

### 🎨 **Visual Excellence**
- **Interactive 3D Models** - Fully navigable 3D scenes with realistic lighting
- **Smooth Animations** - GSAP-powered scroll-triggered transitions
- **Responsive Design** - Seamless experience across all devices and screen sizes
- **Modern UI/UX** - Clean, intuitive interface with attention to detail

### ⚡ **Performance Optimized**
- **Lazy Loading** - Assets load on demand for faster initial page loads
- **Code Splitting** - Optimized bundle sizes with Vite
- **Mobile Optimized** - Smooth performance even on mobile devices
- **SEO Ready** - Structured for search engine optimization

### 📧 **Interactive Features**
- **Contact Integration** - EmailJS-powered contact form with validation
- **Section Navigation** - Smooth scrolling between portfolio sections
- **Project Showcase** - Dynamic project displays with detailed information
- **Skills Visualization** - Interactive skill representation

---

## 🛠️ Technology Stack

| Category | Technologies |
|----------|-------------|
| **Frontend Framework** | React 18+ with modern hooks |
| **3D Graphics** | Three.js, React Three Fiber |
| **3D Helpers** | @react-three/drei, @react-three/postprocessing |
| **Animations** | GSAP (GreenSock Animation Platform) |
| **Styling** | Tailwind CSS with custom configurations |
| **Email Service** | EmailJS for contact form functionality |
| **Build Tool** | Vite for fast development and optimized builds |
| **State Management** | React Context API |

---

## 🚀 Quick Start Guide

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **npm** or **yarn** package manager
- **Git** - [Download here](https://git-scm.com/)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/18vikastg/my-personal-3D-portfolio.git
   cd my-personal-3D-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or if you prefer yarn
   yarn install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_APP_EMAILJS_SERVICE_ID=your_emailjs_service_id
   VITE_APP_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
   VITE_APP_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
   ```
   
   📝 **Get your EmailJS credentials:**
   - Sign up at [EmailJS](https://www.emailjs.com/)
   - Create a service and email template
   - Copy your Service ID, Template ID, and Public Key

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173` to see your portfolio in action! 🎉

---

## 📁 Project Structure

```
my-personal-3D-portfolio/
├── public/
│   ├── models/              # 3D model files (.glb, .gltf)
│   ├── textures/            # Texture images
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── 3D/              # Three.js components
│   │   ├── sections/        # Page sections (About, Projects, etc.)
│   │   └── ui/              # Reusable UI components
│   ├── hooks/               # Custom React hooks
│   ├── utils/               # Helper functions
│   ├── constants/           # Configuration constants
│   └── styles/              # Global styles and Tailwind config
├── .env                     # Environment variables
└── package.json
```

---

## 🎨 Customization Guide

### Personalizing Your Portfolio

1. **Update Personal Information**
   - Edit `src/constants/index.js` with your details
   - Replace profile images in `public/images/`

2. **Add Your Projects**
   - Update project data in `src/constants/projects.js`
   - Add project images and descriptions

3. **Customize 3D Models**
   - Replace 3D models in `public/models/`
   - Supported formats: .glb, .gltf

4. **Styling Modifications**
   - Colors: Update `tailwind.config.js`
   - Animations: Modify GSAP timelines in components

---

## 📦 Build and Deploy

### Building for Production

```bash
npm run build
# or
yarn build
```

### Deployment Options

The built files will be in the `dist/` folder, ready to deploy to:

- **Vercel** (Recommended) - [Deploy Guide](https://vercel.com/docs)
- **Netlify** - [Deploy Guide](https://docs.netlify.com/)
- **GitHub Pages** - [Deploy Guide](https://pages.github.com/)

---

## 🐛 Troubleshooting

### Common Issues

**3D Models not loading?**
- Ensure model files are in the correct format (.glb recommended)
- Check file paths in your components

**EmailJS not working?**
- Verify your environment variables are correctly set
- Check your EmailJS service configuration

**Performance issues?**
- Enable lazy loading for heavy assets
- Consider reducing model complexity

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Three.js Community** - For the incredible 3D web framework
- **React Three Fiber** - Making Three.js accessible in React
- **GSAP** - For smooth, professional animations
- **Open Source Contributors** - For the amazing tools and libraries

---

## 📞 Connect with Me

<div align="center">

**Built with ❤️ by Vikas T G**

[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/18vikastg)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/vikas-t-g-09692325a/)
[![Portfolio](https://img.shields.io/badge/Portfolio-FF5722?style=for-the-badge&logo=todoist&logoColor=white)](https://vikastg.vercel.app/)

*⭐ Star this repository if you found it helpful!*

</div>

---

## 📚 Additional Resources

- [Three.js Documentation](https://threejs.org/docs/)
- [React Three Fiber Documentation](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction)
- [GSAP Documentation](https://greensock.com/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [EmailJS Documentation](https://www.emailjs.com/docs/)

---

<div align="center">
<sub>© 2025 Vikas T G. All rights reserved.</sub>
</div>
