// Setup Error
class SetupError extends Error {
    constructor (message) {
        super(message);

        this.name = this.constructor.name

        Error.captureStackTrace(this, this.constructor);
    }
}

// Command Error
class CommandError extends Error {
    constructor (message) {
        super(message);

        this.name = this.constructor.name

        Error.captureStackTrace(this, this.constructor);
    }
}

// Events Error
class EventError extends Error {
    constructor (message) {
        super(message);

        this.name = this.constructor.name

        Error.captureStackTrace(this, this.constructor);
    }
}

// Exports
module.exports = { SetupError, CommandError, EventError };