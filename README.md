# Multiple Entrypoint Experiments With Vite 🚪

## What is this? 

This is a demonstration repo that I **hope** will reveal the best possible way for working in a multipage app compiled with Vite.

It uses 2 forms of delivery. 

A: We have a vite dev server with access to 3 unique entry points (DoorOne, DoorTwo, DoorThree)
B: We have a single file flask server which

## How do I run this?

### Pre-Reqs

- Have PyEnv
- Have Poetry 
- Have Node
- Have Yarn

## Steps

- Clone the repo
- Set up the repo (`yarn install && poetry shell` + `poetry install`)
- Build frontend by itself in dev mode `yarn dev`
- Check out the localhost pages and `$VITE_URL/DoorOne/index.html` etc...
- Build frontend assets for prod
- Start the Flask server `flask --app server run --debug`
- Check out the Jinja template pages at `$FLASK_URL/door-one` etc...
- Perform Vite Build experiments and figure out best solve for Flask + Vite
