# Sumukh Chourasia - Personal Portfolio Website

A stunning, animated personal portfolio website built with React, Tailwind CSS, and Framer Motion featuring 3D effects, smooth animations, and all 41 GitHub projects.

![Portfolio Preview](https://img.shields.io/badge/React-19-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC) ![Framer Motion](https://img.shields.io/badge/Framer%20Motion-12-purple)

## ✨ Features

- **3D Animated Hero Section** - Floating geometric shapes, parallax effects, particle system
- **Interactive Skills Section** - Animated skill bars with category-based organization
- **Experience Timeline** - Clean timeline layout with animations
- **Featured Projects** - 3D tilt cards with hover effects
- **41 GitHub Repositories** - Filterable by category (Hackathon, AI/ML, Web Dev, IoT, etc.)
- **Custom Cursor** - Elegant animated cursor on desktop
- **Fully Responsive** - Mobile-first design
- **Smooth Scrolling** - Seamless navigation throughout

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- Yarn or npm

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/9SERG4NT/Sumukh_Website.git
cd Sumukh_Website
```

2. **Install dependencies**
```bash
yarn install
# or
npm install
```

3. **Start development server**
```bash
yarn start
# or
npm start
```

4. **Open in browser**
```
http://localhost:3000
```

## 📁 Project Structure

```
src/
├── components/
│   ├── Hero.jsx           # 3D animated hero section
│   ├── About.jsx          # About section with education
│   ├── Skills.jsx         # Interactive skill bars
│   ├── Experience.jsx     # Experience timeline
│   ├── Projects.jsx       # Featured projects
│   ├── GitHubProjects.jsx # All 41 GitHub repos
│   ├── Contact.jsx        # Contact form
│   ├── Footer.jsx         # Footer with links
│   ├── Navbar.jsx         # Navigation
│   ├── CustomCursor.jsx   # Animated cursor
│   └── ui/                # Shadcn UI components
├── data/
│   ├── mock.js            # Personal & resume data
│   └── githubProjects.js  # GitHub repositories data
├── hooks/
│   └── use-toast.js       # Toast notifications
├── lib/
│   └── utils.js           # Utility functions
├── App.js                 # Main app component
├── App.css                # Global styles
└── index.css              # Tailwind imports
```

## 🔗 Social Links

- **GitHub**: [github.com/9SERG4NT](https://github.com/9SERG4NT)
- **LinkedIn**: [linkedin.com/in/sumukh-chourasia-7b6295241](https://www.linkedin.com/in/sumukh-chourasia-7b6295241/)
- **HackerRank**: [hackerrank.com/profile/dearsumukh](https://www.hackerrank.com/profile/dearsumukh)
- **LeetCode**: [leetcode.com/u/Sumukh_Chourasia](https://leetcode.com/u/Sumukh_Chourasia/)
- **Kaggle**: [kaggle.com/serg4nt](https://www.kaggle.com/serg4nt)
- **Email**: dearsumukh@gmail.com

## 🛠️ Built With

- [React 19](https://react.dev/) - UI Framework
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [Lucide React](https://lucide.dev/) - Icons
- [Shadcn/UI](https://ui.shadcn.com/) - UI Components

## 📝 Customization

### Update Personal Information
Edit `src/data/mock.js` to update:
- Name, title, bio
- Contact information
- Social links
- Skills & experience
- Education details

### Update GitHub Projects
Edit `src/data/githubProjects.js` to:
- Add/remove projects
- Update descriptions
- Change categories

## 🚀 Deployment

### Build for Production
```bash
yarn build
# or
npm run build
```

### Deploy to GitHub Pages
```bash
npm install gh-pages --save-dev
```

Add to `package.json`:
```json
"homepage": "https://9serg4nt.github.io/Sumukh_Website",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}
```

Then run:
```bash
npm run deploy
```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Made with ❤️ by Sumukh Chourasia
