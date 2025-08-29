import TodoList from "./todoList";
import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();
  return <TodoList session={session} />;
}
