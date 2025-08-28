# Express + MySQL User Management

A simple Node.js + Express + MySQL application for managing users with EJS templating.

## Setup

### 1. Clone the repository
```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

### 2. Install dependencies
```bash
npm install
```

### 3. Database setup
```sql
CREATE DATABASE backend5;
USE backend5;

CREATE TABLE user (
  id VARCHAR(100) PRIMARY KEY,
  username VARCHAR(50),
  email VARCHAR(100),
  password VARCHAR(50)
);
```

### 4. Environment variables
Create a `.env` file in the project root:
```env
DB_HOST=localhost
DB_USER=root
DB_PASS=your_password
DB_NAME=backend5
```

### 5. Start the server
```bash
node app.js
```

Server runs at: `http://localhost:8080`

## Routes
- `/` → total number of users  
- `/user` → list all users  
- `/user/:id/edit` → edit user  
- `/user/:id` (**PATCH**) → update user  
