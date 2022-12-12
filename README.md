# The warehouse project

"The warehouse project" is an individual educational project of Syberry academy.
3 month are allocated for the project to work with React, up skills, get acquainted with the company's processes in time between other projects.

---

## Technical documentation:

[[Link to Technical documentation]](./documentation/Technical_documentation.md)

---

## App demo video

<details>
<summary>Spoiler (App demo).</summary>
<pre>

![video](./documentation/The_Crawler_demo(t.khlyzov).mp4)
</pre>

</details>

---

## Requirements:

- Front end and back end parts of the app;

- Software: MySQL.

## Application launch

- You can download the repository from [GitHub](https://github.com/txlyzov/warehouse-app/tree/development/warehouse-app) 
    - [Front end link](https://github.com/txlyzov/warehouse-app/tree/development/front) 
    - [Back end link](https://github.com/txlyzov/warehouse-app/tree/development/back) 

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

- then for front end application: 
    - Open the FE project in your IDE;
    - run `npm i` to install all packages;
    - fill [.env values](./front/) 
    
    (.env.template -> copy - > .env.template copy -> rename -> .env -> fill empty fields inside)

    - run `npm run dev` to start FE application

---

## Author
- Timofey Khlyzov.