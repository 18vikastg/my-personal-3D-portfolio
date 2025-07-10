import { FaLinkedin, FaGithub, FaInstagram, FaTwitter, FaEnvelope } from "react-icons/fa";

const socialLinks = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/vikas-t-g-09692325a/",
    icon: <FaLinkedin size={24} />,
  },
  {
    name: "GitHub",
    url: "https://github.com/18vikastg",
    icon: <FaGithub size={24} />,
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/vikas__t__g/",
    icon: <FaInstagram size={24} />,
  },
  {
    name: "X (Twitter)",
    url: "https://x.com/vikastg263399",
    icon: <FaTwitter size={24} />,
  },
  {
    name: "Email",
    url: "mailto:vikastg2000@gmail.com",
    icon: <FaEnvelope size={24} />,
  },
];

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="flex flex-col justify-center">
          <p>Terms & Conditions</p>
        </div>
        <div className="socials">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="icon"
              aria-label={social.name}
            >
              {social.icon}
            </a>
          ))}
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-center md:text-end">
            © {new Date().getFullYear()} Vikas T G. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;