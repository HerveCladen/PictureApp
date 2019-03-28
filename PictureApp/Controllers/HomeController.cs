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
    }
}