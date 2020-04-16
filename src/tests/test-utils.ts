import { service } from './../server';
import * as request from 'supertest';

export const testRequest = request(service.callback());
