# The Aqua-playground project
"The Aqua-playground project" is an educational project of Syberry academy.
3 month are allocated for the project to work with React, up skills, get acquainted with the company's processes in time between other projects.

---

## Requirements:

- [Front end](https://git.syberry.com/t.khlyzov/aqua-playground/front);

- Software: MySQL.

## Application launch

- You can download the repository from [GitLab](https://git.syberry.com/t.khlyzov/aqua-playground/) 
    - [Front end link](https://git.syberry.com/t.khlyzov/aqua-playground/front) 
    - [Back end link](https://git.syberry.com/t.khlyzov/aqua-playground/back) 

- then for back end application: 
    - Open the BE project in your IDE;
    - run `npm i` to install all packages;
    - fill [database configs](./back/config/) with making copy of .template files without .template. 
    
    (development.template.js -> copy - > development.template copy.js -> rename -> development.js -> fill empty fields inside)
    - fill [.env values](./back/) 
    
    (.env.template -> copy - > .env.template copy -> rename -> .env -> fill empty fields inside)

    - create database with npm run db-init;
    - create database migrations with db-migrate;
    - run `npm run dev` to start BE application.

    You also can: 
    - drop wigrations with db-drop;
    - drop database with db-delete.

---

## Author
- Timofey Khlyzov.