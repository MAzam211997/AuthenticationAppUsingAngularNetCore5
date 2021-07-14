using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AuthenticationApp.Models
{
    public class FileClass
    {
        public int FileId { get; set; }
        public String Name { get; set; }
        public String Path { get; set; }
        public List<FileClass> Files { get; set; } = new List<FileClass>();
    }
}
