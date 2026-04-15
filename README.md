📝 DevBlog – Full Stack Blogging Platform
📌 Introduction

DevBlog is a modern full-stack blogging platform that allows users to create, edit, delete, and manage blog posts with a clean UI and secure authentication system. It supports OAuth (Google & GitHub), rich text editing, image uploads, and user profile management.

The project is built using React, Redux, and Appwrite-like backend services (via authservice, configService, and oAuthservice).

📚 Table of Contents
Features
Installation
Usage
Project Structure
Dependencies
Configuration
Components Overview
Examples
Troubleshooting
Contributors
License
🚀 Features
🔐 Authentication
Email/Password login & signup
OAuth login (Google & GitHub)
Secure session handling
✍️ Blogging
Create, edit, delete posts
Rich text editor (TinyMCE)
Featured image upload
👤 User Profile
Avatar upload & update
Editable profile info (bio, age, gender, etc.)
🎨 UI/UX
Glassmorphism design
Responsive layout
Animated hero section
⚙️ State Management
Redux for auth & error handling
⚙️ Installation
# Clone the repository
git clone https://github.com/your-username/devblog.git

# Navigate into the project
cd devblog

# Install dependencies
npm install

# Start development server
npm run dev
▶️ Usage
Sign up or login
Create a new blog post
Edit or delete posts anytime
Update your profile and avatar
Explore your personal dashboard
🏗️ Project Structure
src/
│
├── components/
│   ├── BlogEdit.jsx
│   ├── Button.jsx
│   ├── Error.jsx
│   ├── Footer.jsx
│   ├── Header.jsx
│   ├── HeroSection.jsx
│   ├── Home.jsx
│   ├── Input.jsx
│   ├── Login.jsx
│   ├── LogoutBtn.jsx
│   ├── Oauth.jsx
│   ├── PostForm.jsx
│   ├── Profile.jsx
│   ├── RTE.jsx
│   ├── Signup.jsx
│   ├── Toaster.jsx
│   └── UserForm.jsx
│
├── config/
├── store/
└── assets/
📦 Dependencies
React
React Router DOM
Redux Toolkit
React Hook Form
TinyMCE Editor
html-react-parser
🔧 Configuration
Backend Services

Make sure to configure:

authservice → authentication APIs
configService → database & storage
oAuthservice → OAuth providers

These are used extensively across the app for:

Login/signup
Post CRUD operations
Profile management
🧩 Components Overview
🏠 Home
Displays posts for logged-in users
Shows login prompt if unauthenticated
✍️ PostForm
Handles both create & edit modes
Uses React Hook Form + TinyMCE
📄 BlogEdit
Displays single blog post
Edit & delete actions
🔐 Login / Signup
Email/password + OAuth authentication
👤 Profile
User details + avatar upload
🧭 Header & Footer
Navigation and branding
💡 Examples
Create a Post
await configService.createRow({
  title,
  slug,
  content,
  featuredImage,
  userId
});
Login User
const session = await authservice.login({
  email,
  password
});
🛠️ Troubleshooting
❌ Post not loading
Check configService.listRows() API
Ensure user is authenticated
❌ OAuth not working
Verify redirect URL
Ensure userId and secret are present
❌ Image upload fails
Check file permissions
Validate backend storage config
👥 Contributors
Your Name (Developer)
📄 License

This project is licensed under the MIT License.

🔥 Final Notes

This is a production-ready blogging platform UI with:

Clean architecture
Scalable components
Real-world authentication flows
