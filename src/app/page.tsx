import Films from "./components/Films";

export default async function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <section className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
        <Films />
      </section>
    </main>
  );
}
