SHERLY'S BIRTHDAY WORLD ♡
===========================

A cute personalized birthday web app made especially for Sherly.
Features all 8 screens from the design:
1. Welcome / Home Screen (Pastel theme, cute bow, quick action buttons)
2. Live Birthday Countdown (Animated cake, sparkles, live timer)
3. Our Memories (3 Tabs: Photos Polaroid scrapbook, Moments, Sticky Notes)
4. Mystery Gift Boxes (6 unlockable boxes with chime SFX & confetti)
5. Music Player (Interactive playback controls, progress bar, Spotify link)
6. Birthday Letter (Authentic lined stationery paper with handwritten note)
7. The Final Surprise (Cosmic midnight theme with glowing gift & grand celebration)
8. Side Drawer Menu (Sherly profile avatar, full screen switcher, customizer)


HOW TO TEST ON YOUR PHONE RIGHT NOW (Same Wi-Fi)
------------------------------------------------
1. Ensure your phone is connected to the same Wi-Fi as your computer.
2. Open Safari (iPhone) or Chrome (Android) on your phone.
3. Type this address in your browser:
   http://192.168.1.10:8080

4. TO MAKE IT LOOK LIKE A REAL APP (No browser address bar):
   - On iPhone (Safari):
     Tap the "Share" button (square with arrow pointing up) -> scroll down -> tap "Add to Home Screen".
   - On Android (Chrome):
     Tap the 3 dots menu -> tap "Add to Home screen" or "Install App".
   Now it will have a cute pink ribbon bow icon on your phone home screen!


HOW TO PUBLISH FREE ON CLOUDFLARE PAGES (For Sherly to open anywhere)
---------------------------------------------------------------------
1. Go to https://dash.cloudflare.com/ (sign up or log in for free).
2. On the left sidebar, click "Compute (Workers) & Pages".
3. Click "Create application" -> select the "Pages" tab.
4. Choose "Direct Upload" (or Drag and Drop).
5. Name your project: e.g. "sherlys-birthday-world"
6. Drag and drop the "D:\terly" folder (or zip it and upload).
7. Click "Deploy Site".
8. In seconds, you will receive a free public HTTPS link:
   https://sherlys-birthday-world.pages.dev


HOW TO PROTECT IT WITH EMAIL VERIFICATION (Cloudflare Access OTP)
----------------------------------------------------------------
To ensure ONLY Sherly and you can open the app:
1. In Cloudflare Dashboard, click "Zero Trust" in the left sidebar.
2. Go to "Access" -> "Applications" -> Click "Add an application".
3. Select "Self-hosted".
4. Enter Application Name: "Sherly Birthday App"
5. Set Application Domain: Select your Pages domain (e.g. sherlys-birthday-world.pages.dev).
6. Under Identity Providers, ensure "One-time PIN" is checked.
7. Click "Next" to create an Access Policy:
   - Policy Name: "Sherly Only"
   - Action: "Allow"
   - Under "Include" rules:
     - Selector: "Emails"
     - Value: Enter Sherly's email (e.g., sherly@example.com) and your email.
8. Click "Next" and save!

Now, when anyone opens the website, Cloudflare asks for their email. Only approved emails receive the 6-digit login PIN!


HOW TO PERSONALIZE
------------------
- In `script.js`, edit `sherlyConfig` at the top:
  - `birthdayDate`: Sherly's birthday date (YYYY-MM-DD).
  - `gifts`: Customize the messages inside each of the 6 gift boxes.
  - `memories`: Add your favorite photos, moments, and sticky notes.
  - `finalSurprise`: Customize what appears in the grand celebration!
- Or simply open the app, tap the Menu (☰) -> "Settings / Edit App" and adjust live in your browser!
