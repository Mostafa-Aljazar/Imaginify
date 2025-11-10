"use client";
import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export default function UsersList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users",
          { signal }
        );
        if (!response.ok) throw new Error("Network response was not ok");
        const data: User[] = await response.json();
        setUsers(data);
      } catch (err: any) {
        if (err.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();

    return () => {
      controller.abort(); // abort fetch if component unmounts
    };
  }, []);

  if (loading) return <div className="mt-20 px-20">Loading...</div>;
  if (error) return <div className="mt-20 px-20">Error: {error}</div>;

  return (
    <div className="mt-20 px-20">
      <h1>User List : </h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
}
