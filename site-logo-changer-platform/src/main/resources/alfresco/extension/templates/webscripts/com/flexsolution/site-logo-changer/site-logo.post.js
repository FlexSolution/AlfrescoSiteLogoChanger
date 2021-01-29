const SITE_LOGO = "site_logo";

function main() {
  try {
    logger.log("Uploading new site logo");

    var filename = null;
    var content = null;
    var siteId = url.templateArgs.siteId;

    // locate file attributes
    for (var field in formdata.fields) {
      if (field.name == "filedata" && field.isFile) {
        filename = field.filename;
        content = field.content;
        break;
      }
    }

    // ensure all mandatory attributes have been located
    if (filename == undefined || content == undefined) {
      status.code = 400;
      status.message = msg.get("error.uploadMissing");
      status.redirect = true;
      return;
    }

    var site = siteService.getSite(siteId);
    if (site == null) {
      status.code = 500;
      status.message = msg.get("error.siteNode");
      stauts.redirect = true;
      return;
    }

    var logoNode = null;
    logoNode = site.node.childByNamePath(SITE_LOGO);
    if (logoNode == null) {
      logoNode = site.node.createNode(SITE_LOGO, "cm:content");
    }

    logoNode.properties.content.write(content);
    logoNode.properties.content.guessMimetype(filename);

    logoNode.save();

    logger.log("logo changed")

    // save ref to be returned
    model.logo = logoNode;
    model.name = filename;
  }
  catch (e) {
    var x = e;
    status.code = 500;
    status.message = msg.get("error.unexpected");
    if (x.message && x.message.indexOf("org.alfresco.service.cmr.usage.ContentQuotaException") == 0) {
      status.code = 413;
      status.message = x.message;
    }
    status.redirect = true;
    return;
  }
}

main();