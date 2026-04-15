# 📝 DevBlog – Your Writing Space

A modern full-stack blogging platform where users can create, edit, and manage posts with authentication and rich UI.

---

## 🚀 Features

* 🔐 Authentication (Email + OAuth: Google & GitHub)
* ✍️ Create, Edit & Delete blog posts
* 🖼️ Upload featured images
* 🧠 Rich text editor (TinyMCE)
* 👤 User profile & avatar management
* 🎨 Beautiful glassmorphism UI
* ⚡ Fast & responsive design

---

## 📦 Installation

```bash
# Clone repo
git clone https://github.com/your-username/devblog.git

# Go into project
cd devblog

# Install dependencies
npm install

# Run dev server
npm run dev
```

---

## ▶️ Usage

1. Sign up or log in
2. Create a new post
3. Edit or delete anytime
4. Update your profile
5. Explore your dashboard

---

## 🏗️ Project Structure

```
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
```

---

## 🧩 Tech Stack

* React
* React Router DOM
* Redux Toolkit
* React Hook Form
* TinyMCE Editor
* Appwrite (or backend services)

---

## 🔧 Configuration

Make sure to configure:

* `authservice` → authentication APIs
* `configService` → database & storage
* `oAuthservice` → OAuth providers

---

## 💡 Example

### Create Post

```js
await configService.createRow({
  title,
  slug,
  content,
  featuredImage,
  userId
});
```

### Login

```js
const session = await authservice.login({
  email,
  password
});
```

---

## 🛠️ Troubleshooting

* ❌ Posts not loading → check API & auth
* ❌ OAuth issues → verify redirect URL
* ❌ Image upload fails → check storage config

---

## 👤 Author

**Your Name**

---

## 📄 License

MIT License
