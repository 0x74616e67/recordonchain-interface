import { useRouter } from "next/router";

export default function Record() {
  const router = useRouter();
  return <p>Post: {router.query.id}</p>;
}
