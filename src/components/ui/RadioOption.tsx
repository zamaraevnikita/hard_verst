import { type FC } from 'react';

interface RadioOptionProps {
  name: string;
  label: string;
  checked: boolean;
  onChange: () => void;
}

const RadioOption: FC<RadioOptionProps> = ({ name, label, checked, onChange }) => (
  <label className="flex items-center cursor-pointer" style={{ gap: 'clamp(10px, 1.111vw, 21px)' }}>
    <span
      className="relative flex items-center justify-center shrink-0"
      style={{ width: 'clamp(22px, 1.806vw, 35px)', height: 'clamp(22px, 1.806vw, 35px)' }}
    >
      <span
        className="absolute rounded-full"
        style={{ width: '100%', height: '100%', background: 'var(--color-input-bg)' }}
      />
      {checked && (
        <span
          className="absolute rounded-full"
          style={{ width: '61.5%', height: '61.5%', background: 'var(--color-dot)' }}
        />
      )}
    </span>
    <input
      type="radio"
      name={name}
      className="sr-only"
      checked={checked}
      onChange={onChange}
    />
    <span
      className="font-inter font-normal text-black"
      style={{ fontSize: 'clamp(11px, 0.903vw, 17px)', lineHeight: 'clamp(16px, 1.111vw, 21px)' }}
    >
      {label}
    </span>
  </label>
);

export default RadioOption;
