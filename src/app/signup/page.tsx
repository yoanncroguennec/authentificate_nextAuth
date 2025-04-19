"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignup = async () => {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({ email, password }), // mot de passe en clair ici
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      await signIn("credentials", { email, password, callbackUrl: "/" });
    } else {
      const err = await res.json();
      alert(err.error || "Signup failed");
    }
  };

  return (
    <div>
      <h1>Signup</h1>
      <input
        type='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignup}>Register</button>
    </div>
  );
}


// // src/app/signup/page.tsx

// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { signIn } from "next-auth/react";
// import bcrypt from "bcryptjs";

// export default function SignupPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const router = useRouter();

//   const handleSignup = async () => {
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const res = await fetch("/api/auth/signup", {
//       method: "POST",
//       body: JSON.stringify({ email, password: hashedPassword }),
//       headers: { "Content-Type": "application/json" },
//     });

//     if (res.ok) {
//       await signIn("credentials", { email, password, callbackUrl: "/" });
//     }
//   };

//   return (
//     <div>
//       <h1>Signup</h1>
//       <input
//         type='email'
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <input
//         type='password'
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button onClick={handleSignup}>Register</button>
//     </div>
//   );
// }
