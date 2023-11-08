import styles from './TestimonialSection.module.css'
import themeStyles from '../../theme.module.css'

const TestimonialSection = () => {
  const testimonials = [
    {
      id: 1,
      content:
        'This SaaS starter kit has been a game-changer for our team. It saved us countless hours that we would have otherwise spent on boilerplate code.',
      author: 'Alex Paduraru',
      role: 'CEO at Creative Tim',
      photo: '/images/testimonial1.jpg', // Placeholder image path
    },
    {
      id: 2,
      content:
        'As a startup, every penny counts. This starter kit not only saved us money but also allowed us to launch our MVP in record time.',
      author: 'Mircea Dima',
      role: 'Co-founder of Algocademy',
      photo: '/images/testimonial2.jpg', // Placeholder image path
    },
    {
      id: 3,
      content:
        "The code quality and documentation are outstanding. It's like having an extra developer on the team dedicated to best practices!",
      author: 'Cristina Radulescu',
      role: 'Lead Developer at Google',
      photo: '/images/testimonial3.jpg', // Placeholder image path
    },
  ]

  return (
    <section
      className={`${themeStyles.sectionContainer} ${styles.testimonialSection}`}>
      <h2 className={styles.testimonialTitle}>What our clients are saying</h2>
      <div className={styles.testimonials}>
        {testimonials.map(testimonial => (
          <div key={testimonial.id} className={styles.testimonialCard}>
            <p className={styles.testimonialContent}>"{testimonial.content}"</p>
            <div className={styles.authorInfo}>
              <img
                src={testimonial.photo}
                alt={`${testimonial.author}`}
                className={styles.authorPhoto}
              />
              <div>
                <div className={styles.authorName}>{testimonial.author}</div>
                <div className={styles.authorRole}>{testimonial.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default TestimonialSection
