import { useQuery } from "@apollo/client";
import serverOnly from "@/resolvers/serverOnly";

export default function Sell() {
  const { data, error, loading } = useQuery(serverOnly.Query.USER_GET);

  if (error) {
    console.log(error);
    return <div>Oh no!</div>;
  }
  if (loading) return <div>Loading...</div>;
  return (
    <pre>{JSON.stringify(data)}</pre>
  );
}
