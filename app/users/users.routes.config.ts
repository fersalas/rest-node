import * as express from 'express';
import { CommonRoutesConfig } from '../common/common.routes.config';
import usersController from './controllers/users.controller';
import usersMiddleware from './middleware/users.middleware';

export class UsersRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'UserRoutes');
    }

    configureRoutes(): express.Application {
        this.app
            .route('/users')
            .get(usersController.listUsers)
            .post(
                usersMiddleware.validateRequiredUserBodyFields,
                usersMiddleware.validateUniqueEmail,
                usersController.createUser
            );

        this.app.param('userId', usersMiddleware.extractUserId);
        this.app
            .route(`/users/:userId`)
            .all(usersMiddleware.validateUserExists)
            .get(usersController.getUserById)
            .delete(usersController.removeUser);

        this.app
            .route(`/users/:userId`)
            .put(
                usersMiddleware.validateRequiredUserBodyFields,
                usersMiddleware.validateSameEmailBelongToSameUser
            );

        this.app
            .route(`/users/:userId`)
            .patch(usersMiddleware.validatePatchEmail, usersController.patch);

        return this.app;
    }
}
