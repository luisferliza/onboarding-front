function getFileType(file) {
  const type = file.type.split('/')[0]
  const ext = file.type.split('/')[1]
  return { type, ext }
}

function sameDay(d1, d2) {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  )
}

export { getFileType, sameDay }
