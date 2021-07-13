using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AuthenticationApp.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AuthenticationApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FilesController : ControllerBase
    {
        public List<SystemFile> colSystemFiles = new List<SystemFile>();
        private readonly IHostingEnvironment _hostEnvironment;
        public FilesController(IHostingEnvironment hostEnvironment)
        {
            _hostEnvironment = hostEnvironment;
            // Set WebRootPath to wwwroot\Files directory
            _hostEnvironment.WebRootPath =
                System.IO.Path.Combine(
                    Directory.GetCurrentDirectory(),
                    @"wwwroot\Files");
            // Create wwwroot\Files directory if needed
            if (!Directory.Exists(_hostEnvironment.WebRootPath))
            {
                DirectoryInfo di =
                    Directory.CreateDirectory(_hostEnvironment.WebRootPath);
            }
        }
        // api/Files/SystemFiles
        #region public IEnumerable<SystemFile> SystemFiles()
        [HttpGet("[action]")]
        public IEnumerable<SystemFile> SystemFiles()
        {
            colSystemFiles = new List<SystemFile>();
            if (Directory.Exists(_hostEnvironment.WebRootPath))
            {
                // Get Files
                ProcessDirectory(_hostEnvironment.WebRootPath);
            }
            return colSystemFiles;
        }
        #endregion
        // api/Files/DeleteFile
        [HttpPost]
        public IActionResult Post([FromBody] SystemFile file)
        {
            try
            {
                // Allow user to only delete a file in Files directory
                string FileToDelete =
                    Path.Combine(_hostEnvironment.WebRootPath, file.FileName);
                System.IO.File.Delete(FileToDelete);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return Ok();
        }
        // Utility
        #region public void ProcessDirectory(string targetDirectory)
        // Process all files in the directory passed in, recurse on any directories 
        // that are found, and process the files they contain.
        public void ProcessDirectory(string targetDirectory)
        {
            // Process the list of files found in the directory.
            string[] fileEntries = Directory.GetFiles(targetDirectory);
            foreach (string fileName in fileEntries)
            {
                ProcessFile(fileName);
            }
            // Recurse into subdirectories of this directory.
            string[] subdirectoryEntries = Directory.GetDirectories(targetDirectory);
            foreach (string subdirectory in subdirectoryEntries)
                ProcessDirectory(subdirectory);
        }
        #endregion
        #region public void ProcessFile(string path)
        // Insert logic for processing found files here.
        public void ProcessFile(string path)
        {
            string FileName = Path.GetFileName(path);
            string FilePath = path;
            colSystemFiles.Add(new SystemFile() { FileName = FileName, FilePath = FilePath });
        }
        #endregion


        //#region public DTONode SystemFiles()
        //[HttpGet("[action]")]
        ////public DTONode SystemFiles()
        ////{
        ////    // Create Root Node
        ////    DTONode objDTONode = new DTONode();
        ////    if (Directory.Exists(_hostEnvironment.WebRootPath))
        ////    {
        ////        objDTONode.label = "Root";
        ////        objDTONode.data = "Root";
        ////        objDTONode.expandedIcon = "fa-folder-open";
        ////        objDTONode.collapsedIcon = "fa-folder";
        ////        objDTONode.children = new List<DTONode>();
        ////        // Get Files
        ////        ProcessDirectory(_hostEnvironment.WebRootPath, ref objDTONode);
        ////    }
        ////    return objDTONode;
        ////}
        //#endregion

    }
}
