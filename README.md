# Task Manager - Team Collaboration Platform

A full-stack web application for managing projects, assigning tasks, and tracking progress with role-based access control.

## Features

✅ **User Authentication** - Secure signup/login with JWT  
✅ **Project Management** - Create, update, delete projects  
✅ **Task Management** - Create, assign, and track task status  
✅ **Dashboard** - View task statistics and progress  
✅ **Role-Based Access** - Admin and Member roles  
✅ **Team Collaboration** - Add members to projects  
✅ **Status Tracking** - Track task progress with multiple statuses  

## Tech Stack

**Backend:**
- Node.js + Express
- MongoDB (Mongoose ODM)
- JWT Authentication
- bcryptjs for password hashing

**Frontend:**
- React 18
- React Router v6
- Vite (Build tool)
- Axios for API calls

## Project Structure

```
task-manager/
├── backend/
│   ├── src/
│   │   ├── models/          # MongoDB schemas
│   │   ├── controllers/     # Business logic
│   │   ├── routes/          # API routes
│   │   ├── middleware/      # Auth & error handling
│   │   ├── config/          # Database & JWT config
│   │   └── server.js        # Express app entry
│   ├── package.json
│   └── .env.example
│
└── frontend/
    ├── src/
    │   ├── components/      # Reusable React components
    │   ├── pages/           # Page components
    │   ├── services/        # API integration
    │   ├── context/         # React Context (Auth)
    │   ├── App.jsx
    │   └── main.jsx
    ├── package.json
    └── vite.config.js
```

## Installation & Setup

### Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas cluster)
- npm or yarn

### Backend Setup

1. **Navigate to backend folder:**
```bash
cd backend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Create .env file:**
```bash
cp .env.example .env
```

4. **Update .env with your credentials:**
```
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/taskmanager
JWT_SECRET=your_secret_key_here
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

5. **Start the backend server:**
```bash
npm run dev
```

Server runs on `http://localhost:5000`

### Frontend Setup

1. **Open new terminal and navigate to frontend:**
```bash
cd frontend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start the development server:**
```bash
npm run dev
```

Frontend runs on `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new account
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Projects
- `POST /api/projects` - Create project
- `GET /api/projects` - Get all user projects
- `GET /api/projects/:id` - Get project details
- `PUT /api/projects/:id` - Update project
- `POST /api/projects/:id/members` - Add team member
- `DELETE /api/projects/:id` - Delete project

### Tasks
- `POST /api/tasks` - Create task
- `GET /api/tasks/user/tasks` - Get user's assigned tasks
- `GET /api/tasks/project/:projectId` - Get project tasks
- `GET /api/tasks/dashboard/stats` - Get dashboard statistics
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

## Deployment to Railway

### Prerequisites
- Railway account (railway.app)
- GitHub repository with the code

### Steps

1. **Push to GitHub:**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/task-manager.git
git push -u origin main
```

2. **Connect to Railway:**
   - Go to [railway.app](https://railway.app)
   - Click "New Project"
   - Select "Deploy from GitHub"
   - Connect your repository

3. **Configure Environment Variables:**
   - In Railway dashboard, add variables:
     - `MONGODB_URI` - Your MongoDB connection string
     - `JWT_SECRET` - Your JWT secret
     - `NODE_ENV` - production
     - `FRONTEND_URL` - Your Railway frontend URL

4. **Deploy:**
   - Railway auto-deploys on push to main branch
   - Both backend and frontend will be deployed

## Usage Guide

### 1. Sign Up
- Create a new account with name, email, and password
- Default role: Member

### 2. Create Project
- Go to Projects → New Project
- Add project name and description
- You become the project admin

### 3. Add Team Members
- In project settings, add existing users as members
- They can then view and work on project tasks

### 4. Create Tasks
- In project view, click New Task
- Assign to team members
- Set priority and due date

### 5. Track Progress
- Dashboard shows task statistics
- Update task status (Todo → In Progress → Review → Done)
- View overdue tasks

## Database Schema

### User
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (Admin/Member),
  createdAt: Date
}
```

### Project
```javascript
{
  name: String,
  description: String,
  admin: ObjectId (User),
  members: [ObjectId] (Users),
  status: String (Active/Inactive/Completed),
  createdAt: Date
}
```

### Task
```javascript
{
  title: String,
  description: String,
  project: ObjectId (Project),
  assignedTo: ObjectId (User),
  createdBy: ObjectId (User),
  status: String (Todo/In Progress/Review/Done),
  priority: String (Low/Medium/High),
  dueDate: Date,
  createdAt: Date
}
```

## Features Implemented

### Authentication
- ✅ User registration with email validation
- ✅ Secure login with JWT tokens
- ✅ Password hashing with bcryptjs
- ✅ Protected routes requiring authentication

### Projects
- ✅ Create, read, update, delete projects
- ✅ Admin-only operations
- ✅ Add team members to projects
- ✅ View project details and members

### Tasks
- ✅ Create tasks within projects
- ✅ Assign tasks to team members
- ✅ Update task status
- ✅ Set task priority and due dates
- ✅ Delete tasks

### Dashboard
- ✅ View assigned tasks
- ✅ Task statistics (total, completed, in progress, overdue)
- ✅ Completion rate percentage
- ✅ Quick task overview

### Role-Based Access
- ✅ Admin can create projects and manage members
- ✅ Members can view and work on assigned tasks
- ✅ Proper authorization checks on all endpoints

## Demo Video

A 2-5 minute walkthrough video showing:
1. User signup and login
2. Creating a project
3. Adding team members
4. Creating and assigning tasks
5. Dashboard and progress tracking
6. Updating task status

## Future Enhancements

- Comments and activity log on tasks
- File attachments to tasks
- Email notifications
- Task filters and search
- Admin panel for user management
- Real-time updates with WebSockets
- Mobile responsive improvements

## License

MIT

## Support

For issues or questions, please create a GitHub issue.

---

**Ready to deploy?** Follow the Railway deployment steps above!
