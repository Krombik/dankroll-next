# Next.js Example App

> ### Next.js codebase containing examples (CRUD, auth, advanced patterns, etc) that adheres to the [RealWorld](https://github.com/gothinkster/realworld-example-apps) spec and API.

## Getting started

To get the frontend running locally:

- Clone this repo
- `npm install` to install all dependencies
- `npm run dev` to start the local server

### Making requests to the backend API

You can view [the API spec here](https://github.com/GoThinkster/productionready/blob/master/api) which contains all routes & responses for the server.

The source code for the backend server (available for Node, Rails and Django) can be found in the [main RealWorld repo](https://github.com/gothinkster/realworld).

## Functionality overview

The example application is a social blogging site. It uses a custom API for all requests, including authentication.

**General functionality:**

- Authenticate users via JWT (login/register modal + logout button on header)
- CRU\* users (sign up & settings modals - no deleting required)
- CRUD Articles
- CR\*D Comments on articles (no updating required)
- GET and display paginated lists of articles
- Favorite articles
- Follow other users

**The general page breakdown looks like this:**

- Every page has same layout:
  - Header component:
    - site logo (link to home page)
    - sing in/up (open sing in/up modal) buttons for unauthorized user
    - new post (open editor modal), user profile (link to profile of current user), logout buttons for authorized user
    - site settings button
      - switch between dark/light theme (value stores at localstorage)
      - select for count of articles per page (value stores at cookies)
  - Page component
  - Modal component
  - ErrorAlert component
- Home page (URL: /)
  - Tabs with list of articles
    - Feed of current user (available only for authorized user)
    - Global (last articles)
    - Tabs opened by user, can be closed and dragged (stored in localstorage)
    - Add new tab button
      - By tag (starts from #)
      - By user
  - List of articles preview by current tab, every item contains:
    - Author avatar (link to author profile)
    - Author username (link to author profile)
    - Date of article creation or edit
    - Like button (disabled for unauthorized user)
    - Like count
    - Title
    - Description
    - Read more button (opens article modal and change url to article page)
    - Tag list (every item is a link to itself tag tab)
  - Pagination and load more button for list of articles (if page count > 1)
- User (profile) page (URL: /user/{username})
  - user avatar
  - username
  - user settings button if it is current user
  - subscribe button if it is not current user (disabled for unauthorized user)
  - user bio
  - Tabs with list of articles:
    - Last articles of user
    - User's favorite articles
  - List of articles preview by current tab (same as at home page)
- Article page/modal (URL: /articles/{slug})
  - Article title
  - Like button (disabled for unauthorized user)
  - Like count
  - Delete/Edit article buttons (only shown to article's author)
  - Article text (with markdown render)
  - Comment section
    - Comments count
    - New comment section (only shown to authorized user)
      - textarea
      - submit button
    - Comments list
      - Comment text
      - Comment author avatar
      - Comment author username
      - Comment post date
      - Delete comment (only shown to comment's author)
- Sign in/up modals
  - Use JWT (store the token in cookies)
- Settings modal
  - Edit user info (change email, username, bio, image, password)
- Editor modal to create/edit articles
  - Saving data at localstorage every 1000 ms while field in focus and after blur
  - Every item in tag list is editable, removable and draggle (drag make no sense because api)
