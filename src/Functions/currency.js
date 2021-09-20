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
        }
    }
};