# Den hire form & calendar setup

The website enquiry form does **not** show the bookings email in the HTML. You configure the recipient on a free form service instead.

## 1. Form submissions → your inbox (hidden from the page)

We use **Formspree** (free tier works for moderate volume).

1. Go to [https://formspree.io](https://formspree.io) and sign up.
2. Create a **new form**.
3. In Formspree, set the **notification / recipient email** to whoever should receive den hire enquiries (this address is only stored in Formspree — not in the public HTML).
4. Copy your form endpoint, e.g. `https://formspree.io/f/abcxyz12`.
5. Open `pages/den.html`, find the den form (`<form class="den-form"` …).
6. Replace `YOUR_FORMSPREE_ID` in the `action` URL:
   - Change  
     `action="https://formspree.io/f/YOUR_FORMSPREE_ID"`  
   - To your real URL, e.g.  
     `action="https://formspree.io/f/abcxyz12"`

7. (Optional) In Formspree, turn on **reCAPTCHA** or similar to reduce spam.

After this, “Send enquiry” posts to Formspree, which emails your chosen recipient. That address never appears in the public page source.

---

## 2. Calendar — show when the den is booked

1. In **Google Calendar**, create a calendar (e.g. “115th Den bookings”) or use an existing one.
2. In **Settings** for that calendar → **Access permissions** → enable **Make available to public** (or share the embed only — follow Google’s current options).
3. **Integrate calendar** → copy the **embed code** (iframe).
4. In `pages/den.html`, inside `.den-calendar-shell`, **replace** the `.den-calendar-placeholder` block with your iframe.

Example (your `src` will be longer):

```html
<iframe
  class="den-calendar-iframe"
  title="Den bookings"
  src="https://calendar.google.com/calendar/embed?src=YOUR_CALENDAR_ID"
  loading="lazy"
></iframe>
```

The CSS class `den-calendar-iframe` is already styled in `styles.css`.

---

## 3. Testing

- Submit the form once after connecting Formspree and confirm the recipient gets the email.
- Check the calendar loads for someone who is not logged into your Google account (incognito window).
