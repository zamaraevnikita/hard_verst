import { type FC, type ReactNode, type InputHTMLAttributes, type TextareaHTMLAttributes } from 'react';

interface FormFieldBaseProps {
  label: string;
  required?: boolean;
  hint?: string;
  /** Extra bottom margin. Default = 'clamp(19px, 2.431vw, 47px)' */
  mb?: string;
  children?: ReactNode;
}

interface InputFieldProps extends FormFieldBaseProps {
  as?: 'input';
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
}

interface TextareaFieldProps extends FormFieldBaseProps {
  as: 'textarea';
  textareaProps?: TextareaHTMLAttributes<HTMLTextAreaElement>;
  /** Height of textarea. Default = 'clamp(120px, 11.181vw, 215px)' */
  textareaHeight?: string;
}

export type FormFieldProps = InputFieldProps | TextareaFieldProps;

/* Star component (for required marker) */
const Star: FC = () => (
  <svg width="5" height="5" viewBox="0 0 5 5" fill="none" className="shrink-0">
    <line x1="2.5" y1="0" x2="2.5" y2="5" stroke="#000" strokeWidth="0.5" />
    <line x1="0" y1="2.5" x2="5" y2="2.5" stroke="#000" strokeWidth="0.5" />
    <line x1="0.62" y1="0.62" x2="4.38" y2="4.38" stroke="#000" strokeWidth="0.5" />
    <line x1="4.38" y1="0.62" x2="0.62" y2="4.38" stroke="#000" strokeWidth="0.5" />
  </svg>
);

export const INPUT_CLS = "w-full bg-input-bg border-none font-inter text-black outline-none";
export const INPUT_STYLE = {
  height: 'clamp(40px, 3.611vw, 69px)',
  paddingLeft: 'clamp(12px, 1.111vw, 21px)',
  paddingRight: 'clamp(12px, 1.111vw, 21px)',
  fontSize: 'clamp(11px, 0.903vw, 17px)',
};

/**
 * Поле формы: label + (Star) + (hint) + input/textarea.
 * Если нужен кастомный контент вместо стандартного input — передай `children`.
 */
const FormField: FC<FormFieldProps> = (props) => {
  const { label, required, hint, mb = 'clamp(19px, 2.431vw, 47px)', children } = props;

  return (
    <div style={{ marginBottom: mb }}>
      <label
        className="flex items-center font-inter font-normal text-black"
        style={{
          fontSize: 'clamp(11px, 0.903vw, 17px)',
          lineHeight: 'clamp(16px, 1.111vw, 21px)',
          gap: 'clamp(4px, 0.347vw, 7px)',
          marginBottom: hint ? 'clamp(4px, 0.347vw, 7px)' : 'clamp(6px, 0.694vw, 13px)',
        }}
      >
        {label}
        {required && <Star />}
      </label>

      {hint && (
        <p
          className="font-inter font-normal text-muted"
          style={{
            fontSize: 'clamp(8px, 0.694vw, 13px)',
            lineHeight: 'clamp(10px, 0.833vw, 16px)',
            marginBottom: 'clamp(4px, 0.347vw, 7px)',
          }}
        >
          {hint}
        </p>
      )}

      {children ? (
        children
      ) : props.as === 'textarea' ? (
        <textarea
          className={`${INPUT_CLS} resize-none`}
          style={{
            ...INPUT_STYLE,
            height: props.textareaHeight ?? 'clamp(120px, 11.181vw, 215px)',
            paddingTop: 'clamp(10px, 0.833vw, 16px)',
            paddingBottom: 'clamp(10px, 0.833vw, 16px)',
          }}
          {...props.textareaProps}
        />
      ) : (
        <input
          className={INPUT_CLS}
          style={INPUT_STYLE}
          {...(props as InputFieldProps).inputProps}
        />
      )}
    </div>
  );
};

export default FormField;
