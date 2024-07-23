import BillingConfig from "./_components/BillingConfig/BillingConfig";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen items-center justify-center">
      <BillingConfig />
      <div className="md:absolute bottom-4">
        By{" "}
        <a className="link prima" href="https://github.com/alexmachina">
          @alexmachina
        </a>
      </div>
    </main>
  );
}
