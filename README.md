# Installing

## SDK 3.0

* Create a file `${user.name}.pom.properties` from [jenkins.pom.properties](jenkins.pom.properties) example in the project root folder.  Where `${user.name}` is your PC user name. Check the path to `ImageMagick`. [Installing ImageMagick Manual](http://docs.alfresco.com/5.2/tasks/imagemagick-config.html) 

* Run for SDK3.0 alfresco startup

```bash
mvn clean install alfresco:run
```

## AMPs modules

* for building AMPs modules: 

```bash
mvn clean package
```
You can find AMPs here `.site-logo-changer-platform/target/site-logo-changer-platform.amp` and `.site-logo-changer-share/target/site-logo-changer-share.amp`

# Instruction 

This addon adds an action for changing site logo on the site. **Only admin and Site Managers can see it.**

![Sample Video](https://ecm.flex-solution.com/share/proxy/alfresco/slingshot/node/content/workspace/SpacesStore/bc14ab5f-18f1-496c-b07e-5ab3168d7ab7/Change%20Site%20Logo%20V1.mp4)