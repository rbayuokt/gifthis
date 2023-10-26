# Convert video to GIF

Convert videos to GIFs in just one command.

## Installation
```bash
brew install ffmpeg 
brew install xquartz --cask
brew install gifsicle

npm install -g gifthis
```

## Usage 

example: <br />
```sh
gifthis -i face.mov -o output.gif --fps 10 --size 800x369 --delay 5 --optimize 3
```

Replace the options with your desired values: <br />

<b>--i</b>: Input video file.<br />
<b>--o</b>: Output GIF file.<br />
<b>--fps</b>: Frames per second (default: 10).<br />
<b>--size</b>: Max width x max height (default: 600x400).<br />
<b>--delay</b>: Delay between frames in milliseconds (default: 30).<br />
<b>--optimize</b>: Optimization level (0 to 3, default: 3).<br />

