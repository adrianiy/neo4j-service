export const pipe = (...middlewares) => async (ctx, next) => {
    for (const middleware of middlewares) {
        await middleware(ctx, next);
    }
};

export const sendData = middleware => async (ctx, next) => {
    const result = await middleware(ctx, next);
    ctx.ok(result);
};
