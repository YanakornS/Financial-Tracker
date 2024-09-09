import React from "react";
import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/clerk-react";

function Home() {
 useEffect(() => {
  const getFinancial = async () => {
    try {
      const response = await FinancialService.getAllFinancial();
      if (response.status === 200) {
        setFinancials(response.data);
      }
    } catch (error) {
     
    }
  };
  getFinancial();
}, []);

  //<Financial financials={financials}/>
  return (
    <>
      <div className="container flex flex-row flex-wrap mx-auto items-center justify-center">
        <SignedOut>
          <h1 className="text-5xl font-bold mb-5 mt-5 text-[#c493ff] ">
            Welcome to your own Personal
          </h1>
        </SignedOut>
        <SignedIn>
          <Navigate to="/dashboard" />
        </SignedIn>
      </div>
    </>
  );
}

export default Home;
