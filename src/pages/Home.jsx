import React from "react";
import { useLocation } from "react-router-dom";

export default function Home() {
  const { pathname } = useLocation();
  const isAdvanced = pathname.startsWith("/advanced");

  return (
    <div className="bg-[#fbfbfc] px-4 py-8 flex flex-col items-center">
      <h1 className="text-xl sm:text-xl md:text-2xl font-extrabold text-[#050719] mb-8 text-center max-w-md">
        {isAdvanced
          ? "Advanced Demo - Dynamic 'Partial' ID"
          : "Basic Demo - Dynamic ID"}
      </h1>

      {!isAdvanced && (
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-w-4xl w-full">
          <LinkCard to={`${pathname}/register`} label="End User Registration" />
          <LinkCard to={`${pathname}/auth-id`} label="User ID Card" />
          <LinkCard to={`${pathname}/rp1`} label="User Transaction - RP1" />
          <LinkCard to={`${pathname}/rp2`} label="User Transaction - RP2" />
        </div>
      )}

      {isAdvanced && (
        <div className="grid gap-6 sm:gap-6 grid-cols-1 sm:grid-cols-2 max-w-3xl w-full">
          <LinkCard
            to="/advanced/govt-id"
            label="Govt. ID and Payment Cards"
            big
          />
          <LinkCard
            to="/advanced/online-auth"
            label="Online Authentication"
            big
          />
        </div>
      )}
    </div>
  );
}

// Reusable card component
function LinkCard({ to, label, big }) {
  return (
    <a
      href={to}
      target="_blank"
      rel="noopener noreferrer"
      className={`group bg-white rounded-lg ${
        big ? "p-6 sm:p-7" : "p-4 sm:p-5"
      } shadow-sm border border-[#dee6ea] flex items-center justify-center text-center transition duration-300 hover:shadow-md hover:border-[#ff5800] hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#ff5800]`}
    >
      <span
        className={`${
          big ? "text-lg sm:text-xl" : "text-sm sm:text-base"
        } font-semibold text-[#23282d] group-hover:text-[#ff5800]`}
      >
        {label}
      </span>
    </a>
  );
}
