note: we will be holding 2 streams as part of this event. Here are the day. Link coming soon.

[Join on Discord](https://discord.com/invite/gkCkydB8b6)

[October 17th - Project Planning and Kickoff 3 pm CST](https://youtube.com/live/foeQJsTEico?feature=share)

October 24th - Second Stream 3pm CST

# Setting Up Your Project

1. Fork the repository locally:

2. Run `setup` command to setup frontend and backend dependencies:

```bash
  yarn setup
```

3. Next, navigate to your `/backend` directory and set up your `.env` file. You can use the `.env.example` file as reference:

```bash
HOST=localhost
PORT=1337
APP_KEYS="toBeModified1,toBeModified2"
API_TOKEN_SALT=tobemodified
ADMIN_JWT_SECRET=tobemodified
JWT_SECRET=tobemodified
TRANSFER_TOKEN_SALT=tobemodified
```

4. Start your project by running the following command:

```bash
  yarn build
  yarn develop
```

You will be prompted to create your first admin user.

![admin-user](https://user-images.githubusercontent.com/6153188/231865420-5f03a90f-b893-4057-9634-9632920a7d97.gif)

Great. You now have your project running. Let's add some data.

## Seeding The Data

We are going to use our DEITS feature which will alow to easily import data into your project.

You can learn more about it in our documentation [here](https://docs.strapi.io/dev-docs/data-management).

In the root of our project we have our `seed-data.tar.gz` file. We will use it to seed our data.

Open up your terminal and from the `root` of your project run the following command.

```bash
  yarn run seed
```

This will call a script that you can find within the `packages.json` file in the root of your folder.

![after-import](https://user-images.githubusercontent.com/6153188/231865491-05cb5818-a0d0-49ce-807e-a879f7e3070c.gif)

This will import your data locally. Log back into your admin panel to see the newly imported data.

## Start Both Projects Concurrently

We can also start both projects with one command using the `concurrently` package.

You can find the setting inside the `package.json` file inside the root folder.

```json
{
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "copytypes": "node copyTypes.js",
    "frontend": "yarn dev --prefix ../frontend/",
    "backend": "yarn dev --prefix ../backend/",
    "clear": "cd frontend && rm -rf .next && rm -rf cache",
    "setup:frontend": "cd frontend && yarn",
    "setup:backend": "cd backend && yarn",
    "setup": "yarn install && yarn setup:frontend && yarn setup:backend",
    "dev": "yarn clear && concurrently \"cd frontend && yarn dev\" \"cd backend && yarn develop\"",
    "repo:upstream": "git fetch upstream && git merge upstream/main",
    "seed": "cd backend && yarn strapi import -f ../seed-data.tar.gz",
    "export": "cd backend && yarn strapi export --no-encrypt -f  ../seed-data"
  },
  "dependencies": {
    "concurrently": "^7.6.0"
  }
}
```

You can start both apps by running `yarn dev`.

# App Requirements for the Next.js + Strapi Building in Public

Objective: To build a community-driven application that recommends events to users.

## Login and Registration

- User should be able to sign up using an email and password.

## Event Management

- CRUD Operations
- Users should be able to create events with details such as event name, description, date, time, image, and location.
- Users should be able to read/view events.
- Users should be able update or delete event.

**Nice-to-have**

- Event creators should be able to update their event details.
- Event creators should be able to delete events.

## Event Details Page

- Each event should have a detailed page showing:
  - Event image.
  - Event description.
  - Event date and time.
  - Location of the event.

## Event Interactions

- Users should be able to "like" events.

**Nice-to-have**

- Users should be able to comment on events.

## User Profile

- Every registered user should have a profile.
- Users should be able to edit their basic profile information.
  - username
  - email

**Nice-to-have**

- Option to change profile picture.

## Audience Participation & Collaboration

Contribution: You're encouraged to fork the repository or submit PRs. We might review it asynchronously or live during the stream before merging.

Polls & Decisions: You can actively partake in decisions by participating in polls that'll be posted as GitHub issues. Give it a thumbs up to vote!

Upcoming Polls

- Choose the product name.
- Decide the primary app colors.
- Suggest alternative tech?
- Provide suggestions for in-app copy.
- Design or suggest a logo.

Join Us
All you need is enthusiasm and a GitHub account!

👉 Follow our repository.
👉 Join our live sessions.
👉 Experience hands-on coding.
👉 Engage with the community.

Let’s create, learn, and grow together! 🚀

This list covers the primary features and requirements for the contest-based app.

Additional features, requirements, and detailed user stories might be needed as the project evolves.

But the goal is just to have fun and build something as a community.


# Contributing to the Public repository

We're so excited that you're thinking about contributing to this `build in public` open-source project! 

If you're unsure or afraid of anything, just know that you can't mess up here. Any contribution is valuable, and we appreciate you!

This document aims to provide all the necessary information for you to make a contribution.

## Prerequisites

Before you can contribute, you need to have the following installed:

- Node.js and npm: You can download these from the official [Node.js website](https://nodejs.org/).
- Git: You can find installation instructions for Git in the official [Git Book](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git).

## Steps to Contribute

## 1. Fork the Repository

In your web browser, navigate to [https://github.com/PaulBratslavsky/nextjs-build-in-public](https://github.com/PaulBratslavsky/nextjs-build-in-public). Click the 'Fork' button in the upper right-hand corner of the page. This creates a copy of the repository in your GitHub account.

## 2. Clone your Fork

Now, go to your version of the repository. You can do this by navigating to https://github.com/USERNAME/nextjs-build-in-public (replace 'USERNAME' with your GitHub username). Here, click the 'Clone' button and then 'Copy to clipboard' to copy the git URL.

Next, you need to open your terminal, navigate to where you want to store the project, and type the following command, followed by 'Enter':

```bash
git clone PASTE_CLONED_REPOSITORY_URL
```

Replace 'PASTE_CLONED_REPOSITORY_URL' with the URL you copied earlier. This command downloads your fork to your computer.

## 3. Add Upstream Repository

Before you can start contributing, you have to set up a reference to the original repository. You can do this with the following command:

```bash
git remote add upstream https://github.com/PaulBratslavsky/nextjs-build-in-public.git
```

This command adds a new remote, named 'upstream', that points to the original repository.

## 4. Synchronize your Fork

Before you start making changes, you should synchronize your forked repository with the latest changes from the upstream. Here are the steps:

a. Fetch the branches and their respective commits:

```bash
git fetch upstream
```

b. Checkout to the main branch of your fork:

```bash
git checkout main
```

c. Merge changes from the upstream's main branch into your local main branch:

```bash
git merge upstream/main
```

This brings your fork's main branch into sync with the upstream repository, without losing your local changes.

Make sure to run `yarn run seed` to import latest data to your project.

## 5. Create a Branch

When you're making a contribution, it's best to make your changes in a new branch instead of the main branch. You can create a new branch and switch to it using the following command:

```bash
git checkout -b BRANCH_NAME
```

Replace 'BRANCH_NAME' with a name that describes the change you're planning to make.

## 6. Make your Changes

Now, you can start making changes to the project. Feel free to make changes that you think will enhance the project.

If you have added new fields or modified the data within your Strapi app.  Make sure to run `yarn run export` to update the seed-data.tar.gz file before committing your changes.

## 7. Commit your Changes

When you've made your changes, you need to commit them. This is like creating a save point in a game. You can do this using the following commands:

```bash
git add -A
git commit -m "Your detailed commit message"
```

Replace "Your detailed commit message" with a description of the changes you made.

## 8. Push your Changes

After committing your changes, you need to push them to your forked repository on GitHub. You can do this with the following command:

```bash
git push origin BRANCH_NAME
```

Replace 'BRANCH_NAME' with the name of the branch you created earlier.

## 9. Create a Pull Request

After you've pushed your changes, you're ready to create a pull request (PR). Navigate to your forked repository in your web browser and click on 'Pull request' (near the top of the page), then on 'New pull request'. Ensure that the base fork is the original repository and the base is 'main', and that the head fork is your fork and the compare is the branch you created.

Enter a title for your PR and describe the changes you made. Once you're ready, click 'Create pull request'.

## Congrats! 🎉

You've just made a contribution to the project! We will review your changes and may suggest some modifications or improvements. Once your changes have been approved, they will be merged into the main codebase.

Thank you for your contribution. We appreciate you!

Remember, everyone was new to open-source at some point. If you're unsure about something, don't hesitate to ask for help. Good luck and happy hacking!

## Psst...

If you find yourself contributing frequently, we've provided a script in the package.json to help keep your local project synchronized with the main branch of the upstream (original) project. Simply execute the following command:

```bash
yarn repo:upstream
```

