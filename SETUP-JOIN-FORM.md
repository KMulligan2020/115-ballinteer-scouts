# Join application form (Formspree)

The **Join** page (`pages/join.html`) sends applications through **Formspree** so parent contact details are not hard-coded in the page.

## Setup

1. Go to [https://formspree.io](https://formspree.io) and sign in (or create an account).
2. Create a **new form** (separate from the den hire form).
3. Set the notification email to whoever should receive join enquiries (e.g. the same group inbox you use for general contact).
4. Copy the form endpoint, e.g. `https://formspree.io/f/xyzabc12`.
5. Open `pages/join.html` and find:
   ```html
   action="https://formspree.io/f/YOUR_JOIN_FORMSPREE_ID"
   ```
6. Replace `YOUR_JOIN_FORMSPREE_ID` with your real form path segment, e.g. `xyzabc12`, so the full URL is `https://formspree.io/f/xyzabc12`.

## Fields submitted

| Form field | Meaning |
|------------|---------|
| `applicant_name` | Young person’s name |
| `applicant_date_of_birth` | Date of birth |
| `applicant_age` | Age (also auto-filled from DOB in the browser) |
| `applicant_class` | Class / year (optional) |
| `parent_name` | Parent or guardian name |
| `parent_email` | Parent email |
| `parent_phone` | Parent phone |

Hidden helpers: `_subject` (email subject line), `_gotcha` (honeypot for spam).

## Testing

Submit once with test data and confirm the recipient gets the email with all fields. Turn on Formspree spam protection if needed.
