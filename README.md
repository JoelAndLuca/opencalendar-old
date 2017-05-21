# open-calendar
Open-calendar is an online calendar that doesn't require login or auth. You create a calendar and get a permalink. Anyone with that permalink can use the calendar.

## Installation and useage
1. Clone the repository: `git clone https://github.com/lucahuber/opencalendar.git`
2. Switch to server folder: `cd server`
2. Install node modules: `npm install`
3. Start server: `npm start` or if you use nodemon `npm install nodemon -g` call `nodemon index`

Starting the webpage and calling the NodeJs REST-API without running server will return hard-coded sample data located in app/assets/js/app.js

## REST API
| URL | HTTP-Action | Description |
| ------------- |-------------| -----|
| :4000/api/events | GET | Gets all events currently stored in the database. |
| :4000/api/events | POST | Saves a new event. |
| :4000/api/events/:id | PUT | Updates an existing event. |
| :4000/api/events/:id | DELETE | Deletes an existing event. |

POST, PUT and DELETE calls that executed successfully will return the affected event. Otherwise an error with an HTTP status code is returned.