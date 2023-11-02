import React from 'react'
import styles from '../theme.module.css'

const Footer = props => {
  return (
    <section
      className={`${styles.section} ${styles.sectionLg} ${styles.sectionFooter}`}>
      <div className={styles.container}>
        <div className="row justify-content-center">
          <div
            className={`col-md-4 text-left ${styles.footerColumn} footer-column`}>
            <h5>About</h5>
            <p>
              In a world driven by dynamic digital landscapes, Dopebase emerges
              as a revolutionary open-source app builder platform, positioned as
              a formidable alternative to WordPress. Engineered with the
              contemporary developer in mind, it offers a canvas that is both
              expansive and intuitive, ready to facilitate your most ambitious
              projects. <br /> <br />
              Modern open-source app builder platform as an alternative to
              WordPress. Build scalable websites, blogs, SaaS products, AI
              agents, mobile apps.
            </p>
            <ul>
              <li>
                <a href="https://dopebase.com/">Dopebase</a>
              </li>
              <li>
                <a href="https://dopebase.com/tutorials">Tutorials</a>
              </li>
              <li>
                <a href="https://dopebase.com/contact-us/" rel="nofollow">
                  Contact Us
                </a>
              </li>
              {/* <li>
                <a href="https://dopebase.com/about/">About us</a>
              </li>
              
              <li>
                <a href="https://dopebase.com/contact-us/" rel="nofollow">
                  Write for Us
                </a>
              </li> */}
            </ul>
          </div>

          <div className={`col-md-2 text-left ${styles.footerColumn}`}>
            <h5>Legal</h5>
            <ul>
              <li>
                <a href="https://dopebase.com/terms/" rel="nofollow">
                  Terms of service
                </a>
              </li>
              <li>
                <a href="https://dopebase.com/privacy/" rel="nofollow">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          <div className={`col-md-4 text-right ${styles.footerColumn}`}>
            <h5>Resources</h5>
            <ul>
              <li>
                <a href="https://reactjs.org" target="_blank">
                  React
                </a>
              </li>
              <li>
                <a href="https://angular.io/" target="_blank">
                  Angular
                </a>
              </li>
              <li>
                <a href="https://reactnative.dev" target="_blank">
                  React Native
                </a>
              </li>
              <li>
                <a href="https://developer.apple.com/swift/" target="_blank">
                  Swift
                </a>
              </li>
              <li>
                <a
                  href="https://developer.apple.com/tutorials/swiftui"
                  target="_blank">
                  SwiftUI
                </a>
              </li>
              <li>
                <a href="https://flutter.dev" target="_blank">
                  Flutter
                </a>
              </li>
            </ul>
          </div>
          <div className={styles.footerSocialContainer}>
            <ul>
              <li>
                <a href="https://github.com/dopebase" target="_blank">
                  <i className="fa fa-github"></i>
                </a>
              </li>
              <li>
                <a href="https://www.facebook.com/dopebasehq/" target="_blank">
                  <i className="fa fa-facebook"></i>
                </a>
              </li>
              <li>
                <a href="https://twitter.com/dopebasehq" target="_blank">
                  <i className="fa fa-twitter"></i>
                </a>
              </li>
              <li>
                <a href="https://dribbble.com/dopebase" target="_blank">
                  <i className="fa fa-dribbble"></i>
                </a>
              </li>
              {/* <li>
                <a href="https://www.youtube.com/channel/UCAevyudbV0G9b4E4IceF7GQ">
                  Youtube
                </a>
              </li> */}
            </ul>
          </div>
        </div>
        <div className="row justify-content-center container-copyright">
          <div className="content-copyright">
            <p>Dopebase © {new Date().getFullYear()}. All rights reserved.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Footer
