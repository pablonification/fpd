import ContactForm from '../content/Contact';
import Gallery from '../content/Gallery';
import Home from '../content/Home';
import NewsAdmin from '../content/News';
import Researcher from '../content/Researcher';
import ResearchProjectManagement from '../content/ResearchProject';
import UserForm from '../content/User';

const { default: AboutForm } = require('../content/About');

export default function ContentRenderer({ activeItem }) {
  switch (activeItem) {
    case 'About':
      return <AboutForm />;
    case 'Users':
      return <UserForm />;
    case 'Contact':
      return <ContactForm />;
    case 'Research Projects':
      return <ResearchProjectManagement />;
    case 'Home':
      return <Home></Home>;
    case 'Gallery':
      return <Gallery></Gallery>;
    case 'Researcher':
      return <Researcher></Researcher>;
    case 'News':
      return <NewsAdmin></NewsAdmin>;
    default:
      return <div>Pilih menu</div>;
  }
}
