# This message will self-destruct

A NodeJS programming challenge.

The goal here is to create a simple web application that allows someone to create a message, view that message at a unique URL, and destroy the message upon viewing it. Just like the title states, this message will self-destruct!

## Installation

Clone this repository and install dependencies.

``` bash
git clone https://github.com/senshikaze/tmwsd_challenge
npm install --omit=dev
```

## Run

Run the express server

```bash
node app.js
```

## Development

If desired to change display classes using tailwindcss, you need to install the dev dependency and run tailwind via npx. This is not neccessay to use the site as is.

```bash
npm install
npx taildwindcss -i ./style.twx -o ./assets/style.css
```

Note: can add `--watch` to the `npx` command above if making multiple changes to classes

## Optional

If desired to have an automatic redirect from the self-destructed message page, set `DEFAULT_TIMEOUT` in `routes/messages.js` to a positive value.

## Step 2: Complete the Requirements

Complete the following requirements by using any database engine of your choice. Update this readme by checking the following boxes as you go.

- [X] As a user, I should see a form to create a new message on the homepage.
- [X] As a user, I should see a list of links for all created messages below the 'new message' form on the homepage.
- [X] As a user, when I click a link in the message list, I should be able to view the message at a unique URL.
- [X] As a user, when I open a message, the message should self-destruct (delete from the database).
- [X] As a user, I should no longer see messages on the homepage that have been viewed.

Two more things:
* Remember to add documentation to your README so the app can be installed and run locally for review.
* Bonus points for making it look pretty :sparkles:

## Step 3: Submit

Send an email with a link to your fork when finished. Thanks!
