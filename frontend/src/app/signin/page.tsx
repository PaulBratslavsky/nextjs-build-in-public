import React from "react";

// UI components
import SigninForm from "./SigninForm";
export default function RegisterRoute() {
  return (
    <div className="container mx-auto py-10">
      <div className="formWrapper mx-auto max-w-xl rounded-md shadow-md">
        <SigninForm />
      </div>
    </div>
  );
}
