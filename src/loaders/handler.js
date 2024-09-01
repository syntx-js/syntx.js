const chalk = require('chalk');

function showLoadingStart() {
    console.log(`╭${'─'.repeat(50)}╮`);
    console.log(`│${' '.repeat(19)}Loading commands${' '.repeat(15)}│`);
    console.log(`├${'─'.repeat(50)}┤`);
}

function showLoadingStatus(file, status) {
    const maxLength = 45;
    const statusText = status === 'success' ? chalk.green('Loaded') : chalk.red.strikethrough('Error');
    const paddedText = `${statusText} ${file}`.padEnd(maxLength);

    console.log(`│ ${paddedText}  │`);
}

function showLoadingEnd(failedCommands, totalCommands) {
    console.log(`╰${'─'.repeat(50)}╯`);
    
    if (failedCommands === 0) {
        console.log(chalk.green('✔ All commands loaded successfully!'));
    } else if (failedCommands === totalCommands) {
        console.log(chalk.red('✖ All commands failed to load.'));
    } else {
        console.log(chalk.hex('#FFA500')(`Vulnerabilities found in ${failedCommands} command(s)`));
    }
}

module.exports = {
    showLoadingStart,
    showLoadingStatus,
    showLoadingEnd,
};