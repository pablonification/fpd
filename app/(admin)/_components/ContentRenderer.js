import ContactForm from '../content/Contact';
import ResearchProjectManagement from '../content/Reserch';
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
    case 'Projects/Researcher':
      return <ResearchProjectManagement />;
    default:
      return <div>Pilih menu</div>;
  }
}
