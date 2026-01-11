# 🚀 Quick Start Guide - Link Vault

## Run the Application in 2 Simple Steps

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start Both Servers

**Open Terminal 1 - Start JSON Server (Backend)**
```bash
npm run server
```
✅ Wait for: "Watching db.json..."

**Open Terminal 2 - Start React App (Frontend)**
```bash
npm run dev
```
✅ Wait for: "Local: http://localhost:5173/"

### Step 3: Open Browser
Navigate to: **http://localhost:5173**

---

## ⚡ Important Notes

- **MUST run BOTH terminals** - The app won't work without both servers running
- JSON Server (Backend) = Port 3001
- React App (Frontend) = Port 5173
- Keep both terminal windows open while using the app

---

## 🧪 Quick Test

1. Click "Add Link" (or hamburger menu on mobile)
2. Fill in the form and submit
3. See the notification: "Link added successfully!"
4. Try filtering, sorting, and searching
5. Edit a link - see "Link updated successfully!"

---

## 📱 Mobile Testing

1. Open browser DevTools (F12)
2. Click device toolbar (Ctrl+Shift+M)
3. Select a mobile device
4. See the hamburger menu in action!

---

## ❓ Troubleshooting

**Problem**: "Failed to fetch links"
- **Solution**: Make sure JSON Server is running (`npm run server`)

**Problem**: Port already in use
- **Solution**: Kill the process on that port or change ports in the code

**Problem**: No data showing
- **Solution**: Check `db.json` file exists in root directory

---

## 🎯 Features to Try

- ✅ Add, Edit, Delete links
- ✅ Sort by Date, Title, Category
- ✅ Filter by Category and Tags
- ✅ Search across all fields
- ✅ Toggle favorites
- ✅ Switch between Grid/List view
- ✅ Test mobile responsiveness

---

Enjoy using Link Vault! 🎉
