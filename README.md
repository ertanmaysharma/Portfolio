# Portfolio Website with Supabase Backend

A modern, dynamic portfolio website with a full-featured admin panel powered by Supabase.

## Features

- **Dynamic Content Management**: All content is stored in Supabase and can be updated via the admin panel
- **Admin Panel**: Full CRUD operations for:
  - Keywords (AI engineer, etc.)
  - Services
  - Skills
  - Education
  - Achievements (Internships & Certificates with image uploads)
- **Responsive Design**: Works on all devices
- **Secure Authentication**: Admin access protected by Supabase Auth

## Setup Instructions

### 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project
3. Wait for the project to be set up

### 2. Set Up the Database

1. In your Supabase dashboard, go to the **SQL Editor**
2. Copy the entire contents of `supabase-schema.sql`
3. Paste it into the SQL Editor and click **Run**
4. This will create all necessary tables and insert sample data

### 3. Create Storage Bucket

1. Go to **Storage** in your Supabase dashboard
2. The SQL script should have created an "achievements" bucket
3. If not, create a new public bucket named "achievements"

### 4. Set Up Admin Authentication

1. Go to **Authentication** > **Users** in Supabase
2. Click **Add User** > **Create new user**
3. Enter your email and password
4. This will be your admin login credentials

### 5. Configure the Website

1. Open `config.js` in your project
2. Replace the placeholder values with your Supabase credentials:
   ```javascript
   const SUPABASE_URL = 'your-project-url'; // Found in Project Settings > API
   const SUPABASE_ANON_KEY = 'your-anon-key'; // Found in Project Settings > API
   ```

### 6. Add Supabase JavaScript Library

Add this script tag to your HTML files (before config.js):
```html
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
```

This is already included in `admin.html` but needs to be added to `index.html`.

### 7. Run the Website

1. Open `index.html` in a web browser or use a local server
2. For development, you can use:
   - VS Code Live Server extension
   - Python: `python -m http.server 8000`
   - Node.js: `npx serve`

### 8. Access Admin Panel

1. Navigate to `admin.html`
2. Login with the email and password you created in Supabase
3. Start managing your portfolio content!

## Project Structure

```
portfolio/
├── index.html              # Main portfolio page
├── admin.html              # Admin panel
├── styles.css              # Portfolio styles
├── admin-styles.css        # Admin panel styles
├── app.js                  # Portfolio functionality
├── admin.js                # Admin panel functionality
├── config.js               # Supabase configuration
├── supabase-schema.sql     # Database schema
└── README.md               # This file
```

## Admin Panel Features

### Keywords Management
- Add/Edit/Delete keywords that appear in the hero section
- Control the order of keywords

### Services Management
- Add/Edit/Delete services you offer
- Include title, description, icon (emoji), and order

### Skills Management
- Add/Edit/Delete your skills
- Include name, icon (emoji), and order

### Education Management
- Add/Edit/Delete education entries
- Include degree, institution, start/end year, and status

### Achievements Management
- Two types: Internships and Certificates
- Upload images for each achievement
- Add title and description
- Images are stored in Supabase Storage

## Customization

### Adding Your Profile Image
Replace the `profile.jpg` reference in `index.html` with your actual profile image.

### Changing Colors
The main accent color is `#ff4444` (red). You can change this throughout the CSS files to match your brand.

### Adding Social Links
Update the social media links in `index.html` with your actual profiles.

## Security Notes

- Never commit your `config.js` with real credentials to public repositories
- The admin panel is protected by Supabase authentication
- Row Level Security (RLS) is enabled on all tables
- Only authenticated users can modify data
- Public users can only read data

## Troubleshooting

### Images not uploading
- Check that the "achievements" storage bucket exists and is public
- Verify storage policies are set correctly

### Can't login to admin panel
- Verify you created a user in Supabase Authentication
- Check that your credentials in `config.js` are correct

### Data not loading
- Open browser console (F12) to check for errors
- Verify your Supabase URL and key are correct
- Check that the database tables were created successfully

## Support

For issues with:
- **Supabase**: Check [Supabase Documentation](https://supabase.com/docs)
- **This project**: Review the code comments and console logs

## License

This project is open source and available for personal and commercial use.
