# Adding QR Code Field to Sanity Events

## Step 1: Update Event Schema in Sanity Studio

1. Go to your Sanity Studio project (separate from this frontend repo)
2. Find the `event` schema file (usually in `schemas/event.js` or similar)
3. Add the `qrCodeImage` field to the fields array:

```javascript
{
  name: 'qrCodeImage',
  title: 'QR Code for Photo Upload',
  type: 'image',
  description: 'QR code that guests can scan to upload photos to Keepsly gallery',
  options: {
    hotspot: true
  }
}
```

## Step 2: Deploy Schema Changes

```bash
# In your Sanity Studio project
sanity deploy
```

## Step 3: Upload QR Code in Sanity

1. Open Sanity Studio in your browser
2. Navigate to the event you want to add a QR code to
3. Scroll to the "QR Code for Photo Upload" field
4. Click to upload the QR code image from Keepsly
5. Publish the changes

## How It Works on the Frontend

The QR code will automatically display on upcoming events (events where `eventDate >= now()`):

- **Displayed**: Before the event date (when `isUpcoming = true`)
- **Hidden**: After the event date (when photos are being displayed)

### Display Location

The QR code appears between the event description and the photo gallery:
- Yellow-tinted section with clear instructions
- Centered QR code with white background
- Only visible for upcoming events

### Design

- Background: Light yellow (`accent-yellow/20`)
- QR code: White background with shadow
- Max width: 320px (mobile-friendly)
- Automatically responsive

## Example Event Schema (Full)

```javascript
export default {
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text'
    },
    {
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [{ type: 'block' }]
    },
    {
      name: 'eventDate',
      title: 'Event Date',
      type: 'datetime',
      validation: Rule => Rule.required()
    },
    {
      name: 'endDate',
      title: 'End Date',
      type: 'datetime'
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string'
    },
    {
      name: 'image',
      title: 'Featured Image',
      type: 'image',
      options: { hotspot: true }
    },
    {
      name: 'keepslyEventId',
      title: 'Keepsly Event ID',
      type: 'string',
      description: 'Event ID from Keepsly for photo gallery integration'
    },
    {
      name: 'qrCodeImage',
      title: 'QR Code for Photo Upload',
      type: 'image',
      description: 'QR code that guests can scan to upload photos to Keepsly gallery',
      options: { hotspot: true }
    },
    {
      name: 'isFeatured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false
    }
  ]
}
```
