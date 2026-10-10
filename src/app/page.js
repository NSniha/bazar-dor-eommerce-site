import Container from "@/components/shared/Container";
import Hero from "@/components/home/Hero";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f0f5f0]">
      <Container className="pt-6 pb-16">
        <Hero />

        <div id="সব-পণ্য" className="scroll-mt-6" />
      </Container>
    </main>
  );
}