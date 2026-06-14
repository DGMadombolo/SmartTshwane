using System;
using System.Collections.Generic;

namespace SmartTshwane.API.Models;

public partial class Department
{
    public int Departmentid { get; set; }

    public string Departmentname { get; set; } = null!;

    public string? Description { get; set; }

    public virtual ICollection<Category> Categories { get; set; } = new List<Category>();
}
