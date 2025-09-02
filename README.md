#Project - {  NOTE APP }

Technology used :-

    Backend:
        1. Express
        2. Node.js
    
    Frontend:
        1. React
        2. Javascript
        3. CSS
        4. HTML
    
    Databse:
        1. MongoDB

Description:-

A simple Note App where user can singup using Emial via OTP.
user can Delete and Create Note.
It has authentication so user can manage their own notes separately.


Structure:-

Note App--
    Frontend--
    Backend--


How to build backend:-

1. Install packages: 

-->express,mongoose,jsonwebtoken,redis,bcrypt,cors,dotenv,nodemailer

2. Connect localhost with database using mongoose and express

3. Set Models for Database.

3. Setup basic route for auth and notes

4. Set authentication routes for singup and login

5. Set note routes for create,read and update.

6. Set JWT for authentication

7. Made middleware for verifying JWT token.

8. Use redis and nodemailer to send OTP to user to verify idendity.

How to build frontend:-

1. Create axios API so we don't have to write full URL everytime we make a request.

2. Then create a login form in html and css

3. Then create a signup form in html and css

4. then create a dashboard in html and css.

5. then convert them to jsx using chatgpt. (very time consuming)

6. Then set basic App.js to display Login form.

7. Then add logic to signup and login form.

8. Then make a DashBoard component to decide wheter show LoginForm,SignupForm or Dashboard.

9. Then wrote Notes App logic to create and delete.

10. Set whole piece and component to each other (most time consuming).




Future Tech Addition:-

    1. we can add search functionality.
    2. We can also add update functionality.
    3. We can add post functionality.
    4. Add like and dislike buttons and comment options in public post.