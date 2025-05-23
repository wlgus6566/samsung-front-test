import KeyVisual from "@/components/layout/key-visual";
export default function Contents({
  title,
  backgroundImage,
  description,
  children,
  className = "",
  marginTop = "mt-[120px]",
  marginBottom = "mb-[200px]",
}) {
  return (
    <div className="max-w-[var(--breakpoint-xl)] md:px-10 px-5 mx-auto min-h-[calc(100vh-480px)]">
      <KeyVisual
        title={title}
        description={description}
        backgroundImage={backgroundImage}
      />
      <main
        className={`container-fixed ${marginTop} ${marginBottom} ${className}`}
      >
        {children}
      </main>
    </div>
  );
}
