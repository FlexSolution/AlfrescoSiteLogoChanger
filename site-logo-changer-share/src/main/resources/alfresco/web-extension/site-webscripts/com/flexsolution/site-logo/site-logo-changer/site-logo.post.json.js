var RepoHelper = {

    getSiteData: function (siteIdArg) {
        var siteId = siteIdArg,
            siteData = null;
        if (siteId != null) {
            if (model.siteData == null) {
                // Call the repository for the site profile
                var json = remote.call("/api/sites/" + siteId);
                var profile =
                    {
                        title: "",
                        shortName: "",
                        visibility: "PRIVATE"  // Default to PRIVATE as if the site is PRIVATE and the user doesn't have access, this won't get updated!!
                    };

                if (json.status == 200) {
                    // Create javascript objects from the repo response
                    var obj = JSON.parse(json);
                    if (obj) {
                        profile = obj;
                    }
                }

                // Call the repository to see if the user is site manager or not
                var userIsSiteManager = false,
                    userIsMember = false;
                json = remote.call("/api/sites/" + siteId + "/memberships/" + encodeURIComponent(user.name));
                if (json.status == 200) {
                    var obj = JSON.parse(json);
                    if (obj) {
                        userIsMember = true;
                        userIsSiteManager = obj.role == "SiteManager";
                    }
                }

                siteData = {};
                siteData.profile = profile;
                siteData.userIsSiteManager = userIsSiteManager;
                siteData.userIsMember = userIsMember;

                // Store this in the model to allow for repeat calls to the function (and therefore
                // prevent multiple REST calls to the Repository)...
                // It also needs to be set in the model as the "userIsSiteManager" is required by the template...
                model.siteData = siteData;
            }
            else {
                siteData = model.siteData;
            }
        }
        return siteData;
    }
};

function main() {

    var logoId = json.get("site-options-logo");
    var siteId = json.get("siteId");

    var repoSiteData = RepoHelper.getSiteData(siteId);

    if (repoSiteData && (repoSiteData.userIsSiteManager || user.isAdmin)) {

        if (logoId != null && (logoId = new String(logoId)).length != 0) {
            var p = sitedata.getPage("site/" + siteId + "/dashboard");
            p.properties.siteLogo = logoId != "reset" ? logoId.toString() : "";
            p.save();
        }

        model.success = true;
    } else {
        model.success = false;
    }
}

main();