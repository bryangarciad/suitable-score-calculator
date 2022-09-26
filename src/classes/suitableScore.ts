import isEven from "../helpers/isEven";
import { letterCounter } from "../helpers/stringTools";

interface driverDestinationSSMapInterface {
    driver: string,
    destination: string,
    ss: number
}

/**
* Helper class to calculate suitable score for given arrays of drivers and destinations;
* Follows the following ruleset to calculate SS
*  # If the length of the shipment's destination street name is even, the base suitability score (SS) is the number of vowels in the driver’s name multiplied by 1.5.
*  # If the length of the shipment's destination street name is odd, the base SS is the number of consonants in the driver’s name multiplied by 1
*  # If the length of the shipment's destination street name shares any common factors (besides 1) with the length of the driver’s name, the 
*    SS is increased by 50% above the base SS.
*/
class SuitableScore {
    private driverDestinationSSMap: Array<driverDestinationSSMapInterface> = [];
    private HigherSSUniqueCombinations: Array<driverDestinationSSMapInterface> = [];

    constructor(private destination: Array<string>, private drivers: Array<string>) {
        // Get xCx combinations for given drivers and destinations to be further evaluated
        //
        const driverDestinationTuple: Array<[string, string]> = this.GetDriverDestinationCombinations()

        // Calculate SS for combinations and store it into a private array for further process
        //
        driverDestinationTuple.forEach(tuple => {
            const [driver, destination] = tuple
            const ss = this.calculateSuitableScore(driver, destination)
            this.driverDestinationSSMap.push({ driver, destination, ss })
        })

        const recursiveExtraction = (arr: Array<driverDestinationSSMapInterface>) => {
            if (arr.length === 0) { 
                return arr
            }

            // Sort combinations from highest SS to lowest
            //
            const sortedArr = this.sortFromHighestToLowest(arr)
            // Extract first element from list; shall be always the combination with highest SS
            //
            const highestDriverDestinationCombination: driverDestinationSSMapInterface = sortedArr.shift()
            // Add this combination to final resulting obj
            //
            this.HigherSSUniqueCombinations.push(highestDriverDestinationCombination)
            // Remove references to taken driver and destination in current arr to avoid duplicates
            //
            const filtered = sortedArr.filter((driverDestinationMap: driverDestinationSSMapInterface) => {
                return ( 
                    driverDestinationMap.destination !== highestDriverDestinationCombination.destination
                    &&
                    driverDestinationMap.driver !== highestDriverDestinationCombination.driver
                )
            })
            return recursiveExtraction(filtered)
        }


        // Using recursive function to extract always highest driver destination combination and removing 
        // already take driver and destination from arr for next iteration untill all items were extracted from
        // arr resulting into the highest possible Combination
        //
        recursiveExtraction(this.driverDestinationSSMap)
    }

     /**
     * Takes current array of drivers and current array of destinations to create a new tuples array
     * with possible combinations
     * 
     * @return {Array<[string, string]>} where first element is the driver name and the second one in the destination string
     */
    private GetDriverDestinationCombinations = (): Array<[string, string]> => {
        const driverDestinationTuple: Array<[string, string]> = [];
        this.drivers.forEach((driver: string) => {
            this.destination.forEach((dest: string) => driverDestinationTuple.push([driver, dest]))
        })
        return driverDestinationTuple;
    }

    /**
     * Sorts DESC given array of object who follows driverDestinationSSMapInterface strcuture base on the ss property of the object
     * 
     * @param {Array<driverDestinationSSMapInterface>} driverDestinationSSMap Array of objects exteding driverDestinationSSMapInterface
     * @return {Array<driverDestinationSSMapInterface>} sorted array
     */
    private sortFromHighestToLowest = (driverDestinationSSMap: Array<driverDestinationSSMapInterface>) => {
        return driverDestinationSSMap.sort((a, b) => b.ss - a.ss)
    }

    /**
     * Given two strings, first one being drivers name and second one being destination name calculates suitable score for the driver-destination combinations
     * 
     * @param {string} driver driver name string
     * @param {string} destination destination string
     * 
     * @return {number}  
     */
    private calculateSuitableScore = (driver, destination): number => {
        let ss = 0;

        if (isEven(destination.length)) {
            ss = letterCounter(driver) * 1.5
        } else {
            ss = letterCounter(driver, 'count-consonants') * 1
        }

        const driverStringArr = driver.length.toString().replace('1', '').split('')
        const destinationStringArr = destination.length.toString().split('')
        const intersection = driverStringArr.filter(n => destinationStringArr.includes(n));

        if (intersection.length > 0) {
            ss *= 1.5;
        }

        return ss
    }

    /**
     * Log to console the resulting array with driver-destination combination with the maximum SS
     * 
     */
    public getHighestSSCombination = () => {
        const totalSS = this.HigherSSUniqueCombinations.reduce((acc: number, combination: driverDestinationSSMapInterface) => acc + combination.ss, 0)
        const combinations = this.HigherSSUniqueCombinations.reduce((acc: string, combination: driverDestinationSSMapInterface) => acc + `${combination.driver} => ${combination.destination}` + '\n', '')
        console.log(combinations, 'TOTAL_SS:', totalSS)
        return totalSS;
    }

}

export default SuitableScore;