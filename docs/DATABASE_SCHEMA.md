# Database Schema

## Tables

### Users
| Column | Type | Constraints |
|--------|------|-------------|
| Id | int | PRIMARY KEY |
| Name | varchar(100) | NOT NULL |
| Email | varchar(100) | NOT NULL, UNIQUE |
| PasswordHash | varchar(255) | NOT NULL |
| Role | varchar(50) | NOT NULL |
| CreatedAt | timestamp | NOT NULL |

### Businesses
| Column | Type | Constraints |
|--------|------|-------------|
| Id | int | PRIMARY KEY |
| Name | varchar(200) | NOT NULL |
| BusinessType | varchar(50) | NOT NULL |
| OwnerName | varchar(100) | NOT NULL |
| Phone | varchar(20) | NOT NULL |
| Email | varchar(100) | NOT NULL |
| Address | varchar(255) | NOT NULL |
| City | varchar(100) | NOT NULL |
| LogoUrl | varchar(500) | NULL |
| OpeningTime | time | NOT NULL |
| ClosingTime | time | NOT NULL |
| CreatedAt | timestamp | NOT NULL |

### Offers
| Column | Type | Constraints |
|--------|------|-------------|
| Id | int | PRIMARY KEY |
| BusinessId | int | FOREIGN KEY → Businesses(Id) |
| Title | varchar(200) | NOT NULL |
| Description | text | NOT NULL |
| Category | varchar(100) | NOT NULL |
| OriginalPrice | decimal(18,2) | NOT NULL |
| OfferPrice | decimal(18,2) | NOT NULL |
| DiscountPercentage | decimal(5,2) | NOT NULL |
| StartDate | date | NOT NULL |
| EndDate | date | NOT NULL |
| TermsAndConditions | text | NULL |
| Status | varchar(50) | NOT NULL |
| CreatedAt | timestamp | NOT NULL |
| UpdatedAt | timestamp | NOT NULL |

### OfferSlots
| Column | Type | Constraints |
|--------|------|-------------|
| Id | int | PRIMARY KEY |
| OfferId | int | FOREIGN KEY → Offers(Id) |
| SlotDate | date | NOT NULL |
| StartTime | time | NOT NULL |
| EndTime | time | NOT NULL |
| Capacity | int | NOT NULL |
| BookedCount | int | NOT NULL, DEFAULT 0 |
| Status | varchar(50) | NOT NULL |
| CreatedAt | timestamp | NOT NULL |

### Bookings
| Column | Type | Constraints |
|--------|------|-------------|
| Id | int | PRIMARY KEY |
| BookingReference | varchar(50) | NOT NULL, UNIQUE |
| OfferId | int | FOREIGN KEY → Offers(Id) |
| SlotId | int | FOREIGN KEY → OfferSlots(Id) |
| CustomerName | varchar(100) | NOT NULL |
| CustomerPhone | varchar(20) | NOT NULL |
| CustomerEmail | varchar(100) | NULL |
| PeopleCount | int | NOT NULL |
| SpecialNote | text | NULL |
| Status | varchar(50) | NOT NULL |
| QRCode | text | NULL |
| CreatedAt | timestamp | NOT NULL |

## Relationships

- Businesses → Offers (One-to-Many)
- Offers → OfferSlots (One-to-Many)
- Offers → Bookings (One-to-Many)
- OfferSlots → Bookings (One-to-Many)

## Indexes

- Users.Email (UNIQUE)
- Bookings.BookingReference (UNIQUE)
- Offers.BusinessId
- OfferSlots.OfferId
- Bookings.OfferId
- Bookings.SlotId
