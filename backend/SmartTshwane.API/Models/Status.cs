using System;
using System.Collections.Generic;

namespace SmartTshwane.API.Models;

public partial class Status
{
    public int Statusid { get; set; }

    public string? Statusname { get; set; }

    public virtual ICollection<Servicerequest> Servicerequests { get; set; } = new List<Servicerequest>();
}
