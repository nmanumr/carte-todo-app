import React, { forwardRef } from 'react';
import c from 'classnames';

const buttonClassesMap = {
  primary: 'uppercase inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-800 hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800',
  secondary: 'inline-flex justify-center bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800',
};

interface ButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  kind?: keyof typeof buttonClassesMap;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
}

export default forwardRef<HTMLButtonElement, ButtonProps>(({
  className, kind = 'primary', loading, children, disabled, ...props
}, ref) => (
  // eslint-disable-next-line react/button-has-type
  <button ref={ref} className={c(className, buttonClassesMap[kind])} disabled={disabled || loading} {...props}>
    {loading && (
    <div className="left-0 absolute w-full flex justify-center">
      <div className="border-2 border-white/40 border-t-white w-5 h-5 rounded-full animate-spin" />
    </div>
    )}
    <span className={loading ? 'opacity-0' : ''}>{children}</span>
  </button>
));
