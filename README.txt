# WerkstukDevelopmentV

Terminal commands:
Run "docker-compose up --build -d" to run the docker image

ENV File:
Dit is wat in de .env file moet staan om de databank correct te laten werken.

"
    APIPORT=5543
    PORT=5432
    POSTGRES_USER=admin
    POSTGRES_PASSWORD=admin
    POSTGRES_DB=Users
"


Routes:

1.1 Get user
This route allows you to recieve all users from the postgress database
http://localhost:5543/api/users

2.1 Create user
This route allows you to create a user in the postgress database.
In the route the word "test" can be filled in with any name you would like to give youre user.
In the route the number "1" can be filled in with 1 or 2 depending on the gender of the user.
1 being male, 2 being female
http://localhost:5543/api/createUser/test/1

3.1 Update user
This route allows you to update a user in the postgress database.
In the route the number "4" can be filled in the id of the user you want to update.
In the route the word "updateUser" can be filled in with any name you would like to update the users name to.
http://localhost:5543/api/updateUser/4/UpdateValue

4.1 Delete user
This route allows you to delete a user in the postgress database.
In the route the number "3" can be filled in the id of the user you want to delete.
http://localhost:5543/api/deleteUser/3



