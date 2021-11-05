const Router = require('koa-router');

const { HotBook } = require('../../models/hot-book');
const {
  PositiveIntegerValidator,
  SearchValidator,
  AddShortCommentValidator,
} = require('../../validators/validator');
const { Book } = require('../../models/book');
const { Auth } = require('../../../middlewares/auth');
const { Favor } = require('../../models/favor');
const { Comment } = require('../../models/book-comment');
const { success } = require('../../lib/helper');

const router = new Router({
  prefix: '/v1/book',
});

router.get('/hot_list', async (ctx, next) => {
  const books = await HotBook.getAll();
  ctx.body = books;
});

router.get('/:id/detail', async (ctx) => {
  const v = await new PositiveIntegerValidator().validate(ctx);
  // const book = new Book()
  // ctx.body =await book.detail(v.get('path.id'))
  ctx.body = {
    author: ['Wolfgang Mauerer'],
    binding: '平装',
    category: '算法',
    id: 6980,
    image: 'https://img1.doubanio.com/lpic/s4368169.jpg',
    images: {
      large: 'https://img1.doubanio.com/lpic/s4368169.jpg',
    },
    isbn: '9787115227430',
    pages: '1038',
    price: '149.00元',
    pubdate: '201005',
    publisher: '人民邮电出版社',
    subtitle: '全球开源社区集体智慧结晶，领略Linux内核的绝美风光',
    summary:
      '众所周知，Linux操作系统的源代码复杂、文档少，对程序员的要求高，要想看懂这些代码并不是一件容易事...',
    title: '深入Linux内核架构',
    translator: ['郭旭'],
  };
});

router.get('/search', async (ctx, next) => {
  const v = await new SearchValidator().validate(ctx);
  // const result = await Book.searchFromYuShu(v.get('query.q'), v.get('query.start'), v.get('query.count'))
  // ctx.body = result
  const summary = v.get('query.summary');
  let result = null;
  if (summary === 1) {
    result = {
      books: [
        {
          author: ['Luciano Ramalho'],
          id: 195,
          image: 'https://img3.doubanio.com/lpic/s27935775.jpg',
          isbn: '9781491946008',
          price: 'USD 39.99',
          title: 'Fluent Python',
        },
        {
          author: ['【英】大卫•加里夫', 'David Gariff'],
          id: 44307,
          image: 'https://img3.doubanio.com/lpic/s27145681.jpg',
          isbn: '9787511719164',
          price: '98.00元',
          title: '艺术谱系',
        },
      ],
      count: 2,
      start: 0,
      total: 2,
    };
  } else {
    result = {
      books: [
        {
          author: ['Luciano Ramalho'],
          binding: 'Paperback',
          category: '编程',
          id: 195,
          image: 'https://img3.doubanio.com/lpic/s27935775.jpg',
          images: {
            large: 'https://img3.doubanio.com/lpic/s27935775.jpg',
          },
          isbn: '9781491946008',
          pages: '768',
          price: 'USD 39.99',
          pubdate: '2015-8-20',
          publisher: "O'Reilly Media",
          subtitle: '',
          summary:
            'Learn how to write idiomatic, effective Python code by leveraging its best features...',
        },
        {
          author: ['【英】大卫•加里夫', 'David Gariff'],
          binding: '精装',
          category: '艺术史',
          id: 44307,
          image: 'https://img3.doubanio.com/lpic/s27145681.jpg',
          images: {
            large: 'https://img3.doubanio.com/lpic/s27145681.jpg',
          },
          isbn: '9787511719164',
          pages: '192',
          price: '98.00元',
          pubdate: '2014-1',
          publisher: '中央编译出版社',
          subtitle: '名画密码与大师传承',
          summary:
            '《艺术谱系》一书以独特的视角构建出一部通俗易懂的西方艺术发展史...',
          translator: ['徐效军'],
        },
      ],
      count: 2,
      start: 0,
      total: 2,
    };
  }
  ctx.body = result;
});

router.get('/favor/count', new Auth().m, async (ctx, next) => {
  const count = await Book.getMyFavorBookCount(ctx.auth.uid);
  ctx.body = {
    count,
  };
});

router.get('/:book_id/favor', new Auth().m, async (ctx) => {
  const v = await new PositiveIntegerValidator().validate(ctx, {
    id: 'book_id',
  });
  const favor = await Favor.getBookFavor(ctx.auth.uid, v.get('path.book_id'));
  ctx.body = favor;
});

router.post('/add/short_comment', new Auth().m, async (ctx) => {
  const v = await new AddShortCommentValidator().validate(ctx, {
    id: 'book_id',
  });
  Comment.addComment(v.get('body.book_id'), v.get('body.content'));
  success();
});

router.get('/:book_id/short_comment', new Auth().m, async (ctx) => {
  const v = await new PositiveIntegerValidator().validate(ctx, {
    id: 'book_id',
  });
  const book_id = v.get('path.book_id');
  const bookcomments = await Comment.getBookComments(book_id);
  ctx.body = {
    bookcomments,
    book_id,
  };
});

router.get('/hot_keyword', new Auth().m, async (ctx) => {
  ctx.body = [
    'Python',
    '哈利波特',
    '村上春树',
    '东野圭吾',
    '白夜行',
    '韩寒',
    '金庸',
    '王小波',
  ];
});

module.exports = router;
