# Deployment Guide

Once your portfolio is working locally, you can deploy it to make it accessible online.

## Recommended Hosting Options

### 1. Netlify (Easiest - Recommended)

**Steps:**
1. Go to [netlify.com](https://netlify.com)
2. Sign up with GitHub/GitLab/Email
3. Click "Add new site" > "Deploy manually"
4. Drag and drop your entire portfolio folder
5. Your site will be live in seconds!

**Custom Domain:**
- Go to Site Settings > Domain Management
- Add your custom domain

**Pros:**
- Free hosting
- Automatic HTTPS
- Easy updates (just drag & drop again)
- Custom domains supported

### 2. Vercel

**Steps:**
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub/GitLab/Email
3. Click "Add New" > "Project"
4. Import your project or drag & drop
5. Deploy!

**Pros:**
- Free hosting
- Fast global CDN
- Automatic HTTPS
- Great performance

### 3. GitHub Pages

**Steps:**
1. Create a GitHub account
2. Create a new repository named `username.github.io`
3. Upload all your files
4. Go to Settings > Pages
5. Select main branch as source
6. Your site will be at `https://username.github.io`

**Pros:**
- Free hosting
- Direct GitHub integration
- Good for portfolios

### 4. Firebase Hosting

**Steps:**
1. Go to [firebase.google.com](https://firebase.google.com)
2. Create a new project
3. Install Firebase CLI: `npm install -g firebase-tools`
4. Run `firebase init hosting`
5. Run `firebase deploy`

**Pros:**
- Free tier available
- Google infrastructure
- Fast global CDN

## Pre-Deployment Checklist

Before deploying, make sure:

- [ ] Your `config.js` has the correct Supabase credentials
- [ ] You've tested the website locally
- [ ] You've tested the admin panel login
- [ ] All images are loading correctly
- [ ] Social media links are updated
- [ ] Contact information is correct
- [ ] You've added your actual profile photo
- [ ] The website works on mobile devices

## Important Security Notes

### DO NOT commit config.js to public repositories!

If using Git:
1. Make sure `.gitignore` includes `config.js`
2. Use `config.example.js` as a template in your repo
3. Add actual credentials only on the hosting platform

### For Netlify/Vercel:
You can use environment variables instead:

1. In your hosting dashboard, add environment variables:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`

2. Update your code to use them:
```javascript
const SUPABASE_URL = process.env.SUPABASE_URL || 'YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY';
```

## Custom Domain Setup

### Netlify:
1. Go to Site Settings > Domain Management
2. Click "Add custom domain"
3. Follow the DNS configuration instructions
4. Wait for DNS propagation (can take up to 48 hours)

### Vercel:
1. Go to Project Settings > Domains
2. Add your domain
3. Configure DNS records as shown
4. Wait for verification

## SSL/HTTPS

All recommended hosting providers automatically provide free SSL certificates via Let's Encrypt. Your site will be served over HTTPS by default.

## Updating Your Deployed Site

### Netlify (Manual Deploy):
- Just drag and drop your updated files again

### Netlify/Vercel (Git Deploy):
- Push changes to your Git repository
- Site automatically rebuilds and deploys

### GitHub Pages:
- Push changes to your repository
- Site updates automatically

## Performance Optimization

Before deploying, consider:

1. **Optimize Images:**
   - Compress images using tools like TinyPNG
   - Use appropriate image formats (WebP for modern browsers)
   - Resize images to actual display size

2. **Minify Code:**
   - Minify CSS and JavaScript files
   - Remove comments and whitespace

3. **Enable Caching:**
   - Most hosting providers handle this automatically

## Monitoring

After deployment:

1. **Test Everything:**
   - Visit your site on different devices
   - Test all links and forms
   - Verify admin panel works
   - Check image loading

2. **Set Up Analytics:**
   - Google Analytics
   - Netlify Analytics
   - Vercel Analytics

3. **Monitor Performance:**
   - Use Google PageSpeed Insights
   - Check mobile responsiveness
   - Test loading speed

## Troubleshooting Deployment Issues

### Site not loading:
- Check DNS settings
- Verify build completed successfully
- Check browser console for errors

### Admin panel not working:
- Verify Supabase credentials are correct
- Check CORS settings in Supabase
- Ensure authentication is enabled

### Images not loading:
- Check image paths are correct
- Verify Supabase storage bucket is public
- Check storage policies

## Cost Considerations

All recommended options have generous free tiers:

- **Netlify Free:** 100GB bandwidth/month
- **Vercel Free:** 100GB bandwidth/month
- **GitHub Pages:** Unlimited for public repos
- **Firebase Free:** 10GB storage, 360MB/day transfer

For a portfolio site, free tiers are usually sufficient!

## Need Help?

- Netlify: [docs.netlify.com](https://docs.netlify.com)
- Vercel: [vercel.com/docs](https://vercel.com/docs)
- GitHub Pages: [pages.github.com](https://pages.github.com)
- Firebase: [firebase.google.com/docs/hosting](https://firebase.google.com/docs/hosting)

## Next Steps After Deployment

1. Share your portfolio link on social media
2. Add it to your resume
3. Submit to portfolio directories
4. Keep content updated via admin panel
5. Monitor analytics to see visitor behavior

🚀 Happy deploying!
