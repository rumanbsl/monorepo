import { GetStaticProps, NextPage } from "next";
import { PageProps } from "@/Interfaces";
import { USER_GET_USER_GET } from "@/Interfaces/gql-definitions";
import cache from "@/cache";
import Div from "@/components/Div";
import serverOnly from "@/resolvers/serverOnly";
import { getAccessToken } from "@/utils/accessToken";
import { initializeApollo } from "@/utils/apolloClient";

interface DashboardProps extends PageProps {
  user: USER_GET_USER_GET
}

const Dashboard: NextPage<DashboardProps> = ({ user }) => (
  <Div>
    <h2>Dashboard</h2>
    <dl>
      <dt>
        mail:
      </dt>
      <dd>{user.email}</dd>
    </dl>
  </Div>
);

export const getStaticProps:GetStaticProps = async () => {
  const client = initializeApollo(cache.extract(), getAccessToken() || "");
  const { data } = await client.query<{USER_GET: USER_GET_USER_GET}>({ query: serverOnly.Query.USER_GET });
  return { props: { user: data?.USER_GET } };
};

export default Dashboard;
