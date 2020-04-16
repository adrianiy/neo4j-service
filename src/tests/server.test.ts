import { testRequest } from "./test-utils";


describe('server test suite', () => {
    it('test api health', async () => {
        const response = await testRequest.get('/api/health');
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('it\'s alive!')
    });

    it('returns 404 with the path and method info', async () => {
        const response = await testRequest.get('/nonexisting');
        expect(response.status).toBe(404);
        expect(response.body.message).toMatch(/GET \/nonexisting/);
    });
});
