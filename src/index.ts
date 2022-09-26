import SuitableScore from "./classes/suitableScore";
import * as fs from 'fs';

/**
 * File reader function with streams for long files
 * 
 * @param {string} filePath target file to read
 * @return {promise}
 * 
 */
const readNewLinefile = (filePath): Promise<string[]> => { 
    return new Promise((resolve, reject) => {
        let data = []
        const readableStream = fs.createReadStream(filePath)
        readableStream.setEncoding('utf8')

        readableStream.on('data', (dataChunk) => {
            const splitData = (<string>dataChunk).split('\n')
            data.push(...splitData.map(s => s.replace(/(\r\n|\n|\r)/gm, "")))
        })

        readableStream.on('end', () => { 
            resolve(data)
        })

        readableStream.on('error', e => reject(e))
    })
}


(async function() {
    try {
        // take arguments from command
        //
        const driversFilePath = process.argv[3]
        const destinationsFilePath = process.argv[2]
    
        // check that files exists before running script
        //
        if (!fs.existsSync(driversFilePath) || !fs.existsSync(destinationsFilePath)) {
            throw new Error('Some of the files seems to not be there, please make sure the path you\'re passing is correct')
        }

        // Extract data from txt file as string array
        //
        const drivers = await readNewLinefile(driversFilePath)
        const destinations = await readNewLinefile(destinationsFilePath)

        // Verify that drivers length and destinations legth is the same
        //
        if(drivers.length !== destinations.length) {
            throw new Error('Not same amount of drivers and destinations')
        }

        // Create instance of Suitable Score calculator
        //
        const suitableScoreCalculator = new SuitableScore(destinations, drivers)
        suitableScoreCalculator.getHighestSSCombination()
    } catch (e) {
        console.error(e)
    }
})()