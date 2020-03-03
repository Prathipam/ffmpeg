const { Worker, isMainThread,  workerData } = require('worker_threads');

if(isMainThread) {
        console.log("this is the main thread")
        //Replace with messenger id
        let fid = '12345'
        //Replace with name of the messenger
        let fullName = "Prathipa Mariappan"
        // Worker thread created and input file, fid and full name is passed as worker data
        let worker = new Worker('./workerone.js',{ 
        workerData: {
            inputFile:__dirname+'/images/input.mp4',
            fid,
            fullName
         }
         });     
        worker.on('message',(data) => {
            console.log("message",data)
        })
        
        worker.on('error',(err) => {
            console.log(err);
        })

        worker.on('exit',(code) => {
            if(code != 0) 
                console.error(`Worker stopped with exit code ${code}`)
        })
}
