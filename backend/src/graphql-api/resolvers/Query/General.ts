import tryCatchWrapper from "@/utils/tryCatchWrapper";
import { IGeneralQueries } from "@/Interfaces";

const Queries: IGeneralQueries = { api: tryCatchWrapper(async () => ({ version: "1.0" })) };

export default Queries;
