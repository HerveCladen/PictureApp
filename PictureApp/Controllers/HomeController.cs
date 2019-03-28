using PictureApp.Models;
using System;
using System.Collections.Generic;
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
            if (imageUpload != null) {
                foreach (HttpPostedFileBase item in imageUpload)
                {
                    if (!System.IO.File.Exists(Server.MapPath("~") + "Content\\Images\\" + Path.GetFileName(item.FileName)))
                    {
                        item.SaveAs(Server.MapPath("~") + "Content\\Images\\" + Path.GetFileName(item.FileName));
                        TempData["msg"] = "<script>alert('Picture uploaded successfully');</script>";
                    } else
                        TempData["msg"] = "<script>alert('Upload failed');</script>"; 
                }
            }
            return RedirectToAction("Index", "Home");
        }
        
        public ActionResult DeleteImage(string filename)
        {
            try
            {
                System.IO.File.Delete(Server.MapPath("~") + "Content\\Images\\" + filename);
            } catch (Exception){}
            return RedirectToAction("Index", "Home");
        }
    }
}