import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { appendFileSync, readFileSync, writeFileSync } from 'fs';
import yargs from 'yargs';
import chalk from 'chalk';
import { baseUrl } from './baseUrl.js';
import clipboardy from 'clipboardy';
import validator from 'validator';
import emoji from 'node-emoji';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// console.log(path.basename(__filename));
// console.log(path.basename(__dirname));
// console.log(path.dirname(__filename));
// console.log(path.extname(__filename));

// console.log(path.parse(__filename));
// console.log(path.join(__dirname, 'plop', 'index.html'));

// writeFileSync('links.txt', 'Hello')

const file = path.join(__dirname, 'links.txt')
// function writeText(){
//     for(var i = 0; i < 10; i++){
//         appendFileSync(file, '\nHi'+(i+1))
//     }
// }

// writeText()

// const links = readFileSync(file).toString()
// console.log(links)


yargs.command('add', 'Ajout d\'un lien', {
    page: {
        describe: 'Add page',
        demandOption: true,
        type: 'string'
    },
    source: {
        describe: 'Add source',
        demandOption: true,
        type: 'string'
    },
    medium: {
        describe: 'Add medium',
        type: 'string'
    },
    campaign: {
        describe: 'Add campaign',
        type: 'string'
    },
}, argv => {
    const { page, source, medium, campaign } = argv
    const link = `${baseUrl}${page}?utm_source=${source}&utm_medium=${medium}&utm_campaign=${campaign}`;

    if(!validator.isURL(link)){
        console.log(chalk.red.bold('\nLe lien est incorrect ! \n'))
        return
    }

    appendFileSync(file, '\n'+link);
    clipboardy.writeSync(link);

    console.log(chalk.inverse.bold('Lien copié !'));
    console.log(chalk.yellow.bold(link));

    
}).argv

yargs.command('list', 'Lister le fichier links.txt', () => {
    const links = readFileSync(file).toString().split('\n')
    for(let i in links){
        console.log(`${emoji.get('star')}  ${links[i]}`)
    }
}).argv