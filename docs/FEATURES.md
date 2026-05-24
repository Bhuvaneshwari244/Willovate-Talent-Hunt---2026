# Features Documentation

## Core Features

### 1. Admin Authentication
- Secure JWT-based authentication
- Password hashing with BCrypt
- Protected admin routes
- Session management

### 2. Business Profile Management
- Create and edit business profiles
- Multiple business types support
- Operating hours configuration
- Contact information management

### 3. Offer Management
- Create, edit, and delete offers
- Multiple offer statuses (Draft, Active, Paused, Expired)
- Automatic discount calculation
- Category-based organization
- Terms and conditions support

### 4. Slot Management
- Create multiple slots per offer
- Date and time configuration
- Capacity management
- Real-time availability tracking
- Automatic status updates (Available, Full, Closed)

### 5. Public Offer Listing
- Browse all active offers
- Search by title or business name
- Filter by category
- Real-time countdown timers
- Responsive card layout
- Discount badges

### 6. Offer Detail Page
- Complete offer information
- Available slots display
- Terms and conditions
- Business details
- Booking form

### 7. Booking Flow
- Customer information collection
- Slot selection
- People count validation
- Capacity checking
- Booking limit enforcement
- Special notes support

### 8. Booking Confirmation
- Unique booking reference
- QR code generation
- Booking details display
- Print functionality
- Email confirmation (mock)

### 9. Admin Dashboard
- Key metrics overview
- Total and active offers
- Booking statistics
- Capacity utilization
- Conversion rate
- Recent bookings table

### 10. Booking Management
- View all bookings
- Status updates
- Customer information
- Booking reference search
- CSV export functionality

## Bonus Features

### 1. QR Code Generation
- Unique QR code for each booking
- Base64 encoded image
- Scannable at venue
- Embedded in confirmation page

### 2. Countdown Timers
- Live countdown for offer expiry
- Human-readable format
- Auto-updates every minute
- Visible on offer cards

### 3. Dark/Light Mode
- System-wide theme toggle
- Persistent preference
- Smooth transitions
- Accessible color schemes

### 4. Responsive Design
- Mobile-first approach
- Tablet optimization
- Desktop layouts
- Touch-friendly controls

### 5. CSV Export
- Export all bookings
- Formatted data
- Download functionality
- Date-stamped files

### 6. Real-time Validation
- Form validation
- Capacity checking
- Booking limit enforcement
- Expiry validation
- Price validation

### 7. Mock Notifications
- Booking confirmation logs
- Status update logs
- Email/SMS simulation
- WhatsApp notification logs

### 8. Search and Filters
- Text search
- Category filters
- Status filters
- Date range filters

### 9. Professional UI/UX
- Clean design
- Intuitive navigation
- Loading states
- Error handling
- Toast notifications
- Smooth animations

### 10. Code Quality
- Clean architecture
- Repository pattern
- Service layer
- DTOs for data transfer
- Interface-based design
- Dependency injection
- Error handling
- Input validation

## Business Logic

### Validation Rules
1. Offer price must be less than original price
2. Offers cannot be booked after expiry
3. Slots cannot be booked if full
4. Booked count increases after booking
5. Booking reference must be unique
6. Maximum 1 booking per customer per offer
7. People count cannot exceed available capacity

### Status Management
- Offers: Draft → Active → Paused/Expired/Cancelled
- Slots: Available → Full/Closed/Expired
- Bookings: Pending → Confirmed → Completed/Cancelled/No Show

### Automatic Updates
- Slot status changes to "Full" when capacity reached
- Offer status changes to "Expired" after end date
- Booked count increments on successful booking
- Available count calculated dynamically
