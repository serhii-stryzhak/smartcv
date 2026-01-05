import type { ResumeData } from './types/resume';
import {
  Layout,
  Header,
  About,
  Experience,
  Skills,
  Education,
  Contacts,
  DownloadButton,
} from './components';

interface AppProps {
  data: ResumeData;
}

export const App = ({ data }: AppProps) => (
  <Layout>
    <Header personal={data.personal} />
    <About about={data.about} />
    <Experience experience={data.experience} />
    <Skills skills={data.skills} />
    <Education education={data.education} />
    <Contacts contacts={data.contacts} />
    <DownloadButton />
  </Layout>
);
