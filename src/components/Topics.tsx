import { type FC, useRef, useState, useCallback, useLayoutEffect } from 'react';
import CarouselArrow from './ui/CarouselArrow';
import SectionTitle from './ui/SectionTitle';
import ActionButton from './ui/ActionButton';

const topics = [
  'письмо редактора',
  'путешествия',
  'факты',
  'увлечения',
  'список желаний',
  'обзор образов',
  'мода и стиль',
  'кулинария',
  'спорт',
  'музыка',
  'кино',
  'архитектура',
];

const VISIBLE = 6;
const BUFFER = 6; // увеличенный буфер для быстрых кликов

const Topics: FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  /*
    currentIndex — «зафиксированный» индекс первой видимой карточки (обновляется после анимации).
    animOffset — количество карточек сдвига, которое сейчас анимируется (отрицательное = влево).
    Когда анимация заканчивается, currentIndex += animOffset, animOffset = 0.
  */
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animOffset, setAnimOffset] = useState(0);
  const animatingRef = useRef(false);

  const getTopicByIndex = (i: number) => {
    const len = topics.length;
    return topics[((i % len) + len) % len];
  };

  const getStep = useCallback(() => {
    const track = trackRef.current;
    if (!track) return 220;
    const card = track.querySelector<HTMLElement>(':scope > div');
    if (!card) return 220;
    return card.offsetWidth + (parseFloat(getComputedStyle(track).gap) || 0);
  }, []);

  const goLeft = () => {
    setHoveredIndex(null);
    setAnimOffset((prev) => {
      const next = prev - 1;
      // не уходить дальше буфера
      return Math.max(next, -(BUFFER - 1));
    });
    animatingRef.current = true;
  };

  const goRight = () => {
    setHoveredIndex(null);
    setAnimOffset((prev) => {
      const next = prev + 1;
      return Math.min(next, BUFFER - 1);
    });
    animatingRef.current = true;
  };

  /* По окончании анимации — фиксируем позицию */
  const handleTransitionEnd = useCallback(
    (e: React.TransitionEvent<HTMLDivElement>) => {
      // Игнорируем всплывшие события от дочерних элементов (hover карточек)
      if (e.target !== e.currentTarget) return;
      if (e.propertyName !== 'transform') return;
      if (animOffset === 0) return;
      animatingRef.current = false;
      setCurrentIndex((prev) => prev + animOffset);
      setAnimOffset(0);
    },
    [animOffset]
  );

  /* Если animOffset стал 0 без анимации (после setCurrentIndex) — убедиться что lock снят */
  useLayoutEffect(() => {
    if (animOffset === 0) {
      animatingRef.current = false;
    }
  }, [animOffset, currentIndex]);

  /* Позиция трека */
  const step = getStep();
  const baseOffset = BUFFER * step;
  const translateX = baseOffset + animOffset * step;

  /* Окно рендера */
  const renderIndices: number[] = [];
  for (let i = -BUFFER; i < VISIBLE + BUFFER; i++) {
    renderIndices.push(currentIndex + i);
  }

  return (
    <section
      className="relative w-full text-center"
      style={{
        paddingTop: 'clamp(60px, 6.46vw, 124px)',
        paddingBottom: 'clamp(45px, 5vw, 96px)',
      }}
    >
      <div className="page-container relative">
        <SectionTitle
          align="center"
          className="tracking-[2px] mx-auto"
          style={{ fontSize: 'clamp(18px, 1.94vw, 37px)' }}
        >
          НЕ ПРОСТО ФОТОКНИГИ
        </SectionTitle>

        <p
          className="font-sans font-normal text-black text-center"
          style={{
            fontSize: 'clamp(10px, 0.83vw, 16px)',
            lineHeight: '1.17',
            marginTop: 'clamp(8px, 0.9vw, 17px)',
            maxWidth: 'clamp(280px, 27.4vw, 526px)',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          создай персональный журнал с известной обложкой, используя
          готовые идеи наполнения и дизайна
        </p>

        <div className="flex justify-center w-full" style={{ marginTop: 'clamp(40px, 5vw, 96px)' }}>
          <div
            className="relative"
            style={{
              width: `calc(${VISIBLE} * clamp(140px, 14.5vw, 278px) + ${VISIBLE - 1} * clamp(8px, 0.9vw, 17px))`,
              maxWidth: 'calc(100% - clamp(80px, 7vw, 134px))',
              overflow: 'clip',
              overflowY: 'visible',
            }}
          >
            {/* Стрелка назад */}
            <CarouselArrow
              direction="left"
              variant="glass"
              onClick={goLeft}
              className="absolute z-30"
              style={{
                left: 'clamp(6px, 0.5vw, 10px)',
                top: '50%',
                transform: 'translateY(-50%)',
              }}
            />

            {/* Стрелка вперёд */}
            <CarouselArrow
              direction="right"
              variant="glass"
              onClick={goRight}
              className="absolute z-30"
              style={{
                right: 'clamp(6px, 0.5vw, 10px)',
                top: '50%',
                transform: 'translateY(-50%)',
              }}
            />

            {/* Трек */}
            <div
              ref={trackRef}
              className="flex"
              style={{
                gap: 'clamp(8px, 0.9vw, 17px)',
                paddingBottom: 'clamp(20px, 2vw, 38px)',
                transform: `translateX(-${translateX}px)`,
                transition: animOffset !== 0
                  ? 'transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)'
                  : 'none',
                willChange: 'transform',
              }}
              onTransitionEnd={handleTransitionEnd}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {renderIndices.map((logicalIndex) => {
                const topic = getTopicByIndex(logicalIndex);
                let cardTransform = 'scale(1)';
                let opacity = hoveredIndex !== null ? 0.3 : 1;
                let zIndex = 1;

                if (hoveredIndex !== null) {
                  if (logicalIndex === hoveredIndex) {
                    cardTransform = 'scale(1.3)';
                    opacity = 1;
                    zIndex = 10;
                  } else if (logicalIndex < hoveredIndex) {
                    cardTransform = 'translate3d(-15%, 0, 0)';
                  } else {
                    cardTransform = 'translate3d(15%, 0, 0)';
                  }
                }

                return (
                  <div
                    key={logicalIndex}
                    className="flex flex-col items-stretch shrink-0"
                    style={{
                      width: 'clamp(140px, 14.5vw, 278px)',
                      transition: '450ms opacity, 450ms transform',
                      transformOrigin: 'center center',
                      transform: cardTransform,
                      opacity,
                      zIndex,
                      cursor: 'pointer',
                    }}
                    onMouseEnter={() => setHoveredIndex(logicalIndex)}
                    onTransitionEnd={(e) => e.stopPropagation()}
                  >
                    <span
                      className="font-sans font-normal text-black text-left whitespace-nowrap"
                      style={{
                        fontSize: 'clamp(10px, 0.89vw, 17px)',
                        lineHeight: '1.17',
                        paddingTop: 'clamp(6px, 0.61vw, 12px)',
                        paddingBottom: 'clamp(6px, 0.61vw, 12px)',
                        marginBottom: 'clamp(6px, 0.87vw, 17px)',
                      }}
                    >
                      {topic}
                    </span>
                    <div
                      className="w-full bg-white border border-black"
                      style={{ aspectRatio: '1 / 1' }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <ActionButton
          className="font-inter"
          style={{
            fontSize: 'clamp(9px, 0.76vw, 15px)',
            lineHeight: '1.18',
            padding: 'clamp(5px, 0.49vw, 9px) clamp(14px, 1.25vw, 24px)',
            marginTop: 'clamp(30px, 3.68vw, 71px)',
          }}
        >
          Перейти в конструктор
        </ActionButton>
      </div>
    </section>
  );
};

export default Topics;
