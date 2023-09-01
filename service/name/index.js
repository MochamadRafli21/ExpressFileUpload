const generate = (real_name) => {
  const date = Date.now().toString()
  const splitR = real_name.split('.')
  const type_file = splitR[splitR.length -1]
  const encoded_name = btoa(date+real_name)
  return encoded_name+'.'+ type_file
}

module.exports = generate;

