import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

const Footer = () => {
  return (
    <footer className="w-full bg-gray-200  text-black py-4 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">© 2024 Task Master. All rights reserved.</p>
          </div>
          
          <div className="flex space-x-6">
            <a
              href="https://github.com/walonCode"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400 transition-colors"
            >
              <FaGithub size={24} />
            </a>
            <a
              href="https://linkedin.com/in/walonjalloh"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400 transition-colors"
            >
              <FaLinkedin size={24} />
            </a>
            <a
              href="mailto:mohamedlaminwalonjalloh@gmail.com"
              className="hover:text-gray-400 transition-colors"
            >
              <MdEmail size={24} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
