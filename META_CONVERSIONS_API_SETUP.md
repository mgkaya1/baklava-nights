# Meta Conversions API Setup Guide

This guide will help you fix the "Improve your rate of Meta Pixel events covered by Conversions API" error in your Meta Business Suite.

## Problem
Your Meta Pixel is sending events from the browser, but the Conversions API (server-side) is not sending enough events, causing a coverage gap of 114 fewer events in the last 7 days.

## Solution
We've implemented server-side event tracking with proper deduplication to ensure events are sent from both browser (Meta Pixel) and server (Conversions API) with matching event IDs.

## What Was Implemented

### 1. Netlify Function (`netlify/functions/meta-conversion-api.js`)
- Server-side endpoint that sends events to Meta's Conversions API
- Includes proper error handling and CORS support
- Uses environment variables for security

### 2. Enhanced Meta Pixel Tracking (`index.html`)
- `MetaTracker` object that handles both Pixel and Conversions API tracking
- Generates unique event IDs for deduplication
- Collects user data (fbp, fbc cookies, user agent, etc.)
- Sends events to both sources with identical parameters

### 3. Event Deduplication
- Same `event_name` across both sources
- Identical `event_id` for matching events
- Proper user data parameters for Conversions API

## Setup Instructions

### Step 1: Get Your Conversions API Access Token

1. Go to [Meta Business Manager](https://business.facebook.com/)
2. Navigate to **Events Manager** → **Data Sources**
3. Select your Pixel (ID: 1099694521779646)
4. Go to **Settings** → **Conversions API**
5. Click **Generate Access Token**
6. Copy the generated token (keep it secure!)

### Step 2: Set Up Environment Variable in Netlify

1. Go to your [Netlify Dashboard](https://app.netlify.com/)
2. Select your site
3. Go to **Site Settings** → **Environment Variables**
4. Click **Add Variable**
5. Set:
   - **Key**: `META_CONVERSIONS_API_ACCESS_TOKEN`
   - **Value**: Paste your access token from Step 1
   - **Scopes**: Select both "Builds" and "Functions"
6. Click **Save**

### Step 3: Deploy the Changes

1. Commit and push these changes to your repository
2. Netlify will automatically deploy the changes
3. The Netlify function will be available at: `/.netlify/functions/meta-conversion-api`

### Step 4: Test the Implementation

1. **Test the basic function first:**
   - Visit: `https://your-site.netlify.app/.netlify/functions/test`
   - Should return: `{"message":"Test function working!","timestamp":"...","nodeVersion":"..."}`

2. **Test the Conversions API setup:**
   - Visit your website
   - Open browser developer tools (F12) → Console tab
   - Look for debug messages like:
     - `Debug response: {received: {...}, accessTokenExists: true/false, accessTokenLength: 123}`
     - If `accessTokenExists: false` → Environment variable not set (go back to Step 2)
     - If `accessTokenExists: true` → Should see success messages for Conversions API calls

3. **Check function logs:**
   - In Netlify Dashboard → Functions → View logs for `meta-conversion-api`
   - Look for detailed error information from Meta API

4. **Verify in Meta Events Manager:**
   - Go to Events Manager → Test Events
   - Send test events and verify they're received from both Pixel and Conversions API
   - Check that events have matching event_ids for deduplication

### Step 5: Monitor Coverage

1. Wait 24-48 hours for data to populate
2. Go to Meta Business Suite → Datasets
3. Check the "Meta Pixel events covered by Conversions API" metric
4. You should see improved coverage (target: 75%+)

## Events Being Tracked

The following events are now sent from both sources with deduplication:

- **PageView**: When users visit your page
- **ViewContent**: When users view your event content
- **AddToCart**: When users click the ticket purchase button
- **Lead**: When users click social media links

## Troubleshooting

### 502 Bad Gateway Error
If you see "Failed to load resource: the server responded with a status of 502" or "Unexpected token '<', "<!DOCTYPE "... is not valid JSON":

1. **Check if environment variable is set:**
   - Go to Netlify Dashboard → Site Settings → Environment Variables
   - Verify `META_CONVERSIONS_API_ACCESS_TOKEN` is set with correct value
   - Make sure it's set for both "Builds" and "Functions" scopes

2. **Test basic function:**
   - Visit: `https://your-site.netlify.app/.netlify/functions/test`
   - Should return JSON, not HTML error page

3. **Check function logs:**
   - In Netlify Dashboard → Functions → View Function Logs
   - Look for errors like "environment variable not set"

4. **Redeploy if needed:**
   - Sometimes environment variables require a redeploy
   - Go to Deploys → Trigger deploy → Deploy site

### Function Not Working
- Check Netlify function logs in your dashboard
- Verify the environment variable is set correctly
- Ensure the access token is valid and not expired

### Events Not Deduplicating
- Check that `event_id` is identical between Pixel and API calls
- Verify `event_name` matches exactly
- Ensure user data parameters are properly formatted

### Low Coverage Still
- Check if there are JavaScript errors preventing API calls
- Verify the function endpoint is accessible
- Monitor network requests in browser dev tools

## Security Notes

- The access token is stored as an environment variable (not in code)
- All API calls include proper error handling
- CORS is configured for your domain only
- User data collection follows Meta's privacy guidelines

## Support

If you encounter issues:
1. Check Meta Events Manager → Test Events for error messages
2. Review Netlify function logs for server-side errors
3. Verify environment variable configuration
4. Test with Meta's Conversions API test tool

## Expected Results

After implementation:
- Coverage rate should improve from current levels to 75%+
- Events will be properly deduplicated (not double-counted)
- More accurate conversion tracking and ROAS calculations
- Better ad performance optimization

The 15.7% lower cost per result mentioned in your diagnostics should be achievable with proper coverage.
