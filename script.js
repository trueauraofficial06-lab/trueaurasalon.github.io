// ============================================
// True Aura Family Salon — script.js
// Vanilla JS: no frameworks, no build step.
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------------------------------------
     1. SERVICES DATA  (Main Category -> Sub-category)
     No prices shown on the site — remove/edit any
     service you don't actually offer.
  --------------------------------------------- */
  const SERVICES = [
    // ---- HAIR ----
    { cat: 'hair', name: 'Haircut & Styling', desc: 'Precision cuts and finish styling for every hair type.', img: 'assets/images/treatment-haircut-styling.jpg' },
    { cat: 'hair', name: 'Hair Color / Global Color', desc: 'Full-head colour using premium international brands.', img: 'assets/images/treatment-hair-color.jpg' },
    { cat: 'hair', name: 'Highlights & Balayage', desc: 'Hand-painted dimension for a natural sun-kissed look.', img: 'assets/images/treatment-highlights-balayage.jpg' },
    { cat: 'hair', name: 'Keratin & Smoothening', desc: 'Frizz-free, silky-smooth hair that lasts for months.', img: 'assets/images/treatment-keratin-smoothening.jpg' },
    { cat: 'hair', name: 'Hair Spa & Deep Conditioning', desc: 'Nourishing therapy to restore shine and strength.', img: 'assets/images/treatment-hair-spa.jpg' },
    { cat: 'hair', name: 'Hair Extensions', desc: 'Seamless length and volume, matched to your natural hair.', img: 'assets/images/treatment-hair-extensions.jpg' },
    { cat: 'hair', name: 'Bridal & Party Hairstyling', desc: 'Elegant updos and styles for your big day.', img: 'assets/images/treatment-bridal-party-hairstyling.jpg' },

    // ---- MAKEUP ----
    { cat: 'makeup', name: 'Party Makeup', desc: 'Glam, long-lasting makeup for events and celebrations.', img: 'assets/images/treatment-party-makeup.jpg' },
    { cat: 'makeup', name: 'Bridal Makeup', desc: 'Flawless, camera-ready bridal looks by expert artists.', img: 'assets/images/treatment-bridal-makeup.jpg' },
    { cat: 'makeup', name: 'Engagement / Pre-Bridal Makeup', desc: 'Soft glam makeup for your engagement day.' },
    { cat: 'makeup', name: 'HD / Airbrush Makeup', desc: 'High-definition finish that photographs beautifully.' },
    { cat: 'makeup', name: 'Saree Draping & Styling', desc: 'Perfect pleats and pallu styling for any occasion.' },

    // ---- SKIN ----
    { cat: 'skin', name: 'Basic & Advanced Facials', desc: 'Deep-cleansing and brightening facials for every skin type.', img: 'assets/images/treatment-advanced-facial.jpg' },
    { cat: 'skin', name: 'Cleanup', desc: 'Quick refresh to clear impurities and restore glow.', img: 'assets/images/treatment-cleanup.jpg' },
    { cat: 'skin', name: 'De-Tan Treatment', desc: 'Removes sun tan and evens out skin tone.', img: 'assets/images/treatment-de-tan.jpg' },
    { cat: 'skin', name: 'Skin Polishing', desc: 'Gentle exfoliation for soft, radiant skin.', img: 'assets/images/treatment-skin-polishing.jpg' },
    { cat: 'skin', name: 'Bleach', desc: 'Instant brightening for face and body.', img: 'assets/images/treatment-bleach.jpg' },
    { cat: 'skin', name: 'Threading & Waxing', desc: 'Precise, gentle hair removal for a clean finish.', img: 'assets/images/treatment-threading-waxing.jpg' },

    // ---- NAIL ----
    { cat: 'nail', name: 'Manicure (Classic / Spa)', desc: 'Hand care, shaping and polish for neat, healthy nails.', img: 'assets/images/treatment-manicure.jpg' },
    { cat: 'nail', name: 'Pedicure (Classic / Spa)', desc: 'Relaxing foot care and polish finish.', img: 'assets/images/treatment-pedicure.jpg' },
    { cat: 'nail', name: 'Nail Art', desc: 'Custom designs to match your style or occasion.', img: 'assets/images/treatment-nail-art.jpg' },
    { cat: 'nail', name: 'Nail Extensions', desc: 'Durable, natural-looking length and shape.' },
    { cat: 'nail', name: 'Gel Polish / Nail Paint', desc: 'Chip-resistant colour with a glossy finish.' },
  ];

  // Fallback category images — used whenever a service above has no img of its own.
  const CAT_IMAGES = {
    hair: 'assets/images/thumb-hair.jpg',
    makeup: 'assets/images/thumb-makeup.jpg',
    skin: 'assets/images/thumb-skin.jpg',
    nail: 'assets/images/thumb-nail.jpg',
  };

  const CAT_LABELS = { hair: 'Hair', makeup: 'Makeup', skin: 'Skin', nail: 'Nail' };

  const waLink = (serviceName) =>
    `https://wa.me/919115221666?text=${encodeURIComponent(`Hi True Aura, I'd like to book: ${serviceName}`)}`;

  /* ---------------------------------------------
     2. RENDER SERVICES GRID
  --------------------------------------------- */
  const servicesGrid = document.getElementById('servicesGrid');
  if (servicesGrid) {
    servicesGrid.innerHTML = SERVICES.map(s => `
      <article class="service-card" data-cat="${s.cat}">
        <div class="service-card-img">
          <img src="${s.img || CAT_IMAGES[s.cat]}" alt="${s.name} at True Aura Family Salon" loading="lazy">
        </div>
        <div class="service-card-top">
          <span class="service-tag">${CAT_LABELS[s.cat]}</span>
        </div>
        <h3>${s.name}</h3>
        <p class="service-desc">${s.desc}</p>
        <a href="${waLink(s.name)}" class="btn btn-dark" target="_blank" rel="noopener">Book Now</a>
      </article>
    `).join('');
  }

  /* ---------------------------------------------
     3. FILTER BUTTONS (All / Hair / Makeup / Skin / Nail)
  --------------------------------------------- */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const applyFilter = (filter) => {
    document.querySelectorAll('.service-card').forEach(card => {
      const match = filter === 'all' || card.dataset.cat === filter;
      card.classList.toggle('is-hidden', !match);
    });
    filterButtons.forEach(btn => {
      const active = btn.dataset.filter === filter;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-selected', active);
    });
  };
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => applyFilter(btn.dataset.filter));
  });

  // Links elsewhere on the page (mega-menu, category strip, footer) that carry data-filter
  document.querySelectorAll('a[data-filter]').forEach(link => {
    link.addEventListener('click', () => {
      // Let the anchor jump happen, then apply filter shortly after scroll starts
      setTimeout(() => applyFilter(link.dataset.filter), 300);
    });
  });

  /* ---------------------------------------------
     4. POPULAR SERVICES GRID (best-seller style)
     Each treatment has its own unique photo.
  --------------------------------------------- */
  const POPULAR = [
    { name: 'Bridal Makeup', cat: 'makeup', img: 'assets/images/treatment-bridal-makeup.jpg' },
    { name: 'Keratin & Smoothening', cat: 'hair', img: 'assets/images/treatment-keratin-smoothening.jpg' },
    { name: 'Highlights & Balayage', cat: 'hair', img: 'assets/images/treatment-highlights-balayage.jpg' },
    { name: 'Advanced Facial', cat: 'skin', img: 'assets/images/treatment-advanced-facial.jpg' },
    { name: 'Manicure', cat: 'nail', img: 'assets/images/treatment-manicure.jpg' },
    { name: 'Pedicure', cat: 'nail', img: 'assets/images/treatment-pedicure.jpg' },
    { name: 'Nail Art', cat: 'nail', img: 'assets/images/treatment-nail-art.jpg' },
  ];
  const popularGrid = document.getElementById('popularGrid');
  if (popularGrid) {
    popularGrid.innerHTML = POPULAR.map(p => `
      <article class="popular-card">
        <div class="popular-card-img">
          <img src="${p.img}" alt="${p.name} at True Aura Family Salon" loading="lazy">
        </div>
        <div class="popular-card-body">
          <h3>${p.name}</h3>
        </div>
      </article>
    `).join('');
  }

  /* ---------------------------------------------
     5. TESTIMONIALS — PLACEHOLDER, replace with real reviews
  --------------------------------------------- */
  const TESTIMONIALS = [
    { quote: 'The most luxurious salon experience I\u2019ve had in Varanasi. My hair has never looked better.', who: 'Placeholder review — Client, Varanasi' },
    { quote: 'My bridal makeup was flawless and lasted the entire wedding. Highly recommend the team here.', who: 'Placeholder review — Bride, Varanasi' },
    { quote: 'Clean, modern, and the staff genuinely care about getting the result right.', who: 'Placeholder review — Client, Shivpur' },
  ];
  const track = document.getElementById('testimonialTrack');
  const dotsWrap = document.getElementById('testimonialDots');
  let tIndex = 0;

  if (track) {
    track.innerHTML = `<div class="testimonial-track-inner">${
      TESTIMONIALS.map(t => `
        <div class="testimonial-card">
          <div class="stars">★★★★★</div>
          <p class="quote">\u201C${t.quote}\u201D</p>
          <p class="who">${t.who}</p>
        </div>
      `).join('')
    }</div>`;

    dotsWrap.innerHTML = TESTIMONIALS.map((_, i) =>
      `<button class="t-dot${i === 0 ? ' is-active' : ''}" data-i="${i}" aria-label="Go to testimonial ${i + 1}"></button>`
    ).join('');

    const inner = track.querySelector('.testimonial-track-inner');
    const dots = dotsWrap.querySelectorAll('.t-dot');

    const goTo = (i) => {
      tIndex = (i + TESTIMONIALS.length) % TESTIMONIALS.length;
      inner.style.transform = `translateX(-${tIndex * 100}%)`;
      dots.forEach((d, di) => d.classList.toggle('is-active', di === tIndex));
    };

    document.querySelector('.t-prev')?.addEventListener('click', () => goTo(tIndex - 1));
    document.querySelector('.t-next')?.addEventListener('click', () => goTo(tIndex + 1));
    dots.forEach(d => d.addEventListener('click', () => goTo(Number(d.dataset.i))));

    // auto-advance
    let autoTimer = setInterval(() => goTo(tIndex + 1), 6000);
    track.addEventListener('mouseenter', () => clearInterval(autoTimer));
    track.addEventListener('mouseleave', () => { autoTimer = setInterval(() => goTo(tIndex + 1), 6000); });
  }

  /* ---------------------------------------------
     6. FAQ ACCORDION
  --------------------------------------------- */
  const FAQS = [
    { q: 'Do I need an appointment, or are walk-ins welcome?', a: 'Walk-ins are welcome, but we recommend booking on WhatsApp for bridal, makeup and keratin services so we can reserve enough time for you.' },
    { q: 'What are your salon timings?', a: 'We\u2019re open Monday to Friday, 10:00 AM \u2013 8:00 PM, and Saturday \u2013 Sunday, 9:00 AM \u2013 9:00 PM.' },
    { q: 'Which brands of products do you use?', a: 'We use premium international brands across hair and skin services \u2014 ask your stylist for details on the specific range used for your service.' },
    { q: 'Do you offer packages for brides and families?', a: 'Yes \u2014 we offer bridal, pre-bridal and family combo packages. Message us on WhatsApp for current package details.' },
  ];
  const faqList = document.getElementById('faqList');
  if (faqList) {
    faqList.innerHTML = FAQS.map((f, i) => `
      <div class="faq-item" data-i="${i}">
        <button class="faq-q" aria-expanded="false">
          <span>${f.q}</span>
          <span class="plus">+</span>
        </button>
        <div class="faq-a"><p>${f.a}</p></div>
      </div>
    `).join('');

    faqList.querySelectorAll('.faq-item').forEach(item => {
      const btn = item.querySelector('.faq-q');
      const answer = item.querySelector('.faq-a');
      btn.addEventListener('click', () => {
        const isOpen = item.classList.contains('is-open');
        // close all
        faqList.querySelectorAll('.faq-item').forEach(other => {
          other.classList.remove('is-open');
          other.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
          other.querySelector('.faq-a').style.maxHeight = null;
        });
        if (!isOpen) {
          item.classList.add('is-open');
          btn.setAttribute('aria-expanded', 'true');
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      });
    });
  }

  /* ---------------------------------------------
     7. HEADER: sticky solid-on-scroll + mobile nav
  --------------------------------------------- */
  const header = document.getElementById('site-header');
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 12);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  const navToggle = document.getElementById('navToggle');
  const mobileNav = document.getElementById('mobileNav');
  navToggle?.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('is-open');
    navToggle.classList.toggle('is-open', open);
    navToggle.setAttribute('aria-expanded', open);
  });
  mobileNav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    mobileNav.classList.remove('is-open');
    navToggle.classList.remove('is-open');
  }));

  /* ---------------------------------------------
     8. BOOKING FORM -> WhatsApp
  --------------------------------------------- */
  const bookingForm = document.getElementById('bookingForm');
  bookingForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('fName').value.trim();
    const phone = document.getElementById('fPhone').value.trim();
    const service = document.getElementById('fService').value;
    const message = document.getElementById('fMessage').value.trim();

    const text = `Hi True Aura, I'd like to book an appointment.\n` +
      `Name: ${name}\n` +
      `Phone: ${phone}\n` +
      `Service: ${service}` +
      (message ? `\nMessage: ${message}` : '');

    window.open(`https://wa.me/919115221666?text=${encodeURIComponent(text)}`, '_blank');
  });

  /* ---------------------------------------------
     9. SCROLL REVEAL ANIMATIONS
  --------------------------------------------- */
  const revealTargets = document.querySelectorAll(
    '.editorial-copy, .editorial-media, .section-head, .service-card, .popular-card, .trust-item, .gallery-grid img, .testimonial-carousel'
  );
  revealTargets.forEach(el => el.classList.add('reveal'));

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealTargets.forEach(el => io.observe(el));

});
