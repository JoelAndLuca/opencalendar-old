[![Heroku](https://heroku-badge.herokuapp.com/?app=jkl-opencalendar)](https://jkl-opencalendar.herokuapp.com/)
[![Build Status](https://travis-ci.org/JoelAndLuca/opencalendar.svg?branch=master)](https://travis-ci.org/JoelAndLuca/opencalendar)

# open-calendar
Open-calendar is an online calendar that doesn't require login or auth. You create a calendar and get a permalink. Anyone with that permalink can use the calendar.

## Folder structure
**Do only use the index.html located in /app if no NodeJS is available. The correct html is located in the home.ejs file in /views.**

**Don't move the /app/assets folder or it's contents.**

## Installation and useage
1. Clone the repository: `git clone https://github.com/lucahuber/opencalendar.git`
2. Install node modules: `npm install`
3. Start server: `npm start` or if you use nodemon `npm install nodemon -g` call `nodemon server`

## REST API
| URL | HTTP-Action | Description |
| ------------- |-------------| -----|
| /api/calendar/:calId/events | GET | Gets all events for a calendar id. |
| /api/calendars | GET | Gets all calendars currently stored in the database. |
| /api/events | GET | Gets all events currently stored in the database. |
| /api/events | POST | Saves a new event. |
| /api/events/:id | PUT | Updates an existing event. |
| /api/events/:id | DELETE | Deletes an existing event. |

POST, PUT and DELETE calls that executed successfully will return the affected event. Otherwise an error with an HTTP status code is returned.
