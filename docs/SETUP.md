# Setup Guide

## Prerequisites

- .NET 8 SDK
- Node.js 18+
- PostgreSQL 14+

## Backend Setup

1. **Install .NET 8 SDK**
   - Download from: https://dotnet.microsoft.com/download/dotnet/8.0

2. **Install PostgreSQL**
   - Download from: https://www.postgresql.org/download/

3. **Configure Database**
   ```bash
   # Create database
   createdb smartoffer
   ```

4. **Update Connection String**
   - Edit `backend/API/appsettings.json`
   - Update the connection string with your PostgreSQL credentials

5. **Run Migrations**
   ```bash
   cd backend/API
   dotnet ef migrations add InitialCreate
   dotnet ef database update
   ```

6. **Run Backend**
   ```bash
   cd backend/API
   dotnet restore
   dotnet run
   ```

   Backend will run on: `https://localhost:7001`

## Frontend Setup

1. **Install Dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Configure API URL**
   - Create `.env` file in frontend directory
   - Add: `VITE_API_BASE_URL=https://localhost:7001/api`

3. **Run Frontend**
   ```bash
   npm run dev
   ```

   Frontend will run on: `http://localhost:5173`

## Default Admin Credentials

- Email: `admin@smartoffer.com`
- Password: `Admin@123`

## Testing the Application

1. Open browser and go to `http://localhost:5173`
2. Browse public offers
3. Login to admin panel at `/login`
4. Create business profile
5. Create offers with slots
6. Test booking flow

## Troubleshooting

### Backend Issues
- Ensure PostgreSQL is running
- Check connection string in appsettings.json
- Verify .NET 8 SDK is installed: `dotnet --version`

### Frontend Issues
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check if backend is running
- Verify API URL in .env file

### Database Issues
- Reset database: `dotnet ef database drop` then `dotnet ef database update`
- Check PostgreSQL logs for errors
