# Binley Fencing: website redesign mockup

## Read this before calling

**Binley already has a working website: https://binley.com.au.** The leads sheet lists binley.net.au, which is only a server placeholder and may not be theirs. The `.com.au` site is live, has the same mobile, works on phones, and has a quote page with a form. "You have no website" is **wrong**. If you call, it's a redesign pitch.

- Mobile: 0425 168 555 (Andrew, the director, handles all sales enquiries)
- Email: info@binley.com.au
- Yard: 12 Salpietro Street, Bibra Lake WA 6163
- Hours: none on their site, so none are shown

Plain HTML, CSS and JavaScript, no build step. Open `index.html` to view it.

## Pages

- `index.html`: home, with a panel estimator that draws the fence to scale
- `range.html`: all three products and the accessories, with every spec, on one page
- `team.html`: Andrew, Sam and Peter
- `contact.html`: quote form and contact details

## Honest pitch points (checked 24 and 25 Nov 2026, on a phone and a computer)

1. **The web address on their fence signs doesn't exist.** The sign in their home page photo, and the one in the photo on their Temporary Fencing page, both say www.binleyfencing.com.au. That address goes nowhere: three separate DNS services say the domain doesn't exist. Their real site is binley.com.au. This is the best opener, and they can check it in ten seconds.
2. **On a phone, you can't see the number until you open the menu.** The only number on their home page is the one on the fence sign in the photo. Most other pages print it, but as plain text. The only call link is inside the menu. The mockup shows the number on every page, with a call bar that stays on screen.
3. **The logo is a 66-pixel image**, so it's soft on a phone, where it sits in a white box on a grey header. The mockup uses a sharp copy, in the reversed colours from their own signs for dark mode.
4. **The footer still credits the template:** "Construction Company | Developed By Rara Theme. Powered by WordPress."
5. **New things:** a panel estimator for fence panels, pool panels and crowd barriers that fills in the quote form, every spec on one page instead of four, and dark mode.

### Don't say

- They have no website, it's down, or it doesn't work on phones. All false.
- The number can't be tapped. It can, in the menu, and iPhones often turn printed numbers into links anyway.
- "Some pages say 2024 and others 2026." **An earlier README said this and it's wrong.** Every page in their menu says © 2026 on both phone and computer. The 2024 copies were old cached pages.
- All their signs have the dead address. Only two photos show it. Older signs in their photos say binley.com.au.
- binley.net.au is theirs, or that it's broken.
- Their quote form doesn't work. Nobody has tested it, and it sends from the page, where the mockup's form only opens the visitor's email app.

## Confirm with the owner

- **Standards.** Their site says panels exceed AS 4687 and pool fencing meets AS 1926.1-2007 and WA law, and calls it climb-resistant. These are safety claims and 2007 isn't the latest edition, so the mockup leaves them all out.
- **Reviews.** Each is an unaltered sentence from the longer testimonials on their home page. Check they're happy with the cuts. A Swift Demolition testimonial is on their site but not linked, so it isn't used.
- **Estimator.** It divides length by the panel length on their site (2.4 m, 2 m or 2.2 m) and rounds up, for one straight run. Corners and gates can change the count.
- **Address.** Their Contact page and Facebook both say Salpietro Street. One iSeekplant listing says 10 Lawlor Rd, Attadale.
- **Hours.** None on their site. Facebook shows "Closed now", so some may be set there.
- **The sign domain.** Do they want www.binleyfencing.com.au pointed at the site?
- **Photos.** The pool and barrier photos are only 800 to 850 px wide, and some small ones 500 px. Ask for originals, and for the original logo file.
- That Sam and Peter still work there, and that the team still holds current OH&S cards.

## Sources

Facts are from binley.com.au, read 24 Nov 2026:

| On the mockup | From |
|---|---|
| Headline, WA owned, family run, areas served, industries, stock, OH&S cards, reviews | Home |
| Andrew, Sam and Peter | Our Team |
| Panel sizes, weights, finish, uses, what it works with | Temporary Fencing |
| Pool panel and gate sizes, next day delivery, installation | Pool Fencing |
| Barrier size, weight, uses | Crowd Control Fencing |
| Accessories | Fencing Accessories |
| Quote form choices | Get a Quote |
| Phone, email, yard, Facebook link | Contact Us, and the header |

Facebook (BinleyFencingWA, read 25 Nov 2026) shows the same phone, email, website and Salpietro Street address.

**Photos** are all from binley.com.au's own uploads (`/wp-content/uploads/2024/07/` and `/2024/08/`), file names lower-cased. `hero-*` and `share` are crops of IMG_3396-1, `temp_fencing_signage` and `signage` are crops of Temp_fencing_signage, and `img30` and `img33` are from the same folder. Every one is on a live page, shows a Binley sign, or is from the same photo shoot as their home page photo, except `accessories-big` (the same site as their tempfence-2). Their uploads also hold a banner for another hire company (1300TEMPFENCE), so don't add other photos from there without asking.

**Drawings.** The estimator fence and the panels at the top of `range.html` are drawn from the specs. The bracing drawing is a diagram, not to scale.

**Logo.** Traced from their 219 x 100 px logo (`/2024/07/logo.jpg`), colours sampled from it. **Colours and font:** navy and slate from the logo, orange (#f3880a) and PT Sans from their site.

A note from another session mentioned an unclaimed Birdeye page with a review disputing the business is genuine. It couldn't be found again on 24 Nov. Don't mention it.

No one was contacted, and no form was submitted on any live site.

## Before launch

- Pages are marked `noindex` so Google doesn't list the mockup. Remove that line from every page.
- The preview card (og: tags) assumes the site lives at `https://dante1243.github.io/binley-fencing/`.
- Connect the form to a form service. It only opens the visitor's email app now.

Removed in the 25 Nov redesign because nothing uses them (all still on binley.com.au): `contact.jpg`, `crowd1.jpg`, `hero.jpg`, `logo.jpg`, `tempfence-2.jpg`, `tempfence-4.jpg`.
