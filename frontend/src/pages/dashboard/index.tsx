import { useQuery } from "@apollo/client";
import Div from "@/components/Div";
import serverOnly from "@/resolvers/serverOnly";

export default function Dashboard() {
  const { data, error, loading } = useQuery(serverOnly.Query.USER_GET);
  if (error) {
    console.log(error);
    return <div>Oh no!</div>;
  }
  if (loading) return <div>Loading...</div>;
  return (
    <Div>
      <h2>Dashboard</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </Div>
  );
}

export * from "@/utils/getServerSideProps";
