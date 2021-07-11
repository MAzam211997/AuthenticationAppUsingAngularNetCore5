﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Syncfusion.DocIO;
using Syncfusion.DocIO.DLS;
using Microsoft.AspNetCore.Mvc;
using Aspose.Pdf;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AuthenticationApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExporterController : ControllerBase
    {
        // GET: api/<ExporterController>
        [HttpGet("ExportToPDF")]
        public ActionResult<IEnumerable<string>> ExportToPDF()
        {
            //Loads the HTML document against none schema validation
            //using (WordDocument document = new WordDocument("HtmlSample.html", FormatType.Html, XHTMLValidationType.None))
            //    //Saves the Word document
            //    document.Save("Converted-From-HTML-To-Word.docx", FormatType.Docx);

            // Create HTML load options
            HtmlLoadOptions htmloptions = new HtmlLoadOptions();
            // Load HTML file
            Document doc = new Document("HtmlSample.html", htmloptions);
            // Convert HTML file to PDF
            doc.Save("Converted-To-PDF.pdf");
            return Ok();
        }

        [HttpGet("ExportToWord")]
        public ActionResult<IEnumerable<string>> ExportToWord()
        {
            // Loads the HTML document against none schema validation
            using (WordDocument document = new WordDocument("HtmlSample.html", FormatType.Html, XHTMLValidationType.None))
            {
                //Saves the Word document
                document.Save("Converted-From-HTML-To-Word.docx", FormatType.Docx);
            }
            return Ok();
        }

        // GET api/<ExporterController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<ExporterController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<ExporterController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<ExporterController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
