import { Button } from 'flowbite-react';

/**
 * Renders a customizable button component that can include optional icons and styling.
 *
 * @param {Object} props - The properties passed to the CustomButton component.
 * @param {string} props.text - The text to be displayed inside the button.
 * @param {React.ReactNode} [props.icon=null] - An optional icon to be displayed alongside the button text.
 * @param {boolean} [props.iconBefore=false] - Determines whether the icon appears before the text (true) or after the text (false).
 * @param {string} [props.className=""] - Additional CSS class names to apply to the button for custom styling.
 * @param {...Object} props.props - Additional props to be passed down to the underlying Button component.
 * @return {JSX.Element} A customizable button component with optional icons and styling.
 */
export default function CustomButton({ text, icon = null, iconBefore = false, className = '', ...props }) {
  return (
    <Button {...props} className={icon ? '[&>span]:flex [&>span]:items-center' + ' ' + className : '' + ' ' + className}>
      {!icon ? (
        text
      ) : (
        <>
          {iconBefore && icon}
          <span>{text}</span>
          {!iconBefore && icon}
        </>
      )}
    </Button>
  );
}
