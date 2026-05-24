using SmartOffer.Core.Entities;

namespace SmartOffer.Core.Interfaces;

public interface INotificationService
{
    Task SendBookingConfirmationAsync(Booking booking);
}
