import fs from 'fs'

const localFetch = async (location) => {
  const rawdata = fs.readFileSync(location)
  const stream = fs.createReadStream(location)
  return {
    body: stream,
    text: () => rawdata.toString('ascii', 0, rawdata.length),
    json: () => JSON.parse(rawdata)
  }
}

export default localFetch
