import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ReportForm from "@/components/report/ReportForm";

export default function ReportPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[var(--color-background)] px-4 pb-16 pt-32 md:px-8">
        <div className="mx-auto w-full max-w-[1280px]">
          <ReportForm />
        </div>
      </main>

      <Footer />
    </>
  );
}