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
+ Planning on launching a demo of the application here shortly. After which I intend on writing some tests to cover the current functionality of the application. 
+ (Update 3.9.16): Managed to get the demo up on my EC2 instance though it's being a bit finicky so I'll need to iron out the details a bit more. Saving that for a later time though as I need to move forward with the authentication work. Here's the link to the demo: [tsaDemo](tsaDemo.clwproductions.com)

## Motivation

I'm extremely lucky in that myself and the client I'm working to do this for have a great relationship. After starting work at the company over a year ago my role (besides being a Software/Web Developer) has somewhat moved into a pseudo-R&D position. With that, myself and the client have brainstorming sessions of which this project is a child of. 

##Setting It Up Yourself

If you would like to get this project up and running on your own machine there are some steps below that should guide you through the process.
##### Prerequisites: 

* The below steps are going to assume you have Node.js installed. If that's not the case then you may want to head over to their [website](https://nodejs.org/en/) and get yourself a fresh install. 
* Also you will need to create a database for use by the application. I'm using mySQL so there's some SQL in the timeSheetApplication/app/serverConfig/databaseSQL.sql. In addition you need to authenticate with the correct user in the database.js file in the same directory.

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
    npm install --production
    ```
    
4. Now that you have all the dependencies installed you have one of two options:
  1. You can either cd into the ```app``` directory and run the following command:

      ```node server```
      
  2. Or if you want to go the more 'production' level you can issue the following commands (this will only work if you downloaded all the devleloper tools which means omitting the '--production' flag above):
  
    ```
    //Assuming your in the project's root directory. 
    grunt publish //will use grunt to make sure everything is in place and minify any necessary files
    cd dist
    node server
    ```

5. The above should print something along the lines of ```App listening at http://127.0.0.1:3000``` out to the console. Then you can navigate to that URL in the browser of your choice and the app will be there.
6. That's it! Currently it's still very much in the construction phase so please understand the lack of many things in the project because of that. 

## Future Work

This project is only the first part of a two part plan. Once the ability to record employees time on a remote server has been established the next step will be the automation of my client's invoicing software. This will be accomplished through a combination of that software's API calls and the aforementioned data-set being created on the remote server. With luck I'll be allowed to make that part open source as well so if this project interests you I would say keep an eye out for that in the near future. 

## Contributers

At the moment just myself but all are welcome to join!

## License

MIT © [Carter Wooten](http://clwproductions.com)
