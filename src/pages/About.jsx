import "./About.css";

function About() {
  return (
    <section className="about-us">
      <div className="about-content">
        <span className="about-label">GET TO KNOW US</span>

        <h2>About Olivé</h2>

        <p className="about-intro">
          More than just shopping — a little inspiration
          for everyday living.
        </p>

        <div className="about-divider"></div>

        <p>
          Welcome to Olivé! We believe that shopping should
          be simple, enjoyable, and inspiring.
        </p>

        <p>
          Our goal is to bring you carefully selected products
          that combine quality, style, and practicality.
          Whether you are looking for something useful or
          something special, we want your shopping experience
          to be easy and enjoyable.
        </p>

        <p className="about-signature">
          Thank you for being part of Olivé.
        </p>
      </div>
    </section>
  );
}

export default About;