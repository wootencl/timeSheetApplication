# Backbone.js + Node.js + MySQL Time Sheet Application

## Project Synopsis

This is a single page web application that is intended to assist tracking the hours of a companies various employees. Through it's design and now development I attempted to make the UI as simple as possible in order to be intuitive to a wide range of users. The client whom I'm developing this for has generously let me make it open source. (Shout out to [Elevation Healthcare](http://www.elevationhealthcare.com/)!) Here are a few of the projects intended uses/specifications per the client:
+ Have a company logo view with login or account creation ability.
+ Allow users to login via a login view or create an account via a account creation page.
+ Time Sheet Application View:
  + Give user ability to select (but not edit) up to one month in the past previously submitted time sheets.
  + Time broken into 5 minute increments.
  + Show calculated time for each day and total time for a week.
  + Ability for user to submit a photo or file of filled out excel sheet.
    + Building on this don't allow users to submit time sheet for a week unless photo has been submitted.
+ Finally allow users to submit timesheets to the server (Node.js+MySQL)

Currently I've gone with the idea of handing out authentication tokens in order for a person to create an account. This seemed like the easiest way of dealing with unwanted users.

####TODO:

These are my my TODOs for the project. Some of them are small while others much larger. I originally was keeping a local text document with this information but couldn't think of a reason to not include this information with the README.

#####High Priority (!!!)
+ ~~Launch a demo.~~
+ Backend Validation.
  + The backbone.validation plugin I'm using claims to have a way of passing it's validation to node. Further research required.
+ Tests.
  + This was originally suppose to be a TDD project but as I have decided to go with delivering a product to the client so they can have something to begin showing to their employees I'm putting that off until the end.
+ On window resize I need to refresh the locations of the 'weekDiv's and the 'weekSelector'

#####Medium Priority (!!)
+ Modularize SCSS.
+ Enable 'Enter' keystroke press for form submissions.
+ Garbage collection of subviews in Admin Panel.
+ Add handling/message to the Admin Panel for when empty collections are handed back from the server. Right not the 'user' sections are just empty.
+ Handle general server errors.
  + Right now there's some server error handling on forms but none really for othere API calls. Need to add something where if a 500 is returned that should be relayed to the user and prevent a crash.
+ Add a loader gif for transitions and retrieving data from the server.
+ Start using HTTPS.
+ Make sure everthing is in order with even garbage collection in the Admin View.
+ Handle missing weeks in calendar view on the user page.

#####Low Priority (!)
+ Trim whitespaces from inputs.
+ Smoother delete/add animations on the Admin Panel.
+ Some amounts of async. logic problems.
  + New to async. programming so I'm hoping to come back and fix these.
+ Handling of user being autologged out on cookie expiration.
+ Look into sorting the timesheets returned from the server by date. Currently it seems to be doing that by defauly but further research is required to see if the comparison backbone is using is actually comparing datetimes.

#####Bugs/Edge Case Issues:
+ Deletion of a user while that user is logged in.
+ On resize opened 'user' panes in the Admin Panel should resize as well.

####Demo:
This is a demo I launched a couple weeks ago (3.21.16). Basic deployment on my AWS EC2 instance. I've got a git repository connected to the server located in my 'dist' folder that I typically push from everytime I push to Github.

Demo Link: [tsaDemo](http://tsaDemo.clwproductions.com)

Login Credentials:
+ USER: demouser@gmail.com, password123
+ ADMIN: demoadmin@gmail.com, password123

## Motivation

I'm extremely lucky in that myself and the client I'm working to do this for have a great relationship. After starting work at the company over a year ago my role (besides being a Software/Web Developer) has somewhat moved into a pseudo-R&D position. With that, myself and the client have brainstorming sessions of which this project is a child of.

##Setting It Up Yourself

If you would like to get this project up and running on your own machine there are some steps below that should guide you through the process.
##### Prerequisites:

* The below steps are going to assume you have Node.js installed. If that's not the case then you may want to head over to their [website](https://nodejs.org/en/) and get yourself a fresh install.
* In addition to Node.js an install of MySQL is required. There's many different ways of downloading MySQL so I'll leave that up to the user of how he/she wishes to accomplish that.

#### Steps:
1. You'll first want to clone this package with git onto your local machine or download the zip from the options above.

2. After that navigate into the root directory of the project where you recently cloned/downloaded it.

3. Once there you can run the following commands to download the projects dependencies:

    ```
    //Only run this if you don't already have bower installed.
    npm install -g bower
    //Installs the dependencies located within the bower.json file.
    bower install
    //Installs the dependencies located with the package.json file.
    //If you would like all the developer tools I use as well then leave out the '--production' flag
    //(NOTE: This is not recommended as the build tools are quite large and in turn can take a long time to download)
    npm install --production
    ```
4. Next step you'll want to create the database that goes along with the application. There's a createDatabase script file that should assist in this. Run the following but beforehand refer to the createDatabase.js file for any further setup you may need:

  ```
  //This will output an authentication token that can be used within the application
  node serverConfig/createDatabase.js
  ```

5. Once the database is created you can generate some test data using the 'createTestData.js' script. First you'll want to go into that file and modify it in a similair fashion as the 'createDatabase.js' script. Then just run this command:


  ```
  //This will log for every user created.
  node serverConfig/createTestData.js
  ```

6. Now that you have all the dependencies installed and the database created you have one of two options:
  1. You can either cd into the ```app``` directory and run the following command:

      ```node server```

  2. Or if you want to go the more 'production' level you can issue the following commands (this will only work if you downloaded all the devleloper tools which means omitting the '--production' flag above)(NOTE: Currently I'm pushing the dist directory with my commits so you could probably just 'cd' into there and start the app. Sometimes I empty it though which means you would have to republish it):

    ```
    //Assuming your in the project's root directory.
    grunt publish //will use grunt to make sure everything is in place and minify any necessary files
    cd dist
    node server
    ```

7. The above should print something along the lines of ```App listening at http://127.0.0.1:3000``` out to the console. Then you can navigate to that URL in the browser of your choice and the app will be there.
8. That's it! Currently it's still very much in the construction phase so please understand the lack of many things in the project because of that.

## Future Work

This project is only the first part of a two part plan. Once the ability to record employees time on a remote server has been established the next step will be the automation of my client's invoicing software. This will be accomplished through a combination of that software's API calls and the aforementioned data-set being created on the remote server. With luck I'll be allowed to make that part open source as well so if this project interests you I would say keep an eye out for that in the near future.

## Contributers

At the moment just myself but all are welcome to join!

## License

MIT © [Carter Wooten](http://clwproductions.com)
