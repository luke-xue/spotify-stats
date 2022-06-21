# Launch-Spotify
## Introduction

Vocalize is a platform meant to bridge the gap between Spotify and social media. It is built with Firebase, Express, the Spotify API, React, and Node.js. Users can view their liked/top songs and top artists while also being able to message other users logged in the platform. 

## Installation

  $ git clone https://github.com/clrali/Launch-Spotify.git

npm install in the ./frontend and ./api folders

npm start in both directories

## Database Structure

On login into the application a profile is created for the user in Firebase with their document id as their spotify display name. The username is able to be accessed throughout each page through useContext().

## Private keys and Spotify Dashboard

Make sure to create a .env file in the api folder that has the firebase configurations as well as the spotify api keys so that others cannot access them through github. For the Spotify API to work you need to add your account to the Spotify Developers website and make sure the redirect URI is the correct link to the website.

## Usage

There are **two core functionalities** of the app: Spotify statistics and messaging. You must login to access either of them. The statistics can be accessed through different buttons on the navigation bar. Messaging is located on the bottom of the navigation bar and requires a refresh with the refresh button to retrieve data.
