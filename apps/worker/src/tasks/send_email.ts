import { Task } from "graphile-worker";

import { fromEmail, legalText, projectName } from "../config";

declare module global {
  let TEST_EMAILS: any[];
}

global.TEST_EMAILS = [];

const isTest = process.env.NODE_ENV === "test";
const isDev = process.env.NODE_ENV !== "production";

export interface SendEmailPayload {
  options: {
    from?: string;
    to: string | string[];
    subject: string;
  };
  template: string;
  variables: {
    [varName: string]: any;
  };
}

const task: Task = async (inPayload) => {
  const payload: SendEmailPayload = inPayload as any;
  console.log("Sending email", payload);
};

export default task;
