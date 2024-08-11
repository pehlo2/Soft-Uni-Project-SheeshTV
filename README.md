# ProjectSoftuni-SheeshTv 2024 

 ### A small website focused Video Streaming/ Sharing. <br />

## This project uses:

**Front end**: React + Vite the interactive user interface.https://sheeshtv.vercel.app/<br />
**Back end**: Node. Js server using Express. Js, Mongoose. https://github.com/pehlo2/react-project-server-SheeshTV Deployed in Heruko.<br />

## External Libraries:

 **aos**: Scroll Animation for Landing page. \
 **dotenv**:t o securely manage environment variables in My project. \
 **react-player**: Video Player. \
 **socket.io-client**: Implement real-time Notifications on Like, Follow, Comments. \
 **yup**: Form Validations.

## The application is split into two parts: Public and Private

### Public part

**Not logged in users can**:<br />
 Access the Login/Register and public parts home page, videos page , Profile page , Video link page <br />

**Not logged in users cant**:<br />
  Cant Access Login/Register , Landing Page , Discover creators page. <br />
 Cant Edit/Delete/Upload Videos. <br />
 Cant Like/Comment on Videos. <br />
 Cant Follow Users on Videos. <br />

### Private part

**Logged in users can**: <br />
**Videos**:<br />
Can Upload(list) Videos. <br />
Can Edit / Delete their Videos. <br />
**Comments**:<br />
Can write Write /Edit / Delete comments Videos. <br />
Video owners can Delete Video any Video comments. <br />
**Likes**:<br />
Can Like Videos.<br />
Can Disslike Videos .<br>
**Follow**:<br />
Can Follow Users from Video page Profile Page or Discover page.<br />

## Components:<br />

**ErrorBoundary**:  component likely designed to catch JavaScript errors anywhere in the child component tree, log those errors, and display a fallback UI.<br />
**Comments tab**:  component likely used for displaying and managing comments in a tabbed interface.<br />
**Confirm dialog modal**:  component for rendering a modal dialog box that asks the user to confirm an action.<br />
**DarkMode:**  component for toggling between dark and light modes in the application.<br />
**Discover creators**: component for discovering or exploring content creators, likely featuring a list or grid of creators.<br />
**Edit profile**:  component for rendering a form or interface to edit a user's profile.<br />
**Error message**:  component likely used to display error messages to the user.<br />
**Follow button**:  component for rendering a button that allows users to follow other users or creators.<br />
**Unfollow button**:  component for rendering a button that allows users to unfollow other users or creators.<br />
**Notification** card:  component for rendering individual notifications in a card format.<br />
**Notifications**:  component for managing and displaying a list of notifications.<br />
**Page404**:  component likely representing a "Page Not Found" error page.<br />
**Search** component for implementing a search bar or search functionality.<br />
**Update profile**: component for updating user profile details.<br />
**Upload:**  component for uploading videos to the platform.<br />
**Video card**:  component representing individual video content in a card format, likely displaying thumbnails, titles, etc.<br />
**Video details** link:  component for rendering a link to detailed video information.<br />
**Video modal**:  component for displaying videos in a modal window.<br />
**Videos dashboard**:  component for managing and displaying a dashboard view of videos, possibly for admins or creators.<br />

## Guards:

**Auth Guard**: Protects routes related to the Discover creators, landing page, commments, like. <br />
**AlreadyAuthenticatedGuard Guard**: Prevents the user to go to login and register page when already logged in. <br />
**Owner Guard** : Prevents  The user from going to edit and delete page if he is not Owner of Video. <br />
