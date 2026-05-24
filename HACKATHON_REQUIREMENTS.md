Hackathon Rules & Regulations

1. Participation: Individual (Solo) only.

2. Originality & Integrity: Participants must build the project completely during the hackathon. Pre-built projects, copied templates, paid UI kits, or third-party code used without a proper license are strictly prohibited.

3. Hosting: All source code must be hosted in a public GitHub repository.

4. Open-Source & Commercial Contribution: Participants will receive contributor credit. By submitting, participants grant Willovate the right to review, modify, reuse, and integrate submitted code, designs, and documentation into open-source or commercial projects.

5. Intellectual Property Protection: You are strictly prohibited from using the provided problem statement, project code, or core platform ideas anywhere else outside of this hackathon submission.

Smart Offer Slot Booking System

Objective
Build a fullstack web application where a business can create limited-time offer slots, and customers can reserve those offers through a public booking page. This system should be useful for any service-based business like restaurant, gym, salon, clinic, coaching class, gaming zone, turf, spa, or activity center.

Mandatory Tech Stack
Frontend: React + TypeScript / TSX
Styling: Tailwind CSS
Backend: .NET 8 Web API
Database: PostgreSQL or SQL Server
API Documentation: Swagger / OpenAPI

Core Concept
A business can create offers for specific time slots.

Example:
Offer: Afternoon Gym Trial
Original Price: ₹499
Offer Price: ₹99
Date: 25 May 2026
Time: 3 PM - 5 PM
Available Seats: 20
Booking Limit: 1 per customer
Status: Active

Customers can open the public offer page and book the slot.

User Roles

1. Admin / Business Owner
Can create and manage offers, slots, bookings, and business profile.

2. Customer
Can view active offers and book a slot.

Required Features

A. Admin Login
Admin should be able to log in.
Minimum fields:
Email
Password
After login, the admin should see the dashboard.

B. Business Profile
Admin should be able to create/edit business profiles.
Fields:
Business Name
Business Type
Owner Name
Phone Number
Email Address
City
Logo URL / Logo Upload optional
Opening Time
Closing Time

Business types:
Restaurant
Gym
Salon
Clinic
Coaching
Turf
Other

C. Offer Management
Admin should be able to create offers.
Offer fields:
Offer Title
Offer Description
Category
Original Price
Offer Price
Discount Percentage
Start Date
End Date
Start Time
End Time
Total Capacity
Max Booking Per Customer
Terms and Conditions
Status

Offer status:
Draft
Active
Paused
Expired
Cancelled

Example offers:
Lunch Hour Deal
Gym Trial Slot
Salon Happy Hour
Doctor Consultation Discount
Turf Morning Slot Offer
Coaching Demo Class

D. Slot Management
Each offer should have one or more slots.
Slot fields:
Offer ID
Slot Date
Start Time
End Time
Capacity
Booked Count
Available Count
Status

Slot status:
Available
Full
Closed
Expired
Cancelled

Example:
Offer: Gym Trial
Slot 1: 10 AM - 11 AM, Capacity 10
Slot 2: 5 PM - 6 PM, Capacity 15

E. Public Offer Listing Page
Customers should be able to see all active offers.
Required filters:
Business Type
Category
Date
Price Range
Available Only

Each offer card should show:
Offer Title
Business Name
Original Price
Offer Price
Discount
Available Slots
Expiry Timer
Book Now Button

F. Public Offer Detail Page
Customer should see full offer details.
Show:
Business Name
Offer Title
Description
Price
Discount
Available Slots
Terms
Location
Book Slot Button

G. Booking Flow
Customer should be able to book an offer slot.
Booking form fields:
Customer Name
Phone Number
Email optional
Selected Slot
Number of People
Special Note optional

System should validate:
Slot is active
Slot is not full
Number of people does not exceed available capacity
Same phone number should not exceed max booking limit
Expired offers cannot be booked

After booking, show confirmation page.
Confirmation should show:
Booking Reference Number
Offer Name
Business Name
Slot Date and Time
Customer Name
Booking Status

Booking Status
Pending
Confirmed
Cancelled
Completed
No Show

Admin should be able to update booking status.

Admin Dashboard Requirements
Dashboard should show:
Total Offers
Active Offers
Total Bookings
Today's Bookings
Total Capacity
Booked Seats
Available Seats
Conversion Rate

Also show recent bookings table:
Customer Name
Offer Name
Slot Time
People Count
Booking Status
Action

Minimum Screens Required
Participants must build at least these screens:
1. Admin Login Page
2. Admin Dashboard
3. Create Offer Page
4. Manage Offers Page
5. Manage Bookings Page
6. Public Offer Listing Page
7. Public Offer Detail Page
8. Booking Confirmation Page

For 34 hours, at least 5 screens must be fully working.

Required APIs
POST /api/auth/login
POST /api/business
GET /api/business
PUT /api/business/{id}
POST /api/offers
GET /api/offers
GET /api/offers/{id}
PUT /api/offers/{id}
DELETE /api/offers/{id}
POST /api/slots
GET /api/slots
GET /api/offers/{offerId}/slots
PUT /api/slots/{id}
DELETE /api/slots/{id}
POST /api/bookings
GET /api/bookings
GET /api/bookings/{id}
PUT /api/bookings/{id}/status
GET /api/dashboard/summary

Suggested Database Tables

Users
Businesses
Offers
OfferSlots
Bookings

Users
Id
Name
Email
PasswordHash
Role
CreatedAt

Businesses
Id
Name
BusinessType
OwnerName
Phone
Email
Address
City
OpeningTime
ClosingTime
CreatedAt

Offers
Id
BusinessId
Title
Description
Category
OriginalPrice
OfferPrice
DiscountPercentage
StartDate
EndDate
TermsAndConditions
Status
CreatedAt
UpdatedAt

OfferSlots
Id
OfferId
SlotDate
StartTime
EndTime
Capacity
BookedCount
Status
CreatedAt

Bookings
Id
BookingReference
OfferId
SlotId
CustomerName
CustomerPhone
CustomerEmail
PeopleCount
SpecialNote
Status
CreatedAt

Business Rules
Offer price must be less than original price.
Offer cannot be booked after expiry date.
Slot cannot be booked if capacity is full.
Booked count should increase after booking.
Booking reference should be unique.
Admin can pause or cancel an offer.
Cancelled/expired offers should not appear on public page.

Bonus Features
Teams can add bonus features for extra marks:
QR code for each offer
Countdown timer for offer expiry
Waitlist when slot is full
Mock email/SMS/WhatsApp notification log
Calendar view for slots
Coupon code support
Dark/light mode
Export bookings as CSV
Payment status field
Customer cancellation link
Responsive mobile UI

Judging Criteria
Criteria                              Marks
UI/UX and responsiveness              25
Backend API quality                   20
Database design                       15
Business logic implementation         15
Code quality and folder structure     10
Bonus features                        5
Demo and documentation                10
Total                                 100

Submission Requirements
Each team must submit:
GitHub repository link
README with setup steps
Frontend screenshots
Swagger screenshot
Database schema or ER diagram
Demo video of 2–3 minutes
.env.example file

Important Hackathon Rule
Participants must build the project during the hackathon. Pre-built projects, copied templates, paid UI kits, or copied third-party code without license are not allowed. Participants will receive contributor credit. By submitting, participants allow Willovate to review, modify, reuse, and integrate submitted code, designs, and documentation into open-source or commercial projects.
