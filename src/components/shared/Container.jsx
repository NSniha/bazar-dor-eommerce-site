export default function Container({
  children,
  className = "",
  as: Component = "div",
}) {
  return (
    <Component
      className={`mx-auto w-full max-w-310 px-4 ${className}`}
    >
      {children}
    </Component>
  );
}