import createNumberMask from 'text-mask-addons/dist/createNumberMask'
import email from 'text-mask-addons/dist/emailMask'
const phone = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
const regularNumber = createNumberMask({
  prefix: '',
  suffix: '',
  includeThousandsSeparator: false,
  allowNegative: false
})
const currencyNumber = createNumberMask({
  includeThousandsSeparator: true,
  allowNegative: false,
  allowDecimal: true,
  requiresDecimal: false
})
export default {
  email: email,
  phone: phone,
  regularNumber: regularNumber,
  currencyNumber: currencyNumber
}
