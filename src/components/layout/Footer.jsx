import Container from "@/components/shared/Container";

export default function Footer() {
  return (
    <footer className="w-full border-t border-[#dfe7e1] bg-[#fafcfb]">
      <Container className="flex min-h-17 flex-col justify-center gap-2 py-5 text-[13px] leading-[1.6] font-normal text-[#202b23] lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:py-0">
        <p className="text-left">
          Bazar Dor — Essential product prices at a glance.
        </p>

        <p className="text-left lg:text-right">
          All prices are estimates and may change depending on market conditions.
        </p>
      </Container>
    </footer>
  );
}