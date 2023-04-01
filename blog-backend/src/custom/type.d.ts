import Router = require("@koa/router")
import {Middleware} from "koa"
import { type } from "koa/lib/response"
import extendContext = require("../extend/context")

interface IMiddleware extends Middleware{}
interface IMiddlewareHandler<O={}>{
  (options:O): IMiddleware
}

interface IRouter{
  (router:Router): void
}

type DefaultControllerTypes ="index" | "get" | "create" | "update" | "delete" 
type Controller<U={}>={
  [P in DefaultControllerTypes | U]?:IMiddleware
}

declare module "koa"{
  type extendContextExtends = typeof extendContext //通過typeof 拿到context的所有類型!
  interface DefaultContext 
  extends extendContextExtends,
  Router.RouterParamContext{//ctx.params 
    // success:(data:any,status:number) => void
    // fail:(reason:any,status:number) => void
  }
}
export as namespace Custom