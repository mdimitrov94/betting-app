import { c as createRouter, a as createRootRouteWithContext, H as HeadContent, S as Scripts, b as createFileRoute, l as lazyRouteComponent } from "../_chunks/_libs/@tanstack/react-router.mjs";
import { s as setupRouterSsrQueryIntegration } from "../_chunks/_libs/@tanstack/react-router-ssr-query.mjs";
import { j as jsxRuntimeExports } from "../_chunks/_libs/react.mjs";
import { P as PrismaPgAdapterFactory } from "../_chunks/_libs/@prisma/adapter-pg.mjs";
import { Pool } from "pg";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import * as runtime from "@prisma/client/runtime/client";
import { b as QueryClient } from "../_chunks/_libs/@tanstack/query-core.mjs";
import "../_libs/tiny-warning.mjs";
import "../_chunks/_libs/@tanstack/router-core.mjs";
import "../_chunks/_libs/@tanstack/history.mjs";
import "../_libs/tiny-invariant.mjs";
import "node:stream/web";
import "node:stream";
import "../_chunks/_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_chunks/_libs/@tanstack/react-query.mjs";
import "../_chunks/_libs/@tanstack/router-ssr-query-core.mjs";
import "../_chunks/_libs/@prisma/driver-adapter-utils.mjs";
import "../_chunks/_libs/@prisma/debug.mjs";
import "../_libs/postgres-array.mjs";
function json(payload, init) {
  return Response.json(payload, init);
}
function getContext() {
  const queryClient = new QueryClient();
  return {
    queryClient
  };
}
const appCss = "/assets/styles-BTAx7p-G.css";
const Route$5 = createRootRouteWithContext()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8"
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      },
      {
        title: "TanStack Start Starter"
      }
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss
      }
    ]
  }),
  shellComponent: RootDocument
});
function RootDocument({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
const $$splitComponentImporter = () => import("./index-DJYjSPJB.mjs");
const Route$4 = createFileRoute("/")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const config = {
  "previewFeatures": [],
  "clientVersion": "7.3.0",
  "engineVersion": "9d6ad21cbbceab97458517b147a6a09ff43aa735",
  "activeProvider": "postgresql",
  "inlineSchema": 'generator client {\n  provider = "prisma-client"\n  output   = "../src/generated/prisma"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n\nmodel Todo {\n  id        Int      @id @default(autoincrement())\n  title     String\n  createdAt DateTime @default(now())\n}\n\nmodel Bet {\n  id        String   @id @default(cuid())\n  userId    String\n  name      String\n  time      String   @db.VarChar(5)\n  date      DateTime @db.Date\n  createdAt DateTime @default(now())\n\n  @@unique([userId, date])\n  @@index([date])\n}\n\nmodel DailyResult {\n  id         String   @id @default(cuid())\n  date       DateTime @unique @db.Date\n  actualTime String   @db.VarChar(5)\n  updatedAt  DateTime @updatedAt\n\n  @@index([date])\n}\n\nmodel DepartureTime {\n  id            String   @id @default(cuid())\n  date          DateTime @unique @db.Date\n  departureTime String   @db.VarChar(5)\n  updatedAt     DateTime @updatedAt\n\n  @@index([date])\n}\n\nmodel WinnerHistory {\n  id            String   @id @default(cuid())\n  date          DateTime @db.Date\n  departureTime String   @db.VarChar(5)\n  winnerUserId  String\n  winnerName    String\n  winnerBetTime String   @db.VarChar(5)\n  createdAt     DateTime @default(now())\n\n  @@unique([date])\n  @@index([date])\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  }
};
config.runtimeDataModel = JSON.parse('{"models":{"Todo":{"fields":[{"name":"id","kind":"scalar","type":"Int"},{"name":"title","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"}],"dbName":null},"Bet":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"time","kind":"scalar","type":"String"},{"name":"date","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"}],"dbName":null},"DailyResult":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"date","kind":"scalar","type":"DateTime"},{"name":"actualTime","kind":"scalar","type":"String"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"DepartureTime":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"date","kind":"scalar","type":"DateTime"},{"name":"departureTime","kind":"scalar","type":"String"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"WinnerHistory":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"date","kind":"scalar","type":"DateTime"},{"name":"departureTime","kind":"scalar","type":"String"},{"name":"winnerUserId","kind":"scalar","type":"String"},{"name":"winnerName","kind":"scalar","type":"String"},{"name":"winnerBetTime","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"}],"dbName":null}},"enums":{},"types":{}}');
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer } = await import("node:buffer");
  const wasmArray = Buffer.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
  getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
    return await decodeBase64AsWasm(wasm);
  },
  importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
  return runtime.getPrismaClient(config);
}
runtime.Extensions.getExtensionContext;
({
  DbNull: runtime.NullTypes.DbNull,
  JsonNull: runtime.NullTypes.JsonNull,
  AnyNull: runtime.NullTypes.AnyNull
});
runtime.makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
runtime.Extensions.defineExtension;
globalThis["__dirname"] = path.dirname(fileURLToPath(import.meta.url));
const PrismaClient = getPrismaClientClass();
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  },
  max: 20,
  idleTimeoutMillis: 3e4,
  connectionTimeoutMillis: 1e4
});
const adapter = new PrismaPgAdapterFactory(pool);
const prisma = globalThis.__prisma || new PrismaClient({ adapter });
const Route$3 = createFileRoute("/api/winner-history")({
  server: {
    handlers: {
      GET: async () => {
        try {
          const history = await prisma.winnerHistory.findMany({
            orderBy: {
              date: "desc"
            }
          });
          return json(history);
        } catch (error) {
          console.error("Error fetching winner history:", error);
          return json({ error: "Failed to fetch history" }, { status: 500 });
        }
      },
      POST: async ({ request }) => {
        try {
          const body = await request.json();
          const {
            date,
            departureTime,
            winnerUserId,
            winnerName,
            winnerBetTime
          } = body;
          const entry = await prisma.winnerHistory.upsert({
            where: {
              date: new Date(date)
            },
            update: {
              departureTime,
              winnerUserId,
              winnerName,
              winnerBetTime
            },
            create: {
              date: new Date(date),
              departureTime,
              winnerUserId,
              winnerName,
              winnerBetTime
            }
          });
          return json(entry);
        } catch (error) {
          console.error("Error saving winner history:", error);
          return json({ error: "Failed to save history" }, { status: 500 });
        }
      }
    }
  }
});
const Route$2 = createFileRoute("/api/result")({
  server: {
    handlers: {
      GET: async () => {
        try {
          const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
          const result = await prisma.dailyResult.findUnique({
            where: {
              date: new Date(today)
            }
          });
          return json(result);
        } catch (error) {
          console.error("Error fetching result:", error);
          return json({ error: "Failed to fetch result" }, { status: 500 });
        }
      },
      POST: async ({ request }) => {
        try {
          const body = await request.json();
          console.log(body);
          const { actualTime } = body;
          const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
          const result = await prisma.dailyResult.upsert({
            where: {
              date: new Date(today)
            },
            update: {
              actualTime
            },
            create: {
              date: new Date(today),
              actualTime
            }
          });
          return json(result);
        } catch (error) {
          console.error("Error saving result:", error);
          return json({ error: "Failed to save result" }, { status: 500 });
        }
      }
    }
  }
});
const Route$1 = createFileRoute("/api/departure-time")({
  server: {
    handlers: {
      GET: async () => {
        try {
          const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
          const departure = await prisma.departureTime.findUnique({
            where: {
              date: new Date(today)
            }
          });
          return json(departure);
        } catch (error) {
          console.error("Error fetching departure time:", error);
          return json(
            { error: "Failed to fetch departure time" },
            { status: 500 }
          );
        }
      },
      POST: async ({ request }) => {
        console.log("=============");
        console.log("=============");
        console.log("=============");
        console.log("=============");
        try {
          const body = await request.json();
          const { departureTime } = body;
          const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
          const result = await prisma.departureTime.upsert({
            where: {
              date: new Date(today)
            },
            update: {
              departureTime
            },
            create: {
              date: new Date(today),
              departureTime
            }
          });
          return json(result);
        } catch (error) {
          console.error("Error saving departure time:", error);
          return json(
            { error: "Failed to save departure time" },
            { status: 500 }
          );
        }
      }
    }
  }
});
const Route = createFileRoute("/api/bets")({
  server: {
    handlers: {
      GET: async () => {
        try {
          const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
          const bets = await prisma.bet.findMany({
            where: {
              date: {
                equals: new Date(today)
              }
            },
            orderBy: {
              createdAt: "asc"
            }
          });
          return json(bets);
        } catch (error) {
          console.error("Error fetching bets:", error);
          return json({ error: "Failed to fetch bets" }, { status: 500 });
        }
      },
      POST: async ({ request }) => {
        try {
          const body = await request.json();
          const { userId, name, time } = body;
          const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
          const bet = await prisma.bet.upsert({
            where: {
              userId_date: {
                userId,
                date: new Date(today)
              }
            },
            update: {
              name,
              time
            },
            create: {
              userId,
              name,
              time,
              date: new Date(today)
            }
          });
          return json(bet);
        } catch (error) {
          console.error("Error creating/updating bet:", error);
          return json({ error: "Failed to save bet" }, { status: 500 });
        }
      }
    }
  }
});
const IndexRoute = Route$4.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$5
});
const ApiWinnerHistoryRoute = Route$3.update({
  id: "/api/winner-history",
  path: "/api/winner-history",
  getParentRoute: () => Route$5
});
const ApiResultRoute = Route$2.update({
  id: "/api/result",
  path: "/api/result",
  getParentRoute: () => Route$5
});
const ApiDepartureTimeRoute = Route$1.update({
  id: "/api/departure-time",
  path: "/api/departure-time",
  getParentRoute: () => Route$5
});
const ApiBetsRoute = Route.update({
  id: "/api/bets",
  path: "/api/bets",
  getParentRoute: () => Route$5
});
const rootRouteChildren = {
  IndexRoute,
  ApiBetsRoute,
  ApiDepartureTimeRoute,
  ApiResultRoute,
  ApiWinnerHistoryRoute
};
const routeTree = Route$5._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const rqContext = getContext();
  const router = createRouter({
    routeTree,
    context: {
      ...rqContext
    },
    defaultPreload: "intent"
  });
  setupRouterSsrQueryIntegration({ router, queryClient: rqContext.queryClient });
  return router;
};
export {
  getRouter
};
