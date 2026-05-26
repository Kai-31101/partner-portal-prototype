import { ArrowRightLeft } from 'lucide-react';

export default function ExpoProgramsTransferNotice() {
  return (
    <main className="p-5 lg:p-8">
      <section className="rounded-xl border border-[#D7E0EA] bg-white p-8 shadow-sm">
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#E9F8F5] text-[#008C80]">
          <ArrowRightLeft size={24} />
        </div>
        <div className="max-w-3xl">
          <div className="mb-2 text-sm font-semibold text-[#475569]">Partner Portal / Expo Programs</div>
          <h2 className="mb-3 text-2xl font-bold text-[#0F172A]">Expo Programs</h2>
          <p className="text-lg font-semibold text-[#0F172A]">
            Move the built feature from current Partner Portal to this Feature
          </p>
        </div>
      </section>
    </main>
  );
}
