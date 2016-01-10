# Backbone.js + PHP + MySQL Time Sheet Application

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
+ Finally allow users to submit timesheets to the server (PHP+MySQL)

Currently I've gone with the idea of handing out authentication tokens in order for a person to create an account. This seemed like the easiest way of dealing with unwanted users. 

## Motivation

I'm extremely lucky in that myself and the client I'm working to do this for have a great relationship. After starting work at the company over a year ago my role (besides being a Software/Web Developer) has somewhat moved into a pseudo-R&D position. With that, myself and the client have brainstorming sessions of which this project is a child of. 

## Future Work

This project is only the first part of a two part plan. Once the ability to record employees time on a remote server has been established the next step will be the automation of my client's invoicing software. This will be accomplished through a combination of that software's API calls and the aforementioned data-set being created on the remote server. With luck I'll be allowed to make that part open source as well so if this project interests you I would say keep an eye out for that in the near future. 

## Contributers

At the moment just myself but all are welcome to join!

## License

MIT © [Carter Wooten](http://clwproductions.com)
