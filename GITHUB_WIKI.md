# Nearby Hostels Project Wiki

Welcome to the **Nearby Hostels** project wiki! This page provides an overview, roadmap, current status, documentation, setup instructions, and detailed feature descriptions to help contributors and users understand and collaborate on the project.

---

## 📖 Overview

Nearby Hostels is a comprehensive hostel management system. Admins and super admins can manage hostels, while users can browse, filter, and review hostels. The system supports advanced filtering, ratings, reviews, and a flexible category system. Images are managed via Cloudinary, and authentication is handled with Firebase.

---

## 🏨 Features

### Hostel Management
- **Add Hostels**: Only admins and super admins can add new hostels
- **Hostel Information**: Complete hostel details including name, description, location (Google Maps link), contact info, and pricing
- **Image Management**: Support for multiple hostel images with primary image designation
- **Image Slider & Fullscreen View**: Hostel images are displayed in a modern Swiper slider. Click any image to view it fullscreen in a high-quality modal/lightbox.
- **Categories & Filtering**: Dynamic categorization system for amenities, room types, location types, price ranges, and atmosphere

### Ratings & Reviews
- **Rating System**: 5-star rating system with categories (overall, cleanliness, location, value, atmosphere)
- **Comments**: User reviews with verification system
- **Average Ratings**: Automatic calculation and display of average ratings

### Search & Filtering
- **Advanced Filtering**: Filter by amenities, room types, location types, price ranges, and atmosphere
- **Tab Categories**: All Hostels, Latest, Top Rated, Budget Friendly, This Week, Oldest

### User Management
- **Admin System**: Firebase-based authentication with admin and super admin roles
- **Role-based Access**: Only authorized users can add/edit hostels
- **User Reviews**: Any authenticated user can rate and review hostels

### UI Improvements
- **Single Card Per Row**: Hostel cards are now displayed one per row for better readability.
- **Modern Card/Grid Design**: The UI uses a clean, modern design with responsive layouts.
- **Accessible Image Viewing**: All images are accessible and can be viewed fullscreen for better detail.

---

## 🚀 Roadmap

- [x] Initial project setup
- [x] User authentication and session management
- [x] Hostel listing and details
- [x] Category and filter system
- [x] Ratings and comments
- [x] Admin dashboard

---

## 📊 Current Status

- **Backend:** Core APIs for hostels, categories, comments, and ratings are implemented.
- **Frontend:** Main user and admin interfaces are functional.
- **Database:** Schema and seed data in place; migrations managed with Drizzle.
- **Authentication:** Firebase-based user authentication.
- **Admin Tools:** Category, hostel, and comment management available.

---

## 🗄️ Database Schema

### Core Tables
- **hostels**: Main hostel information
- **hostel_images**: Image management with primary image support (stores Cloudinary URLs)
- **ratings**: User ratings with multiple categories
- **comments**: User reviews and feedback
- **categories**: Dynamic category system
- **category_option_values**: Options for each category
- **hostel_options**: Many-to-many relationship between hostels and category options

### Key Features
- **Soft Delete**: Hostels are marked as inactive rather than deleted
- **Image Management**: Support for multiple images per hostel
- **Rating Categories**: Detailed rating system with multiple aspects
- **Flexible Categories**: Dynamic category system that can be easily extended

---

## 📝 Documentation

### Getting Started
- See `README.md` and `SETUP_GUIDE.md` for setup instructions.

### Key Directories
- `app/` – Next.js app routes and pages
- `components/` – Reusable UI components
- `drizzle/` – Database schema, migrations, and seeds
- `lib/` – Utility libraries and Firebase integration
- `types/` – TypeScript types
- `util/` – Utility scripts (e.g., mailer, image upload)

### API Endpoints

#### Hostels
- `GET /api/hostels` - Fetch all active hostels with ratings and images
- `POST /api/hostels` - Create new hostel (admin only)
- `PUT /api/hostels` - Update hostel (admin only)
- `DELETE /api/hostels` - Soft delete hostel (admin only)

#### Ratings
- `GET /api/ratings?hostelId=X` - Get ratings for a hostel
- `POST /api/ratings` - Add new rating
- `PUT /api/ratings` - Update rating
- `DELETE /api/ratings?ratingId=X` - Delete rating

#### Comments
- `GET /api/comments?hostelId=X` - Get comments for a hostel
- `POST /api/comments` - Add new comment
- `PUT /api/comments` - Update comment
- `DELETE /api/comments?commentId=X` - Delete comment

#### Images
- `GET /api/hostel-images?hostelId=X` - Get images for a hostel
- `POST /api/hostel-images` - Add new image
- `PUT /api/hostel-images` - Update image
- `DELETE /api/hostel-images?imageId=X` - Delete image

#### Other
- `api/categories/` – Category management
- `api/users/lookup/` – User lookup and management

### Contribution Guidelines
- Fork the repo and create feature branches
- Write clear commit messages
- Ensure code passes linting and tests
- Submit pull requests for review

---

## 🏷️ Category System

The system uses a flexible category system with the following default categories:

### Amenities
- Free WiFi, Kitchen, Laundry, Common Room, Garden/Terrace, Bar, Breakfast Included, Air Conditioning, Heating, Luggage Storage, 24/7 Reception, Security Lockers, Bicycle Rental, Tour Desk, BBQ Area

### Room Types
- Dormitory, Private Room, Double Room, Twin Room, Single Room, Family Room, Female Only Dorm, Male Only Dorm, Mixed Dorm

### Location Types
- City Center, Near Train Station, Near Airport, Beachfront, Mountain View, Rural Area, University District, Shopping District, Historic District, Business District

### Price Ranges
- Budget ($10-25), Economy ($25-50), Mid-range ($50-100), Premium ($100-200), Luxury ($200+)

### Atmosphere
- Party/Social, Quiet/Relaxed, Family Friendly, Backpacker, Digital Nomad, Student, Eco-friendly, Boutique, Traditional

---

## ⚙️ Setup Guide

### Prerequisites

1. **PostgreSQL Database**: You need a PostgreSQL database running
2. **Firebase Project**: For authentication (optional but recommended)
3. **Cloudinary Account**: For image uploads and management
4. **Node.js**: Version 18 or higher

### Step 1: Environment Configuration

Create a `.env.local` file in the root directory with the following variables:

```bash
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/hostel_management"

# Firebase Configuration (for authentication)
NEXT_PUBLIC_FIREBASE_API_KEY="your-firebase-api-key"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your-project.firebaseapp.com"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="your-project-id"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your-project.appspot.com"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="123456789"
NEXT_PUBLIC_FIREBASE_APP_ID="your-app-id"

# Firebase Admin SDK (for server-side operations)
FIREBASE_ADMIN_PROJECT_ID="your-project-id"
FIREBASE_ADMIN_PRIVATE_KEY="your-private-key"
FIREBASE_ADMIN_CLIENT_EMAIL="your-client-email"

# Cloudinary Configuration (for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

#### Database Setup Options:

**Option A: Local PostgreSQL**
```bash
# Install PostgreSQL locally
sudo apt-get install postgresql postgresql-contrib

# Create database
sudo -u postgres createdb hostel_management

# Create user (optional)
sudo -u postgres createuser --interactive

# Update DATABASE_URL in .env.local
DATABASE_URL="postgresql://username:password@localhost:5432/hostel_management"
```

**Option B: Cloud Database (Recommended)**
- **Neon**: Free PostgreSQL hosting
- **Supabase**: Free PostgreSQL hosting with additional features
- **Railway**: Easy PostgreSQL deployment

Example Neon URL:
```
DATABASE_URL="postgresql://username:password@ep-xyz.us-east-1.aws.neon.tech/hostel_management?sslmode=require"
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Run Database Migration

```bash
npm run drizzle:migrate
```

### Step 4: Seed the Database

```bash
# Seed categories
npx tsx drizzle/seed-hostel-categories.ts

# Seed sample hostels (optional)
npx tsx drizzle/seed-hostels.ts
```

### Step 5: Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3001`

### Step 6: Cloudinary Setup for Images

1. Go to [Cloudinary Console](https://cloudinary.com/)
2. Create a free account
3. Get your Cloudinary credentials (cloud name, API key, API secret)
4. Add them to your `.env.local` as shown above
5. Images will be uploaded and served from Cloudinary with high-quality transformations (`q_auto:best`)
6. All hostel images are displayed in a Swiper slider; click any image to view it fullscreen in a modal/lightbox

### Step 7: Firebase Setup (Optional)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Authentication (Email/Password)
4. Get your project credentials
5. Update the Firebase variables in `.env.local`

### Troubleshooting

#### Database Connection Issues
- Ensure PostgreSQL is running
- Check your DATABASE_URL format
- Verify database exists and user has permissions

#### Migration Issues
- Make sure DATABASE_URL is set correctly
- Check if database is accessible
- Verify drizzle config is correct

#### Cloudinary Issues
- Ensure all Cloudinary variables are set in `.env.local`
- Check your Cloudinary account for usage limits
- If images look blurry, check the transformation in the image URL (should use `q_auto:best`)
- Make sure the Cloudinary SDK is installed (`npm install cloudinary`)

#### Firebase Issues
- Ensure all Firebase variables are set
- Check Firebase project configuration
- Verify authentication is enabled

### Quick Start with Sample Data

If you want to test the system quickly:

1. Set up a free Neon database
2. Update DATABASE_URL in .env.local
3. Run migrations and seed scripts
4. Set up Cloudinary credentials
5. Start the development server

You'll have a fully functional hostel management system with sample data and image upload/viewing!

### Admin Access

To add hostels, you need admin privileges:

1. Set up Firebase authentication
2. Add admin users through the admin interface
3. Login with admin credentials to add/edit hostels

### Support

If you encounter any issues:
1. Check the console for error messages
2. Verify all environment variables are set
3. Ensure database is accessible
4. Check Cloudinary and Firebase configuration

---

## 👩‍💻 Usage

### For Admins
1. **Add Hostels**: Use the "Add Hostel" button (FAB) to create new hostels
2. **Manage Categories**: Add/edit categories and options through the admin interface
3. **Moderate Reviews**: Approve/verify user comments and ratings
4. **Update Information**: Edit hostel details, images, and contact information

### For Users
1. **Browse Hostels**: View all hostels with filtering options
2. **Search & Filter**: Use the filter panel to find specific hostels
3. **View Details**: Click on hostel cards to see full information
4. **Rate & Review**: Leave ratings and comments for hostels you've visited
5. **View on Map**: Click "View on Map" to see hostel location on Google Maps

---

## 🛠️ Technical Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Firebase Auth
- **Deployment**: Vercel (recommended)

---

## 🤝 Collaboration

Feel free to contribute, suggest features, or report issues! Check the Issues and Pull Requests tabs for ongoing work.

---

## 📬 Contact

For questions or support, see the `https://github.com/CodeCompasss` or open an issue.

---

## 📄 License

This project is licensed under the MIT License. 