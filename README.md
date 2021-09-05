# Firebase Challenge

> To visit project click [here](https://moh-deh-firebase-challenge.web.app)

Email: m.dehghanpour10@gmail.com

Password: 111111
## Details
There are two page in this challenge:
1. login page
2. dashboard page

### login page
If user want to go to dashboard page, first should enter email and password in login page then user could use dashboard page.
if user has already logged in, it will redirect to dashboard page. if any user not found by email and password that entered,message "user not found" is display,
but email and password is correct so user redirect to dashboard page and message "hello {user email}" is displayed.

### dashboard page
Dashboard page Composed of to section:
1. add record section
2. table of records

**add record section**

first, the names of companies are fetched form firebase, then when user select each company, the project of it company are fetched and finally when the user selects each project, its tasks are fetched.
user can select each of this task, and can enter new task too,then if record is saved, new task add to list of task for this project.

**table records**

This table show each record that save in add record section. Records sorted by their hours.Each record contain of five column :

- company 
- project
- task 
- hours
- delete

There is icon of delete in delete column to remove record, when each record removed, is displayed message for it.


## @angular/fire
In this project for communicate to firebase datastore and firebase auth has used @angular/fire.

## services
2 service has used in this project:
1. add-record service: The task of this service is registration of new record .
2. table service: The task of this service is fetch records from firebase and delete records.

## guards
2 guards has used in this project:
1. login guard: This guard protect login page, when user already entered
2. dashboard guard: This guard protect dashboard page, when user didn't enter
