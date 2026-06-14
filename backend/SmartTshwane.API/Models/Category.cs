using System;
using System.Collections.Generic;

namespace SmartTshwane.API.Models;

public partial class Category
{
    public int Categoryid { get; set; }

    public string? Categoryname { get; set; }

    public int? Departmentid { get; set; }

    public virtual Department? Department { get; set; }

    public virtual ICollection<Servicerequest> Servicerequests { get; set; } = new List<Servicerequest>();
}
