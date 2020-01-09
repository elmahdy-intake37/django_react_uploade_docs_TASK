#Full-Stack Task Django + React
### Register, Login And upload files

>To Make Task work on your localMachine

*first make virtualenv*
_pip install -r requirements/requirements.txt_

*create .env file under docs_uploade dir for now empty file*

**just when we need move sensitive values as database config for now we use sqlite file**

>./manage.py createsuperuser
>./manage.py migrate
>./manage.py runserver
>login

http://localhost:8000/admin

>you can see all endpoint under

http://localhost:8000/api/v1/docs!

#for frontend React

##cd app folder

>npm install
>npm start

http://localhost:3000

__register-> login -> refresh-> upload file -> refresh__
