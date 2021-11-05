const { HttpException } = require('../core/http-exception');

const catchError = async (ctx, next) => {
  try {
    await next();
    // ctx.body = {
    //   message: 'success',
    //   code: 0,
    //   data: ctx.body,
    // };
  } catch (error) {
    const isHttpException = error instanceof HttpException;
    const isDev = global.config.environment === 'dev';

    if (isDev && !isHttpException) {
      throw error;
    }

    if (isHttpException) {
      ctx.body = {
        message: error.msg,
        code: error.errorCode,
        request: `${ctx.method} ${ctx.path}`,
      };
      ctx.status = error.code;
    } else {
      ctx.body = {
        message: 'we made a mistake',
        code: 999,
        request: `${ctx.method} ${ctx.path}`,
      };
      ctx.status = 500;
    }
  }
};

module.exports = catchError;
