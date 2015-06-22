# eventer
Simple event and participant management app with node back end and Ionic frontend.

## Dev Setup ##

### Prerequisites ###

* NodeJS, including NPM [https://nodejs.org/](https://nodejs.org/)
* Ionic [http://ionicframework.com/](http://ionicframework.com/)


## Feature Plan ##

### Version 0.1 ###

#### Functionality ####

* Events
  * Create
  * Edit
  * Delete  

* Users
  * Create
  * Edit
  * Delete
  * Login
  * Logout

* Event signups
  * Create
  * Edit
  * Delete
  
#### Data ####

* Event
  * Name
  * Date
  * Time
  * Location/Address
  * Description
  * Host
  
* Users
  * Firstname
  * Lastname
  * Address
  * Phone
  * Email

* Event signups
  * Event
  * Participant
  * Signup status
  * Comment
  
#### Relations ####

* Each event has only 1 host, an exiting user
* Each user can host multiple events
* One event can have many signups but only one per user
* User can sign up to multiple events

### Views ####
* Login dialog
* List of events
* Event details with list of participants
* List of users
* User details with list of events user has signed up

### View Navigation ####

* Login diaglog/window is the default if user has not been logged in yet
* Menu has links to event list, users list and logout
* List of events is the default view for logged in user
* From list of events user can navigate to event details
* From list of users user can navigate to user details

 