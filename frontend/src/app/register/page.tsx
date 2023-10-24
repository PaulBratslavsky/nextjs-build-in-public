import React from "react";

// UI components
import RegisterForm from "./RegisterForm";

export default function RegisterRoute() {
  return (
    <div className="container mx-auto py-10">
      <div className="formWrapper mx-auto max-w-3xl">
        <RegisterForm />
      </div>
    </div>
  );
}
