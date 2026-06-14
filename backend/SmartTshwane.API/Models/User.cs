using System;
using System.Collections.Generic;

namespace SmartTshwane.API.Models;

public partial class User
{
    public int Userid { get; set; }

    public string? Firstname { get; set; }

    public string? Lastname { get; set; }

    public string? Email { get; set; }

    public string? Phonenumber { get; set; }

    public string? Passwordhash { get; set; }

    public string? Role { get; set; }

    public DateTime? Createdat { get; set; }

    public virtual ICollection<Notification> Notifications { get; set; } = new List<Notification>();

    public virtual ICollection<Servicerequest> Servicerequests { get; set; } = new List<Servicerequest>();
}
