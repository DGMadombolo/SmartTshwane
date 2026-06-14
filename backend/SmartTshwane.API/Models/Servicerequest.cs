using System;
using System.Collections.Generic;

namespace SmartTshwane.API.Models;

public partial class Servicerequest
{
    public int Requestid { get; set; }

    public int? Userid { get; set; }

    public int? Categoryid { get; set; }

    public int? Statusid { get; set; }

    public string? Title { get; set; }

    public string? Description { get; set; }

    public string? Address { get; set; }

    public decimal? Latitude { get; set; }

    public decimal? Longitude { get; set; }

    public DateTime? Createdat { get; set; }

    public DateTime? Updatedat { get; set; }

    public virtual Category? Category { get; set; }

    public virtual Status? Status { get; set; }

    public virtual User? User { get; set; }
}
