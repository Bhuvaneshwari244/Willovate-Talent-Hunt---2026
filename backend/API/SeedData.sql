-- Sample Business
INSERT INTO Businesses (Name, BusinessType, OwnerName, Phone, Email, Address, City, OpeningTime, ClosingTime, CreatedAt)
VALUES 
('FitZone Gym', 'Gym', 'John Doe', '9876543210', 'contact@fitzone.com', '123 Main Street', 'Mumbai', '06:00', '22:00', datetime('now')),
('Bella Salon & Spa', 'Salon', 'Sarah Smith', '9876543211', 'info@bellasalon.com', '456 Park Avenue', 'Delhi', '09:00', '20:00', datetime('now'));

-- Sample Offers
INSERT INTO Offers (BusinessId, Title, Description, Category, OriginalPrice, OfferPrice, DiscountPercentage, StartDate, EndDate, Status, CreatedAt, UpdatedAt)
VALUES 
(1, 'Morning Gym Trial - Full Access', 'Experience our state-of-the-art gym facilities with full access to all equipment and group classes.', 'Fitness', 999, 99, 90, date('now'), date('now', '+7 days'), 'Active', datetime('now'), datetime('now')),
(2, 'Hair Styling & Spa Package', 'Pamper yourself with our premium hair styling and relaxing spa treatment.', 'Beauty', 2499, 999, 60, date('now'), date('now', '+5 days'), 'Active', datetime('now'), datetime('now'));

-- Sample Slots
INSERT INTO OfferSlots (OfferId, SlotDate, StartTime, EndTime, Capacity, BookedCount, Status, CreatedAt)
VALUES 
(1, date('now', '+1 day'), '06:00', '08:00', 10, 0, 'Available', datetime('now')),
(1, date('now', '+2 days'), '06:00', '08:00', 10, 0, 'Available', datetime('now')),
(2, date('now', '+1 day'), '10:00', '12:00', 5, 0, 'Available', datetime('now')),
(2, date('now', '+1 day'), '14:00', '16:00', 5, 0, 'Available', datetime('now'));
