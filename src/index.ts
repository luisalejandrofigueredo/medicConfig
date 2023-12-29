import express, { Express, Request, Response, NextFunction } from 'express';
import * as bodyParser from "body-parser"
import { AppDataSource } from "./data-source"
import { GoogleAuthProvider, User } from "@firebase/auth";
import * as admin from 'firebase-admin';
import cors from "cors";
import { confSerialRouter } from "./routes/confSerial";
const serviceAccount = require('./serviceAccountKey.json');

const PORT = process.env.PORT || 5200;
const authenticateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let idToken = req.headers.authorization

    if (!idToken) {
        console.log('---sin token----');
        return res.status(403).send('Unauthorized');
    }
    else {
        try {
            idToken = idToken.slice(7);
            await admin.auth().verifyIdToken(idToken)
            next();
        } catch (error: any) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log('error', errorMessage)
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
            return res.status(403).send('Acceso denegado');
        }
    }
}

AppDataSource.initialize().then(async () => {
    // create express app
    const app: Express = express()
    // setup express app here
    app.use(bodyParser.json())
    app.use(express.json());
    app.use(cors({ origin: '*' }));
    try {
        const appFirebaseAuth = admin.initializeApp(serviceAccount);
      } catch (error) {
        console.log('error', error)
      }
    app.use('/confSerial', authenticateUser, confSerialRouter);
    // start express server
    app.listen(PORT);
    console.log("Express server has started on port:", PORT)

}).catch(error => console.log(error))
