import { type FC, useState } from 'react';
import PageLayout from '../components/layout/PageLayout';
import CarouselArrow from '../components/ui/CarouselArrow';
import SectionTitle from '../components/ui/SectionTitle';
import ActionButton from '../components/ui/ActionButton';
import FormField from '../components/ui/FormField';
import { INPUT_CLS, INPUT_STYLE } from '../components/ui/FormField';
import RadioOption from '../components/ui/RadioOption';
import qnaImage from '../assets/QnA.png';

/* ───── Stage card data ───── */
const stages = [
  {
    num: '1',
    title: 'Заполните форму заказа',
    desc: 'Оставьте данные для связи, прикрепите референсы дизайна (если есть) и кратко опишите идею наполнения. Дизайнер свяжется с вами в течение 1-2 рабочих дней с момента отправки заявки.',
    bg: '#D9D9D9',
  },
  {
    num: '2',
    title: 'Пообщайтесь\nс дизайнером',
    desc: 'До начала сборки макета дизайнер ответит на любые ваши вопросы и обозначит сроки. Подготовка макета занимает 4-7 рабочих дней, в зависимости от количества страниц. На этом этапе нужно внести предоплату.',
    bg: '#EFEFEF',
  },
  {
    num: '3',
    title: 'Утвердите\nмакет',
    desc: 'Дизайнер согласует с вами макет и при необходимости внесет правки. На внесение изменений предусмотрено 1-3 дня. После утверждения макета, перед отправкой в печать,  нужно внести остаток оплаты.',
    bg: '#D9D9D9',
  },
  {
    num: '4',
    title: 'Ожидайте доставку',
    desc: 'После согласования макета дизайнер отправит его в печать. Информацию по доставке вы будете получать на номер телефона. Оплатите остаток и ожидайте',
    bg: '#EFEFEF',
  },
];

/* ───── FAQ data ───── */
const faqData = [
  {
    q: 'Зачем мне индивидуальный заказ?',
    a: 'Если вы не хотите разбираться с конструктором, или ваш запрос требует персонального подхода, то рекомендуем заказать работу профессионала.',
  },
  {
    q: 'Сколько страниц можно сделать?',
    a: 'Можно сделать от 16 (не рекомендуем меньше) до 32 страниц. Далее каждые 2 разворота с доплатой +1000р.',
  },
  {
    q: 'Мне нужно придумать дизайн?',
    a: 'Вы можете отправить дизайнеру свои референсы, либо выбрать из предложенных им стилей.',
  },
  {
    q: 'Сколько стоит?',
    a: 'Цена зависит от сложности дизайна и количества страниц которые вы хотите получить.',
  },
];

/* ───── DaData suggestion type ───── */
interface DaDataSuggestion {
  value: string;
  unrestricted_value: string;
  data: Record<string, unknown>;
}

/* ───── Main page ───── */
const DesignerServicePage: FC = () => {
  const [agreed, setAgreed] = useState(false);
  const [contactMethod, setContactMethod] = useState<'telegram' | 'vk'>('telegram');

  // ФИО, телефон, соцсеть, адрес, комментарий
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [username, setUsername] = useState('@');
  const [comment, setComment] = useState('');
  
  // DaData Address Autocomplete
  const [addressQuery, setAddressQuery] = useState('');
  const [suggestions, setSuggestions] = useState<DaDataSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // FIXME: VITE_-переменные попадают в клиентский бандл — проксируйте запросы через бэкенд
  const dadataToken = import.meta.env.VITE_DADATA_TOKEN as string;

  const fetchAddresses = async (query: string): Promise<DaDataSuggestion[]> => {
    const url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";

    try {
      const res = await fetch(url, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": "Token " + dadataToken
        },
        body: JSON.stringify({ query })
      });
      const data = await res.json();
      return data.suggestions || [];
    } catch (e) {
      console.error(e);
      return [];
    }
  };

  const handleAddressChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setAddressQuery(val);
    if (val.length > 2) {
      const results = await fetchAddresses(val);
      setSuggestions(results);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const selectAddress = (addr: string) => {
    setAddressQuery(addr);
    setShowSuggestions(false);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    if (!val) {
      setPhone('');
      return;
    }
    if (val[0] === '7' || val[0] === '8') {
      val = val.slice(1);
    }
    let formatted = '+7';
    if (val.length > 0) formatted += ` (${val.substring(0, 3)}`;
    if (val.length > 3) formatted += `) ${val.substring(3, 6)}`;
    if (val.length > 6) formatted += `-${val.substring(6, 8)}`;
    if (val.length > 8) formatted += `-${val.substring(8, 10)}`;
    setPhone(formatted);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      alert('Пожалуйста, дайте согласие на обработку персональных данных');
      return;
    }
    console.log('Попытка оформить заказ:', {
      fullName, phone, contactMethod, username, address: addressQuery, comment
    });
    alert('Ваш заказ успешно сформирован! Данные выведены в консоль разработчика.');
  };

  return (
    <PageLayout>
      {/* ═══════ PAGE CONTENT ═══════ */}
      <div>
          {/* ── Title ── */}
          <SectionTitle
            as="h1"
            align="center"
            style={{
              lineHeight: '25px',
              marginTop: 'clamp(40px, 4.167vw, 80px)',
            }}
          >
            Индивидуальные заказы
          </SectionTitle>

          {/* ── Image carousel (Component 37) ── */}
          <div
            className="relative w-full"
            style={{
              maxWidth: 'clamp(900px, 97.5vw, 1872px)',
              margin: '0 auto',
              marginTop: 'clamp(20px, 1.736vw, 33px)',
              aspectRatio: '1404 / 459',
            }}
          >
            {/* Left photo — left:2.56% right:50.43% */}
            <div
              className="absolute bg-placeholder"
              style={{ left: '2.56%', right: '50.43%', top: 0, bottom: 0 }}
            />
            {/* Right placeholder — left:50.43% right:2.56% */}
            <div
              className="absolute bg-placeholder"
              style={{ left: '50.43%', right: '2.56%', top: 0, bottom: 0 }}
            />
            {/* Left arrow — positioned at left edge, vertically centered */}
            <div className="absolute" style={{ left: 0, top: '50%', transform: 'translate(-50%, -50%)' }}>
              <CarouselArrow direction="left" />
            </div>
            {/* Right arrow — positioned at right edge, vertically centered */}
            <div className="absolute" style={{ right: 0, top: '50%', transform: 'translate(50%, -50%)' }}>
              <CarouselArrow direction="right" />
            </div>
          </div>

          {/* ── ЭТАПЫ ── */}
          <section style={{ marginTop: 'clamp(80px, 8.333vw, 160px)' }}>
            <SectionTitle
              align="center"
              style={{
                lineHeight: '25px',
                marginBottom: 'clamp(21px, 2.118vw, 41px)',
              }}
            >
              ЭТАПЫ
            </SectionTitle>

            <div
              className="flex w-full"
              style={{ padding: '0 clamp(28px, 3.333vw, 64px)', gap: '0' }}
            >
              {stages.map((s) => (
                <div
                  key={s.num}
                  className="flex flex-col items-center"
                  style={{
                    flex: '1 1 0',
                    background: s.bg,
                    height: 'clamp(300px, 28.194vw, 541px)',
                    paddingTop: 'clamp(50px, 4.792vw, 92px)',
                    paddingLeft: 'clamp(18px, 2.986vw, 57px)',
                    paddingRight: 'clamp(18px, 2.986vw, 57px)',
                    paddingBottom: 'clamp(36px, 3.595vw, 69px)',
                  }}
                >
                  {/* Title */}
                  <p
                    className="font-inter font-semibold text-center uppercase text-black shrink-0"
                    style={{
                      fontSize: 'clamp(14px, 1.62vw, 31px)',
                      lineHeight: '1.2',
                      whiteSpace: 'pre-line',
                    }}
                  >
                    {s.title}
                  </p>

                  {/* Description */}
                  <p
                    className="font-inter font-normal text-center text-black shrink-0"
                    style={{
                      fontSize: 'clamp(9px, 0.778vw, 15px)',
                      lineHeight: 'clamp(14px, 0.972vw, 19px)',
                      marginTop: 'clamp(14px, 1.597vw, 31px)',
                      width: '100%',
                    }}
                  >
                    {s.desc}
                  </p>

                  {/* Number — pushed to bottom via marginTop auto */}
                  <p
                    className="font-syncopate font-bold text-center text-black"
                    style={{
                      fontSize: 'clamp(55px, 6.222vw, 119px)',
                      lineHeight: '100%',
                      marginTop: 'auto',
                    }}
                  >
                    {s.num}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ── ORDER FORM ── */}
          <section style={{ marginTop: 'clamp(100px, 10.417vw, 200px)' }}>
            <SectionTitle
              weight="bold"
              align="center"
              style={{
                lineHeight: 'clamp(25px, 1.736vw, 33px)',
              }}
            >
              ОФОРМИТЬ ЗАКАЗ<br />НА СБОРКУ
            </SectionTitle>

            {/* Form container — 524px at 1440, scales to 699px at 1920 */}
            <form
              onSubmit={handleSubmit}
              style={{
                maxWidth: 'clamp(524px, 36.389vw, 699px)',
                margin: '0 auto',
                marginTop: 'clamp(18px, 1.667vw, 32px)',
              }}
            >
              {/* Subtitle */}
              <h3
                className="font-inter font-semibold uppercase text-black text-center"
                style={{
                  fontSize: 'clamp(14px, 1.25vw, 24px)',
                  lineHeight: 'clamp(22px, 1.528vw, 29px)',
                  marginBottom: 'clamp(35px, 3.403vw, 65px)',
                }}
              >
                Контактная информация
              </h3>

              {/* ── ФИО ── */}
              <FormField
                label="Ваше ФИО"
                required
                inputProps={{
                  type: 'text',
                  required: true,
                  value: fullName,
                  onChange: (e) => setFullName(e.target.value),
                }}
              />

              {/* ── Телефон ── */}
              <FormField
                label="Телефон"
                required
                mb="clamp(33px, 3.403vw, 65px)"
                inputProps={{
                  type: 'tel',
                  required: true,
                  value: phone,
                  onChange: handlePhoneChange,
                  placeholder: '+7 ( _ _ _ ) _ _ _ - _ _ - _ _',
                }}
              />

              {/* ── Способ связи ── */}
              <div style={{ marginBottom: 'clamp(19px, 2.014vw, 39px)' }}>
                <p
                  className="font-inter font-normal text-black"
                  style={{
                    fontSize: 'clamp(11px, 0.903vw, 17px)',
                    lineHeight: 'clamp(16px, 1.111vw, 21px)',
                    marginBottom: 'clamp(14px, 1.389vw, 27px)',
                  }}
                >
                  Предпочтительный способ связи
                </p>
                <div className="flex flex-col" style={{ gap: 'clamp(8px, 0.694vw, 13px)', marginLeft: 'clamp(2px, 0.139vw, 3px)' }}>
                  <RadioOption
                    name="contact"
                    label="Свяжемся в Telegram"
                    checked={contactMethod === 'telegram'}
                    onChange={() => setContactMethod('telegram')}
                  />
                  <RadioOption
                    name="contact"
                    label="Свяжемся в ВКонтакте"
                    checked={contactMethod === 'vk'}
                    onChange={() => setContactMethod('vk')}
                  />
                </div>
              </div>

              {/* ── Имя пользователя (соцсети) ── */}
              <FormField label="Имя пользователя" required>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (!val.startsWith('@') && val.length > 0) {
                      setUsername('@' + val.replace(/@/g, ''));
                    } else if (val === '') {
                      setUsername('');
                    } else {
                      setUsername(val);
                    }
                  }}
                  onBlur={() => {
                    if (username && !username.startsWith('@')) {
                      setUsername('@' + username);
                    } else if (!username) {
                      setUsername('@');
                    }
                  }}
                  placeholder="@"
                  className={INPUT_CLS}
                  style={INPUT_STYLE}
                />
              </FormField>

              {/* ── Адрес доставки ── */}
              <FormField
                label="Адрес доставки"
                required
                hint="Город, Адрес удобного пункта СДЕК/Яндекс Маркета"
              >
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={addressQuery}
                    onChange={handleAddressChange}
                    onFocus={() => { if (suggestions.length > 0) setShowSuggestions(true); }}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                    className={INPUT_CLS}
                    style={INPUT_STYLE}
                  />
                  {showSuggestions && suggestions.length > 0 && (
                     <ul className="absolute z-10 w-full bg-white border border-input-bg shadow-lg max-h-[200px] overflow-auto">
                        {suggestions.map((s, idx) => (
                          <li
                            key={idx}
                            onClick={() => selectAddress(s.value)}
                            className="cursor-pointer hover:bg-input-bg px-3 py-2 font-inter text-black"
                            style={{
                              fontSize: 'clamp(11px, 0.903vw, 17px)',
                            }}
                          >
                            {s.value}
                          </li>
                        ))}
                     </ul>
                  )}
                </div>
              </FormField>

              {/* ── Комментарий ── */}
              <FormField
                label="Комментарий"
                as="textarea"
                hint="Напишите сколько хотели бы страниц, просьбы по дизайну и наполнению."
                textareaProps={{
                  value: comment,
                  onChange: (e) => setComment(e.target.value),
                }}
              />

              {/* ── Price box ── */}
              <div
                className="w-full bg-input-bg flex flex-col items-center justify-center"
                style={{ height: 'clamp(85px, 7.986vw, 153px)' }}
              >
                <p
                  className="font-inter font-normal text-black text-center"
                  style={{
                    fontSize: 'clamp(11px, 0.903vw, 17px)',
                    lineHeight: 'clamp(16px, 1.111vw, 21px)',
                  }}
                >
                  Точная стоимость заказа будет рассчитана после консультации
                </p>
                <p
                  className="font-inter font-semibold text-black text-center"
                  style={{
                    fontSize: 'clamp(14px, 1.25vw, 24px)',
                    lineHeight: 'clamp(22px, 1.528vw, 29px)',
                    marginTop: 'clamp(6px, 0.694vw, 13px)',
                  }}
                >
                  от 6.500 до 10.500 ₽
                </p>
              </div>

              {/* ── Disclaimer ── */}
              <p
                className="font-inter font-normal text-muted"
                style={{
                  fontSize: 'clamp(8px, 0.694vw, 13px)',
                  lineHeight: 'clamp(10px, 0.833vw, 16px)',
                  marginTop: 'clamp(10px, 0.833vw, 16px)',
                }}
              >
                Услуга сборки журнала дизайнером осуществляется по предоплате. Цена зависит от
                количества страниц. Предоплата не возвратна если макет взят в работу.
              </p>

              {/* ── Submit button ── */}
              <div
                className="flex justify-center"
                style={{ marginTop: 'clamp(30px, 2.778vw, 53px)' }}
              >
                <ActionButton
                  variant="accent"
                  type="submit"
                  className="font-helvetica"
                  style={{
                    width: 'clamp(180px, 14.792vw, 284px)',
                    height: 'clamp(34px, 2.778vw, 53px)',
                    fontSize: 'clamp(11px, 0.903vw, 17px)',
                    lineHeight: 'clamp(15px, 1.042vw, 20px)',
                  }}
                >
                  Оформить
                </ActionButton>
              </div>

              {/* ── Consent checkbox ── */}
              <div
                className="flex items-center justify-center"
                style={{
                  gap: 'clamp(6px, 0.556vw, 11px)',
                  marginTop: 'clamp(14px, 1.389vw, 27px)',
                  marginBottom: 'clamp(40px, 4.167vw, 80px)',
                }}
              >
                <button
                  type="button"
                  onClick={() => setAgreed(!agreed)}
                  className="shrink-0 cursor-pointer border border-black bg-white flex items-center justify-center p-0"
                  style={{
                    width: 'clamp(10px, 0.833vw, 16px)',
                    height: 'clamp(10px, 0.833vw, 16px)',
                  }}
                  aria-label="Согласие на обработку данных"
                >
                  {agreed && (
                    <svg width="66%" height="50%" viewBox="0 0 8 6" fill="none">
                      <path d="M1 3L3 5L7 1" stroke="#000" strokeWidth="1" />
                    </svg>
                  )}
                </button>
                <span
                  className="font-inter font-normal text-[#1A1A1A]"
                  style={{
                    fontSize: 'clamp(8px, 0.694vw, 13px)',
                    lineHeight: 'clamp(10px, 0.833vw, 16px)',
                  }}
                >
                  Даю согласие на обработку персональных данных
                </span>
              </div>
            </form>
          </section>

          {/* ── FAQ ── */}
          <section
            className="flex w-full items-stretch"
            style={{
              padding: '0 clamp(28px, 3.333vw, 64px)',
              marginTop: 'clamp(80px, 8.333vw, 160px)',
              gap: 'clamp(16px, 1.944vw, 37px)',
            }}
          >
            {/* Left Column (Title + Image) */}
            <div
              className="flex flex-col shrink-0"
              style={{
                width: 'clamp(400px, 50vw, 960px)',
              }}
            >
              <SectionTitle
                style={{
                  lineHeight: 'clamp(18px, 1.736vw, 33px)',
                  marginBottom: 'clamp(10px, 1.389vw, 27px)',
                }}
              >
                Вопрос-ответ
              </SectionTitle>
              {/* Left image */}
              <div
                className="bg-placeholder w-full"
                style={{
                  aspectRatio: '720 / 496',
                  backgroundImage: `url(${qnaImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
            </div>

            {/* Right Q&A */}
            <div 
              className="flex-1 min-w-0 flex flex-col justify-end" 
            >
              {faqData.map((item, i) => (
                <div key={i} className="flex flex-col w-full">
                  <div 
                    className="flex items-start w-full"
                    style={{
                      paddingTop: i === 0 ? 0 : 'clamp(14px, 1.6vw, 32px)',
                      paddingBottom: 'clamp(14px, 1.6vw, 32px)'
                    }}
                  >
                    <p
                      className="font-inter font-semibold text-[#000000] shrink-0"
                      style={{
                        fontSize: 'clamp(14px, 1.25vw, 24px)',
                        lineHeight: 'clamp(18px, 1.528vw, 29px)',
                        width: 'clamp(150px, 15vw, 288px)',
                        paddingRight: 'clamp(10px, 1.111vw, 21px)'
                      }}
                    >
                      {item.q}
                    </p>
                    <p
                      className="font-inter font-normal text-[#000000] flex-1"
                      style={{
                        fontSize: 'clamp(11px, 0.972vw, 19px)',
                        lineHeight: 'clamp(14px, 1.18vw, 23px)',
                      }}
                    >
                      {item.a}
                    </p>
                  </div>
                  {/* Border line */}
                  <div className="w-full bg-[#000000] shrink-0" style={{ height: '1px' }} />
                </div>
              ))}
            </div>
          </section>

          {/* spacer before footer */}
          <div style={{ height: 'clamp(60px, 5.556vw, 107px)' }} />
      </div>
    </PageLayout>
  );
};

export default DesignerServicePage;
