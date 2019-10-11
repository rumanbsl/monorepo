/* eslint-disable @typescript-eslint/no-explicit-any */
import console from "chalk-console";
import { readFileSync } from "fs";
import { resolve } from "path";
import http, { Server } from "http";
import App from "./app";

console.log(readFileSync(resolve(__dirname, "txt.html"), { encoding: "utf-8" }));

(async function (): Promise<void> {
  try {
    const PORT = process.env.PORT || 3000;
    const configureHttpServer = async (httpServer: Server): Promise<void> => {
      console.info("Creating Express app");
      const { app, initializeApolloServer } = await App();
      console.info("Creating Apollo server");
      const apolloServer = initializeApolloServer();

      apolloServer.applyMiddleware({ app, path: "/graphql" });
      console.info("Express app created with Apollo middleware");

      httpServer.on("request", app);
      apolloServer.installSubscriptionHandlers(httpServer);
    };

    if (!(process as any).httpServer) {
      console.info("Creating HTTP server");

      (process as any).httpServer = http.createServer();

      await configureHttpServer((process as any).httpServer);

      (process as any).httpServer.listen(PORT, () => {
        console.info(`HTTP server ready at http://localhost:${PORT}`);
        console.info(`Websocket server ready at ws://localhost:${PORT}`);
      });
    } else {
      console.info("Reloading HTTP server");
      (process as any).httpServer.removeAllListeners("upgrade");
      (process as any).httpServer.removeAllListeners("request");

      await configureHttpServer((process as any).httpServer);

      console.info("HTTP server reloaded");
    }
  } catch (error) {
    console.error(error);
  }

  if (module.hot) {
    console.info("HOT SWAPPING");
    module.hot.accept();
  }
}());
