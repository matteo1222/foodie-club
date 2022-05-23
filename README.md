# Foodie Club
A web app to match people who would like to try the same restaurant and they would like to have others to go with. This project is deployed [here](https://foodieclub.co).

# The Problem
Ever wanted to go to a restaurant and people you know weren’t available that day? It’s hard enough getting 1 friend to be available at the same time, what about if you want to go with a bigger group? Sometimes people also don’t have a group of e.g. 6–8 people to enjoy the private dining room experience and there’s also no way currently to be matched to meet new people that want to go to the same restaurant as you at the same date or who want to explore new cuisines or restaurants.

# Motivation
This project was the result of a team project of [TechLabs](https://techlabs.org/)'s "Digital Shaper Program", a learning program that combines online learning and project work to learn about Data Science, Web Developement, Artificial Intelligence, or User Experience Design.

# Features
- Authentication system
- Search and sort to select restaurants to start a group
- Search groups and join the groups that fits users' food preference and schedule
- Group chat for each created groups
- Recommend restaurants that are similar to restaurants that users picked

# To Start the Project:
## Clone the Project
```
git clone https://github.com/matteo1222/foodie-club.git
```
## Start React Client
```
cd client
npm install
npm start
```
## Start FeathersJS Server
Before starting the server, set up a PostgreSQL database with the name "foodie_club_server"
```
cd server
npm install
npm start
```
## Start Recommendor
```
cd recommendor
source venv/bin/activate
python ./server.py
```
Python's version should be 3.8


Head here to read more about this team project: https://medium.com/@london_6354/foodie-club-891babbd6449

