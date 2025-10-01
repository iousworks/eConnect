# MongoDB Installation Guide for Windows

## Option 1: MongoDB Community Server (Recommended)

### Step 1: Download MongoDB
1. Visit https://www.mongodb.com/try/download/community
2. Select:
   - Version: Latest (7.0.x)
   - Platform: Windows
   - Package: msi
3. Download the installer

### Step 2: Install MongoDB
1. Run the downloaded .msi installer
2. Choose "Complete" setup type
3. Install MongoDB as a Service (recommended)
4. Install MongoDB Compass (GUI tool)

### Step 3: Add MongoDB to PATH
1. Add `C:\Program Files\MongoDB\Server\7.0\bin` to your system PATH
2. Open Command Prompt and verify: `mongod --version`

### Step 4: Start MongoDB Service
```powershell
# Check if service is running
Get-Service MongoDB

# Start service if not running
Start-Service MongoDB
```

## Option 2: MongoDB Atlas (Cloud Database)

### Benefits:
- No local installation required
- Free tier available (512MB)
- Automatic backups and scaling
- Built-in security

### Setup:
1. Create account at https://cloud.mongodb.com
2. Create a new cluster (choose free tier)
3. Add database user
4. Whitelist your IP address
5. Get connection string

### Update .env file:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/econnect
```

## Option 3: Docker (Advanced)

```powershell
# Pull MongoDB image
docker pull mongo:latest

# Run MongoDB container
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

## Testing Connection

### Update your .env file:
```
# For local MongoDB
MONGODB_URI=mongodb://localhost:27017/econnect

# For MongoDB Atlas
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/econnect
```

### Test with your backend:
```powershell
cd eConnect/backend
npm start
```

Look for "Connected to MongoDB" message in the console.

## Recommended: MongoDB Atlas

For your portfolio demo, I recommend **MongoDB Atlas** because:
- Works immediately without local setup
- Free tier is sufficient for demo purposes
- More professional for showcasing
- No maintenance required

Let me know which option you'd prefer!