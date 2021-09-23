const CurrencyProfileSchema = require('../Schemas/CurrencyProfileSchema');

module.exports = {
    account: {
        create: async (message) => {
            const profile = await CurrencyProfileSchema.create({
                userID: message.member.id,
                wallet: 1000,
                bank: 0,
            });

            profile.save();
        },
        giveCoins: async (message, coins) => {
            const user = message.member;

            await CurrencyProfileSchema.findOneAndUpdate({
                userID: user.id,

            }, {
                $inc: {
                    wallet: coins,
                }
            });
        },
        deposit: async (message, amount) => {
            const user = await CurrencyProfileSchema.findOne({
                userID: message.member.id,
            });

            if (amount % 1 != 0 && amount <= 0) return message.reply({
                content: '❌ Deposit amount must be an integer and not lesser/equal to 0!',
                ephemeral: true,
            });

            try {
                if (amount > user.wallet) return message.reply({
                    content: '❌ It looks like you do not have enough coins in your wallet to deposit like that!',
                    ephemeral: true,
                });

                await CurrencyProfileSchema.findOneAndUpdate({
                    userID: message.member.id,
                }, {
                    $inc: {
                        wallet: -amount,
                        bank: amount
                    }
                });

                message.reply(`💸 You have deposited ${amount} coins into your 🏦 bank!`);
            } catch (error) {

            }

        },
        withdraw: async (message, amount) => {
            const user = await CurrencyProfileSchema.findOne({
                userID: message.member.id,
            });

            if (amount % 1 != 0 && amount <= 0) return message.reply({
                content: '❌ Withdraw amount must be an integer and not lesser/equal to 0!',
                ephemeral: true,
            });

            try {
                if (amount > user.bank) return message.reply({
                    content: '❌ It looks like you do not have enough coins in your bank to withdraw like that!',
                    ephemeral: true,
                });

                await CurrencyProfileSchema.findOneAndUpdate({
                    userID: message.member.id,
                }, {
                    $inc: {
                        wallet: amount,
                        bank: -amount
                    }
                });

                message.reply(`💸 You have withdrawed ${amount} coins from your 🏦 bank! `);
            } catch (error) {

            }

        }
    }
};