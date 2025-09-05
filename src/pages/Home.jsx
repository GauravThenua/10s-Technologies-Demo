import { useLocation } from "react-router-dom";

export default function Home() {
  const { pathname } = useLocation();
  const isAdvanced = pathname.startsWith("/advanced");

  const links = [
    { to: `${pathname}/register`, label: "End User Registration" },
    { to: `${pathname}/auth-id`, label: "User Auth - ID" },
    { to: `${pathname}/rp1`, label: "User Auth – RP1" },
    { to: `${pathname}/rp2`, label: "User Auth – RP2" },
  ];

  if (isAdvanced) {
    links.push(
      { to: `${pathname}/admin`, label: "IDP Admin Portal" },
      { to: `${pathname}/DBsearch`, label: "IDP DB Search" },
      { to: `${pathname}/mitm`, label: "Bad Guy Scenario – MITM" }
    );
  }

  return (
    <div className=" bg-[#fbfbfc] px-4 py-8 flex flex-col items-center">
      <h1 className="text-xl sm:text-xl md:text-2xl font-extrabold text-[#050719] mb-8 text-center max-w-md">
        {isAdvanced
          ? "Advanced Demo - Dynamic 'Partial' ID"
          : "Basic Demo - Dynamic ID"}
      </h1>

      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-w-4xl w-full">
        {links.map(({ to, label }) => (
          <LinkCard key={to} to={to} label={label} />
        ))}
      </div>
    </div>
  );
}

// LinkCard with new tab open
function LinkCard({ to, label }) {
  return (
    <a
      href={to}
      target="_blank"
      rel="noopener noreferrer"
      className="group bg-white rounded-lg p-4 sm:p-5 shadow-sm border border-[#dee6ea] flex items-center justify-center text-center transition duration-300 hover:shadow-md hover:border-[#ff5800] hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#ff5800]"
    >
      <span className="text-sm sm:text-base font-semibold text-[#23282d] group-hover:text-[#ff5800]">
        {label}
      </span>
    </a>
  );
}
