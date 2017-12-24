import agenda from './init'

const createJob = (jobName, runAtNext, params) => {
    return new Promise((rs, rj) => {
        // check existance of job
        agenda.jobs({
            name: jobName,
            'data.device.id': params.device.id
        }, (err, jobs) => {
            if (err) rj(err)
            else {
                if (jobs.length == 0) {
                    // register
                    console.log('register new job')
                    params.runAtFirstTime = true;
                    let job = agenda.create(jobName, params);
                    job.enable();
                    job.save();
                    rs(job)
                }
                else
                    rs()
            }
        })
    })
}

const queryJob = (jobName, device) => {
    return new Promise((rs) => {
        agenda.jobs({
            name: jobName,
            'data.device.id': device.id
        }, (err, jobs) => {
            if (!err && jobs.length > 0)
                rs(jobs[0])
            else
                rs()
        })
    })
}

const deleteJobs = (device) => {
    return new Promise((rs, rj) => {
        agenda.cancel({
            'data.device.id': device.id
        }, (err, numRemoved) => {
            if (err) rj()
            else {
                console.log(numRemoved)
                rs();
            }
        })

    })
}

const enableJobs = (device, enable) => {
    return new Promise((rs, rj) => {
        agenda.jobs({
            'data.device.id': device.id
        }, (err, jobs) => {
            if (err) rj()
            else {
                if (jobs.length > 0) {
                    jobs.forEach((job) => {
                        if (enable) {
                            console.log('enable jobs')
                            job.enable()
                            job.save()
                        }
                        else {
                            console.log('disable jobs')
                            job.disable();
                        }
                        job.save();
                    })
                }
                rs();
            }
        })

    })

}

module.exports = {
    createJob,
    queryJob,
    enableJobs,
    deleteJobs
}
