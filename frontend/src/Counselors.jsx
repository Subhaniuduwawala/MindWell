import React, { useState } from "react";
import "./Counselors.css";
import image3 from "./assets/image3.jpg";
import heroVideo from "./assets/hero-video2.mp4";
import image24 from "./assets/image24.jpg"; 
import image25 from "./assets/image25.jpg";
import image26 from "./assets/image26.jpg";
import image27 from "./assets/image27.jpg";
import image28 from "./assets/image28.jpg";
import image29 from "./assets/image29.jpg";



const ALL_COUNSELORS = [
  {
    name: "Mr. Ravi Fernando",
    category: "Career & Life Coaching",
    experience: "10 years",
    languages: "English, Tamil",
    approach: "Solution-Focused Brief Therapy, Goal Setting",
    quote: "Guiding you to rediscover purpose and balance in both career and life.",
    rating: 3,
    image: image25,
  },
  {
    name: "Ms. Tharushi Jayawardena",
    category: "Relationship & Family Therapy",
    experience: "5 years",
    languages: "Sinhala",
    approach: "Emotionally Focused Therapy (EFT)",
    quote: "Helping couples and families improve emotional connection and communication.",
    rating: 2,
    image: image27,
  },
  {
    name: "Dr. Ashani Dias",
    category: "Grief & Loss",
    experience: "12 years",
    languages: "English, Sinhala",
    approach: "Narrative Therapy, Supportive Counseling",
    quote: "Supporting you through loss with empathy, patience, and presence.",
    rating: 3,
    image: image28,
  },
  {
    name: "Mr. Samoneera Wijesinghe",
    category: "Self-Esteem & Confidence",
    experience: "6 years",
    languages: "Sinhala, Tamil",
    approach: "Positive Psychology, Strength-Based Therapy",
    quote: "Helping you discover your inner strengths and self-worth.",
    rating: 2,
    image: image26,
  },
  {
    name: "Ms. Ishara Senanayake",
    category: "Student & Academic Stress Support",
    experience: "4+ years",
    languages: "Sinhala, English",
    approach: "Cognitive-Behavioral Techniques, Time Management Coaching",
    quote: "Helping students handle academic pressure while building resilience.",
    rating: 2,
    image: image29,
  },
  {
    name: "Mr. Kaween de Silva",
    category: "LGBTQ+ Affirmative Support",
    experience: "6 years",
    languages: "English",
    approach: "Humanistic Therapy, Identity-affirming conversations",
    quote: "Providing a safe, inclusive space to talk openly and heal freely.",
    rating: 2,
    image: image3,
  },

  // --- Extra counselors (shown after clicking "Show More") ---
  {
    name: "Ms. Nadeesha Perera",
    category: "Anxiety & Stress",
    experience: "7 years",
    languages: "Sinhala, English",
    approach: "CBT, Mindfulness",
    quote: "Equipping you with practical tools to quiet the mind.",
    rating: 4,
    image: image3,
  },
  {
    name: "Mr. Harith Senarath",
    category: "Depression & Mood Support",
    experience: "8 years",
    languages: "Sinhala",
    approach: "Behavioral Activation, Supportive Therapy",
    quote: "Small steps forward can change the direction of your life.",
    rating: 4,
    image: image3,
  },
  {
    name: "Dr. Menaka Wijeratne",
    category: "Child & Adolescent Therapy",
    experience: "11 years",
    languages: "English, Sinhala",
    approach: "Play Therapy, Family Systems",
    quote: "Creating safe spaces where young minds feel seen and heard.",
    rating: 5,
    image: image3,
  },
  {
    name: "Ms. Piumi Ranasinghe",
    category: "Mindfulness & Meditation",
    experience: "6 years",
    languages: "English",
    approach: "MBSR, Breathwork",
    quote: "Come back to the present—where calm and clarity live.",
    rating: 4,
    image: image3,
  },
  {
    name: "Mr. Sanjaya Jayasuriya",
    category: "Addiction Recovery Support",
    experience: "9 years",
    languages: "Sinhala, English",
    approach: "Motivational Interviewing, Relapse Prevention",
    quote: "Recovery is possible—and you don’t have to do it alone.",
    rating: 4,
    image: image3,
  },
  {
    name: "Ms. Dinithi Abeysekara",
    category: "Trauma-Informed Care",
    experience: "10 years",
    languages: "Sinhala",
    approach: "EMDR-informed, Stabilization Skills",
    quote: "Gentle healing that respects your pace and your story.",
    rating: 5,
    image:image3,
  },
];

const StarRating = ({ value = 0, max = 5 }) => {
  const full = "★".repeat(value);
  const empty = "☆".repeat(Math.max(0, max - value));
  return (
    <div className="rating" aria-label={`Rating: ${value} out of ${max}`}>
      <span className="stars">{full}{empty}</span>
    </div>
  );
};

const Counselors = () => {
  // Show first N, then reveal more in batches
  const INITIAL_COUNT = 6;
  const LOAD_STEP = 6;

  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  const visibleCounselors = ALL_COUNSELORS.slice(0, visibleCount);
  const canShowMore = visibleCount < ALL_COUNSELORS.length;

  const handleShowMore = () => setVisibleCount((c) => Math.min(c + LOAD_STEP, ALL_COUNSELORS.length));
  const handleShowLess = () => setVisibleCount(INITIAL_COUNT);

  const scrollToList = () => {
    const el = document.querySelector("#counselors-list");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="counselors-page">
      {/* Hero */}
      <section className="hero" aria-label="Welcome banner">
        <video src={heroVideo} autoPlay muted loop playsInline className="hero-video2" />
        <div className="hero-overlay" />
        <div className="hero-content">
          <h1>Your Mental Health Matters</h1>
          <p>Connect with qualified, compassionate counselors in a safe and confidential space.</p>
          <div className="hero-cta-row">
            <button className="hero-btn" onClick={scrollToList}>Meet Our Counselors</button>
            <a className="hero-link" href="#appointment">Book an Appointment →</a>
          </div>
        </div>
      </section>

      {/* Intro split */}
      <section className="counselors-hero">
        <div className="hero-left">
          <img src={image24} alt="A supportive counseling session" />
        </div>
        <div className="hero-right">
          <h2>Meet Our Caring Professionals</h2>
          <p>
            Our team provides compassionate, confidential care. Choose support that fits your needs from stress relief to deep emotional healing.
          </p>
          <ul>
            <li>Anxiety & Stress Counsellors</li>
            <li>Depression & Mood Support</li>
            <li>Relationship & Family Therapy</li>
            <li>Student & Academic Stress Support</li>
            <li>Grief & Loss Counsellors</li>
            <li>Self-Esteem & Confidence Coaching</li>
            <li>LGBTQ+ Affirmative Support</li>
            <li>Child & Adolescent Therapy</li>
            <li>Career & Life Coaching</li>
            <li>Mindfulness & Meditation Experts</li>
          </ul>
        </div>
      </section>

      {/* Counselor Cards */}
      <section id="counselors-list" className="counselors-list" aria-label="Counselor profiles">
        {visibleCounselors.map((c, index) => (
          <article key={index} className="counselor-card" aria-labelledby={`c-name-${index}`}>
  <div className="card-top">
    <span className="category-badge" title={c.category}>{c.category}</span>
    <img src={c.image} alt={`${c.name} profile`} className="counselor-img" />
  </div>

  <h3 id={`c-name-${index}`}>{c.name}</h3>

  {/* NEW wrapper to control height */}
  <div className="card-content">
    <ul className="counselor-meta">
      <li className="meta-line"><strong>Experience:</strong> {c.experience}</li>
      <li className="meta-line"><strong>Languages:</strong> {c.languages}</li>
      <li className="meta-line"><strong>Approach:</strong> {c.approach}</li>
    </ul>

    <blockquote className="counselor-quote">“{c.quote}”</blockquote>
    <div className="card-bottom">
      <div className="rating"><span className="stars">{"★".repeat(c.rating)}{"☆".repeat(5-c.rating)}</span></div>
      <button
        className="outline-btn"
        aria-label={`Book an appointment with ${c.name}`}
        onClick={() => document.querySelector("#appointment")?.scrollIntoView({ behavior: "smooth" })}
      >
        Book with {c.name.split(" ")[0]}
      </button>
    </div>
  </div>
</article>

        ))}
      </section>

      {/* Show more / less */}
      <div className="load-more-row">
        {canShowMore ? (
          <button className="load-more-btn" onClick={handleShowMore}>
            Show More
          </button>
        ) : visibleCount > INITIAL_COUNT ? (
          <button className="load-more-btn" onClick={handleShowLess}>
            Show Less
          </button>
        ) : null}
      </div>

      {/* Appointment */}
      <section id="appointment" className="appointment-section" aria-label="Appointment booking">
        <h2>Get An Appointment</h2>
        <p className="appt-note">
          We operate Monday–Friday, from <strong>2:00 PM</strong> to <strong>7:00 PM</strong>.
          Kindly avoid Saturday and Sunday.
        </p>
        <form className="appointment-form">
          <input type="text" placeholder="Your Name" name="name" required />
          <input type="email" placeholder="Your Email" name="email" required />
          <input type="date" name="date" required aria-label="Preferred date" />
          <input type="time" name="time" required aria-label="Preferred time" />
          <input type="tel" placeholder="Phone Number" name="phone" required />
          <select name="mode" required aria-label="Session mode">
            <option value="">Mode of Session</option>
            <option value="online">Online</option>
            <option value="inperson">In-Person</option>
          </select>
          <textarea name="notes" placeholder="Tell us briefly what you'd like support with (optional)" />
          <button type="submit">Get An Appointment</button>
        </form>
      </section>
    </div>
  );
};

export default Counselors;
