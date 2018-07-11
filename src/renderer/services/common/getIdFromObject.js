import isObjectEmpty from './isObjectEmpty'

export default function (obj) {
  if (isObjectEmpty(obj)) {
    return ''
  }
  return obj.id
}
