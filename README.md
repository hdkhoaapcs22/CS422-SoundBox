# CS422-SoundBox

### Run the project

To run the backend server, use: **`npm run server`**. Run backendfirst.

To run the frontend, artist, and admin, use **`npm run dev`**.

### Components

The project has two big problems, but it's optional to fix.
- It's not reponsive app, but we can fix by using Reponsive design in **TailwindCss** like **sm:flex**, **md:text-center** for example(take much time b/c have to re-design the layout to respond to its size)
- Reloading will make the side bar wrong because the **role** and **userId** are reseted and lost data. In my opinion, this flaw can be solved by storing these variables in the local storage of the website but you can address by your method.

**`SideBar`**: the side bar of three roles. It has a logic to gender the side bar for each role. **It has an error**

**`Navbar`**: the top bar in home page

**`Footer`**: the footer in home page

**`ShortUserInfo`**: the user information that is in the top right when logined in

**`AppTitle`**: It has the SoundBox logo and the app title.

**`Input`**: input field





