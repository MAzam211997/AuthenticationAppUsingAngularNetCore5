using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Syncfusion.DocIO;
using Syncfusion.DocIO.DLS;
using Microsoft.AspNetCore.Mvc;
using AuthenticationApp.ViewModels;
using jsreport.AspNetCore;
using jsreport.Types;
using System.IO;
using Microsoft.AspNetCore.Http;
using iTextSharp.text.pdf;
using iTextSharp.text;
using iTextSharp.tool.xml;
using SelectPdf;
using Wkhtmltopdf.NetCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AuthenticationApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExporterController : ControllerBase
    {
        private readonly IJsReportMVCService _jsReportMVCService;
        readonly IGeneratePdf _generatePdf;

        public ExporterController(IJsReportMVCService jsReportMVCService, IGeneratePdf generatePdf)
        {
            _generatePdf = generatePdf;
            _jsReportMVCService = jsReportMVCService;
        }
        // GET: api/<ExporterController>
        [HttpPost("ExportToPDF")]
        public ActionResult<IEnumerable<string>> ExportToPDF(UserDetailsDto data)
        {
            //HtmlLoadOptions htmloptions = new HtmlLoadOptions();
            //Document doc = new Document("HtmlSample.html", htmloptions);
            //doc.Save("Converted-To-PDF.pdf");
            return Ok();
        }

        [HttpGet]
        [Route("Html_To_Pdf")]
        public async Task<IActionResult> Html_To_Pdf()
        {
            String data = "<form   [formGroup]='exporterForm' autocomplete='off' >< div class='row'>  <div class='col - md - 6'> <div class='card' >   <div class='card - header bg - white' ><h4 class='card - title'>Download File As Word OR PDF</h4></div><div class='card - block' style='width: 500px; margin - left: 20px; ; '> <div class='row'><div class='form - group col - md - 6'><label for='Name'>Name</label><input id = 'name' type='text'  formControlName='name' class='form - control' placeholder='Name' > </div><div class='form - group col - md - 6'><label for='email'>Email</label><input id = 'email' type='text' formControlName='email' validateEmail class='form - control' placeholder='Email'   >  </div> </div> <div class='row'><div class='form - group col - md - 6'> <label for='address'>Address</label> <input id = 'address' type='text' formControlName='address' class='form - control' placeholder='Address' ></div><div class='form - group ' style='float: right; '> <br><br><br><button class='btn btn-success' [disabled]='exporterForm.invalid' style='margin - left: 110px; '  (click)='downloadAsPDF()'>Download As PDF File</button> &nbsp;&nbsp; &emsp; <button class='btn btn-primary' [disabled]='exporterForm.invalid' (click)='downloadAsWord('pdfTable', 'Word - File')'>Download As Word File</button> </div></div></div></div></div></div></form>";
            return await _generatePdf.GetPdf("~/ClientApp/src/app/exporter/export-to-pdf/export-to-pdf.component.html");
            //var options = new ConvertOptions
            //{
            //    EnableForms = true,
            //    PageHeight = 700,
            //    PageWidth = 300,
            //    IsGrayScale = true
            //};

            //_generatePdf.SetConvertOptions(options);

            //var pdf = await _generatePdf.GetByteArray("~/ClientApp/src/app/exporter/export-to-pdf/export-to-pdf.component.html");
            //var pdfStream = new System.IO.MemoryStream();
            //pdfStream.Write(pdf, 0, pdf.Length);
            //pdfStream.Position = 0;
            //return new FileStreamResult(pdfStream, "application/pdf");
        }

        [HttpPost("DownloadPDF")]
        [MiddlewareFilter(typeof(JsReportPipeline))]
        public ActionResult<UserDetailsDto> DownloadPDF(UserDetailsDto data)
        {
            //var header = await _jsReportMVCService.RenderViewToStringAsync(HttpContext, RouteData, "Header", new { });
            //var footer = await _jsReportMVCService.RenderViewToStringAsync(HttpContext, RouteData, "Footer", new { });
            HttpContext.JsReportFeature()
                 .Recipe(Recipe.ChromePdf)
                 .Configure((r) => r.Template.Chrome = new Chrome
                 {
                     //HeaderTemplate = header,
                     //FooterTemplate = footer,
                     DisplayHeaderFooter = true,
                     MarginTop = "1cm",
                     MarginLeft = "2cm",
                     MarginBottom = "2cm",
                     MarginRight = "1.5cm",
                     Format = "A3"
                 });
            HttpContext.JsReportFeature().OnAfterRender((renderer) =>
            {
                using (var file = System.IO.File.Open("PDF_Report.pdf", FileMode.Open))
                {
                    renderer.Content.CopyTo(file);
                }
                renderer.Content.Seek(0, SeekOrigin.Begin);
            });
            string filePath = "~/Files/Converted-To-PDF.pdf";
            Response.Headers.Add("Content-Disposition", "inline; filename=test.pdf");
            string file = "Converted-To-PDF.pdf";
            String html = "<div style=\"font-family: 'Microsoft YaHei';\"><a href='#last'>Bottom</a><h1 style='padding:1000px 0'>Hello World! Chinese<br/><br/><br/><br/><br/></h1><a name='last'> anchor link</a><div style='color: #0a0'>Test content</div></div>";

            ExportToPDF(html, file);

            return File(filePath, "application/pdf");

        }

        [HttpGet("GetPDF")]
        public IActionResult GetPDF(string html)
        {
            html = html.Replace("StrTag", "<").Replace("EndTag", ">");
            HtmlToPdf htmlToPdf = new HtmlToPdf();
            SelectPdf.PdfDocument pdfDocument = htmlToPdf.ConvertHtmlString(html);
            byte[] pdf = pdfDocument.Save();
            pdfDocument.Close();
            return File(pdf,"application/pdf","Pdf_File.pdf");
        }

        [HttpPost("ExportToWord")]
        public ActionResult<IEnumerable<string>> ExportToWord(UserDetailsDto data)
        {
            using (WordDocument document = new WordDocument("HtmlSample.html", FormatType.Html, XHTMLValidationType.None))
            {
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


        private static void ExportToPDF(string html, string filename)
        {
            using (Stream fs = new FileStream(filename, FileMode.Create))
            {
                using (Document doc = new Document(iTextSharp.text.PageSize.A4))
                {
                    PdfWriter writer = PdfWriter.GetInstance(doc, fs);
                    doc.Open();

                    using (StringReader sr = new StringReader(html))
                    {
                        XMLWorkerHelper.GetInstance().ParseXHtml(writer, doc, sr);
                    }
                    doc.NewPage();
                    doc.Open();
                    //doc.Close();

                }

            }
        }
    }
}
