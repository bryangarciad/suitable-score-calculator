export const letterCounter = (payload: string, action: 'count-vowels' | 'count-consonants' = 'count-vowels') : number  => {
    const vowelsRegex = /[aeiou]/gi
    const consonantsRegex = /[b-df-hj-np-tv-z]/gi
    switch (action) {
        case 'count-consonants':
            const consonants = [...payload.match(consonantsRegex)]
            return consonants.length
        case 'count-vowels':
            const vowels = [...payload.match(vowelsRegex)]
            return vowels.length
        default:
            const neverAssign: never = action
    }
}