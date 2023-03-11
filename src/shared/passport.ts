/* eslint-disable @typescript-eslint/no-explicit-any */
import { PassportStatic } from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Repository } from 'typeorm';

import { User } from '../components/user/entity';
import { AppDataSource } from '../database/dataSource';
import envVars from '../declarations/envVars';

const userRepository: Repository<User> = AppDataSource.getRepository(User);

const authenticate = (passport: PassportStatic) => {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
    secretOrKey: envVars.auth.secret,
  };

  passport.use('jwt', new Strategy(opts, function(jwt_payload, done: any) {
    userRepository
      .findOneOrFail({
        relations: {
          role: true
        },
        where: { id: jwt_payload.id }
      })
      .then((user) => { return done(null, user); })
      .catch((error) => { return done(error, false); });
  }));
}

export default authenticate;

