import { type FC } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import Footer from '../components/Footer';

/* Карточка проекта */
interface ProjectCardProps {
  title: string;
  pages: number;
  price: string;
  image?: string;
}

const ProjectCard: FC<ProjectCardProps> = ({ title, pages, price, image }) => (
  <div
    className="flex bg-white"
    style={{
      width: 'clamp(444px, 30.833vw, 592px)',
      height: 'clamp(227px, 15.764vw, 303px)',
    }}
  >
    {/* Картинка-превью */}
    <div
      className="shrink-0 bg-cover bg-center"
      style={{
        width: 'clamp(212px, 14.722vw, 283px)',
        height: '100%',
        background: image ? `url(${image}) center/cover no-repeat` : '#CCCCCC',
      }}
    />

    {/* Инфо */}
    <div
      className="flex flex-col justify-between border-t border-r border-b border-black"
      style={{
        padding: 'clamp(18px, 1.736vw, 33px) clamp(14px, 1.042vw, 20px)',
        flex: 1,
      }}
    >
      <div className="flex flex-col" style={{ gap: 'clamp(8px, 0.556vw, 11px)' }}>
        {/* Название */}
        <span
          className="font-['Syncopate'] font-normal uppercase"
          style={{
            fontSize: 'clamp(15px, 1.042vw, 20px)',
            lineHeight: '0.87',
            letterSpacing: '-0.03em',
            color: '#000000',
            marginBottom: 'clamp(18px, 1.25vw, 24px)',
          }}
        >
          {title}
        </span>

        {/* Страницы */}
        <span
          className="font-['Inter'] font-normal"
          style={{
            fontSize: 'clamp(13px, 0.903vw, 17px)',
            lineHeight: '1.23',
            color: '#000000',
            marginBottom: 'clamp(3px, 0.208vw, 4px)',
          }}
        >
          {pages} стр.
        </span>

        {/* Цена */}
        <span
          className="font-['Syncopate'] font-bold"
          style={{
            fontSize: 'clamp(15px, 1.042vw, 20px)',
            lineHeight: '1',
            letterSpacing: '0',
            color: '#111111',
          }}
        >
          {price}
        </span>
      </div>

      {/* Кнопки */}
      <div className="flex flex-col" style={{ gap: 'clamp(8px, 0.694vw, 13px)' }}>
        <Link
          to="/product"
          className="flex items-center justify-center no-underline font-['Helvetica'] font-normal text-black border border-black hover:bg-black hover:text-white transition-colors text-center"
          style={{
            width: 'clamp(197px, 13.681vw, 263px)',
            height: 'clamp(25px, 1.736vw, 33px)',
            fontSize: 'clamp(10px, 0.694vw, 13px)',
            lineHeight: '1',
            letterSpacing: '0',
          }}
        >
          Подробнее
        </Link>
        <button
          className="flex items-center justify-center font-['Helvetica'] font-normal text-white bg-black border border-black cursor-pointer hover:opacity-80 transition-opacity text-center"
          style={{
            width: 'clamp(197px, 13.681vw, 263px)',
            height: 'clamp(25px, 1.736vw, 33px)',
            fontSize: 'clamp(10px, 0.694vw, 13px)',
            lineHeight: '1',
            letterSpacing: '0',
          }}
        >
          Собрать
        </button>
      </div>
    </div>
  </div>
);

/* Кнопка "добавить проект" */
const AddProjectButton: FC = () => (
  <button
    className="flex items-center justify-center rounded-full bg-[#F6F6F6] border-none cursor-pointer hover:bg-[#EBEBEB] transition-colors"
    style={{
      width: 'clamp(53px, 3.681vw, 71px)',
      height: 'clamp(53px, 3.681vw, 71px)',
    }}
  >
    <svg
      viewBox="0 0 30 30"
      fill="none"
      style={{
        width: 'clamp(30px, 2.083vw, 40px)',
        height: 'clamp(30px, 2.083vw, 40px)',
      }}
    >
      <line x1="0" y1="15" x2="30" y2="15" stroke="#000000" strokeWidth="1" />
      <line x1="15" y1="0" x2="15" y2="30" stroke="#000000" strokeWidth="1" />
    </svg>
  </button>
);

const MyProjectsPage: FC = () => {
  // Заглушка: один демо-проект
  const projects: ProjectCardProps[] = [
    {
      title: 'Название',
      pages: 24,
      price: '6500₽',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar variant="light" />

      {/* spacer for fixed navbar */}
      <div style={{ height: 'clamp(50px, 4.65vw, 89px)' }} />

      {/* Контент */}
      <main
        className="page-container flex-1"
        style={{
          padding: `clamp(50px, 5.139vw, 99px) clamp(24px, 5.347vw, 103px)`,
        }}
      >
        {/* Заголовок */}
        <h1
          className="font-['Syncopate'] font-normal m-0"
          style={{
            fontSize: 'clamp(31px, 2.153vw, 41px)',
            lineHeight: '0.9',
            color: '#000000',
            marginBottom: 'clamp(30px, 4.653vw, 89px)',
          }}
        >
          МОИ ПРОЕКТЫ
        </h1>

        {/* Сетка: карточки + кнопка добавления */}
        <div
          className="flex flex-wrap items-center"
          style={{ gap: 'clamp(30px, 5.556vw, 107px)', marginBottom: 'clamp(200px, 20.833vw, 400px)' }}
        >
          {projects.map((project, i) => (
            <ProjectCard key={i} {...project} />
          ))}
          <AddProjectButton />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MyProjectsPage;
