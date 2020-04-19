
process.env.BOT_TOKEN = '1233303978:AAGXDhlYP0NbjInFjo-5RMSUsVEpm32xTn0'
const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
const WizardScene = require('telegraf/scenes/wizard')
const Stage = require('telegraf/stage');
const session = require('telegraf/session')
const { reply, fork } = Telegraf






const add = new WizardScene(
    "sum",
    ctx => {
        ctx.reply("Please enter the first noumber to add.");
        return ctx.wizard.next();
    }, 
    ctx =>{
        ctx.wizard.state.A = ctx.message.text;
        ctx.reply('you entered: ' + ctx.wizard.state.A );
        ctx.reply('please enter the second noumber to add');
        return ctx.wizard.next();
    },

    ctx => {
        ctx.wizard.state.B = ctx.message.text;
        ctx.reply('you entered: ' + ctx.wizard.state.B );
        var a = parseInt(ctx.wizard.state.A);
        var b = parseInt(ctx.wizard.state.B);
        ctx.reply('the sum is: ' + (a + b));
        console.log("---------------");
        console.log(ctx.from.first_name);
        console.log("A: " + a);
        console.log("B: " + b);
        //console.log("---------------");
        return ctx.scene.leave();
    }
)
const stage = new Stage([add], { default: 'sum' });

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.help((ctx) => ctx.reply('sende mir zwei zahlen'))

bot.use(session())
bot.use(stage.middleware());

bot.start((ctx) => {
    console.log(ctx.message)
    return ctx.reply('Hallo ' + ctx.from.first_name + '!')
})
bot.command('add',  (ctx) => ctx.scene.enter("sum"));
bot.launch()

