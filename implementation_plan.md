# Lambert Afbouw Landing Page - Implementation Plan

**Project:** Professional landing page for Lambert Afbouw (construction/renovation services)  
**Status:** Ready for Development  
**Last Updated:** May 2026

---

## 1. PROJECT OVERVIEW

### Purpose
Create a professional, conversion-focused landing page showcasing Lambert Afbouw's construction and renovation services with integrated contact capabilities.

### Key Success Metrics
- Lead capture through email-validated contact form
- Mobile-responsive experience across all devices
- WCAG 2.1 Level AA accessibility compliance
- Clear service categorization and discovery
- Fast load time and optimal Lighthouse scores

---

## 2. TECHNICAL STACK

**Framework:** Next.js 16 (App Router)  
**Styling:** Tailwind CSS + Shadcn/ui  
**Form Handling:** React Hook Form with email submission (Nodemailer or similar backend API)  
**Typography:** Sans-serif font (Google Fonts - recommended: **Inter** for clean, professional look)  
**Icons:** Shadcn/ui icon components  
**Deployment:** Vercel

### Required Packages
- `react-hook-form` - Form state management
- `zod` - Form validation schema
- `nodemailer` - Email submission (backend route handler)
- `next/image` - Optimized image rendering
- `lucide-react` - Icon library

---

## 3. DESIGN SYSTEM

### Color Palette (3-Color System - v0 Guidelines)
- **Primary Brand Color:** Navy Blue (`#0F172A` or `#1e293b`)
- **Accent Color:** Lime Green (`#84CC16` or `#CCFF00`)
- **Neutrals:** White (`#FFFFFF`), Light Gray (`#F8FAFC`), Dark Gray (`#334155`)

### Typography
- **Font Family:** Inter (Google Fonts)
- **Headings:** Bold/SemiBold weights (700/600)
- **Body Text:** Regular (400) at 16px base
- **Line Height:** 1.5-1.6 (leading-relaxed)
- **Font Sizing:**
  - H1: 48px (desktop), 32px (mobile)
  - H2: 36px (desktop), 24px (mobile)
  - H3: 24px (desktop), 20px (mobile)
  - Body: 16px

### Spacing & Layout
- **Layout Method:** Flexbox-first, Grid for services layout
- **Base Spacing Unit:** 4px (Tailwind default)
- **Common Gaps:** `gap-4`, `gap-6`, `gap-8`
- **Padding:** `p-6` (mobile), `p-8` (tablet), `p-12` (desktop)

---

## 4. COMPONENT BREAKDOWN

### 4.1 Header/Navigation
- **Sticky header** with logo and CTA button
- **Logo:** Placeholder (client to provide)
- **"Bel Direct" Button:** Opens service selection modal (not `tel:` link)
- **Responsive:** Hamburger menu on mobile (if multi-page nav needed later)
- **Active States:** Hover/focus states for accessibility

### 4.2 Hero Section
- **Layout:** Full-width with background image/solid color fallback
- **Content:** Headline + subheadline + primary CTA button
- **CTA Behavior:** Smooth scroll to contact form
- **Image:** Placeholder (client to provide) - use `next/image` for optimization
- **Mobile:** Full height, vertical centering, readable text on background

### 4.3 Services Section - CATEGORIZED
**Categories & Services:**

**Category 1: Residential Renovation (5 services)**
1. Kitchen Renovation
2. Bathroom Renovation
3. Interior Redesign
4. Floor Installation
5. Wall & Ceiling Work

**Category 2: Commercial Projects (5 services)**
1. Office Fit-Out
2. Retail Space Design
3. Flooring Solutions (Commercial)
4. Wall Partitioning
5. Custom Cabinetry

**Category 3: Structural Work (4 services)**
1. Foundation Repair
2. Load-Bearing Wall Work
3. Roof Repair & Installation
4. Exterior Renovation

**Grid Layout:**
- **Desktop:** 4 columns (services grid)
- **Tablet:** 2 columns
- **Mobile:** 1 column
- **Category Headers:** Bold, larger font, lime green accent line
- **Service Cards:** Hover effect (shadow, slight scale increase)

### 4.4 Testimonials Section
- **Layout:** 3 testimonials in row (responsive: 1 on mobile, 2 on tablet)
- **Rating Display:** Star icons + "4.9/5 on Werkspot" (static content for MVP)
- **Content:** Name, role/company, quote, rating
- **Data:** Placeholder testimonials (no backend API yet)
- **Future-ready:** Schema to accept dynamic testimonials

### 4.5 FAQ Section
- **Collapsible Accordion:** 5 example FAQs (expandable for more)
- **Default:** First accordion item open
- **Categories (Optional):** General, Services, Process, Timeline, Pricing
- **Styling:** Navy background sections with lime green accents on expand

**Example FAQ Items:**
1. What types of projects do you handle?
2. How long does a typical renovation take?
3. Do you provide design consultation?
4. What areas do you service?
5. How do I get a free quote?

### 4.6 Contact Form (Modal)
**Trigger:** Service selection in any CTA or from "Bel Direct" button

**Modal Behavior:**
- Opens when user clicks service name or CTA
- Pre-fills selected service (if applicable)
- Overlay with close button
- Responsive: Full screen on mobile, centered box on desktop

**Form Fields:**
1. **Name** (text, required, min 2 chars)
2. **Email** (email, required, valid email format)
3. **Phone** (tel, required, regex validation for NL format)
4. **Service** (select dropdown, required, all 14 services listed)
5. **Description** (textarea, optional, max 500 chars)
6. **Privacy Consent** (checkbox, required)

**Validation Schema (Zod):**
```typescript
name: z.string().min(2, "Name must be at least 2 characters"),
email: z.string().email("Invalid email address"),
phone: z.string().regex(/^(\+31|0)[1-9]\d{8,9}$/, "Invalid Dutch phone number"),
service: z.string().min(1, "Please select a service"),
description: z.string().max(500).optional(),
consent: z.boolean().refine(val => val === true, "You must accept the privacy policy"),
```

**Submission Flow:**
1. Client-side validation via Zod
2. Submit to `/api/contact` POST endpoint
3. Backend sends email to Lambert Afbouw + confirmation email to user
4. Success modal/message
5. Form reset after successful submission

---

## 5. FORM HANDLING & EMAIL INTEGRATION

### Backend Setup
**Route:** `app/api/contact/route.ts` (Next.js API route)

**Requirements:**
- Accept POST requests with form data
- Validate all fields server-side
- Send two emails:
  1. **To Lambert Afbouw:** Full submission details
  2. **To User:** Confirmation message with reference number
- Rate limiting (max 5 submissions per IP per hour)
- GDPR compliance (no data retention beyond email sending)

**Email Templates:**
- **Admin Email:** Contact details, service type, message, timestamp
- **User Confirmation:** Thankyou message, reference ID, expected response time

**Dependencies:**
- `nodemailer` for SMTP
- Environment variables: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `CONTACT_EMAIL`
- Consider: Vercel Edge Functions for serverless optimization

### Form Error Handling
- Required field validation (client + server)
- Email format validation
- Phone number format validation (NL-specific)
- Duplicate submission prevention (honeypot field)
- Generic error message to user (don't expose backend details)

---

## 6. RESPONSIVE DESIGN SPECIFICATIONS

### Breakpoints & Grid Columns

| Screen | Width | Services Grid | Testimonials | Padding | Font Scale |
|--------|-------|---------------|--------------|---------|-----------|
| Mobile | <640px | 1 col | 1 col | p-4 | 0.875x |
| Tablet | 640-1024px | 2 col | 2 col | p-6 | 1x |
| Desktop | >1024px | 4 col | 3 col (row) | p-8 | 1x |

### Mobile-First Approach
1. Start with mobile (single column)
2. Add `md:` (768px) for tablet enhancements
3. Add `lg:` (1024px+) for desktop layout

### Touch Targets
- Minimum 44x44px for buttons and interactive elements
- Adequate spacing (gap-4 minimum) between clickable items

### Hero Section Responsiveness
- **Mobile:** Full viewport height, text centered, single column
- **Tablet:** 80vh minimum, increased text size
- **Desktop:** Full height hero with side-by-side optional layout

---

## 7. ACCESSIBILITY REQUIREMENTS

**Standard:** WCAG 2.1 Level AA compliance

### Color Contrast
- Text on background: Minimum 4.5:1 ratio for normal text
- Navy on White: ✓ High contrast
- Lime Green on Navy: ⚠ Check contrast ratio (may need adjustment)
- Lime Green on White: ✓ Good contrast

### Keyboard Navigation
- All interactive elements accessible via Tab
- Logical tab order (left-to-right, top-to-bottom)
- Focus indicators visible (outline: 2px solid)
- Form fields labeled with `<label>` associated to inputs via `htmlFor`
- Modal: Focus trap (Tab cycles within modal only)

### Screen Reader Support
- Semantic HTML (`main`, `section`, `nav`, `header`, `footer`)
- ARIA labels for icon-only buttons
- Alt text for all images (descriptive, not "image of...")
- Form error messages linked to inputs via `aria-describedby`
- Service categories marked as headings (h3)

### Motion & Animation
- No auto-playing animations
- Respect `prefers-reduced-motion` media query
- Animations should be subtle (transitions <300ms)

---

## 8. CONTENT & DATA STRATEGY

### Static Content (Hardcoded for MVP)
- Hero headline & subheadline
- Service names & categories
- Testimonials (placeholder, realistic)
- FAQ items

### Dynamic Content (Future Backend)
- Testimonials (from admin CMS)
- Services (database-driven)
- FAQ (searchable, categorized)

### Content Sources
- **Placeholder Copy:** Professional construction industry language
- **Testimonials:** Realistic but fictional for MVP (client to replace with real ones)
- **Service Descriptions:** Generic industry descriptions (client to customize)

### SEO Setup
- Meta title: "Lambert Afbouw | Professional Renovation & Construction Services"
- Meta description: "Expert construction and renovation services in the Netherlands. Free consultation available."
- Open Graph tags for social sharing
- Structured data (JSON-LD): LocalBusiness schema
- No sitemap required for single-page app

---

## 9. BROWSER & DEVICE SUPPORT

### Browsers
- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- No IE11 support required

### Devices
- **Mobile:** iPhone SE, iPhone 12+, Android (360px minimum width)
- **Tablet:** iPad, iPad Pro
- **Desktop:** 1920x1080 and up

### Testing Requirements
- Responsive testing: Chrome DevTools device emulation
- Real device testing: At least one iOS and one Android device
- Accessibility testing: axe DevTools, keyboard navigation, screen reader (NVDA/JAWS)

---

## 10. IMPLEMENTATION PHASES

### Phase 1: Foundation (Days 1-2)
- [ ] Setup Next.js project with Tailwind + Shadcn/ui
- [ ] Create design tokens (colors, typography, spacing)
- [ ] Build header/navigation component
- [ ] Build hero section with placeholder content
- [ ] Setup responsive grid system

### Phase 2: Content Sections (Days 3-4)
- [ ] Services section with categorization
- [ ] Testimonials section
- [ ] FAQ accordion component
- [ ] Footer component

### Phase 3: Forms & Interaction (Days 5-6)
- [ ] Design and build contact modal
- [ ] Implement form validation (Zod + React Hook Form)
- [ ] Create `/api/contact` route handler
- [ ] Setup email integration (Nodemailer)
- [ ] Add success/error feedback

### Phase 4: Polish & Optimization (Days 7-8)
- [ ] Responsive testing across devices
- [ ] Accessibility audit (WCAG 2.1 AA)
- [ ] Image optimization and loading
- [ ] Performance optimization (Lighthouse)
- [ ] Browser compatibility testing

### Phase 5: Deployment (Day 9)
- [ ] Environment variable setup
- [ ] Vercel deployment
- [ ] Final QA and user testing
- [ ] Documentation for client maintenance

---

## 11. DEPENDENCIES & SETUP

### NPM Packages
```json
{
  "dependencies": {
    "next": "16.x",
    "react": "19.x",
    "react-dom": "19.x",
    "tailwindcss": "3.x",
    "react-hook-form": "^7.x",
    "zod": "^3.x",
    "nodemailer": "^6.x",
    "lucide-react": "latest"
  },
  "devDependencies": {
    "@types/nodemailer": "^6.x",
    "typescript": "5.x"
  }
}
```

### Environment Variables (Required)
```env
SMTP_HOST=smtp.gmail.com (or service provider)
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
CONTACT_EMAIL=contact@lambertafbouw.nl
NEXT_PUBLIC_SITE_URL=https://lambertafbouw.nl
```

### File Structure
```
app/
├── layout.tsx                 (Root layout with fonts)
├── page.tsx                   (Main landing page)
├── api/
│   └── contact/route.ts       (Email submission endpoint)
├── globals.css               (Design tokens, Tailwind config)
└── (routes for future pages)

components/
├── Header.tsx
├── Hero.tsx
├── ServicesSection.tsx
├── TestimonialsSection.tsx
├── FAQSection.tsx
├── ContactModal.tsx
├── Footer.tsx
└── ui/                        (Shadcn components)

lib/
├── utils.ts                   (cn function, helpers)
└── validationSchema.ts        (Zod schemas)

public/
├── images/                    (Assets folder)
└── icons/                     (Custom icons if needed)
```

---

## 12. DESIGN RECOMMENDATIONS (v0 Best Practices)

### Recommended Approach
1. **Hero Section:** Solid navy background with lime green accent line/text highlight
2. **Service Cards:** Clean white cards with navy text, lime green category label
3. **Testimonials:** Card-based with star icons, subtle shadow
4. **CTA Buttons:** Lime green on navy, with white text for max contrast
5. **Hover States:** Subtle scale (1.05) and shadow increase
6. **Modal:** Overlay with 70% opacity dark background

### Typography Strategy
- **Headings:** Bold, navy color, with lime green underline accent (30% width)
- **Body:** Regular gray-700, generous line height (1.6)
- **CTAs:** Uppercase, bold, 16px minimum

### Spacing Strategy
- **Sections:** 80-120px vertical padding (responsive)
- **Cards:** 16px internal padding (mobile), 24px (desktop)
- **Elements:** Use `gap-4` / `gap-6` consistently

---

## 13. SUCCESS CRITERIA

- ✓ All forms submit successfully and send emails
- ✓ Page responsive on 320px - 1920px screens
- ✓ WCAG 2.1 Level AA accessibility score (axe DevTools)
- ✓ Lighthouse: Performance >85, Accessibility >95, Best Practices >90
- ✓ All interactive elements keyboard accessible
- ✓ Zero console errors or warnings
- ✓ Page load time <3 seconds (Vercel Edge)

---

## 14. NEXT STEPS

1. **Approval:** Confirm this plan aligns with your vision
2. **Assets:** Gather logo, hero image, service icons
3. **Email Setup:** Configure SMTP credentials (Gmail App Password or SendGrid API)
4. **Content:** Provide final copy for all sections
5. **Development:** Begin Phase 1 implementation

---

**Ready to build? Let's start with Phase 1! 🚀**
