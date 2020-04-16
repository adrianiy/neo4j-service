import { service } from './../server';
import request from 'supertest';

export const testRequest = request(service.callback());
