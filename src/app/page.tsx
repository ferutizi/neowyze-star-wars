import Films from "./components/Films";

export default async function Home() {

  return (
    <main className="flex flex-col items-center justify-between p-14 pb-8">
      <section className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3 max-w-[1920px]">
        <Films />
      </section>
    </main>
  );
}
