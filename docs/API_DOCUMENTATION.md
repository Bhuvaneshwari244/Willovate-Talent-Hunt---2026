# API Documentation

Base URL: `https://localhost:7001/api`

## Authentication

### POST /auth/login
Login to admin panel

**Request:**
```json
{
  "email": "admin@smartoffer.com",
  "password": "Admin@123"
}
```

**Response:**
```json
{
  "token": "eyJhbGc...",
  "email": "admin@smartoffer.com",
  "name": "Admin User",
  "role": "Admin"
}
```

## Business

### GET /business
Get all businesses

### GET /business/{id}
Get business by ID

### POST /business
Create new business (requires auth)

### PUT /business/{id}
Update business (requires auth)

## Offers

### GET /offers?activeOnly=true
Get all offers (filter by active)

### GET /offers/{id}
Get offer details

### POST /offers
Create offer (requires auth)

### PUT /offers/{id}
Update offer (requires auth)

### DELETE /offers/{id}
Delete offer (requires auth)

## Slots

### GET /slots/offer/{offerId}
Get slots for an offer

### POST /slots
Create slot (requires auth)

### PUT /slots/{id}
Update slot (requires auth)

### DELETE /slots/{id}
Delete slot (requires auth)

## Bookings

### GET /bookings
Get all bookings (requires auth)

### GET /bookings/{id}
Get booking by ID

### POST /bookings
Create booking (public)

**Request:**
```json
{
  "offerId": 1,
  "slotId": 1,
  "customerName": "John Doe",
  "customerPhone": "9876543210",
  "customerEmail": "john@example.com",
  "peopleCount": 2,
  "specialNote": "Vegetarian meal"
}
```

### PUT /bookings/{id}/status
Update booking status (requires auth)

## Dashboard

### GET /dashboard/summary
Get dashboard statistics (requires auth)

**Response:**
```json
{
  "totalOffers": 10,
  "activeOffers": 5,
  "totalBookings": 50,
  "todayBookings": 5,
  "totalCapacity": 200,
  "bookedSeats": 120,
  "availableSeats": 80,
  "conversionRate": 60.0,
  "recentBookings": [...]
}
```

## Error Responses

All endpoints return standard error responses:

```json
{
  "message": "Error description"
}
```

Status Codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 500: Server Error
