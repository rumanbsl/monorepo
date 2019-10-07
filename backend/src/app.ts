import express, { Express } from "express";
import Routes from "./routes";

/**
 * @description Express Class
 * @export
 * @class App
 */
class App {
  app: Express;

  /**
   *Creates an instance of App.
   * @param {Application} app
   * @memberof App
   */
  constructor() {
    this.app = express();
    this.addMiddleWares();
  }

  /**
   * @description
   * @memberof App
   */
  addMiddleWares(): void {
    this.app = Routes(this.app);
  }
}

export default (): Express => { const { app } = new App(); return app; };
