# Social Media Platform

A full-stack social media application that allows users to share posts, upload images, like content, and engage with comments. Built with modern web technologies and deployed for production use.

## 🌐 Live Demo

- **Frontend**: [https://3w-assignment-five.vercel.app/](https://3w-assignment-five.vercel.app/)
- **Backend API**: [https://threew-assignment-1.onrender.com](https://threew-assignment-1.onrender.com)

## ✨ Features

- **User Authentication**: Secure signup and login functionality
- **Post Creation**: Create text posts with optional image attachments
- **Image Upload**: Upload and display images using Cloudinary integration
- **Social Interactions**:
  - Like posts
  - Comment on posts
  - Delete your own posts and comments
- **Real-time Updates**: Dynamic feed that updates as users interact
- **Responsive Design**: Mobile-friendly interface that works across all devices
- **Error Handling**: Comprehensive error handling and user feedback

## 🛠️ Tech Stack

### Frontend

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **CSS3** - Styling
- **Fetch API** - HTTP requests

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **Cloudinary** - Image storage and delivery
- **Multer** - File upload handling
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
3w-assignment/
├── backend/
│   ├── config/
│   │   └── db.js                 # Database configuration
│   ├── controllers/
│   │   ├── authController.js     # Authentication logic
│   │   ├── postController.js     # Post CRUD operations
│   │   └── uploadController.js   # Image upload handling
│   ├── middlewares/
│   │   └── errorHandler.js       # Error handling middleware
│   ├── models/
│   │   ├── Post.js              # Post schema
│   │   └── User.js              # User schema
│   ├── routes/
│   │   ├── authRoutes.js        # Auth endpoints
│   │   ├── postRoutes.js        # Post endpoints
│   │   └── uploadRoutes.js      # Upload endpoints
│   ├── utils/
│   │   ├── cloudinary.js        # Cloudinary configuration
│   │   └── multer.js            # Multer configuration
│   ├── app.js                   # Express app setup
│   ├── server.js                # Server entry point
│   └── package.json
│
└── frontend/
    └── 3w-assignment/
        ├── src/
        │   ├── components/
        │   │   ├── AuthForm.jsx           # Login/Signup form
        │   │   ├── CommentSection.jsx     # Comments display
        │   │   ├── ErrorBanner.jsx        # Error messages
        │   │   ├── ImageUploadSection.jsx # Image upload UI
        │   │   ├── PostCard.jsx           # Individual post
        │   │   ├── Topbar.jsx             # Navigation bar
        │   │   └── sections/
        │   │       ├── AuthSection.jsx
        │   │       ├── PostComposerSection.jsx
        │   │       └── PostFeedSection.jsx
        │   ├── hooks/
        │   │   ├── useAuth.js             # Authentication hook
        │   │   ├── useImageUpload.js      # Image upload hook
        │   │   └── usePosts.js            # Posts management hook
        │   ├── utils/
        │   │   ├── api.js                 # API calls
        │   │   ├── storage.js             # Local storage
        │   │   └── validation.js          # Form validation
        │   ├── config/
        │   │   └── env.js                 # Environment config
        │   ├── constants/
        │   │   └── index.js               # App constants
        │   ├── App.jsx                    # Main component
        │   └── main.jsx                   # Entry point
        ├── index.html
        ├── vite.config.js
        └── package.json
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **MongoDB** account (MongoDB Atlas recommended)
- **Cloudinary** account for image storage
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd 3w-assignment
   ```

2. **Backend Setup**

   ```bash
   cd backend
   npm install
   ```

3. **Frontend Setup**
   ```bash
   cd frontend/3w-assignment
   npm install
   ```

### Environment Variables

#### Backend (.env)

Create a `.env` file in the `backend` directory:

```env
MONGODB_URI=your_mongodb_connection_string
PORT=4000
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
CLOUDINARY_URL=cloudinary://api_key:api_secret@cloud_name
```

#### Frontend (.env)

Create a `.env` file in the `frontend/3w-assignment` directory:

```env
VITE_API_URL=http://localhost:4000
```

For production, set:

```env
VITE_API_URL=https://threew-assignment-1.onrender.com
```

### Running the Application

#### Development Mode

1. **Start the Backend**

   ```bash
   cd backend
   npm run dev
   ```

   Server will run on `http://localhost:4000`

2. **Start the Frontend**
   ```bash
   cd frontend/3w-assignment
   npm run dev
   ```
   Application will run on `http://localhost:5173`

#### Production Mode

1. **Backend**

   ```bash
   cd backend
   npm start
   ```

2. **Frontend**
   ```bash
   cd frontend/3w-assignment
   npm run build
   npm run preview
   ```

## 📡 API Endpoints

### Authentication

- `POST /api/auth/signup` - Create new user account
- `POST /api/auth/login` - Login existing user

### Posts

- `GET /api/posts` - Fetch all posts
- `POST /api/posts` - Create a new post
- `DELETE /api/posts/:id` - Delete a post
- `POST /api/posts/:id/like` - Like/unlike a post
- `POST /api/posts/:id/comments` - Add a comment
- `DELETE /api/posts/:postId/comments/:commentId` - Delete a comment

### Upload

- `POST /api/upload` - Upload an image to Cloudinary

### Health Check

- `GET /api/health` - Check API status

## 🔧 Configuration

### MongoDB Setup

1. Create a MongoDB Atlas account
2. Create a new cluster
3. Get your connection string
4. Add it to your `.env` file

### Cloudinary Setup

1. Create a Cloudinary account
2. Navigate to Dashboard
3. Copy your Cloud Name, API Key, and API Secret
4. Add them to your `.env` file

## 📱 Features in Detail

### User Authentication

- Secure password hashing with bcryptjs
- Persistent login sessions using local storage
- Form validation for email and password

### Post Management

- Create posts with optional images
- Delete your own posts
- View all posts in chronological order

### Image Upload

- Drag-and-drop or click to upload images
- Image preview before posting
- Automatic upload to Cloudinary
- Size and type validation

### Social Features

- Like/unlike posts with instant feedback
- Add comments to any post
- Delete your own comments
- User attribution on posts and comments

## 🚀 Deployment

### Frontend (Vercel)

1. Push your code to GitHub
2. Import project to Vercel
3. Set root directory to `frontend/3w-assignment`
4. Add environment variable: `VITE_API_URL`
5. Deploy

### Backend (Render)

1. Push your code to GitHub
2. Create new Web Service on Render
3. Set root directory to `backend`
4. Add environment variables
5. Deploy

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Built as part of an internship assignment.

## 🙏 Acknowledgments

- MongoDB for database hosting
- Cloudinary for image storage
- Vercel for frontend hosting
- Render for backend hosting
