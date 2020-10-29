## TechNewz

Express.js back end for a "Hacker News" type social network utilizing MySql or JawsDB (Heroku). Including robust REST API with multiple endpoints/routes. Routes include POST, PUT, GET & DELETE for Users, Posts and Comments. All routes are tested in the demonstrations below.

![licensebadge](https://img.shields.io/badge/license-CC0_1.0_Universal-blue)

#### Issues

- [x] [Users can create, read, update, and delete a profile](https://github.com/MBrassey/TechNewz/issues/1)
- [x] [Add security and authentication](https://github.com/MBrassey/TechNewz/issues/2)
- [x] [Create and manipulate posts](https://github.com/MBrassey/TechNewz/issues/3)
- [x] [Enable users to vote on posts](https://github.com/MBrassey/TechNewz/issues/4)
- [x] [Create and manipulate comments on post data](https://github.com/MBrassey/TechNewz/issues/5)
- [x] [Generate Readme & Deploy Heroku](https://github.com/MBrassey/TechNewz/issues/6)

#### Requirements

    mysql or jawsdb
    node
    npm

#### Installation

    Create file: .env (in root directory)
        DB_NAME='<your_database_name>'
        DB_USER='<your_user_name>'
        DB_PW='<your_mysql_password>'

    npm i
    npm run migrate

#### Usage

    Usage: node server.js [ -h | -v | -l | -a ]
    or: npm start

    [options]

           -h          Display this message.
           -v          Show version.
           -l          Show license info.
           -a          What is TechNewz?

<h6><p align="right">:cyclone: Click the image(s) below to view the live <a id="Screenshots" href="https://technewz-mbrassey.herokuapp.com/api/posts">webapplication</a></p></h6>

> Setup
> [<img src="img/Preview.gif">](https://technewz-mbrassey.herokuapp.com/api/posts)

> User Routes
> [<img src="img/Preview1.gif">](https://technewz-mbrassey.herokuapp.com/api/posts)

> Post Routes
> [<img src="img/Preview2.gif">](https://technewz-mbrassey.herokuapp.com/api/posts)

> Comment Routes
> [<img src="img/Preview3.gif">](https://technewz-mbrassey.herokuapp.com/api/posts)

#### Questions

Contact me at [matt@brassey.io](mailto:matt@brassey.io) with any questions or comments.

#### License

`TechNewz` is published under the **CC0_1.0_Universal** license.

> The Creative Commons CC0 Public Domain Dedication waives copyright interest in a work you've created and dedicates it to the world-wide public domain. Use CC0 to opt out of copyright entirely and ensure your work has the widest reach. As with the Unlicense and typical software licenses, CC0 disclaims warranties. CC0 is very similar to the Unlicense.
