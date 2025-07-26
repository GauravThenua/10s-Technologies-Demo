export default function Home() {
  return (
    <div className="min-h-screen bg-[#fbfbfc] px-4 py-10 flex flex-col items-center">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#050719] mb-8 text-center max-w-md">
        Identity Demo Portal
      </h1>

      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-w-4xl w-full">
        <LinkCard to="/register" label="End User Registration" />
        <LinkCard to="/auth-id" label="User Auth - ID" />
        <LinkCard to="/rp1" label="User Auth – RP1" />
        <LinkCard to="/rp2" label="User Auth – RP2" />
        {/* <LinkCard to="/admin" label="IDP Admin Portal" /> */}
        {/* <LinkCard to="/mitm" label="Bad Guy Scenario – MITM" /> */}
      </div>
    </div>
  );
}

// All links open in new tab using <a> tag
function LinkCard({ to, label }) {
  return (
    <a
      href={to}
      target="_blank"
      rel="noopener noreferrer"
      className="  group bg-white  rounded-lg  p-4 sm:p-5  shadow-sm  border  border-[#dee6ea]  flex  items-center  justify-center  text-center  transition  duration-300  hover:shadow-md  hover:border-[#ff5800]  hover:-translate-y-0.5  focus:outline-none focus:ring-2  focus:ring-[#ff5800]
      "
    >
      <span className="text-sm sm:text-base font-semibold text-[#23282d] group-hover:text-[#ff5800]">
        {label}
      </span>
    </a>
  );
}
