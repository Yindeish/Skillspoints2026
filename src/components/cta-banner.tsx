import React from "react";
import Button from "./btn";
import { ArrowRight } from "lucide-react";

export const CtaBanner: React.FC = () => {
  return (
    <section className="w-full my-8 sm:my-12">
      <div className="bg-[#EEF5FD] rounded-3xl p-8 sm:p-12 lg:p-14 border border-[#E1EDFA] flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight text-center sm:text-left">
          Ready to start learning?
        </h2>

        <Button
          href="/signup"
          variant="primary"
          size="lg"
          className="w-full sm:w-auto px-8 py-3.5 text-base font-semibold shadow-sm hover:shadow"
          icon={<ArrowRight className="w-5 h-5 ml-1 inline-block" />}
        >
          Create an account
        </Button>
      </div>
    </section>
  );
};

export default CtaBanner;
