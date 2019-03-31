using PictureApp.Models;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PictureApp.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            var model = new ImageViewer()
            {
                Images = Directory.EnumerateFiles(Server.MapPath("~/Content/Images"))
                          .Select(fn => "~/Content/Images/" + Path.GetFileName(fn))
            };
            return View(model);
        }

        public ActionResult AddImage(List<HttpPostedFileBase> imageUpload)
        {
            try {
                foreach (HttpPostedFileBase item in imageUpload)
                {
                    string filename = item.FileName.Replace("+", "_").Replace("#","_");
                    string path = Server.MapPath("~") + $"Content\\Images\\{Path.GetFileName(filename)}";
                    if (!System.IO.File.Exists(path))
                    {
                        item.SaveAs(path);
                        if (Path.GetExtension(filename) == ".gif")
                        {
                            using (var img = Image.FromFile(path))
                            {
                                var dimension = new FrameDimension(img.FrameDimensionsList[0]);                               
                                img.SelectActiveFrame(dimension, 0);
                                var outputFile = Server.MapPath("~") + $"Content\\GifStatic\\{Path.GetFileNameWithoutExtension(filename)}.jpg";
                                img.Save(outputFile, ImageFormat.Jpeg);
                            }
                        }
                    } else
                        TempData["msg"] = "<script>alert('Upload failed');</script>"; 
                }
            } catch(Exception) {
                TempData["msg"] = "<script>alert('Select a file to upload');</script>";
            }
            return RedirectToAction("Index", "Home");
        }
        
        public ActionResult DeleteImage(string filename)
        {
            try
            {
                System.IO.File.Delete(Server.MapPath("~") + "Content\\Images\\" + filename);
                if (Path.GetExtension(filename) == ".gif")
                {
                    System.IO.File.Delete(Server.MapPath("~") + "Content\\GifStatic\\" + Path.GetFileNameWithoutExtension(filename) + ".jpg");
                }
            } catch (Exception){}
            return RedirectToAction("Index", "Home");
        }
    }
}