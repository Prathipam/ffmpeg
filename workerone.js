const { workerData,parentPort } = require('worker_threads')
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path
const ffmpeg = require('fluent-ffmpeg')
ffmpeg.setFfmpegPath(ffmpegPath)

const { inputFile,fid,fullName } = workerData
let destSource =__dirname+'/images/'+fid+'.mp4'


const command = ffmpeg(inputFile)
.videoCodec('libx264')
.audioCodec('libmp3lame')
.complexFilter("drawtext=enable='between(t,0,2)':text='"+fullName+"':x=(w-tw)/2:y=((h-text_h)/2)-(text_h-(th/4)):fontsize=150:fontcolor=white")
.on('error', function(err) {
  console.log('An error occurred: ' + err.message);
  parentPort.postMessage({ error: err.message,status : 'Error' })
})
.on('end', function() {
  console.log('Processing finished !');
  parentPort.postMessage({ fileName: destSource,status : 'Done' })
})
.save(destSource);


