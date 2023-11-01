import styles from './about-us.module.css';

export default function AboutUs() {
  return (
    <div className={styles.container}>
      <div>
        <h1 className={styles.title}>Who We Are</h1>
        <p className={styles.paragraph}>We are Stelian, Ramsay, and Baz, a trio united by a shared vision for a more inclusive and safer world. Our journey began during a course at General Assembly, where we decided to turn our passion into action.</p>
        <h2 className={styles.subtitle}>Why We Built This App</h2>
        <p className={styles.paragraph}>We believe that awareness is the first step towards change. This app serves as a platform to raise awareness about the safety and inclusivity of venues and universities. Our aim is to create a resource that empowers the LGBTQ+ community by providing insights into places where they can feel seen, heard, and respected.</p>
        <h2 className={styles.subtitle}>What Drives Us</h2>
        <p className={styles.paragraph}>In a world where everyone should be free to express who they are and who they love, it's disheartening to see that harassment and discrimination against the LGBTQ+ community still exist. We want to be part of the solution in whatever way we can. This app is our way of contributing to a better future for all, as well as a way to remember Ezra, who is deeply missed.</p>
      </div>

      <div className={styles.dedication}>
        <h2 className={styles.dedicationText}>Dedication to Ezra (Ezzy)</h2>
        <img src='/Ezra_Jackson.jpg' alt='Ezra' className={styles.ezraPhoto} />
        <p className={styles.dedicationText}>
          This app is dedicated to Ezra Jackson, who was the inspiration for setting up this platform. Ezra was a passionate advocate for making the world a better place and was deeply committed to environmental causes.
        </p>
        <p className={styles.dedicationText}>
          Ezra's family has set up a forest donation page, as Ezra was very passionate about saving the environment. You can contribute to their memory by donating to their grove: <a href='https://treesforlife.org.uk/groves/g8898/' target='_blank' rel='noopener noreferrer' className={styles.donationLink}>Dedicated to Ezra - Our very own Eco-Warrior</a>.
        </p>
      </div>
    
    </div>
  );
}
