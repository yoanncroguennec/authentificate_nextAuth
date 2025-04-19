import { auth } from "@/auth/authSetup";

export default async function Home() {
  const session = await auth();

  return (
    <div style={{ background: "#F3CF3C", height: "100vh", width: "100vw" }}>
      <div>
        {session?.user?.email ? (
          <h1>{session?.user?.email}</h1>
        ) : (
          <h1>Pas connecté</h1>
        )}{" "}
      </div>
    </div>
  );
}
