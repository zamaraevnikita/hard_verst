import { type CSSProperties } from 'react';

export interface ToggleOption<T extends string | number = string> {
  value: T;
  label: string;
}

export interface ToggleButtonGroupProps<T extends string | number = string> {
  options: ToggleOption<T>[];
  value: T;
  onChange: (value: T) => void;
  /** Button height. Default = 'clamp(30px, 2.5vw, 48px)' */
  height?: string;
  /** Font size. Default = 'clamp(12px, 1.1vw, 21px)' */
  fontSize?: string;
  /** Gap between buttons. Default = 'clamp(10px, 0.694vw, 13px)' */
  gap?: string;
  /** Extra class for container */
  className?: string;
  /** Extra style for container */
  style?: CSSProperties;
  /** Style per button */
  buttonStyle?: CSSProperties;
}

/**
 * Toggle selector row — accent (#F4D9E2) when selected, outline when not.
 * Used for page count, production time, delivery tabs, etc.
 */
function ToggleButtonGroup<T extends string | number = string>({
  options,
  value,
  onChange,
  height = 'clamp(30px, 2.5vw, 48px)',
  fontSize = 'clamp(12px, 1.1vw, 21px)',
  gap = 'clamp(10px, 0.694vw, 13px)',
  className = '',
  style,
  buttonStyle,
}: ToggleButtonGroupProps<T>) {
  return (
    <div className={`flex w-full ${className}`} style={{ gap, ...style }}>
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            type="button"
            key={String(opt.value)}
            onClick={() => onChange(opt.value)}
            className="flex justify-center items-center flex-1 transition-opacity hover:opacity-80"
            style={{
              backgroundColor: active ? '#F4D9E2' : '#FFFFFF',
              border: active ? '1px solid transparent' : '1px solid #000',
              height,
              fontSize,
              ...buttonStyle,
            }}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

export default ToggleButtonGroup;
