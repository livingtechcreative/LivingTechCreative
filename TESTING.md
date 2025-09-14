# Testing Documentation

Dokumentasi lengkap untuk testing sistem website LivingTechCreative.

## 🧪 Overview Testing

Website ini menggunakan strategi testing yang komprehensif dengan tiga lapisan utama:

1. **Unit Tests** - Testing komponen individual
2. **Integration Tests** - Testing interaksi antar komponen
3. **End-to-End Tests** - Testing user journey lengkap

## 🛠️ Tools yang Digunakan

### Testing Framework
- **Jest** - Unit dan integration testing
- **React Testing Library** - Component testing
- **Playwright** - End-to-end testing

### Testing Utilities
- **@testing-library/user-event** - User interaction simulation
- **@testing-library/jest-dom** - DOM assertions

## 📁 Structure Testing

```
src/
├── __tests__/
│   ├── utils/
│   │   └── test-utils.tsx          # Testing utilities dan helpers
│   ├── app/
│   │   └── page.test.tsx           # Unit tests untuk main page
│   └── components/
│       ├── hero-section.test.tsx   # Tests untuk Hero section
│       ├── hero-content.test.tsx   # Tests untuk Hero content
│       ├── integrated-navbar.test.tsx
│       ├── services-section.test.tsx
│       └── portfolio-section.test.tsx
e2e/
├── homepage.spec.ts                # E2E tests untuk homepage
├── navigation.spec.ts              # E2E tests untuk navigasi
└── interactions.spec.ts            # E2E tests untuk interaksi user
```

## 🚀 Menjalankan Tests

### Unit & Integration Tests

```bash
# Menjalankan semua unit tests
npm run test

# Menjalankan tests dalam watch mode
npm run test:watch

# Menjalankan tests dengan coverage report
npm run test:coverage
```

### End-to-End Tests

```bash
# Menjalankan semua E2E tests
npm run test:e2e

# Menjalankan E2E tests dengan UI
npm run test:e2e:ui

# Menjalankan semua tests (unit + E2E)
npm run test:all
```

## 📊 Test Coverage

### Unit Tests Coverage

#### Main Page (`src/app/page.tsx`)
- ✅ Initial rendering
- ✅ Navbar visibility timing (3 detik delay)
- ✅ Hash navigation functionality
- ✅ Section ID mapping
- ✅ Component state management
- ✅ Error handling

#### Hero Section (`src/components/hero-section.tsx`)
- ✅ Background images rendering
- ✅ Layout dan positioning
- ✅ Content integration
- ✅ Responsive design
- ✅ Performance optimizations
- ✅ Accessibility features

#### Hero Content (`src/components/hero/HeroContent.tsx`)
- ✅ Text rendering (Sleek, Fast, Doesn't Ghost, Launch)
- ✅ Availability badge
- ✅ CTA button functionality
- ✅ Responsive layouts (mobile/desktop)
- ✅ Image dan icon rendering
- ✅ Animation variants
- ✅ Gradient text styling

#### Services Section (`src/components/services-section.tsx`)
- ✅ Service cards rendering (8 services)
- ✅ Hover interactions
- ✅ Icon dan description display
- ✅ Animation handling
- ✅ Layout responsiveness

#### Portfolio Section (`src/components/portfolio-section.tsx`)
- ✅ Data fetching dari API
- ✅ Filter functionality (All, UI/UX, Front-End, etc.)
- ✅ Loading states
- ✅ Error handling
- ✅ Project card rendering
- ✅ Masonry layout

### E2E Tests Coverage

#### Homepage Tests (`e2e/homepage.spec.ts`)
- ✅ Page loading dan structure
- ✅ Hero section content
- ✅ Navbar appearance timing
- ✅ All sections visibility
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Performance benchmarks
- ✅ Console error monitoring
- ✅ Accessibility checks

#### Navigation Tests (`e2e/navigation.spec.ts`)
- ✅ Smooth scrolling navigation
- ✅ Hash-based navigation
- ✅ Logo click functionality
- ✅ Mobile navigation
- ✅ External links handling
- ✅ Keyboard accessibility

#### Interaction Tests (`e2e/interactions.spec.ts`)
- ✅ Hero CTA button interactions
- ✅ Service card hover effects
- ✅ Portfolio filtering
- ✅ FAQ accordion functionality
- ✅ Contact form interactions
- ✅ Scroll-triggered animations
- ✅ Touch interactions (mobile)
- ✅ Error handling

## 🎯 Test Scenarios

### Critical User Journeys

1. **Landing Page Experience**
   - User lands on homepage
   - Hero section loads dengan animasi
   - Navbar muncul setelah 3 detik
   - CTA button dapat diklik

2. **Navigation Flow**
   - User klik menu Services → scroll ke section services
   - User klik menu Portfolio → scroll ke section portfolio
   - User klik logo → scroll ke top
   - Hash navigation: `/#services` → langsung ke services

3. **Content Interaction**
   - Hover service cards → tampil description
   - Filter portfolio → results berubah
   - Expand FAQ items → content muncul
   - Fill contact form → validation works

4. **Responsive Experience**
   - Mobile: layout menyesuaikan, navigation tetap functional
   - Tablet: grid layout optimal
   - Desktop: full layout dengan hover effects

## 🐛 Common Issues & Solutions

### Jest Configuration Issues
```bash
# Jika ada error dengan ES modules
npm install --save-dev @babel/preset-env @babel/preset-react
```

### Playwright Setup Issues
```bash
# Install browsers
npx playwright install

# Install system dependencies
npx playwright install-deps
```

### Mock Issues
- Framer Motion: Sudah di-mock di `jest.setup.js`
- Next.js Image: Sudah di-mock untuk testing
- React Scroll: Sudah di-mock untuk smooth scroll testing

## 📈 Performance Testing

### Metrics yang Dimonitor
- Page load time (< 10 detik)
- Animation smoothness
- Memory usage
- Console errors
- Accessibility scores

### Performance Benchmarks
```javascript
// Homepage load time
expect(loadTime).toBeLessThan(10000) // 10 seconds max

// Navigation response time
expect(navigationTime).toBeLessThan(1000) // 1 second max

// Animation frame rate
expect(animationFPS).toBeGreaterThan(30) // 30 FPS minimum
```

## 🔍 Debugging Tests

### Jest Debugging
```bash
# Run specific test file
npm test -- hero-section.test.tsx

# Run with verbose output
npm test -- --verbose

# Run with coverage for specific file
npm test -- --coverage --collectCoverageFrom="src/components/hero-section.tsx"
```

### Playwright Debugging
```bash
# Run with headed browser
npx playwright test --headed

# Run with debug mode
npx playwright test --debug

# Generate trace
npx playwright test --trace on
```

## ✅ Testing Checklist

### Before Deployment
- [ ] All unit tests passing
- [ ] All integration tests passing
- [ ] All E2E tests passing
- [ ] Coverage > 80%
- [ ] No console errors
- [ ] Performance benchmarks met
- [ ] Accessibility tests passing
- [ ] Mobile responsiveness verified

### After Deployment
- [ ] Smoke tests pada production
- [ ] Performance monitoring
- [ ] Error tracking
- [ ] User feedback monitoring

## 🌐 API Configuration

### API Endpoint
Website ini menggunakan API endpoint: `https://livingtechcreative.com/api`

### API Testing
- Unit tests menggunakan mock API service
- E2E tests menggunakan route interception untuk testing loading states dan error handling
- Portfolio data diambil dari endpoint `/portofolios`

### API Structure
```typescript
interface Portfolio {
  id: number
  title: string
  slug: string
  background: string
  client: string
  category: string
  cover_image: string
  is_active: boolean
  is_featured: boolean
  // ... other fields
}

interface ApiResponse<T> {
  data: T
}
```

## 🔧 Maintenance

### Regular Tasks
- Update test snapshots saat UI berubah
- Review dan update test coverage
- Optimize slow tests
- Update dependencies
- Verify API endpoints are working correctly

### Monthly Review
- Analyze test performance
- Review failed test patterns
- Update testing documentation
- Plan testing improvements

## 📚 Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

---

*Testing adalah investasi untuk quality dan maintainability code. Setiap feature baru harus disertai dengan tests yang memadai.*
