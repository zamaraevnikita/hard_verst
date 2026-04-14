import { type FC, type ReactNode } from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';

interface PageLayoutProps {
  children: ReactNode;
  /** Дополнительные классы для корневого div */
  className?: string;
  /** Inline-стили для корневого div */
  style?: React.CSSProperties;
  /** Дополнительные классы для <main> */
  mainClassName?: string;
  /** Inline-стили для <main> */
  mainStyle?: React.CSSProperties;
  /** Показывать ли отступ под Navbar (default: true). ProductPage не использует. */
  navSpacer?: boolean;
}

const PageLayout: FC<PageLayoutProps> = ({
  children,
  className = '',
  style,
  mainClassName = '',
  mainStyle,
  navSpacer = true,
}) => {
  return (
    <div
      className={`min-h-screen bg-white flex flex-col ${className}`}
      style={style}
    >
      <Navbar variant="light" />
      {navSpacer && (
        <div style={{ height: 'clamp(50px, 4.65vw, 89px)' }} />
      )}
      <main
        className={`page-container flex-1 ${mainClassName}`}
        style={mainStyle}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PageLayout;
