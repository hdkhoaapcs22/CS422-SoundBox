# CS422-SoundBox
## 🎵 Soundbox

Soundbox is a **music streaming platform** designed to provide an enjoyable and seamless listening experience for music lovers.  
It offers a **vast library of songs, albums, playlists**, all available for streaming on-demand.  

With a user-friendly interface, robust backend, and support for both listeners and artists, Soundbox aims to become an **all-in-one platform for music lovers, creators, and music industry professionals**.

---

## 🚀 Features

### 👤 Listener
- Stream music anytime, anywhere.  
- Create and manage personal playlists.  
- Search for music by **audio recognition** (powered by [ACRCloud API](https://www.acrcloud.com/)).  
- Stay updated with the latest music trends.  
- Follow favorite artists.  

### 🎤 Artist
- Upload and manage songs & albums.  
- Showcase music to a global audience.  
- Track and manage their music catalog.  

### 🛠️ Admin
- Validate new songs and albums before publishing.  
- Create and manage artist accounts.  

---

## 🏗️ Tech Stack
- **Frontend**: React.js, TailwindCSS  
- **Backend**: Node.js
- **Database**: MongoDB
- **APIs & Services**:  
  - [ACRCloud](https://www.acrcloud.com/) – music recognition.  

---

## 📦 Installation & Setup
```bash
# Clone the repository
git clone https://github.com/your-username/soundbox.git
cd soundbox

# Install dependencies
npm install

# Run the backend server (must start first)
npm run server

# Run the frontend (listener, artist, admin)
npm run dev
