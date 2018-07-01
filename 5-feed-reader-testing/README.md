# How to run the application?
To run the application, you have to get the repository and, then, to open the `index.html` file. You'll see the app and, at the bottom of the webpage, the Jasmine tests and how they passed (or not).

# Project Overview
In this project, we are given a web-based application that reads RSS feeds. We have to write the test suites, based on Jasmine framework, to check all features.
## RSS feeds, with :
- A test that loops through each feed in the `allFeeds` object and ensures it has a URL defined and that the URL is not empty.
- A test that loops through each feed in the `allFeeds` object and ensures it has a name defined and that the name is not empty.
## The menu, with :
- A test that ensures the menu element is hidden by default.
- A test that ensures the menu changes visibility when the menu icon is clicked.
## Initial Entries, with :
- A test that ensures when the `loadFeed` function is called and completes its work, there is at least a single `.entry` element within the `.feed` container.
## New Feed Selection, with :
- A test that ensures when a new feed is loaded by the `loadFeed` function that the content actually changes.
