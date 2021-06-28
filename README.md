# GWENTcards

![Workflow badge](https://github.com/Rowan-Paul/GWENTcards/actions/workflows/ci.yml/badge.svg)

This is a project based upon http://www.gwentcards.com/ made using MongoDB, Express, React and NodeJS. The idea is to get feature parity with the original site on a faster, responsive website. The site is currently live over on https://gwentcards.net and gets build and deployed automatically everytime there is a push on the main branch.

The API that gets used is available in the [Rowan-Paul/gwentapi](https://github.com/Rowan-Paul/gwentapi) repository.

## Features

 - Fast, open source and partially tested
 - Uses a RESTfull API
 - Mobile and offline capable
 - Multiple views for the cards
 - Dark mode that automatically triggers

![Screenshot of the homepage](https://user-images.githubusercontent.com/46132597/123640187-333ba780-d821-11eb-9d3c-ee46e8a02865.png)
_Screenshot of the homepage_

![Screenshot of the cards in dark mode](https://user-images.githubusercontent.com/46132597/123640399-69792700-d821-11eb-864d-4de2dc1adb51.png)
_Screenshot the cards in dark mode_

<img src="https://user-images.githubusercontent.com/46132597/123640983-050a9780-d822-11eb-8645-af7b94416690.png" alt="Screenshot of the homepage in list mode with a DLC filter selected on mobile" height="500px">

_Screenshot of the homepage in list mode with a DLC filter selected on mobile_


## Installation

You can run this app locally by running `npm install` and then `npm start`. There are redux action and reducer tests which can be run by running `npm test` in your terminal. You can get the coverage of the files by running `npm run coverage`.

The app also has ESLint and Prettier configurations from @imaginary-cloud. You can run the linter by running `npm run lint` and fix the errors by running `npm run lint:fix`.

### Environment variables

In order to run the application locally, you need the following env variables inside a ``.env`` or ``.env.local`` file in the project root. By default the project already contains a ``.env`` files with the correct strings that are used on the production site. Note that React packages these variables with the rest of the application *so these aren't secret*.

| Name                        	| Description                                              	|
|-----------------------------	|----------------------------------------------------------	|
| ``REACT_APP_CLOUDINARY_ID`` 	| The id for the Cloudinary library that hosts the images. 	|
| ``REACT_APP_API``           	| The url for the api, standard ``/``                      	|

## Contribute

If you want to contribute, have a question or suggestion feel free to open an [issue](https://github.com/Rowan-Paul/GWENTcards/issues/new/choose) using one of the templates or start a [discussion](https://github.com/Rowan-Paul/GWENTcards/discussions).
