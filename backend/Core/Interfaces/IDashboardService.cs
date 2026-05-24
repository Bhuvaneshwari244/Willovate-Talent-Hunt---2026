using SmartOffer.Core.DTOs;

namespace SmartOffer.Core.Interfaces;

public interface IDashboardService
{
    Task<DashboardSummary> GetSummaryAsync();
}
