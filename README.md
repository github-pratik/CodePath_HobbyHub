# Web Development Final Project - HobbyHub 

Submitted by: **Pratik Patil** 

This web app: **A platform for hobby enthusiasts to share and discuss their interests** 

Time spent: **40** hours spent in total 

## Video Walkthrough 

Here's a walkthrough of implemented user stories: 

<img src='https://github.com/github-pratik/CodePath_HobbyHub/blob/main/hobbyhub.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' /> 

## Required Features 

The following **required** functionality is completed: 

- [x] **Web app includes a create form that allows the user to create posts** 
  - Form requires users to add a post title 
  - Forms should have the *option* for users to add: 
    - additional textual content 
    - an image added as an external image URL 
- [x] **Web app includes a home feed displaying previously created posts** 
  - Web app must include home feed displaying previously created posts 
  - By default, each post on the posts feed should show only the post's: 
    - creation time 
    - title 
    - upvotes count 
  - Clicking on a post should direct the user to a new page for the selected post 
- [x] **Users can view posts in different ways** 
  - Users can sort posts by either: 
    - creation time 
    - upvotes count 
  - Users can search for posts by title 
- [x] **Users can interact with each post in different ways** 
  - The app includes a separate post page for each created post when clicked, where any additional information is shown, including: 
    - content 
    - image 
    - comments 
  - Users can leave comments underneath a post on the post page 
  - Each post includes an upvote button on the post page. 
    - Each click increases the post's upvotes count by one 
    - Users can upvote any post any number of times 
- [x] **A post that a user previously created can be edited or deleted from its post pages** 
  - After a user creates a new post, they can go back and edit the post 
  - A previously created post can be deleted from its post page 

The following **optional** features are implemented: 

- [ ] Web app implements pseudo-authentication 
- [ ] Users can repost a previous post by referencing its post ID 
- [ ] Users can customize the interface 
- [ ] Users can add more characteristics to their posts 
- [ ] Web app displays a loading animation whenever data is being fetched 

The following **additional** features are implemented: 

* [x] Real-time updates using Supabase 
* [x] Responsive design for mobile devices 



## Notes 

### Development Challenges & Solutions

#### 1. Supabase Connection & SSL Issues
- **Challenge:** Internet provider was blocking/intercepting SSL connections to Supabase, causing connection failures that initially appeared to be application issues.
- **Solution:** Verified SSL certificates, tested with different networks, and implemented proper error handling to distinguish network vs application issues.
- **Time Spent:** 1 full day (debugging and identifying root cause)

#### 2. Supabase Row Level Security (RLS) & 406 Errors
- **Challenge:** Received `406 Not Acceptable` errors when fetching user profiles and posts due to missing/restrictive RLS policies.
- **Solution:** Added appropriate `SELECT` policies in Supabase to allow users to read their own profiles and posts.
- **Time Spent:** 2 hours

#### 3. Authentication Flow Bugs
- **Challenge:** Profile page blank or not loading due to missing profile row, login/signup buttons sometimes didn't work.
- **Solution:** Updated signup logic to upsert profile row on registration and improved error handling.
- **Time Spent:** 1.5 hours

#### 4. Data Fetching & Error Handling
- **Challenge:** Blank screens or silent failures when fetching data (especially if user wasn't logged in).
- **Solution:** Added robust error handling in all components to show errors in UI.
- **Time Spent:** 2 hours

#### 5. Post CRUD Permissions
- **Challenge:** Users could edit/delete others' posts or create posts without being logged in.
- **Solution:** Added authentication and ownership checks before allowing edits/deletes.
- **Time Spent:** 1 hour

#### 6. Environment & Network Issues
- **Challenge:** Incorrect Supabase credentials in `.env` or network misconfigurations.
- **Solution:** Verified `.env` values and added logging of Supabase URL/key.
- **Time Spent:** 0.5 hour

#### 7. UI/UX Consistency
- **Challenge:** Missing loading indicators and inconsistent error messages.
- **Solution:** Added loading states and consistent error displays.
- **Time Spent:** 1 hour

### Total Time Spent on Challenges
**~9.5 hours** (including debugging, reading docs, and testing)

The Supabase integration required careful handling of asynchronous operations and network issues.

## License 

    Copyright 2025 Pratik Patil

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
