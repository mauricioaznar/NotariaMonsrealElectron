import createNumberMask from 'text-mask-addons/dist/createNumberMask'
import email from 'text-mask-addons/dist/emailMask'
const phone = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
const regularNumber = createNumberMask({
  prefix: '',
  suffix: '',
  includeThousandsSeparator: false,
  allowNegative: false
})

export default {email, phone, regularNumber}
