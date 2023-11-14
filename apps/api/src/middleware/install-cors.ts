import { Express } from 'express';
import cors from 'cors';

const isDev = process.env.NODE_ENV === 'development';
export const installCors = (app: Express) => {
  isDev
    ? // allow any origin in dev
      app.use(cors({ origin: true, credentials: true }))
    : app.use(
        cors({
          origin: [
            'https://gynecee-site-git-development-grinn-tech.vercel.app/',
            // regexp for canto + anything + 'vercel.app'
            /https:\/\/gynecee.*.vercel.app$/,
            //  <anything>.grinn.tech
            /https:\/\/.*.grinn.tech$/,
            /https:\/\/.*.gynecee.com$/,
          ],
          credentials: true,
        })
      );
};

//<project-name>-<unique-hash>-<scope-slug>.vercel.app
