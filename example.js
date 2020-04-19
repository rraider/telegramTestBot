process.env.BOT_TOKEN = '1233303978:AAGXDhlYP0NbjInFjo-5RMSUsVEpm32xTn0'
const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const session = require('telegraf/session')
const { reply, fork } = Telegraf

const randomPhoto = 'https://picsum.photos/200/300/?random'

// const sayYoMiddleware = fork((ctx) => ctx.reply('yo'))

const bot = new Telegraf(process.env.BOT_TOKEN)

// // Register session middleware
bot.use(session())

// Register logger middleware
bot.use((ctx, next) => {
  const start = new Date()
  return next().then(() => {
    const ms = new Date() - start
    console.log('response time %sms', ms)
  })
})



// Login widget events
bot.on('connected_website', ({ reply }) => reply('Website connected'))

// Telegram passport events
bot.on('passport_data', ({ reply }) => reply('Telegram password connected'))

// Random location on some text messages
/* bot.on('text', ({ replyWithLocation }, next) => {
  if (Math.random() > 0.2) {
    return next()
  }
  return Promise.all([
    replyWithLocation((Math.random() * 180) - 90, (Math.random() * 180) - 90),
    next()
  ])
}) */

// Text messages handling
bot.hears('Hey',  (ctx) => {
  ctx.session.heyCounter = ctx.session.heyCounter || 0
  ctx.session.heyCounter++
  return ctx.replyWithMarkdown(`_Hey counter:_ ${ctx.session.heyCounter}`)
})

// Command handling
bot.command('getCounter',  (ctx) => {
  console.log(ctx.message)
  return ctx.reply(ctx.session.heyCounter, Extra.markdown())
})

bot.command('cat', ({ replyWithPhoto }) => replyWithPhoto(randomPhoto))



// Look ma, reply middleware factory
bot.command('foo', reply('http://coub.com/view/9cjmt'))

// Wow! RegEx
bot.hears(/reverse (.+)/, ({ match, reply }) => reply(match[1].split('').reverse().join('')))

// Launch bot
bot.launch()