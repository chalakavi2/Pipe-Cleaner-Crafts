

function AboutUs() {
  return (
    <div style={styles.page}>

      {/* HERO SECTION */}
      <div style={styles.hero}>
        <div style={styles.overlay}>
          <h1 style={styles.heroTitle}>
            🌸 About Pipe Cleaner Crafts
          </h1>

          <p style={styles.heroText}>
            Handmade creations crafted with love, creativity,
            and colorful imagination 💜
          </p>
        </div>
      </div>

      {/* OUR STORY */}
      <div style={styles.section}>
        <h2 style={styles.heading}>✨ Story</h2>

        <p style={styles.text}>
          Pipe Cleaner Crafts started as a small creative hobby
          and became a beautiful handmade craft store.
          <br /><br />
          I create unique flower bouquets, lamp shades,
          wall hangings, hair accessories, and personalized
          custom gifts for every special occasion.
        </p>
      </div>

      {/* WHAT WE OFFER */}
      <div style={styles.sectionLight}>
        <h2 style={styles.heading}>🎨 What I Offer</h2>

        <div style={styles.grid}>
          <Card emoji="🌸" title="Flower Bouquets" />
          <Card emoji="💡" title="Lamp Shades" />
          <Card emoji="🖼" title="Wall Hangings" />
          <Card emoji="🎀" title="Hair Accessories" />
          <Card emoji="🎁" title="Custom Gifts" />
          <Card emoji="💜" title="Handmade Crafts" />
        </div>
      </div>

      {/* WHY CHOOSE US */}
      <div style={styles.section}>
        <h2 style={styles.heading}>💎 Why Choose Us</h2>

        <div style={styles.grid}>
          <Feature text="100% Handmade with Care" />
          <Feature text="Affordable Prices" />
          <Feature text="Unique Custom Designs" />
          <Feature text="Fast Delivery Service" />
          <Feature text="Creative Gift Ideas" />
          <Feature text="Customer Satisfaction" />
        </div>
      </div>

      {/* STATS */}
      <div style={styles.statsSection}>
        <div style={styles.statCard}>
          <h1>100+</h1>
          <p>Happy Customers</p>
        </div>

        <div style={styles.statCard}>
          <h1>250+</h1>
          <p>Handmade Crafts</p>
        </div>

        <div style={styles.statCard}>
          <h1>50+</h1>
          <p>Custom Orders</p>
        </div>
      </div>

      {/* REVIEWS */}
      <div style={styles.sectionLight}>
        <h2 style={styles.heading}>⭐ Customer Reviews</h2>

        <div style={styles.reviewGrid}>
          <Review
            name="Dilmi Nirodha"
            review="Beautiful handmade bouquet. Highly recommended!"
          />

          <Review
            name="Udara Methmal"
            review="Very creative and affordable handmade gifts."
          />

          <Review
            name="Dulmi Anodani"
            review="Custom order came exactly as expected 💜"
          />
        </div>
      </div>

      {/* CONTACT */}
      <div style={styles.contact}>
        <h2 style={styles.heading}>📞 Contact Us</h2>

        <p style={styles.contactText}>
          Need a custom handmade craft or more information?
        </p>

        <p style={styles.contactText}>
          💬 WhatsApp: <b>075-0266897</b>
        </p>

        <p style={styles.contactText}>
          📞 For more details and custom requests,
          please contact us via WhatsApp or call us directly.
        </p>

        <button
          style={styles.contactBtn}
          onClick={() =>
            window.open("https://wa.me/94750266897")
          }
        >
          Contact Now 💜
        </button>
      </div>

    </div>
  );
}

/* SMALL COMPONENTS */

function Card({ emoji, title }) {
  return (
    <div style={styles.card}>
      <h1>{emoji}</h1>
      <h3>{title}</h3>
    </div>
  );
}

function Feature({ text }) {
  return (
    <div style={styles.feature}>
      ✅ {text}
    </div>
  );
}

function Review({ name, review }) {
  return (
    <div style={styles.reviewCard}>
      <h3>⭐⭐⭐⭐⭐</h3>
      <p>"{review}"</p>
      <b>- {name}</b>
    </div>
  );
}

/* STYLES */

const styles = {
  page: {
    background: "#fff",
    minHeight: "100vh",
    overflowX: "hidden"
  },

  hero: {
    height: "60vh",
    backgroundImage:
      "url('https://images.unsplash.com/photo-1513475382585-d06e58bcb0ff?q=80&w=1200')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  overlay: {
    background: "rgba(0,0,0,0.5)",
    padding: "30px",
    borderRadius: "15px",
    textAlign: "center",
    width: "90%",
    maxWidth: "700px"
  },

  heroTitle: {
    color: "white",
    fontSize: "clamp(32px, 5vw, 55px)",
    marginBottom: "10px"
  },

  heroText: {
    color: "white",
    fontSize: "clamp(15px, 2vw, 20px)",
    lineHeight: "1.6"
  },

  section: {
    padding: "60px 20px",
    textAlign: "center"
  },

  sectionLight: {
    padding: "60px 20px",
    background: "#f9f3ff",
    textAlign: "center"
  },

  heading: {
    color: "#6a1b9a",
    marginBottom: "30px",
    fontSize: "clamp(26px, 4vw, 40px)"
  },

  text: {
    maxWidth: "800px",
    margin: "auto",
    lineHeight: "1.8",
    fontSize: "16px",
    color: "#444"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
    marginTop: "30px"
  },

  card: {
    background: "white",
    padding: "30px 20px",
    borderRadius: "20px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
    transition: "0.3s"
  },

  feature: {
    background: "white",
    padding: "20px",
    borderRadius: "15px",
    boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
    fontWeight: "bold"
  },

  statsSection: {
    padding: "60px 20px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
    background: "linear-gradient(to right, #6a1b9a, #ad1457)",
    color: "white",
    textAlign: "center"
  },

  statCard: {
    padding: "20px"
  },

  reviewGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px"
  },

  reviewCard: {
    background: "white",
    padding: "25px",
    borderRadius: "15px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
  },

  contact: {
    padding: "60px 20px",
    textAlign: "center",
    background: "#fff"
  },

  contactText: {
    fontSize: "16px",
    color: "#555",
    marginBottom: "12px",
    lineHeight: "1.7"
  },

  contactBtn: {
    marginTop: "20px",
    background: "linear-gradient(to right, #6a1b9a, #ad1457)",
    color: "white",
    border: "none",
    padding: "12px 28px",
    borderRadius: "30px",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "bold",
    boxShadow: "0 5px 15px rgba(0,0,0,0.15)"
  }
};

export default AboutUs;