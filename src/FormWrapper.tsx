import { ReactNode } from "react";

type FormWrapperProps = {
  title: string;
  children: ReactNode;
};

export function FormWrapper({ title, children }: FormWrapperProps) {
  return (
    <>
      <h2 style={{ textAlign: "center", margin: 0, marginBottom: "1rem" }}>
        {title}
      </h2>
      <div
        className="multistep-form "
        style={{
          display: "grid",
          gap: "1rem .5rem",
          justifyContent: "center",
          gridTemplateColumns: "minmax(300px, 70vh)",
        }}
      >
        {children}
      </div>
    </>
  );
}
