import { useNavigate } from "react-router-dom";

export default function DemoSelector() {
  const navigate = useNavigate();

  return (
    <div className="max-w-xl mx-auto px-4 py-8 bg-white rounded-xl shadow-lg border border-gray-200">
      <h1 className="text-xl font-bold text-[#1b1b1b] mb-6 text-center">
        Dynamic Partial ID Demo
      </h1>
      <div className="space-y-4">
        <button
          onClick={() => navigate("/basic")}
          className="w-full thm-btn thm-btn--aso !bg-[#153b82] !text-white !py-3 !rounded-full hover:!bg-[#102d66] transition-all duration-300"
        >
          Basic Demo
        </button>
        <button
          onClick={() => navigate("/advanced")}
          className="w-full thm-btn thm-btn--aso !bg-[#28a745] !text-white !py-3 !rounded-full hover:!bg-[#1e7e34] transition-all duration-300"
        >
          Advanced Demo
        </button>
      </div>
    </div>
  );
}
