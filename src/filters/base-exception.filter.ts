import { ArgumentsHost, Inject } from "@nestjs/common";
import { Response } from "express";
import { LoggerProvider } from "../modules/logger/providers/logger.provider";
import { TransactionUtil } from "../utils/TransactionUtil";

export class BaseExceptionFilter {
  constructor(
    @Inject(LoggerProvider) private loggerProvider: LoggerProvider
  ) {
  }

  log(exception: Error, host: ArgumentsHost): Response {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    if (exception.message !== "Cannot GET /favicon.ico") {
      this.loggerProvider.log({
        message: exception.message,
        name: `${exception.name} ${request.url}`,
        stack: JSON.stringify(exception.stack.split("at").map(el => el.slice(0, el.length - 5)))
      }).then(() => {});
    }
    return response;
  }

  sendResponse(response: Response, status: number, body: any) {
    if (TransactionUtil.isSet())
      TransactionUtil.rollback().finally(() => {
        response.status(status).contentType("json").send(JSON.stringify(body));
      });
  }
}
