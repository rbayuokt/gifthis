#!/usr/bin/env node

const { exec, which } = require('shelljs');
const yargs = require('yargs');

// Function to check if a command is available
function commandExists(command) {
  return which(command) !== null;
}

// Dependencies
const dependencies = ['ffmpeg', 'xquartz', 'gifsicle'];

// Check if dependencies are installed
const missingDependencies = dependencies.filter((dep) => !commandExists(dep));

if (missingDependencies.length > 0) {
  console.error(
    `Error: Please install the following dependencies before using gifthis: ${missingDependencies.join(', ')}`
  );
  process.exit(1);
}

yargs
  .option('input', {
    alias: 'i',
    describe: 'Input video file',
    demandOption: true,
    type: 'string',
  })
  .option('output', {
    alias: 'o',
    describe: 'Output GIF file',
    demandOption: true,
    type: 'string',
  })
  .option('fps', {
    describe: 'Tells ffmpeg to reduce the frame rate from 25 fps to 10',
    default: 10,
    type: 'number',
  })
  .option('size', {
    describe: 'Tells ffmpeg the max-width and max-height',
    default: '800x369',
    type: 'string',
  })
  .option('delay', {
    describe: 'Tells gifsicle to delay 30ms between each gif',
    default: 5,
    type: 'number',
  })
  .option('optimize', {
    describe: 'Requests that gifsicle use the slowest/most file-size optimization',
    default: 3,
    type: 'number',
  })
  .help()
  .argv;

const { input, output, fps, size, delay, optimize } = yargs.argv;

const ffmpegCommand = `ffmpeg -i ${input} -s ${size} -pix_fmt rgb24 -r ${fps} -f gif - | `;
const gifsicleCommand = `gifsicle --optimize=${optimize} --delay=${delay} > ${output}`;
const command = `${ffmpegCommand} ${gifsicleCommand}`;

exec(command);
